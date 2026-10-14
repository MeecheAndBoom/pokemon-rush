"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addToCart } from "@/lib/cart-store";
import type { CatalogProduct } from "@/lib/catalog";

export function AddToCart({ product }: { product: CatalogProduct }) {
  const router = useRouter();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart({
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image: product.images[0]?.url ?? "",
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
    toast.success("Added to cart", {
      description: product.name,
      action: {
        label: "View cart",
        onClick: () => router.push("/cart"),
      },
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleAdd}
        className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-8 text-[15px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.97]"
      >
        {added ? "Added" : "Add to cart"}
      </button>
      <button
        type="button"
        onClick={() => {
          handleAdd();
          router.push("/checkout");
        }}
        className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--hairline)] px-8 text-[15px] font-medium transition-transform duration-150 ease-out active:scale-[0.97] hover:border-[var(--foreground)]"
      >
        Buy now
      </button>
    </div>
  );
}
