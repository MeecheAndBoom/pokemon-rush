import { Container } from "@/components/layout/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
  description: "Pokemon Rush sources factory-sealed Pokémon, One Piece, and Weiss Schwarz trading cards through official distribution.",
};

export default function AboutPage() {
  return (
    <div className="pt-14 pb-10 sm:pt-20">
      <Container size="narrow">
        <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">About us</h1>
        <p className="mt-5 text-[16px] leading-relaxed text-[var(--ink-2)]">
          Pokemon Rush is a collector-focused store supplying authentic, factory-sealed Pokémon TCG,
          One Piece Card Game, and Weiss Schwarz trading cards. We source through official
          distribution, inspect every item before dispatch, and keep the process simple and honest.
        </p>
        <p className="mt-5 text-[16px] leading-relaxed text-[var(--ink-2)]">
          Our aim is clear: stock releases collectors actually want, package them properly, and get
          them moving without unnecessary friction. Whether you are building a set, keeping product
          sealed, or ordering a case, we treat your order the way we would want our own handled.
        </p>
        <div className="mt-12 space-y-4">
          <h2 className="text-[20px] font-semibold tracking-tight">What we do</h2>
          <p className="text-[16px] leading-relaxed text-[var(--ink-2)]">
            We stock booster boxes, booster bundles, Elite Trainer Boxes, sealed cases, and carefully
            chosen accessories. We also take enquiries for specific releases and can advise on what
            is realistic based on current availability.
          </p>
        </div>
      </Container>
    </div>
  );
}
