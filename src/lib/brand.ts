/**
 * Brand asset paths and colour tokens.
 *
 * Deliberately dependency-free so that client components can import from here
 * without pulling the catalogue or the SEO helpers into the browser bundle.
 */

export const BRAND_LOGO_PATH = "/brand/pokestore-direct-logo.png";
export const DEFAULT_OG_IMAGE = "/brand/og-default.jpg";

/** Dimensions of the optimized wordmark in /public/brand. */
export const BRAND_LOGO_SIZE = { width: 900, height: 309 } as const;

/** Brand yellow, mirrored from globals.css. */
export const BRAND_ACCENT = "#f5c518";

/**
 * Decorative character illustrations used on generated social cards.
 * Satori cannot decode WebP, so /public/og-art holds PNG copies.
 */
const artByBrand: Record<string, string> = {
  pokemon: "art-pikachu",
  "one-piece": "art-luffy",
  "weiss-schwarz": "art-tanjiro",
  accessories: "art-snorlax",
};

export function ogArtForBrand(brand?: string): string {
  if (!brand) return "art-charizard";
  return artByBrand[brand] ?? "art-charizard";
}
