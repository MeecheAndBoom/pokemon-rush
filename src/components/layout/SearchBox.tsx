"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchSuggestions } from "@/components/layout/SearchSuggestions";
import { MIN_SEARCH_LENGTH, searchOptionHrefs, type SearchResponse } from "@/lib/search";

/** Long enough to swallow a burst of keystrokes, short enough to feel live. */
const DEBOUNCE_MS = 130;

export function SearchBox({
  defaultValue = "",
  placeholder = "Search sets, boxes, accessories",
  className,
  panelClassName,
  autoFocus = false,
  onSubmitted,
  variant = "field",
}: {
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  /** Overrides the suggestion panel's anchoring; defaults to the field's width. */
  panelClassName?: string;
  autoFocus?: boolean;
  onSubmitted?: () => void;
  variant?: "field" | "bare";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const idPrefix = `search-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  const inputId = `${idPrefix}-input`;

  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [data, setData] = useState<SearchResponse | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cache = useRef(new Map<string, SearchResponse>());

  const term = value.trim();
  const ready = data !== null && data.query.trim().toLowerCase() === term.toLowerCase();
  const options = useMemo(() => (ready && data ? searchOptionHrefs(data) : []), [ready, data]);
  const showPanel = open && term.length >= MIN_SEARCH_LENGTH;

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  // Navigating away should never leave the panel hanging over the new page.
  useEffect(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, [pathname]);

  // Fetch suggestions for the current term — debounced, cached and cancellable.
  useEffect(() => {
    if (term.length < MIN_SEARCH_LENGTH) {
      setData(null);
      return;
    }

    const key = term.toLowerCase();
    const cached = cache.current.get(key);
    if (cached) {
      setData(cached);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(term)}`, { signal: controller.signal })
        .then((response) => (response.ok ? response.json() : null))
        .then((json: SearchResponse | null) => {
          if (!json) return;
          cache.current.set(key, json);
          setData(json);
        })
        .catch(() => {
          // Aborted or offline: leave whatever is already on screen alone.
        });
    }, DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [term]);

  // Arrowing through the list should keep the highlighted row visible.
  useEffect(() => {
    if (activeIndex < 0) return;
    document.getElementById(`${idPrefix}-opt-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, idPrefix]);

  function closePanel() {
    setOpen(false);
    setActiveIndex(-1);
  }

  function submit(next: string) {
    const q = next.trim();
    closePanel();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    onSubmitted?.();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      if (options.length === 0) return;
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => (index + 1) % options.length);
    } else if (event.key === "ArrowUp") {
      if (options.length === 0) return;
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? options.length - 1 : index - 1));
    } else if (event.key === "Escape") {
      if (!open) return;
      event.preventDefault();
      closePanel();
    } else if (event.key === "Enter" && showPanel && activeIndex >= 0) {
      const href = options[activeIndex];
      if (!href) return;
      event.preventDefault();
      closePanel();
      router.push(href);
      onSubmitted?.();
    }
  }

  return (
    <div
      className="relative"
      onFocus={() => {
        if (term.length >= MIN_SEARCH_LENGTH) setOpen(true);
      }}
      onBlur={(event) => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
        closePanel();
      }}
      onMouseDown={(event) => {
        // Keep focus in the field so the click lands before any blur handling.
        if ((event.target as Element).closest("a")) event.preventDefault();
      }}
    >
      <form
        role="search"
        className={cn("relative", className)}
        onSubmit={(event) => {
          event.preventDefault();
          submit(value);
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          Search products
        </label>
        <Search
          aria-hidden="true"
          strokeWidth={1.75}
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ink-2)]"
        />
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          name="q"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={showPanel ? `${idPrefix}-listbox` : undefined}
          aria-autocomplete="list"
          aria-activedescendant={
            showPanel && activeIndex >= 0 ? `${idPrefix}-opt-${activeIndex}` : undefined
          }
          value={value}
          onChange={(event) => {
            const next = event.target.value;
            setValue(next);
            setActiveIndex(-1);
            setOpen(next.trim().length >= MIN_SEARCH_LENGTH);
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className={cn(
            "h-10 w-full rounded-full pl-10 pr-9 text-[14px] tracking-tight text-[var(--foreground)] outline-none transition-colors",
            "placeholder:text-[var(--ink-2)] focus:ring-2 focus:ring-[var(--accent)]/30",
            variant === "field"
              ? "border border-[var(--hairline)] bg-[var(--surface-2)] focus:border-[var(--accent)] focus:bg-[var(--background)]"
              : "border border-transparent bg-transparent"
          )}
        />
        {value ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setValue("");
              closePanel();
              inputRef.current?.focus();
            }}
            className="absolute right-2.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-[var(--ink-2)] transition-colors hover:text-[var(--foreground)]"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        ) : null}
        <button type="submit" className="sr-only">
          Search
        </button>
      </form>

      {showPanel ? (
        <SearchSuggestions
          idPrefix={idPrefix}
          query={term}
          data={ready ? data : null}
          activeIndex={activeIndex}
          onSelect={() => {
            closePanel();
            onSubmitted?.();
          }}
          className={panelClassName ?? "left-0 right-0 top-[calc(100%+0.5rem)]"}
        />
      ) : null}
    </div>
  );
}
