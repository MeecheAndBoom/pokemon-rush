"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchBox({
  defaultValue = "",
  placeholder = "Search sets, boxes, accessories",
  className,
  autoFocus = false,
  onSubmitted,
  variant = "field",
}: {
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  onSubmitted?: () => void;
  variant?: "field" | "bare";
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  function submit(term: string) {
    const q = term.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    onSubmitted?.();
  }

  return (
    <form
      role="search"
      className={cn("relative", className)}
      onSubmit={(event) => {
        event.preventDefault();
        submit(value);
      }}
    >
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>
      <Search
        aria-hidden="true"
        strokeWidth={1.75}
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ink-2)]"
      />
      <input
        ref={inputRef}
        id="site-search"
        type="text"
        name="q"
        value={value}
        onChange={(event) => setValue(event.target.value)}
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
  );
}
