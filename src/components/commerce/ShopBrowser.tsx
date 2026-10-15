"use client";

import { useSearchParams } from "next/navigation";
import { CatalogListing } from "@/components/commerce/CatalogListing";
import { buildListingView, type Facet, type SortOption } from "@/lib/shop-listing";
import type { CatalogCard } from "@/lib/product-meta";

/**
 * Client-side shop browsing. `/shop` and `/shop/[brand]` are prerendered; this
 * component reads the query string and filters, sorts and paginates in memory.
 * The canonical URL is always the clean path, so filtered variants consolidate
 * to it.
 */
export function ShopBrowser({
  products,
  basePath,
  brands,
  languages,
  productTypes,
  sorts,
  pageSize,
}: {
  products: CatalogCard[];
  basePath: string;
  brands?: readonly Facet[];
  languages: readonly Facet[];
  productTypes: readonly Facet[];
  sorts: readonly SortOption[];
  pageSize?: number;
}) {
  const searchParams = useSearchParams();

  const view = buildListingView({
    products,
    basePath,
    brands,
    languages,
    productTypes,
    sorts,
    pageSize,
    query: {
      q: searchParams.get("q") ?? undefined,
      brand: searchParams.get("brand") ?? undefined,
      language: searchParams.get("language") ?? undefined,
      type: searchParams.get("type") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
      page: searchParams.get("page") ?? undefined,
    },
  });

  return <CatalogListing view={view} />;
}
