"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { formatPrice } from "@/lib/catalog";

type TrackItem = {
  slug: string;
  name: string;
  quantity: number;
  lineTotal: number;
};

type TrackResult = {
  orderNumber: string;
  status: string;
  total: number;
  currency: string;
  items: TrackItem[];
  fulfillment?: { trackingNumber?: string; trackingUrl?: string; carrier?: string };
  paymentMethod?: { label?: string };
};

const inputClass =
  "mt-2 h-11 w-full rounded-lg border border-[var(--hairline)] bg-transparent px-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";

const statusLabels: Record<string, string> = {
  pending: "Awaiting confirmation",
  confirmed: "Confirmed",
  processing: "Being packed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

export default function TrackOrderPage() {
  const [result, setResult] = useState<TrackResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(
        `/api/track?orderNumber=${encodeURIComponent(
          data.orderNumber
        )}&email=${encodeURIComponent(data.email)}`
      );
      const payload = await res.json();
      if (!res.ok) {
        setError(payload.error || "We could not find that order.");
        return;
      }
      setResult(payload as TrackResult);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-14 pb-10 sm:pt-20">
      <Container size="narrow">
        <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">
          Track an order
        </h1>
        <p className="mt-5 text-[16px] leading-relaxed text-[var(--ink-2)]">
          Enter the order reference from your confirmation email along with the email address you
          used at checkout.
        </p>

        <form onSubmit={onSubmit} className="mt-10 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="orderNumber" className="text-[14px]">
              Order reference
            </label>
            <input
              id="orderNumber"
              name="orderNumber"
              required
              placeholder="PR-2026-123456"
              autoComplete="off"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-[14px]">
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
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-[15px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.97] disabled:opacity-60"
            >
              {loading ? "Looking…" : "Find my order"}
            </button>
          </div>
        </form>

        {error ? (
          <p aria-live="polite" className="mt-8 text-[15px] text-red-600">
            {error}
          </p>
        ) : null}

        {result ? (
          <div className="mt-12 border-t border-[var(--hairline)] pt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="text-[20px] font-semibold tracking-tight tabular-nums">
                {result.orderNumber}
              </p>
              <p className="text-[15px] text-[var(--ink-2)]">
                {statusLabels[result.status] ?? result.status}
              </p>
            </div>

            <ul className="mt-8 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
              {result.items.map((item) => (
                <li
                  key={item.slug}
                  className="flex items-center justify-between gap-4 py-4 text-[15px]"
                >
                  <span className="min-w-0 flex-1 leading-snug">
                    {item.name} <span className="text-[var(--ink-2)]">× {item.quantity}</span>
                  </span>
                  <span className="tabular-nums">
                    {formatPrice(item.lineTotal, result.currency)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-between text-[17px]">
              <span>Total</span>
              <span className="tabular-nums">{formatPrice(result.total, result.currency)}</span>
            </div>

            {result.fulfillment?.trackingNumber ? (
              <p className="mt-6 text-[15px] text-[var(--ink-2)]">
                Tracking number:{" "}
                <span className="text-[var(--foreground)] tabular-nums">
                  {result.fulfillment.trackingNumber}
                </span>
              </p>
            ) : null}
          </div>
        ) : null}
      </Container>
    </div>
  );
}
