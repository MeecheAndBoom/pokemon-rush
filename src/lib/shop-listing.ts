import type { CatalogCard } from "@/lib/product-meta";

/**
 * Shared shape of the shop listing. `buildListingView` is pure and importable
 * from both the server (to prerender the default view) and the browser (to
 * rebuild it from the URL), which keeps `/shop` and `/shop/[brand]` static.
 */

export type ShopQuery = {
  q?: string;
  brand?: string;
  language?: string;
  type?: string;
  sort?: string;
  page?: string;
};

export type Facet = { slug: string; label: string };

export type SortOption = { value: string; label: string };

export type ListingChip = { key: string; label: string; href: string; active: boolean };

export type ListingView = {
  items: CatalogCard[];
  /** `null` on brand pages, which hide the all-brands row. */
  brandChips: ListingChip[] | null;
  facetChips: ListingChip[];
  sortChips: ListingChip[];
  query: string;
  total: number;
  /** 1-based index of the first visible product, or 0 when empty. */
  from: number;
  to: number;
  page: number;
  totalPages: number;
  pageHrefs: Record<number, string>;
};

export type ListingInput = {
  products: readonly CatalogCard[];
  query: ShopQuery;
  basePath: string;
  brands?: readonly Facet[];
  languages: readonly Facet[];
  productTypes: readonly Facet[];
  sorts: readonly SortOption[];
  pageSize?: number;
};

const DEFAULT_PAGE_SIZE = 24;

/**
 * Build a listing URL, dropping empty values and resetting pagination unless a
 * page is explicitly requested.
 */
export function shopHref(basePath: string, query: ShopQuery, patch: ShopQuery = {}) {
  const merged: ShopQuery = {
    q: query.q,
    brand: query.brand,
    language: query.language,
    type: query.type,
    sort: query.sort,
    ...patch,
  };
  const params = new URLSearchParams();
  Object.entries(merged).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  const search = params.toString();
  return search ? `${basePath}?${search}` : basePath;
}

export function buildListingView(input: ListingInput): ListingView {
  const { products, query, basePath, brands, languages, productTypes, sorts } = input;
  const pageSize = input.pageSize ?? DEFAULT_PAGE_SIZE;

  const q = query.q ?? "";
  const brand = brands ? query.brand ?? "" : "";
  const language = query.language ?? "";
  const type = query.type ?? "";
  const sort = query.sort ?? "";

  // The current selection, minus `page`, used as the base for every link.
  const base: ShopQuery = {
    q: query.q,
    brand: brands ? query.brand : undefined,
    language: query.language,
    type: query.type,
    sort: query.sort,
  };

  const needle = q.trim().toLowerCase();
  const matched = products.filter((product) => {
    if (brand && product.brand !== brand) return false;
    if (language && product.language !== language) return false;
    if (type && product.productType !== type) return false;
    if (needle && !product.search.includes(needle)) return false;
    return true;
  });

  // `filter` already returned a fresh array, so sorting it in place is safe.
  if (sort === "price-asc") matched.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") matched.sort((a, b) => b.price - a.price);
  else if (sort === "name-asc") matched.sort((a, b) => a.name.localeCompare(b.name));

  const total = matched.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const parsedPage = Number.parseInt(query.page ?? "1", 10);
  const page = Math.min(Math.max(Number.isNaN(parsedPage) ? 1 : parsedPage, 1), totalPages);

  const chip = (key: string, label: string, href: string, active: boolean): ListingChip => ({
    key,
    label,
    href,
    active,
  });

  const brandChips: ListingChip[] | null = brands
    ? [
        chip("all", "All", shopHref(basePath, base, { brand: undefined }), !brand),
        ...brands.map((option) =>
          chip(
            option.slug,
            option.label,
            shopHref(basePath, base, { brand: brand === option.slug ? undefined : option.slug }),
            brand === option.slug
          )
        ),
      ]
    : null;

  const facetChips: ListingChip[] = [
    ...languages.map((option) =>
      chip(
        `language-${option.slug}`,
        option.label,
        shopHref(basePath, base, {
          language: language === option.slug ? undefined : option.slug,
        }),
        language === option.slug
      )
    ),
    ...productTypes.map((option) =>
      chip(
        `type-${option.slug}`,
        option.label,
        shopHref(basePath, base, {
          type: type === option.slug ? undefined : option.slug,
        }),
        type === option.slug
      )
    ),
  ];

  const sortChips: ListingChip[] = sorts.map((option) =>
    chip(
      `sort-${option.value || "default"}`,
      option.label,
      shopHref(basePath, base, {
        sort: option.value === "" || sort === option.value ? undefined : option.value,
      }),
      option.value ? sort === option.value : !sort
    )
  );

  const pageHrefs: Record<number, string> = {};
  for (let index = 1; index <= totalPages; index += 1) {
    pageHrefs[index] = shopHref(basePath, base, {
      page: index === 1 ? undefined : String(index),
    });
  }

  const start = (page - 1) * pageSize;
  return {
    items: matched.slice(start, start + pageSize),
    brandChips,
    facetChips,
    sortChips,
    query: q,
    total,
    from: total === 0 ? 0 : start + 1,
    to: Math.min(start + pageSize, total),
    page,
    totalPages,
    pageHrefs,
  };
}
