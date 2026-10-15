import type { CatalogCard } from "@/lib/product-meta";

/**
 * Shared types and ranking for the search type-ahead.
 *
 * `matchesQuery` is the single source of truth for "does this product match the
 * search box": the listing filter and the suggestion ranking both call it, so
 * `/api/search` can never offer a product that `/shop?q=` would not show.
 * Terms are matched individually and in any order, so "japanese booster" finds
 * the same products as "booster japanese".
 */

export type SearchProductHit = {
  slug: string;
  name: string;
  brand: string;
  brandLabel: string;
  typeLabel: string;
  price: number;
  currency: string;
  image: string | null;
  imageAlt: string;
  preorder: boolean;
};

export type SearchCategoryHit = {
  href: string;
  label: string;
  kind: "brand" | "type" | "language";
};

export type SearchResponse = {
  query: string;
  total: number;
  products: SearchProductHit[];
  categories: SearchCategoryHit[];
};

export const EMPTY_SEARCH_RESPONSE: SearchResponse = {
  query: "",
  total: 0,
  products: [],
  categories: [],
};

/** Below this, the type-ahead stays quiet and waits for a clearer intent. */
export const MIN_SEARCH_LENGTH = 2;

export function searchTerms(query: string): string[] {
  return query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

/** Every term must appear somewhere in the haystack. An empty query matches all. */
export function matchesQuery(haystack: string, query: string): boolean {
  const terms = searchTerms(query);
  return terms.every((term) => haystack.includes(term));
}

type Facet = { slug: string; label: string };

export type SearchFacets = {
  brands: readonly Facet[];
  productTypes: readonly Facet[];
  languages: readonly Facet[];
};

/**
 * Ranking bands for the product name: 100 exact, 80 prefix, 60 word prefix,
 * 40 substring, 20 matched via set or tags only. Anything in stock nudges ahead
 * within its own band.
 */
function scoreProduct(product: CatalogCard, phrase: string) {
  const name = product.name.toLowerCase();

  if (name === phrase) return 100;
  if (name.startsWith(phrase)) return 80;

  const index = name.indexOf(phrase);
  if (index === -1) return 20;
  const preceding = name[index - 1];
  if (preceding && !/[a-z0-9]/.test(preceding)) return 60;
  return 40;
}

export function rankProducts(
  products: readonly CatalogCard[],
  query: string,
  limit: number
): CatalogCard[] {
  const phrase = query.trim().toLowerCase();
  if (phrase.length < MIN_SEARCH_LENGTH) return [];

  const scored: { product: CatalogCard; score: number }[] = [];

  for (const product of products) {
    if (!matchesQuery(product.search, query)) continue;
    const stockBias = product.preorder ? 0 : 1;
    scored.push({ product, score: scoreProduct(product, phrase) + stockBias });
  }

  scored.sort(
    (a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name)
  );
  return scored.slice(0, limit).map((entry) => entry.product);
}

/**
 * Hrefs of the keyboard-navigable options, in the order the panel renders them
 * (products first, then the browse shortcuts). Both the panel and the input's
 * arrow-key handling index into this list, so the order only lives here.
 */
export function searchOptionHrefs(data: SearchResponse): string[] {
  return [
    ...data.products.map((product) => `/shop/product/${product.slug}`),
    ...data.categories.map((category) => category.href),
  ];
}

/** Brands, product types and languages whose name or slug matches the query. */export function matchCategories(
  query: string,
  facets: SearchFacets,
  limit = 3
): SearchCategoryHit[] {
  const phrase = query.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  if (phrase.length < MIN_SEARCH_LENGTH) return [];

  const groups: {
    kind: SearchCategoryHit["kind"];
    hrefFor: (slug: string) => string;
    facets: readonly Facet[];
  }[] = [
    { kind: "brand", hrefFor: (slug) => `/shop?brand=${slug}`, facets: facets.brands },
    { kind: "type", hrefFor: (slug) => `/shop?type=${slug}`, facets: facets.productTypes },
    { kind: "language", hrefFor: (slug) => `/shop?language=${slug}`, facets: facets.languages },
  ];

  const scored: { hit: SearchCategoryHit; score: number }[] = [];

  for (const group of groups) {
    for (const facet of group.facets) {
      const label = facet.label.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
      const slug = facet.slug.replace(/[^a-z0-9]+/g, " ").trim();

      let score = 0;
      if (label === phrase || slug === phrase) score = 3;
      else if (label.startsWith(phrase) || slug.startsWith(phrase)) score = 2;
      else if (label.includes(phrase) || slug.includes(phrase)) score = 1;
      if (score === 0) continue;

      scored.push({
        hit: { href: group.hrefFor(facet.slug), label: facet.label, kind: group.kind },
        score,
      });
    }
  }

  return scored
    .sort((a, b) => b.score - a.score || a.hit.label.localeCompare(b.hit.label))
    .slice(0, limit)
    .map((entry) => entry.hit);
}
