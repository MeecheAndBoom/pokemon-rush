import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { CatalogListing } from "@/components/commerce/CatalogListing";
import { ShopBrowser } from "@/components/commerce/ShopBrowser";
import { ShopSearch } from "@/components/commerce/ShopSearch";
import { SearchBox } from "@/components/layout/SearchBox";
import { DecorativeArt } from "@/components/content/DecorativeArt";
import { JsonLd } from "@/components/seo/JsonLd";
import { brands, catalogCards, languages, productTypes, publishedProducts } from "@/lib/catalog";
import { media } from "@/lib/media";
import { buildListingView, type SortOption } from "@/lib/shop-listing";
import { breadcrumbJsonLd, collectionPageJsonLd, seoMetadata } from "@/lib/seo";
import { pageSeo } from "@/data/seo";

// Filtering, sorting and pagination run in the browser (see ShopBrowser), so
// this route is prerendered rather than rendered on demand.
// The colocated opengraph-image route renders the social card.
export const metadata: Metadata = seoMetadata("/shop", { image: null });

const SORTS: readonly SortOption[] = [
  { value: "", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "Name" },
];

const SEARCH_PLACEHOLDER = "Search sets, boxes, accessories";

export default function ShopPage() {
  const all = publishedProducts();
  const products = catalogCards(all);
  const view = buildListingView({
    products,
    query: {},
    basePath: "/shop",
    brands,
    languages,
    productTypes,
    sorts: SORTS,
  });

  return (
    <div className="pb-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
        ])}
      />
      <JsonLd
        data={collectionPageJsonLd({
          name: pageSeo["/shop"].title,
          description: pageSeo["/shop"].description,
          path: "/shop",
          products: all,
        })}
      />
      <section className="relative overflow-hidden border-b border-[var(--hairline)] bg-gradient-to-b from-[var(--tint-blue)] to-[var(--background)]">
        <DecorativeArt
          src={media.art.goku}
          opacity={0.13}
          className="-right-8 -top-6 w-[170px] sm:-right-12 sm:w-[250px] lg:w-[330px]"
        />
        <Container className="relative pt-12 pb-10 sm:pt-16">
          <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">Shop</h1>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[var(--ink-2)]">
            {view.total} sealed {view.total === 1 ? "product" : "products"} available. Every item is
            checked before dispatch.
          </p>

          <div className="mt-8 max-w-md">
            <Suspense fallback={<SearchBox placeholder={SEARCH_PLACEHOLDER} />}>
              <ShopSearch placeholder={SEARCH_PLACEHOLDER} />
            </Suspense>
          </div>
        </Container>
      </section>

      <Container>
        <Suspense fallback={<CatalogListing view={view} />}>
          <ShopBrowser
            products={products}
            basePath="/shop"
            brands={brands}
            languages={languages}
            productTypes={productTypes}
            sorts={SORTS}
          />
        </Suspense>
      </Container>
    </div>
  );
}
