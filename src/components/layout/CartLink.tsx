"use client";

import { useEffect, useState } from "react";
import { cartCount, onCartChange, readCart } from "@/lib/cart-store";

export function CartLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(cartCount(readCart()));
    sync();
    return onCartChange(sync);
  }, []);

  return (
    <a href="/cart" className="text-[14px] tracking-tight text-[var(--foreground)]">
      Cart{count > 0 ? ` (${count})` : ""}
    </a>
  );
}
