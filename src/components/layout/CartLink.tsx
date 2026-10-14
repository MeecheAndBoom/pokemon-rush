"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { cartCount, onCartChange, readCart } from "@/lib/cart-store";

export function CartLink({ className }: { className?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(cartCount(readCart()));
    sync();
    return onCartChange(sync);
  }, []);

  return (
    <Link
      href="/cart"
      aria-label={count > 0 ? `Cart, ${count} items` : "Cart"}
      className={
        "relative grid h-9 w-9 place-items-center rounded-full text-[var(--foreground)] transition-colors hover:bg-[var(--surface-2)] " +
        (className ?? "")
      }
    >
      <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
      {count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-semibold leading-none text-white">
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Link>
  );
}
