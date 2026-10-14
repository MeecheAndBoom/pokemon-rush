import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Finance disclosure",
  description:
    "How payment works at Pokemon Rush, and what we do and do not offer in terms of credit and finance.",
};

export default function FinanceDisclosurePage() {
  return (
    <div className="pt-14 pb-10 sm:pt-20">
      <Container size="narrow">
        <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">
          Finance disclosure
        </h1>
        <p className="mt-5 text-[16px] leading-relaxed text-[var(--ink-2)]">
          This page explains how payment works at Pokemon Rush and the limits of what we offer. It
          should be read together with our Terms & conditions.
        </p>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-[18px] font-semibold tracking-tight">We do not offer credit</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-[var(--ink-2)]">
              Pokemon Rush does not offer credit, loans, instalment plans, buy-now-pay-later
              products, or any form of financing. We do not charge interest of any kind. We are a
              retailer, not a lender, and we are not authorised to provide credit.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-tight">
              No card payments are taken on this site
            </h2>
            <p className="mt-2 text-[16px] leading-relaxed text-[var(--ink-2)]">
              This site does not operate a payment gateway and does not process card payments. When
              you place an order, we email you an order reference and payment instructions for the
              method you selected. Payment is completed separately through the provider for that
              method, under that provider&rsquo;s own terms.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-tight">Payment methods</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-[var(--ink-2)]">
              Available methods are shown at checkout and may change. Depending on your location
              these can include bank transfer, a payment provider invoice, or cryptocurrency. Each
              method is subject to the availability and rules of the provider that operates it,
              including any fees that provider may charge.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-tight">Currency and conversion</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-[var(--ink-2)]">
              Prices are displayed in the currency shown on the product page and at checkout.
              Amounts may be shown in additional currencies for convenience only and are not a
              locked exchange rate. Where a payment is made in a different currency to the one
              displayed, your bank or payment provider may apply its own exchange rate and fees,
              which we do not control and cannot refund.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-tight">Duties and taxes</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-[var(--ink-2)]">
              Prices do not include import duties, taxes, or customs fees that may be charged in your
              jurisdiction. These are your responsibility and are collected by the relevant authority
              or carrier, not by us.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-tight">Refunds</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-[var(--ink-2)]">
              Approved refunds are returned using the original payment method. Timings depend on the
              provider and can take 5&ndash;10 business days to appear. Refunds are issued in the
              currency you paid, and we are not responsible for exchange rate differences between
              the time of payment and the time of refund.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-tight">Questions</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-[var(--ink-2)]">
              Email <a href="mailto:support@pokemonrush.com" className="text-[var(--accent)] hover:opacity-70">support@pokemonrush.com</a> or call (313) 364-9615. You can also read our{" "}
              <a href="/legal/terms" className="text-[var(--accent)] hover:opacity-70">
                Terms &amp; conditions
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
