import type { Metadata } from "next";
import Link from "next/link";
import {
  Archive,
  Boxes,
  CalendarClock,
  LifeBuoy,
  PackageSearch,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Sealed product sourcing, pre-orders, wholesale, inspection, and storage guidance from PokéStore Direct.",
};

const services = [
  {
    icon: PackageSearch,
    title: "Sealed product sourcing",
    body: "Looking for a set we do not list, a specific language, or a full sealed case? Tell us what you need and we will tell you what is realistically available, what it costs, and how long it takes.",
    href: "/talk-to-a-specialist",
    cta: "Request a product",
  },
  {
    icon: CalendarClock,
    title: "Pre-orders",
    body: "Reserve upcoming releases before they ship. If a manufacturer moves a release date, we contact you immediately and offer to hold, substitute, or refund your order.",
    href: "/shop",
    cta: "Browse pre-orders",
  },
  {
    icon: Boxes,
    title: "Wholesale & bulk",
    body: "Buying for a shop, a break, or an event? We quote volume pricing on booster boxes and cases based on quantity and current availability.",
    href: "/wholesale",
    cta: "Enquire about wholesale",
  },
  {
    icon: ShieldCheck,
    title: "Inspection & authentication",
    body: "Every order is inspected before dispatch. We check factory seals, corners, and edges, and we set aside anything that does not meet our standard rather than shipping it and explaining later.",
    href: "/about",
    cta: "How we work",
  },
  {
    icon: Archive,
    title: "Storage guidance",
    body: "Holding sealed product long term? We share practical guidance on light, humidity, stacking, and boxing so your product keeps its condition and its value.",
    href: "/blog",
    cta: "Read the guides",
  },
  {
    icon: LifeBuoy,
    title: "Order support",
    body: "Questions about an order in progress, a payment method, or a delivery window? Our support team answers within one business day.",
    href: "/support",
    cta: "Get support",
  },
];

export default async function ServicesPage() {
  const settings = await getSiteSettings();

  return (
    <div className="pt-14 pb-16 sm:pt-20">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">Services</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-[var(--ink-2)]">
            Beyond the shop, we help collectors and businesses source, verify, and hold sealed
            product. Everything below is handled by the same team that packs your order.
          </p>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="flex flex-col">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--surface-2)] text-[var(--accent)]">
                <service.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-[19px] font-semibold tracking-tight">{service.title}</h2>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[var(--ink-2)]">
                {service.body}
              </p>
              <Link
                href={service.href}
                className="mt-5 text-[15px] text-[var(--accent)] hover:opacity-70"
              >
                {service.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-24 border-t border-[var(--hairline)] pt-16">
          <h2 className="text-[24px] font-semibold tracking-[-0.02em] sm:text-[30px]">
            How a request works
          </h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "You tell us what you need",
                body: "A set, a language, a quantity, or a budget. The more specific, the faster we can give a firm answer.",
              },
              {
                step: "02",
                title: "We confirm availability",
                body: "We check stock and incoming allocations, then reply with pricing, condition notes, and a realistic timeline.",
              },
              {
                step: "03",
                title: "You approve, we pack",
                body: "Once you are happy we invoice, reserve the stock, and dispatch it packed to protect every corner and seal.",
              },
            ].map((item) => (
              <div key={item.step}>
                <p className="text-[13px] font-medium tracking-tight text-[var(--accent)]">
                  {item.step}
                </p>
                <h3 className="mt-3 text-[17px] font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-3xl bg-[var(--surface-2)] px-6 py-12 text-center sm:px-16">
          <h2 className="text-[22px] font-semibold tracking-tight sm:text-[26px]">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-[var(--ink-2)]">
            Send us a message or call. We will point you at the right set for your budget rather than
            the most expensive one on the shelf.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[16px]">
            <Link href="/talk-to-a-specialist" className="text-[var(--accent)] hover:opacity-70">
              Talk to a specialist
            </Link>
            <a href={settings.phoneHref} className="text-[var(--accent)] hover:opacity-70">
              {settings.phone}
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
