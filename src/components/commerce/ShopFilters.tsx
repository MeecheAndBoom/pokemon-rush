"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ListingChip } from "@/lib/shop-listing";

/**
 * Shop filters. Filters are plain links, so no JS is needed to apply one — the
 * only state here is presentation:
 *
 *   - Large screens keep the chip rows, pinned under the header while browsing.
 *   - Phones get a compact sticky bar whose "Filters" button raises a bottom
 *     sheet (drag the grabber down to dismiss) and whose "Sort" button opens a
 *     small popover.
 */

const CHIP =
  "rounded-full border transition-[background-color,border-color,color,transform] duration-150 ease-out";

const GLASS =
  "bg-[color-mix(in_srgb,var(--background)_86%,transparent)] backdrop-blur-xl backdrop-saturate-150";

function ChipRow({
  chips,
  className,
}: {
  chips: readonly ListingChip[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {chips.map((chip) => (
        <Link
          key={chip.key}
          href={chip.href}
          aria-current={chip.active ? "true" : undefined}
          className={cn(
            CHIP,
            "px-3 py-1 text-[12.5px] active:scale-[0.96]",
            chip.active
              ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
              : "border-[var(--hairline)] text-[var(--ink-2)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
          )}
        >
          {chip.label}
        </Link>
      ))}
    </div>
  );
}

function PillList({
  chips,
  onSelect,
}: {
  chips: readonly ListingChip[];
  onSelect?: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <Link
          key={chip.key}
          href={chip.href}
          onClick={onSelect}
          aria-current={chip.active ? "true" : undefined}
          className={cn(
            CHIP,
            "inline-flex min-h-11 items-center px-4 text-[14px] active:scale-[0.97]",
            chip.active
              ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
              : "border-[var(--hairline)] bg-[var(--surface-2)] text-[var(--foreground)]"
          )}
        >
          {chip.label}
        </Link>
      ))}
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-2.5 text-[13px] font-medium text-[var(--ink-2)]">{label}</h3>
      {children}
    </section>
  );
}

export function ShopFilters({
  brandChips,
  facetChips,
  sortChips,
  total,
  clearHref,
}: {
  brandChips: readonly ListingChip[] | null;
  facetChips: readonly ListingChip[];
  sortChips: readonly ListingChip[];
  total: number;
  clearHref: string;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetShown, setSheetShown] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [dragY, setDragY] = useState<number | null>(null);
  const drag = useRef({ start: 0, offset: 0, active: false });
  const panelRef = useRef<HTMLDivElement>(null);

  const languageChips = facetChips.filter((chip) => chip.key.startsWith("language-"));
  const typeChips = facetChips.filter((chip) => chip.key.startsWith("type-"));

  const activeSort = sortChips.find((chip) => chip.active);
  const isDefaultSort = !activeSort || activeSort.key === "sort-default";
  const sortLabel = !isDefaultSort && activeSort ? activeSort.label : "Sort";
  const showSort = sortChips.length > 1;

  const activeCount =
    facetChips.filter((chip) => chip.active).length +
    (brandChips?.filter((chip) => chip.active && chip.key !== "all").length ?? 0);

  const openSheet = useCallback(() => {
    setDragY(null);
    setSheetOpen(true);
  }, []);

  const closeSheet = useCallback(() => {
    setSheetShown(false);
    window.setTimeout(() => setSheetOpen(false), 320);
  }, []);

  // Let the sheet slide up once it has been mounted at its resting offset, and
  // move focus into it so keyboard and screen-reader users land in the dialog.
  useEffect(() => {
    if (!sheetOpen) return;
    panelRef.current?.focus();
    const id = window.requestAnimationFrame(() => setSheetShown(true));
    return () => window.cancelAnimationFrame(id);
  }, [sheetOpen]);

  // Freeze the page behind the sheet and let Escape close it.
  useEffect(() => {
    if (!sheetOpen) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSheet();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [sheetOpen, closeSheet]);

  // While the page is scroll-locked to the sheet, the sort popover still needs
  // to be dismissible.
  useEffect(() => {
    if (!sortOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSortOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sortOpen]);

  return (
    <>
      {/* Large screens: chip rows pinned under the header while you browse. */}
      <div
        className={cn(
          "sticky top-16 z-30 -mx-8 hidden border-b border-[var(--hairline)] lg:block",
          GLASS
        )}
      >
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 py-3">
          {brandChips ? <ChipRow chips={brandChips} /> : null}
          {showSort ? <ChipRow chips={sortChips} className="ml-auto" /> : null}
          <div className="w-full">
            <ChipRow chips={facetChips} />
          </div>
        </div>
      </div>

      {/* Phones and tablets: a compact, pinned action bar. */}
      <div
        className={cn(
          "sticky top-14 z-30 -mx-5 border-b border-[var(--hairline)] sm:-mx-8 sm:top-16 lg:hidden",
          GLASS
        )}
      >
        <div className="relative flex items-center gap-2 px-5 py-2.5 sm:px-8">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            aria-expanded={sheetOpen}
            className={cn(
              CHIP,
              "inline-flex min-h-10 items-center gap-2 bg-[var(--surface-2)] px-4 text-[14px] font-medium tracking-tight text-[var(--foreground)] active:scale-[0.97]",
              activeCount > 0 ? "border-[var(--foreground)]" : "border-[var(--hairline)]"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            Filters
            {activeCount > 0 ? (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[var(--accent)] px-1 text-[11px] font-semibold text-white">
                {activeCount}
              </span>
            ) : null}
          </button>

          {showSort ? (
            <button
              type="button"
              aria-expanded={sortOpen}
              onClick={() => setSortOpen((value) => !value)}
              className={cn(
                CHIP,
                "inline-flex min-h-10 items-center gap-1.5 px-4 text-[14px] font-medium tracking-tight active:scale-[0.97]",
                isDefaultSort
                  ? "border-[var(--hairline)] bg-[var(--surface-2)] text-[var(--foreground)]"
                  : "border-[var(--accent)] text-[var(--accent)]"
              )}
            >
              <span className="max-w-[7.5rem] truncate">{sortLabel}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  sortOpen && "rotate-180"
                )}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </button>
          ) : null}

          {sortOpen ? (
            <>
              <div
                className="fixed inset-0 z-[60]"
                onClick={() => setSortOpen(false)}
                aria-hidden="true"
              />
              <div
                role="menu"
                className="psd-pop-in absolute right-5 top-[calc(100%-0.25rem)] z-[61] w-60 origin-top-right rounded-2xl border border-[var(--hairline)] bg-[var(--background)] p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.16)] sm:right-8"
              >
                {sortChips.map((chip) => (
                  <Link
                    key={chip.key}
                    href={chip.href}
                    role="menuitemradio"
                    aria-checked={chip.active}
                    onClick={() => setSortOpen(false)}
                    className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[14px] tracking-tight text-[var(--foreground)] transition-colors hover:bg-[var(--surface-2)]"
                  >
                    {chip.label}
                    {chip.active ? (
                      <Check
                        className="h-4 w-4 text-[var(--accent)]"
                        strokeWidth={2.25}
                        aria-hidden="true"
                      />
                    ) : null}
                  </Link>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>

      {sheetOpen ? (
        <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <button
            type="button"
            aria-label="Close filters"
            onClick={closeSheet}
            className={cn(
              "absolute inset-0 h-full w-full bg-black/40 transition-opacity duration-300",
              sheetShown ? "opacity-100" : "opacity-0"
            )}
          />

          <div
            ref={panelRef}
            tabIndex={-1}
            className={cn(
              "absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-[22px] bg-[var(--background)] shadow-[0_-10px_50px_rgba(0,0,0,0.2)] outline-none",
              dragY === null && "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
              dragY === null && (sheetShown ? "translate-y-0" : "translate-y-full")
            )}
            style={dragY === null ? undefined : { transform: `translateY(${dragY}px)` }}
          >
            <div
              onPointerDown={(event) => {
                drag.current = { start: event.clientY, offset: 0, active: true };
                setDragY(0);
                event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onPointerMove={(event) => {
                if (!drag.current.active) return;
                const offset = Math.max(0, event.clientY - drag.current.start);
                drag.current.offset = offset;
                setDragY(offset);
              }}
              onPointerUp={() => {
                if (!drag.current.active) return;
                drag.current.active = false;
                const offset = drag.current.offset;
                setDragY(null);
                if (offset > 110) closeSheet();
              }}
              onPointerCancel={() => {
                drag.current.active = false;
                setDragY(null);
              }}
              className="flex shrink-0 cursor-grab touch-none justify-center pb-1 pt-3 active:cursor-grabbing"
            >
              <span className="h-1.5 w-9 rounded-full bg-[color-mix(in_srgb,var(--foreground)_20%,transparent)]" />
            </div>

            <div className="flex shrink-0 items-baseline justify-between gap-4 px-5 pb-3 pt-1">
              <h2 className="text-[19px] font-semibold tracking-tight">Filters</h2>
              {activeCount > 0 ? (
                <Link
                  href={clearHref}
                  onClick={closeSheet}
                  className="text-[14px] text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
                >
                  Clear all
                </Link>
              ) : null}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5">
              <div className="space-y-6">
                {brandChips ? (
                  <Group label="Brand">
                    <PillList chips={brandChips} onSelect={closeSheet} />
                  </Group>
                ) : null}
                {languageChips.length > 0 ? (
                  <Group label="Language">
                    <PillList chips={languageChips} onSelect={closeSheet} />
                  </Group>
                ) : null}
                {typeChips.length > 0 ? (
                  <Group label="Product type">
                    <PillList chips={typeChips} onSelect={closeSheet} />
                  </Group>
                ) : null}
                {showSort ? (
                  <Group label="Sort">
                    <PillList chips={sortChips} onSelect={closeSheet} />
                  </Group>
                ) : null}
              </div>
            </div>

            <div
              className={cn("shrink-0 border-t border-[var(--hairline)] px-5 pt-3", GLASS)}
              style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
            >
              <button
                type="button"
                onClick={closeSheet}
                className="w-full rounded-full bg-[var(--foreground)] py-3.5 text-[15px] font-medium text-[var(--background)] transition-transform duration-150 active:scale-[0.99]"
              >
                Show {total} {total === 1 ? "result" : "results"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
