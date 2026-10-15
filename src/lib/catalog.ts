import catalogJson from "@/data/catalog.json";
import type { CatalogCard, ProductImage } from "@/lib/product-meta";

// Re-exported so server code can keep importing these from the catalogue while
// client components import them straight from `@/lib/product-meta` (which does
// not drag the catalogue JSON into the browser bundle).
export { formatPrice, languageLabels, brandLabels, productTypeLabels } from "@/lib/product-meta";
export type { ProductImage, ProductCardData, CatalogCard } from "@/lib/product-meta";

export type CatalogProduct = {
  slug: string;
  name: string;
  subtitle?: string;
  setName?: string;
  brand: "pokemon" | "one-piece" | "weiss-schwarz" | "accessories";
  language: "english" | "japanese" | "chinese" | "korean" | "n/a";
  productType:
    | "booster-box"
    | "booster-bundle"
    | "elite-trainer-box"
    | "sealed-case"
    | "booster-pack"
    | "collection"
    | "trial-deck"
    | "single-card"
    | "graded-card"
    | "accessory";
  price: number;
  compareAtPrice: number | null;
  currency: string;
  condition: string;
  preorder: boolean;
  images: ProductImage[];
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  tags: string[];
  status: string;
  featured: boolean;
  sourceUrl?: string;
};

export const catalog = catalogJson as unknown as CatalogProduct[];

export const brands = [
  { slug: "pokemon", label: "Pokémon", blurb: "Japanese, English, and Chinese sets, sealed and sourced." },
  { slug: "one-piece", label: "One Piece", blurb: "Booster boxes and cases for the Grand Line." },
  { slug: "weiss-schwarz", label: "Weiss Schwarz", blurb: "Crossover sets and trial decks." },
  { slug: "accessories", label: "Accessories", blurb: "Sleeves, storage, and everything in between." },
] as const;

export const productTypes = [
  { slug: "booster-box", label: "Booster boxes" },
  { slug: "booster-bundle", label: "Booster bundles" },
  { slug: "elite-trainer-box", label: "Elite Trainer Boxes" },
  { slug: "sealed-case", label: "Sealed cases" },
  { slug: "collection", label: "Collections" },
  { slug: "trial-deck", label: "Trial decks" },
  { slug: "single-card", label: "Single cards" },
  { slug: "accessory", label: "Accessories" },
] as const;

export const languages = [
  { slug: "japanese", label: "Japanese" },
  { slug: "english", label: "English" },
  { slug: "chinese", label: "Chinese" },
  { slug: "korean", label: "Korean" },
] as const;

export function getProduct(slug: string) {
  return catalog.find((p) => p.slug === slug);
}

export function getFeatured(limit = 8) {
  const published = catalog.filter((p) => p.status === "published");
  const featured = published.filter((p) => p.featured);
  const rest = published.filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, limit);
}

export function getByBrand(brand: string) {
  return catalog.filter((p) => p.brand === brand && p.status === "published");
}

/** Every published product, in catalogue order. */
export function publishedProducts() {
  return catalog.filter((p) => p.status === "published");
}

/** Trim a catalogue product to the fields a client-side listing filters on. */
export function toCatalogCard(product: CatalogProduct): CatalogCard {
  return {
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    language: product.language,
    productType: product.productType,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    currency: product.currency,
    preorder: product.preorder,
    images: product.images.slice(0, 1),
    search: [product.name, product.setName, ...product.tags]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  };
}

export function catalogCards(products: readonly CatalogProduct[]): CatalogCard[] {
  return products.map(toCatalogCard);
}

export function getBrandCounts() {
  return brands.map((b) => ({
    ...b,
    count: catalog.filter((p) => p.brand === b.slug).length,
  }));
}
