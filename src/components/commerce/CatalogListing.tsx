import { Pagination } from "@/components/commerce/Pagination";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { ShopFilters } from "@/components/commerce/ShopFilters";
import type { ListingView } from "@/lib/shop-listing";

export function CatalogListing({ view }: { view: ListingView }) {
  return (
    <>
      <ShopFilters
        brandChips={view.brandChips}
        facetChips={view.facetChips}
        sortChips={view.sortChips}
        total={view.total}
        clearHref={view.clearFiltersHref}
      />

      <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-[var(--hairline)] pb-4">
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
