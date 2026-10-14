import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Wholesale",
  description:
    "Wholesale and bulk pricing on sealed Pokémon, One Piece, and Weiss Schwarz boxes and cases.",
};

export default function WholesalePage() {
  return (
    <div className="pt-14 pb-10 sm:pt-20">
      <Container size="narrow">
        <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">
          Wholesale & bulk
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-[var(--ink-2)]">
          We supply independent shops, card breakers, and event organisers with sealed product at
          volume pricing.
        </p>

        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-[18px] font-semibold tracking-tight">What we can supply</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[var(--ink-2)]">
              Booster boxes, booster bundles, Elite Trainer Boxes, and sealed cases across Pokémon,
              One Piece, and Weiss Schwarz, in both English and Japanese print runs where available.
            </p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold tracking-tight">How pricing works</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-[var(--ink-2)]">
              Wholesale pricing depends on quantity, product, and current market availability. Tell
              us what you need and we will send a quote with lead times. Minimum order quantities
              apply to some lines.
            </p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold tracking-tight">Tell us what you need</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-2)]">
              Include the products, quantities, and your delivery country so we can quote accurately.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <ContactForm
            type="wholesale"
            subjectLabel="Products, quantities, and delivery country"
            cta="Request a quote"
          />
        </div>
      </Container>
    </div>
  );
}
