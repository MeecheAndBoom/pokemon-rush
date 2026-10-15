import { ogArtForBrand } from "@/lib/brand";
import { ogCard, ogContentType, ogSize } from "@/lib/og";
import { pageSeo } from "@/data/seo";

export const alt = "Sealed trading card guides and market notes from PokéStore Direct";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    title: pageSeo["/blog"].title,
    eyebrow: "Blog & guides",
    meta: "Storage, print runs, pull rates, reseal checks and grading",
    art: ogArtForBrand("pokemon"),
  });
}
