import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Pokemon Rush about an order, a release, or wholesale.",
};

export default function ContactPage() {
  return (
    <div className="pt-14 pb-10 sm:pt-20">
      <Container size="narrow">
        <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">Contact</h1>
        <p className="mt-5 text-[16px] leading-relaxed text-[var(--ink-2)]">
          Have a question about an order, a specific release, or wholesale? Send us a message and we
          will reply within one business day.
        </p>

        <dl className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <dt className="text-[15px] font-semibold tracking-tight">Phone</dt>
            <dd className="mt-2 text-[16px] text-[var(--ink-2)]">
              <a href="tel:+13133649615" className="text-[var(--accent)] hover:opacity-70">
                (313) 364-9615
              </a>
              <p className="mt-1 text-[14px]">Monday to Friday, 9am – 6pm (EST)</p>
            </dd>
          </div>
          <div>
            <dt className="text-[15px] font-semibold tracking-tight">Email</dt>
            <dd className="mt-2 text-[16px] text-[var(--ink-2)]">
              <a href="mailto:support@pokemonrush.com" className="text-[var(--accent)] hover:opacity-70">
                support@pokemonrush.com
              </a>
            </dd>
          </div>
        </dl>

        <div className="mt-14">
          <ContactForm type="contact" />
        </div>
      </Container>
    </div>
  );
}
