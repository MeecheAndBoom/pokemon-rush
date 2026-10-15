"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, SearchX, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/product-meta";
import type { SearchResponse } from "@/lib/search";

/**
 * The type-ahead panel for the site search box. Purely presentational: the
 * surrounding `SearchBox` owns the query, the active option and the keyboard
 * handling. Option ids are derived from `idPrefix` so `aria-activedescendant`
 * on the input can point at the highlighted row.
 */

const ROW =
  "flex items-center gap-3 rounded-xl px-3 transition-colors duration-100";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-3 pb-0.5 pt-2.5 text-[10.5px] font-medium uppercase tracking-[0.09em] text-[var(--ink-2)]">
      {children}
    </p>
  );
}

function SkeletonRows() {
  return (
    <div className="space-y-1 p-1" aria-hidden="true">
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex items-center gap-3 px-2 py-1.5">
          <div className="h-11 w-11 shrink-0 animate-pulse rounded-lg bg-[var(--surface-2)]" />
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="h-3 w-3/4 animate-pulse rounded-full bg-[var(--surface-2)]" />
            <div className="h-2.5 w-1/3 animate-pulse rounded-full bg-[var(--surface-2)]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SearchSuggestions({
  idPrefix,
  query,
  data,
  activeIndex,
  onSelect,
  className,
}: {
  idPrefix: string;
  query: string;
  /** `null` while the first response for the current term is still in flight. */
  data: SearchResponse | null;
  activeIndex: number;
  onSelect: () => void;
  className?: string;
}) {
  const products = data?.products ?? [];
  const categories = data?.categories ?? [];
  const ready = data !== null;
  const hasResults = products.length > 0 || categories.length > 0;
  const seeAllHref = `/shop?q=${encodeURIComponent(query.trim())}`;

  return (
    <div
      className={cn(
        "psd-pop-in absolute z-[60] origin-top overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--background)] shadow-[0_18px_50px_rgba(0,0,0,0.16)]",
        className
      )}
    >
      <div
        id={`${idPrefix}-listbox`}
        role="listbox"
        aria-label="Search suggestions"
        className="max-h-[min(65vh,24rem)] overflow-y-auto overscroll-contain p-1.5"
      >
        {!ready ? <SkeletonRows /> : null}

        {ready && !hasResults ? (
          <p className="flex items-center justify-center gap-2 px-3 py-7 text-[13px] text-[var(--ink-2)]">
            <SearchX className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            Nothing matches “{query.trim()}”
          </p>
        ) : null}

        {products.length > 0 ? (
          <>
            <SectionLabel>Products</SectionLabel>
            {products.map((hit, index) => (
              <Link
                key={hit.slug}
                id={`${idPrefix}-opt-${index}`}
                role="option"
                aria-selected={activeIndex === index}
                href={`/shop/product/${hit.slug}`}
                onClick={onSelect}
                className={cn(ROW, "py-2", activeIndex === index && "bg-[var(--surface-2)]")}
              >
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[var(--surface-2)]">
                  {hit.image ? (
                    <Image
                      src={hit.image}
                      alt=""
                      fill
                      sizes="44px"
                      className="object-contain p-1"
                    />
                  ) : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] tracking-tight text-[var(--foreground)]">
                    {hit.name}
                  </span>
                  <span className="block truncate text-[12px] text-[var(--ink-2)]">
                    {hit.brandLabel}
                    {hit.typeLabel ? ` · ${hit.typeLabel}` : ""}
                  </span>
                </span>
                <span className="shrink-0 text-[13px] tabular-nums tracking-tight text-[var(--foreground)]">
                  {formatPrice(hit.price, hit.currency)}
                </span>
              </Link>
            ))}
          </>
        ) : null}

        {categories.length > 0 ? (
          <>
            <SectionLabel>Browse</SectionLabel>
            {categories.map((hit, offset) => {
              const index = products.length + offset;
              return (
                <Link
                  key={hit.href}
                  id={`${idPrefix}-opt-${index}`}
                  role="option"
                  aria-selected={activeIndex === index}
                  href={hit.href}
                  onClick={onSelect}
                  className={cn(ROW, "py-2", activeIndex === index && "bg-[var(--surface-2)]")}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--surface-2)] text-[var(--ink-2)]">
                    <Tag className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[13.5px] tracking-tight text-[var(--foreground)]">
                    {hit.label}
                  </span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 shrink-0 text-[var(--ink-2)]"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </>
        ) : null}
      </div>

      {ready && data.total > 0 ? (
        <Link
          href={seeAllHref}
          onClick={onSelect}
          className="flex items-center justify-between gap-3 border-t border-[var(--hairline)] px-4 py-3 text-[13px] tracking-tight text-[var(--foreground)] transition-colors hover:bg-[var(--surface-2)]"
        >
          <span className="truncate">
            See all {data.total} {data.total === 1 ? "result" : "results"}
          </span>
          <ArrowUpRight
            className="h-3.5 w-3.5 shrink-0 text-[var(--ink-2)]"
            strokeWidth={2}
            aria-hidden="true"
          />
        </Link>
      ) : null}
    </div>
  );
}
