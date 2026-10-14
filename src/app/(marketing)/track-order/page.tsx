"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Headphones, MapPin, PackageCheck, Truck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { formatPrice } from "@/lib/catalog";
import { media } from "@/lib/media";
import { site } from "@/lib/site";

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

const statusHelp = [
  { status: "pending", body: "We have your order but payment has not been confirmed yet." },
  { status: "confirmed", body: "Payment is confirmed and your order is queued for packing." },
  { status: "processing", body: "Your product is being picked, inspected, and packed." },
  { status: "shipped", body: "It has left us with a carrier and a tracking number." },
  { status: "delivered", body: "The carrier has recorded delivery at the address." },
];

const helpCards = [
  {
    icon: PackageCheck,
    title: "Order reference missing?",
    body: "Search the email address you used at checkout in your inbox for “Pokemon Rush”. If it is not there, it may have landed in spam.",
  },
  {
    icon: Truck,
    title: "Tracking not updating?",
    body: "Carrier scans can lag by 24–48 hours, especially in transit hubs. If there is no movement after three days, contact us.",
  },
  {
    icon: MapPin,
    title: "Wrong address?",
    body: "Contact us before the parcel is dispatched. Once it is with the carrier we can only raise an enquiry, not redirect it.",
  },
];

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
    <div className="pt-14 pb-16 sm:pt-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">
              Track an order
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[var(--ink-2)]">
              Enter the order reference from your confirmation email along with the email address
              you used at checkout. We will show you the items, the total, and the current status
              of your parcel.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[var(--surface-2)]">
            <Image
              src={media.section.storage}
              alt="Sealed trading card order"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>

      <Container size="narrow" className="mt-16">
        <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
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
                  <span>
                    {item.name}
                    <span className="text-[var(--ink-2)]"> × {item.quantity}</span>
                  </span>
                  <span className="tabular-nums">{formatPrice(item.lineTotal)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-baseline justify-between">
              <p className="text-[15px] text-[var(--ink-2)]">Order total</p>
              <p className="text-[20px] font-semibold tracking-tight tabular-nums">
                {formatPrice(result.total, result.currency)}
              </p>
            </div>

            {result.fulfillment?.trackingNumber ? (
              <p className="mt-6 text-[15px] text-[var(--ink-2)]">
                Tracking number: {result.fulfillment.trackingNumber}
                {result.fulfillment.carrier ? ` (${result.fulfillment.carrier})` : ""}
              </p>
            ) : null}
          </div>
        ) : null}
      </Container>

      <section className="mt-20 border-y border-[var(--hairline)] bg-[var(--tint-green)] py-16">
        <Container>
          <h2 className="text-[26px] font-semibold tracking-[-0.02em] sm:text-[32px]">
            What the statuses mean
          </h2>
          <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {statusHelp.map((item) => (
              <div key={item.status}>
                <dt className="text-[15px] font-semibold tracking-tight">
                  {statusLabels[item.status]}
                </dt>
                <dd className="mt-2 text-[14px] leading-relaxed text-[var(--ink-2)]">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Container>
        <section className="mt-16 grid gap-10 lg:grid-cols-3">
          {helpCards.map((card) => (
            <div key={card.title} className="border-t border-[var(--hairline)] pt-6">
              <card.icon className="h-5 w-5 text-[var(--accent)]" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="mt-4 text-[17px] font-semibold tracking-tight">{card.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">{card.body}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-3xl bg-[var(--surface-2)] p-8 sm:p-12">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-[var(--accent)]">
                <Headphones className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                <span className="text-[13px] font-medium tracking-tight">Human support</span>
              </div>
              <h2 className="mt-4 text-[24px] font-semibold tracking-[-0.02em] sm:text-[30px]">
                Still stuck?
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-[var(--ink-2)]">
                Call {site.phone} during {site.hours}, or send us the order reference and we will
                pick it up from there.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-[15px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.97]"
            >
              Contact us
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
