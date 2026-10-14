import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Talk to a specialist",
  description:
    "Speak with someone who knows sealed trading cards. Ask about specific sets, cases, pre-orders, or sourcing.",
};

export default function SpecialistPage() {
  return (
    <div className="pt-14 pb-10 sm:pt-20">
      <Container size="narrow">
        <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">
          Talk to a specialist
        </h1>
        <p className="mt-5 text-[16px] leading-relaxed text-[var(--ink-2)]">
          Tell us what you are looking for and we will give you a straight answer — what is
          available, what it costs, and how long it takes. No scripts, no pressure.
        </p>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[16px]">
          <a href="tel:+13133649615" className="text-[var(--accent)] hover:opacity-70">
            (313) 364-9615
          </a>
          <a href="mailto:sales@pokemonrush.com" className="text-[var(--accent)] hover:opacity-70">
            sales@pokemonrush.com
          </a>
        </div>

        <div className="mt-12">
          <ContactForm
            type="specialist"
            subjectLabel="What are you looking for?"
            cta="Send to a specialist"
          />
        </div>
      </Container>
    </div>
  );
}
