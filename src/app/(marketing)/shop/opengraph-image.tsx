import { ogArtForBrand } from "@/lib/brand";
import { ogCard, ogContentType, ogSize } from "@/lib/og";
import { pageSeo } from "@/data/seo";

export const alt = "Shop factory-sealed trading cards at PokéStore Direct";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    title: pageSeo["/shop"].title,
    eyebrow: "Shop",
    meta: "Factory-sealed Pokémon, One Piece and Weiss Schwarz",
    art: ogArtForBrand(),
  });
}
