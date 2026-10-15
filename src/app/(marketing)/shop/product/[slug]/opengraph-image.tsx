import { ogArtForBrand } from "@/lib/brand";
import { ogCard, ogContentType, ogSize } from "@/lib/og";
import { brandLabels, catalog, getProduct } from "@/lib/catalog";

export const alt = "Sealed trading cards from PokéStore Direct";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return catalog.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return ogCard({
      title: "Factory-sealed trading cards",
      eyebrow: "PokéStore Direct",
      art: ogArtForBrand(),
    });
  }
  const brand = brandLabels[product.brand] ?? product.brand;
  return ogCard({
    title: product.name,
    eyebrow: brand,
    meta: [product.setName, product.language !== "n/a" ? product.language : undefined]
      .filter(Boolean)
      .join(" · "),
    art: ogArtForBrand(product.brand),
  });
}
