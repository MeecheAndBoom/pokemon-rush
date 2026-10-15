"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { formatPrice } from "@/lib/product-meta";
import { cartSubtotal, clearCart, onCartChange, readCart, type CartLine } from "@/lib/cart-store";

type Method = {
  slug: string;
  label: string;
  description: string;
};

const inputClass =
  "mt-2 h-11 w-full rounded-lg border border-[var(--hairline)] bg-transparent px-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";
const labelClass = "text-[14px] text-[var(--ink-2)]";

export default function CheckoutPage() {
  const router = useRouter();
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [methods, setMethods] = useState<Method[]>([]);
  const [method, setMethod] = useState("bank-transfer");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const sync = () => setLines(readCart());
    sync();
    setReady(true);
    const off = onCartChange(sync);

    fetch("/api/payment-methods")
      .then((r) => r.json())
      .then((data: { methods: Method[] }) => {
        if (data.methods?.length) {
          setMethods(data.methods);
          setMethod((current) =>
            data.methods.some((m) => m.slug === current) ? current : data.methods[0].slug
          );
        }
      })
      .catch(() => {});

    return off;
  }, []);

  const subtotal = cartSubtotal(lines);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          notes: data.notes,
          paymentMethod: method,
          lines: lines.map((l) => ({
            slug: l.slug,
            name: l.name,
            price: l.price,
            quantity: l.quantity,
            image: l.image,
          })),
          shippingAddress: {
            name: data.name,
            line1: data.line1,
            line2: data.line2,
            city: data.city,
            region: data.region,
            postalCode: data.postalCode,
            country: data.country,
          },
        }),
      });

      const payload = await res.json();
      if (!res.ok || !payload.orderNumber) {
        throw new Error(payload.error || "Could not place order");
      }

      clearCart();
      router.push(`/checkout/success?order=${encodeURIComponent(payload.orderNumber)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  if (ready && lines.length === 0) {
    return (
      <div className="pt-14 pb-10 sm:pt-20">
        <Container size="narrow">
          <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[44px]">Checkout</h1>
          <p className="mt-6 text-[16px] text-[var(--ink-2)]">
            There is nothing to check out yet.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-[15px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.97]"
          >
            Browse the shop
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-14 pb-10 sm:pt-20">
      <Container>
        <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[44px]">Checkout</h1>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[var(--ink-2)]">
          No payment is taken on this site. After you place your order we email you an order
          reference, payment instructions, and shipping details.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-20"
        >
          <div className="min-w-0 space-y-12">
            <fieldset className="space-y-5">
              <legend className="text-[17px] font-semibold tracking-tight">Contact</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full name
                  </label>
                  <input id="name" name="name" required autoComplete="name" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="sm:max-w-[calc(50%-0.625rem)]">
                <label htmlFor="phone" className={labelClass}>
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  className={inputClass}
                />
              </div>
            </fieldset>

            <fieldset className="space-y-5">
              <legend className="text-[17px] font-semibold tracking-tight">
                Shipping address
              </legend>
              <div>
                <label htmlFor="line1" className={labelClass}>
                  Address
                </label>
                <input
                  id="line1"
                  name="line1"
                  required
                  autoComplete="address-line1"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="line2" className={labelClass}>
                  Apartment, suite, etc. (optional)
                </label>
                <input
                  id="line2"
                  name="line2"
                  autoComplete="address-line2"
                  className={inputClass}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label htmlFor="city" className={labelClass}>
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    required
                    autoComplete="address-level2"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="region" className={labelClass}>
                    State / region
                  </label>
                  <input
                    id="region"
                    name="region"
                    required
                    autoComplete="address-level1"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className={labelClass}>
                    Postal code
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    required
                    autoComplete="postal-code"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="sm:max-w-[calc(50%-0.625rem)]">
                <label htmlFor="country" className={labelClass}>
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  required
                  autoComplete="country-name"
                  className={inputClass}
                />
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-[17px] font-semibold tracking-tight">
                How would you like to pay?
              </legend>
              <div className="space-y-3">
                {methods.map((m) => (
                  <label
                    key={m.slug}
                    className={`flex cursor-pointer gap-4 rounded-xl border p-4 transition-colors ${
                      method === m.slug
                        ? "border-[var(--foreground)]"
                        : "border-[var(--hairline)] hover:border-[var(--ink-2)]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={m.slug}
                      checked={method === m.slug}
                      onChange={() => setMethod(m.slug)}
                      className="mt-1 accent-[var(--accent)]"
                    />
                    <span>
                      <span className="block text-[15px] font-medium">{m.label}</span>
                      <span className="mt-1 block text-[14px] leading-relaxed text-[var(--ink-2)]">
                        {m.description}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="space-y-5">
              <legend className="text-[17px] font-semibold tracking-tight">
                Order notes (optional)
              </legend>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className="w-full rounded-lg border border-[var(--hairline)] bg-transparent px-3 py-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </fieldset>
          </div>

          <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-[17px] font-semibold tracking-tight">Order summary</h2>
            <ul className="mt-5 space-y-4">
              {lines.map((line) => (
                <li key={line.slug} className="flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[var(--surface-2)]">
                    {line.image ? (
                      <Image
                        src={line.image}
                        alt={line.name}
                        fill
                        sizes="56px"
                        className="object-contain p-1"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-[14px] leading-snug">{line.name}</p>
                    <p className="text-[13px] text-[var(--ink-2)]">Qty {line.quantity}</p>
                  </div>
                  <p className="shrink-0 text-[14px] tabular-nums">
                    {formatPrice(line.price * line.quantity, line.currency)}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-3 border-t border-[var(--hairline)] pt-5 text-[15px]">
              <div className="flex justify-between">
                <dt className="text-[var(--ink-2)]">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--ink-2)]">Shipping</dt>
                <dd className="text-[var(--ink-2)]">Quoted after order</dd>
              </div>
            </dl>
            <div className="mt-5 flex justify-between border-t border-[var(--hairline)] pt-5 text-[17px]">
              <span>Total</span>
              <span className="tabular-nums">{formatPrice(subtotal)}</span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] text-[15px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.98] disabled:opacity-60"
            >
              {submitting ? "Placing order…" : "Place order"}
            </button>

            {error ? (
              <p aria-live="polite" className="mt-4 text-[14px] text-red-600">
                {error}
              </p>
            ) : null}

            <p className="mt-4 text-[13px] leading-relaxed text-[var(--ink-2)]">
              By placing an order you agree to our{" "}
              <Link href="/legal/terms" className="text-[var(--accent)] hover:opacity-70">
                terms
              </Link>{" "}
              and{" "}
              <Link href="/legal/privacy" className="text-[var(--accent)] hover:opacity-70">
                privacy policy
              </Link>
              .
            </p>
          </aside>
        </form>
      </Container>
    </div>
  );
}
