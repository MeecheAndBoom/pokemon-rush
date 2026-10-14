"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { formatPrice } from "@/lib/catalog";
import {
  cartSubtotal,
  onCartChange,
  readCart,
  removeLine,
  updateQuantity,
  type CartLine,
} from "@/lib/cart-store";

export default function CartPage() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setLines(readCart());
    sync();
    setReady(true);
    return onCartChange(sync);
  }, []);

  const subtotal = cartSubtotal(lines);

  return (
    <div className="pt-14 pb-10 sm:pt-20">
      <Container>
        <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">Cart</h1>

        {!ready ? null : lines.length === 0 ? (
          <div className="mt-12 max-w-md">
            <p className="text-[16px] leading-relaxed text-[var(--ink-2)]">
              Your cart is empty.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-[15px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.97]"
            >
              Browse the shop
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
            <ul className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
              {lines.map((line) => (
                <li key={line.slug} className="flex gap-5 py-6">
                  <Link
                    href={`/shop/product/${line.slug}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--surface-2)]"
                  >
                    {line.image ? (
                      <Image
                        src={line.image}
                        alt={line.name}
                        fill
                        sizes="96px"
                        className="object-contain p-2"
                      />
                    ) : null}
                  </Link>

                  <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div className="max-w-sm">
                      <Link
                        href={`/shop/product/${line.slug}`}
                        className="text-[15px] leading-snug tracking-tight hover:text-[var(--accent)]"
                      >
                        {line.name}
                      </Link>
                      <p className="mt-1 text-[14px] text-[var(--ink-2)]">
                        {formatPrice(line.price, line.currency)}
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center rounded-full border border-[var(--hairline)]">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${line.name}`}
                          onClick={() => updateQuantity(line.slug, line.quantity - 1)}
                          className="h-9 w-9 text-[16px] text-[var(--ink-2)] transition-colors hover:text-[var(--foreground)]"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-[15px] tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${line.name}`}
                          onClick={() => updateQuantity(line.slug, line.quantity + 1)}
                          className="h-9 w-9 text-[16px] text-[var(--ink-2)] transition-colors hover:text-[var(--foreground)]"
                        >
                          +
                        </button>
                      </div>
                      <p className="w-20 text-right text-[15px] tabular-nums">
                        {formatPrice(line.price * line.quantity, line.currency)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeLine(line.slug)}
                        className="text-[13px] text-[var(--ink-2)] underline-offset-4 transition-colors hover:text-[var(--foreground)] hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="text-[17px] font-semibold tracking-tight">Summary</h2>
              <dl className="mt-5 space-y-3 text-[15px]">
                <div className="flex justify-between">
                  <dt className="text-[var(--ink-2)]">Subtotal</dt>
                  <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--ink-2)]">Shipping</dt>
                  <dd className="text-[var(--ink-2)]">Calculated at dispatch</dd>
                </div>
              </dl>
              <div className="mt-5 flex justify-between border-t border-[var(--hairline)] pt-5 text-[17px]">
                <span>Total</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] text-[15px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.98]"
              >
                Checkout
              </Link>
              <Link
                href="/shop"
                className="mt-4 block text-center text-[14px] text-[var(--accent)] hover:opacity-70"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </Container>
    </div>
  );
}
