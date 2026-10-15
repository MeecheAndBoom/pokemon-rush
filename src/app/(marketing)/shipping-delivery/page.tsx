import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo";
import { Clock, Globe, PackageCheck, ShieldAlert, Truck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = seoMetadata("/shipping-delivery");

const sections = [
  {
    icon: Clock,
    title: "Processing and dispatch",
    body: "Orders are picked, checked, and packed within one business day of payment confirmation. Orders placed on weekends or public holidays are processed on the next business day. If anything about your order needs confirming before it can ship, we email you rather than guessing.",
  },
  {
    icon: PackageCheck,
    title: "How we pack",
    body: "Sealed product is wrapped and placed in a rigid outer carton with void fill so nothing shifts in transit. Corners, factory seals, and shrink wrap are protected first, because those are the parts collectors care about. Multiple boxes ship in a single reinforced parcel wherever it is safe to do so.",
  },
  {
    icon: Truck,
    title: "Tracking and delivery windows",
    body: "Your shipping method, cost, and a tracking link are sent with your payment instructions once your order is placed. Estimated delivery windows depend on your region and the service selected. Carrier scans can take a day or two to update after handover, especially at international transfer points.",
  },
  {
    icon: Globe,
    title: "International orders and customs",
    body: "We ship internationally. Any import duties, taxes, or customs handling fees charged by your country are the responsibility of the recipient and are not included in the price or shipping cost. We declare orders accurately and cannot mark parcels as gifts or undervalue them.",
  },
  {
    icon: ShieldAlert,
    title: "Damaged, delayed, or missing parcels",
    body: "If a parcel arrives damaged, photograph the outer packaging and the product before opening anything further, then email us within 48 hours of delivery. If tracking has not moved for several business days, contact us with your order reference and we will chase it with the carrier.",
  },
];

export default async function ShippingPage() {
  const settings = await getSiteSettings();

  return (
    <div className="pt-14 pb-16 sm:pt-20">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">
            Shipping & delivery
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-[var(--ink-2)]">
            We process orders within one business day, pack every parcel to protect factory seals and
            corners, and email tracking as soon as your order is on its way.
          </p>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title}>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--surface-2)] text-[var(--accent)]">
                <section.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-[19px] font-semibold tracking-tight">{section.title}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">{section.body}</p>
            </div>
          ))}
          <div className="rounded-3xl bg-[var(--surface-2)] p-8">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--background)] text-[var(--accent)]">
              <Globe className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-[19px] font-semibold tracking-tight">Need a delivery estimate?</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">
              Tell us your address and what you are ordering and we will give you the fastest and
              most economical options we can offer. Call {settings.phone} or email {settings.email}.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
