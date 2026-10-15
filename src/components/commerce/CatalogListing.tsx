import Link from "next/link";
import { Pagination } from "@/components/commerce/Pagination";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { cn } from "@/lib/utils";
import type { ListingChip, ListingView } from "@/lib/shop-listing";

const chipClass = (active: boolean) =>
  cn(
    "rounded-full border px-4 py-1.5 text-[13px] transition-colors",
    active
      ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
      : "border-[var(--hairline)] text-[var(--ink-2)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
  );

function ChipRow({ chips }: { chips: readonly ListingChip[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <Link key={chip.key} href={chip.href} className={chipClass(chip.active)}>
          {chip.label}
        </Link>
      ))}
    </div>
  );
}

/**
 * Pure presentation for a shop listing. Rendered by the server as the default
 * view (so the prerendered HTML contains products and filter links) and again
 * by the browser once the URL is known.
 */
export function CatalogListing({ view }: { view: ListingView }) {
  return (
    <>
      <div className="mt-10 space-y-5">
        {view.brandChips ? <ChipRow chips={view.brandChips} /> : null}
        <ChipRow chips={view.facetChips} />
        <ChipRow chips={view.sortChips} />
      </div>

      <div className="mt-10 flex items-baseline justify-between gap-4 border-b border-[var(--hairline)] pb-4">
        <p className="text-[13px] text-[var(--ink-2)]">
          {view.query ? (
            <>
              Results for <span className="text-[var(--foreground)]">“{view.query}”</span>
              {" · "}
            </>
          ) : null}
          Showing {view.from}–{view.to} of {view.total}
        </p>
        {view.totalPages > 1 ? (
          <p className="text-[13px] text-[var(--ink-2)]">
            Page {view.page} of {view.totalPages}
          </p>
        ) : null}
      </div>

      <div className="mt-10">
        <ProductGrid products={view.items} />
      </div>

      <Pagination
        current={view.page}
        total={view.totalPages}
        hrefForPage={(page) => view.pageHrefs[page] ?? "#"}
        className="mt-16"
      />
    </>
  );
}
