import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Clock,
  FileText,
  PackageCheck,
  Radio,
  ShieldCheck,
  Store,
  Ticket,
  Truck,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { FaqList } from "@/components/content/FaqList";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Wholesale",
  description:
    "Wholesale and bulk pricing on sealed Pokémon, One Piece, and Weiss Schwarz boxes and cases.",
};

const audiences = [
  {
    icon: Store,
    title: "Independent card shops",
    body: "Keep sealed product on the shelf without tying up cash in a full container. Restock in smaller, higher-frequency orders.",
  },
  {
    icon: Radio,
    title: "Breakers and streamers",
    body: "Predictable volume and honest descriptions of what is in the box, so a live break never turns into an apology.",
  },
  {
    icon: Ticket,
    title: "Events and organisers",
    body: "Prize support and sealed inventory for locals, regionals, and conventions, quoted against your schedule.",
  },
];

const canSupply = [
  "Sealed booster boxes",
  "Sealed cases",
  "Booster bundles",
  "Elite Trainer Boxes",
  "Trial decks",
  "Booster packs and sealed product",
];

const logistics = [
  { icon: FileText, label: "MOQ", value: "Typically 6–12 units, quoted per line" },
  { icon: Clock, label: "Lead time", value: "2–5 business days on stock lines" },
  { icon: Truck, label: "Shipping", value: "Pallet, case, or parcel, tracked" },
  { icon: ShieldCheck, label: "Condition", value: "Sealed and inspected before dispatch" },
];

const faqs = [
  {
    q: "What is the minimum order quantity?",
    a: "It depends on the product and print run. Most sealed booster-box lines start at 6–12 units, while cases and accessory lines can differ. Send us the lines you are interested in and we will quote the MOQ alongside the price.",
  },
  {
    q: "Do you offer terms to established trade accounts?",
    a: "This site does not take card payments or extend credit. We arrange payment terms directly with trade accounts where there is an ongoing relationship, and settlement details are agreed in writing before dispatch.",
  },
  {
    q: "Can you hold stock for a restock?",
    a: "Yes. If you know your cadence, we can reserve a recurring allocation of the lines you sell. Tell us your frequency and volume and we will confirm what we can set aside.",
  },
  {
    q: "How fast do orders ship?",
    a: "Stock lines usually leave within 2–5 business days of a confirmed order. Pre-orders and allocated product ship on or shortly after the official release date.",
  },
];

export default function WholesalePage() {
  return (
    <div className="pt-14 pb-16 sm:pt-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[13px] text-[var(--ink-2)]">Trade</p>
            <h1 className="mt-3 text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">
              Wholesale & bulk
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[var(--ink-2)]">
              We supply independent shops, card breakers, and event organisers with sealed product
              at volume pricing. Tell us what you sell and how much you turn over, and we will build
              a supply plan around it.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[17px]">
              <a href="#wholesale-form" className="text-[var(--accent)] hover:opacity-70">
                Request a quote
              </a>
              <Link href="/shop" className="text-[var(--accent)] hover:opacity-70">
                Browse the range
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[var(--surface-2)]">
            <Image
              src={media.section.storage}
              alt="Sealed trading card stock"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-10"
            />
          </div>
        </div>
      </Container>

      <section className="mt-20 border-y border-[var(--hairline)] bg-[var(--tint-blue)] py-16 sm:py-20">
        <Container>
          <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[34px]">
            Who we supply
          </h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {audiences.map((item) => (
              <div key={item.title}>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--background)] text-[var(--accent)]">
                  <item.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-[17px] font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container>
        <section className="mt-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[34px]">
                What we can supply
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-[var(--ink-2)]">
                Sealed product across Pokémon, One Piece, and Weiss Schwarz, in English and Japanese
                print runs where available. If a line is not listed, ask — we source to order.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {canSupply.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-[var(--ink-2)]">
                    <PackageCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success)]"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[var(--surface-2)]">
              <Image
                src={media.section.shipping}
                alt="Packing sealed card orders"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[34px]">
            How pricing works
          </h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Tell us the lines",
                body: "Products, quantities, and the countries you deliver to. Even a rough range helps.",
              },
              {
                step: "02",
                title: "We quote",
                body: "Unit pricing based on quantity and current market availability, plus MOQ and lead times per line.",
              },
              {
                step: "03",
                title: "We supply",
                body: "Confirm the order and we pick, inspect, and dispatch with tracking. Restocks can be scheduled.",
              },
            ].map((item) => (
              <div key={item.step} className="border-t border-[var(--hairline)] pt-6">
                <p className="text-[13px] font-medium tabular-nums text-[var(--accent)]">
                  {item.step}
                </p>
                <h3 className="mt-4 text-[17px] font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="grid gap-6 rounded-3xl bg-[var(--surface-2)] p-6 sm:grid-cols-2 sm:p-10 lg:grid-cols-4">
            {logistics.map((item) => (
              <div key={item.label}>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--background)] text-[var(--accent)]">
                  <item.icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <p className="mt-4 text-[13px] uppercase tracking-[0.08em] text-[var(--ink-2)]">
                  {item.label}
                </p>
                <p className="mt-1.5 text-[15px] leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="wholesale-form" className="mt-20 scroll-mt-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[34px]">
                Tell us what you need
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-[var(--ink-2)]">
                Include the products, quantities, and your delivery country so we can quote
                accurately. If you have an existing price list from a supplier, mention it and we
                will tell you honestly whether we can beat it.
              </p>
              <p className="mt-6 text-[14px] text-[var(--ink-2)]">
                A single sending address, and a person who can answer follow-ups, is usually all we
                need to start.
              </p>
            </div>
            <ContactForm
              type="wholesale"
              subjectLabel="Business name, products, quantities, and delivery country"
              cta="Request a quote"
            />
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[34px]">
            Wholesale questions
          </h2>
          <div className="mt-8">
            <FaqList items={faqs} />
          </div>
        </section>
      </Container>
    </div>
  );
}
