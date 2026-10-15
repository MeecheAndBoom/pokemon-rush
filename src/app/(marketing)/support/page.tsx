import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { supportFaqs } from "@/data/faq";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = seoMetadata("/support");

export default function SupportPage() {
  return (
    <div className="pt-14 pb-10 sm:pt-20">
      <JsonLd data={faqJsonLd(supportFaqs)} />
      <Container size="narrow">
        <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">Support</h1>
        <p className="mt-4 text-[16px] leading-relaxed text-[var(--ink-2)]">
          Most questions are answered below. If yours is not, send us a message and we will reply
          within one business day.
        </p>

        <dl className="mt-14 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          {supportFaqs.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[16px] font-medium">
                {item.q}
                <span
                  aria-hidden="true"
                  className="text-[20px] leading-none text-[var(--ink-2)] transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pt-4 text-[15px] leading-relaxed text-[var(--ink-2)]">
                {item.a}
              </p>
            </details>
          ))}
        </dl>

        <div className="mt-16">
          <h2 className="text-[22px] font-semibold tracking-tight">Still need help?</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">
            Send us the details and we will pick it up. You can also read our{" "}
            <Link href="/shipping-delivery" className="text-[var(--accent)] hover:opacity-70">
              shipping
            </Link>{" "}
            and{" "}
            <Link href="/returns-refunds" className="text-[var(--accent)] hover:opacity-70">
              returns
            </Link>{" "}
            policies.
          </p>
          <div className="mt-8">
            <ContactForm type="support" subjectLabel="How can we help?" cta="Contact support" />
          </div>
        </div>
      </Container>
    </div>
  );
}
