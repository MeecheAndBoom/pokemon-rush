import Image from "next/image";
import Link from "next/link";
import { formatPrice, languageLabels, type CatalogProduct } from "@/lib/catalog";

export function ProductCard({ product }: { product: CatalogProduct }) {
  const image = product.images[0];
  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(100 - (product.price / product.compareAtPrice) * 100)
      : 0;

  return (
    <Link href={`/shop/product/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt || product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain p-6 transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        ) : null}
        {product.preorder ? (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--foreground)] px-2.5 py-1 text-[11px] font-medium tracking-tight text-[var(--background)]">
            Pre-order
          </span>
        ) : discount > 0 ? (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--foreground)] px-2.5 py-1 text-[11px] font-medium tracking-tight text-[var(--background)]">
            Save {discount}%
          </span>
        ) : null}
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="text-[14px] leading-snug tracking-tight text-[var(--foreground)]">
          {product.name}
        </h3>
        <p className="text-[13px] text-[var(--ink-2)]">
          {product.brand === "pokemon"
            ? "Pokémon"
            : product.brand === "one-piece"
              ? "One Piece"
              : product.brand === "weiss-schwarz"
                ? "Weiss Schwarz"
                : "Accessories"}
          {product.language !== "n/a"
            ? ` · ${languageLabels[product.language] ?? product.language}`
            : ""}
        </p>
        <p className="flex items-baseline gap-2 pt-0.5 text-[14px] text-[var(--foreground)]">
          {formatPrice(product.price, product.currency)}
          {product.compareAtPrice ? (
            <span className="text-[13px] text-[var(--ink-2)] line-through">
              {formatPrice(product.compareAtPrice, product.currency)}
            </span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}
