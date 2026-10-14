import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Sealed product sourcing, pre-orders, wholesale, and inspection services from Pokemon Rush.",
};

const services = [
  {
    title: "Sealed product sourcing",
    body: "Looking for a set we do not list, a specific language, or a full sealed case? Tell us what you need and we will tell you what is realistically available, what it costs, and how long it takes.",
    href: "/talk-to-a-specialist",
    cta: "Request a product",
  },
  {
    title: "Pre-orders",
    body: "Reserve upcoming releases before they ship. If a manufacturer moves a release date, we contact you immediately and offer to hold, substitute, or refund your order.",
    href: "/shop",
    cta: "Browse pre-orders",
  },
  {
    title: "Wholesale & bulk",
    body: "Buying for a shop, a break, or an event? We quote volume pricing on booster boxes and cases based on quantity and current availability.",
    href: "/wholesale",
    cta: "Enquire about wholesale",
  },
  {
    title: "Inspection & authentication",
    body: "Every order is inspected before dispatch. We check factory seals, corners, and edges, and we set aside anything that does not meet our standard rather than shipping it and explaining later.",
    href: "/about",
    cta: "How we work",
  },
  {
    title: "Storage guidance",
    body: "Holding sealed product long term? We share practical guidance on light, humidity, stacking, and boxing so your product keeps its condition and its value.",
    href: "/blog",
    cta: "Read the guides",
  },
  {
    title: "Order support",
    body: "Questions about an order in progress, a payment method, or a delivery window? Our support team answers within one business day.",
    href: "/support",
    cta: "Get support",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-14 pb-10 sm:pt-20">
      <Container>
        <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">Services</h1>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[var(--ink-2)]">
          Beyond the shop, we help collectors and businesses source, verify, and hold sealed
          product.
        </p>

        <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="flex flex-col">
              <h2 className="text-[19px] font-semibold tracking-tight">{service.title}</h2>
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
      </Container>
    </div>
  );
}
