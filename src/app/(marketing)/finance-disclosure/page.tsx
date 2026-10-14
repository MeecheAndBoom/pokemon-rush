import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, Globe, Landmark, ShieldCheck, Wallet } from "lucide-react";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Finance disclosure",
  description:
    "How payment works at Pokemon Rush, and what we do and do not offer in terms of credit and finance.",
};

const atAGlance = [
  {
    icon: ShieldCheck,
    title: "We do not offer credit",
    body: "No loans, no instalments, no buy-now-pay-later, no interest of any kind.",
  },
  {
    icon: CreditCard,
    title: "This site takes no card details",
    body: "There is no payment gateway here. We do not process card payments on this website.",
  },
  {
    icon: Wallet,
    title: "You choose a payment method",
    body: "Available methods are shown at checkout and arranged through the provider for that method.",
  },
  {
    icon: Globe,
    title: "Duties and taxes are separate",
    body: "Import charges are set by your jurisdiction and are not included in our prices.",
  },
];

const flow = [
  {
    step: "01",
    title: "You place the order",
    body: "Checkout captures what you want and where it goes. No card information is entered or stored on this site.",
  },
  {
    step: "02",
    title: "We send payment instructions",
    body: "You receive an order reference and the payment details for the method you selected, by email.",
  },
  {
    step: "03",
    title: "We confirm and ship",
    body: "Once payment is received and verified, we pick, inspect, pack, and dispatch your order with tracking.",
  },
];

export default function FinanceDisclosurePage() {
  return (
    <div className="pt-14 pb-16 sm:pt-20">
      <Container size="narrow">
        <p className="text-[13px] text-[var(--ink-2)]">Legal</p>
        <h1 className="mt-3 text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">
          Finance disclosure
        </h1>
        <p className="mt-5 text-[16px] leading-relaxed text-[var(--ink-2)]">
          This page explains how payment works at Pokemon Rush and the limits of what we offer. It
          should be read together with our{" "}
          <Link href="/legal/terms" className="text-[var(--accent)] hover:opacity-70">
            Terms &amp; conditions
          </Link>
          .
        </p>
      </Container>

      <Container className="mt-14">
        <h2 className="text-[24px] font-semibold tracking-[-0.02em]">Payment at a glance</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {atAGlance.map((item) => (
            <div key={item.title} className="border-t border-[var(--hairline)] pt-6">
              <item.icon className="h-5 w-5 text-[var(--accent)]" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="mt-4 text-[16px] font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-[var(--ink-2)]">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container size="narrow">
        <div className="mt-16 space-y-10">
          <section>
            <h2 className="text-[20px] font-semibold tracking-tight">We do not offer credit</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[var(--ink-2)]">
              Pokemon Rush does not offer credit, loans, instalment plans, buy-now-pay-later
              products, or any form of financing. We do not charge interest of any kind. We are a
              retailer, not a lender, and we are not authorised to provide credit.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold tracking-tight">
              No card payments are taken on this site
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[var(--ink-2)]">
              This site does not operate a payment gateway and does not process card payments. When
              you place an order, we email you an order reference and payment instructions for the
              method you selected. Payment is completed separately through the provider for that
              method, under that provider&rsquo;s own terms.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold tracking-tight">Payment methods</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[var(--ink-2)]">
              Available methods are shown at checkout and may change. Depending on your location
              these can include bank transfer, a payment provider invoice, or cryptocurrency. Each
              method is subject to the availability and rules of the provider that operates it,
              including any fees that provider may charge.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold tracking-tight">Currency and conversion</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[var(--ink-2)]">
              Prices are displayed in the currency shown on the product page and at checkout.
              Amounts may be shown in additional currencies for convenience only and are not a
              locked exchange rate. Where a payment is made in a different currency to the one
              displayed, your bank or payment provider may apply its own exchange rate and fees,
              which we do not control and cannot refund.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold tracking-tight">Duties and taxes</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[var(--ink-2)]">
              Prices do not include import duties, taxes, or customs fees that may be charged in your
              jurisdiction. These are your responsibility and are collected by the relevant authority
              or carrier, not by us.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold tracking-tight">Refunds</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[var(--ink-2)]">
              Approved refunds are returned using the original payment method. Timings depend on the
              provider and can take 5&ndash;10 business days to appear. Refunds are issued in the
              currency you paid, and we are not responsible for exchange rate differences between the
              time of payment and the time of refund.
            </p>
          </section>
        </div>
      </Container>

      <section className="mt-20 border-y border-[var(--hairline)] bg-[var(--tint-yellow)] py-16">
        <Container>
          <h2 className="text-[26px] font-semibold tracking-[-0.02em] sm:text-[32px]">
            How payment works, step by step
          </h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {flow.map((item) => (
              <div key={item.step}>
                <p className="text-[13px] font-medium tabular-nums text-[var(--accent)]">
                  {item.step}
                </p>
                <h3 className="mt-3 text-[17px] font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container size="narrow">
        <section className="mt-16 flex items-start gap-4 rounded-3xl bg-[var(--surface-2)] p-8">
          <Landmark className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.75} aria-hidden="true" />
          <div>
            <h2 className="text-[18px] font-semibold tracking-tight">Questions about payment</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-[var(--ink-2)]">
              Email{" "}
              <a href="mailto:support@pokemonrush.com" className="text-[var(--accent)] hover:opacity-70">
                support@pokemonrush.com
              </a>{" "}
              or call (313) 364-9615. The same details are in our{" "}
              <Link href="/legal/terms" className="text-[var(--accent)] hover:opacity-70">
                Terms &amp; conditions
              </Link>
              .
            </p>
          </div>
        </section>
      </Container>
    </div>
  );
}
