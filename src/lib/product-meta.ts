/**
 * Product presentation helpers that are safe to import from client components.
 *
 * Keep this module free of imports: `@/lib/catalog` pulls in the full product
 * catalogue (a ~260 KB JSON file), so anything a browser component needs must
 * live here instead or it would end up in the client bundle.
 */

export type ProductImage = { url: string; alt: string };

/** The subset of a catalogue product that a listing card renders. */
export type ProductCardData = {
  slug: string;
  name: string;
  brand: string;
  language: string;
  price: number;
  compareAtPrice: number | null;
  currency: string;
  preorder: boolean;
  images: readonly ProductImage[];
};

/**
 * A catalogue product trimmed for client-side listing: the card data plus the
 * facet values and a lower-cased search haystack the browser filters on.
 */
export type CatalogCard = ProductCardData & {
  productType: string;
  /** Lower-cased `name + set + tags`, matched against the search box. */
  search: string;
};

export const languageLabels: Record<string, string> = {
  english: "English",
  japanese: "Japanese",
  chinese: "Chinese",
  korean: "Korean",
  "n/a": "N/A",
};

export const brandLabels: Record<string, string> = {
  pokemon: "Pokémon",
  "one-piece": "One Piece",
  "weiss-schwarz": "Weiss Schwarz",
  accessories: "Accessories",
};

export const productTypeLabels: Record<string, string> = {
  "booster-box": "Booster box",
  "booster-bundle": "Booster bundle",
  "elite-trainer-box": "Elite Trainer Box",
  "sealed-case": "Sealed case",
  "booster-pack": "Booster pack",
  collection: "Premium collection",
  "trial-deck": "Trial deck",
  "single-card": "Single card",
  "graded-card": "Graded card",
  accessory: "Accessory",
};

export function formatPrice(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
