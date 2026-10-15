import { ogArtForBrand } from "@/lib/brand";
import { ogCard, ogContentType, ogSize } from "@/lib/og";
import { brands } from "@/lib/catalog";
import { brandSeo } from "@/data/seo";

export const alt = "Sealed trading cards from PokéStore Direct";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }));
}

export default async function Image({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const label = brands.find((b) => b.slug === brand)?.label ?? "Sealed trading cards";
  const entry = brandSeo[brand];
  return ogCard({
    title: entry?.title ?? label,
    eyebrow: label,
    meta: "Factory-sealed, inspected and shipped worldwide",
    art: ogArtForBrand(brand),
  });
}
