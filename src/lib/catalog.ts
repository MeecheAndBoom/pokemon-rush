import catalogJson from "@/data/catalog.json";

export type ProductImage = { url: string; alt: string };

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

export type ShopFilters = {
  brand?: string;
  language?: string;
  type?: string;
  q?: string;
  sort?: string;
};

export function filterProducts(filters: ShopFilters) {
  let items = catalog.filter((p) => p.status === "published");

  if (filters.brand) items = items.filter((p) => p.brand === filters.brand);
  if (filters.language) items = items.filter((p) => p.language === filters.language);
  if (filters.type) items = items.filter((p) => p.productType === filters.type);
  if (filters.q) {
    const q = filters.q.toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tags.join(" ").toLowerCase().includes(q)
    );
  }

  switch (filters.sort) {
    case "price-asc":
      items = [...items].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      items = [...items].sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      items = [...items].sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  return items;
}

export function getBrandCounts() {
  return brands.map((b) => ({
    ...b,
    count: catalog.filter((p) => p.brand === b.slug).length,
  }));
}
