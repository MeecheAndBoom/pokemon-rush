import { ProductCard } from "@/components/commerce/ProductCard";
import type { ProductCardData } from "@/lib/product-meta";

export function ProductGrid({ products }: { products: readonly ProductCardData[] }) {
  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-[15px] text-[var(--ink-2)]">
        Nothing here yet. Try a different filter.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
