import { Container } from "@/components/layout/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & refunds",
  description: "Our return policy for factory-sealed trading cards.",
};

export default function ReturnsPage() {
  return (
    <div className="pt-14 pb-10 sm:pt-20">
      <Container size="narrow">
        <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">Returns & refunds</h1>
        <p className="mt-5 text-[16px] leading-relaxed text-[var(--ink-2)]">
          All items are factory-sealed and inspected before dispatch. Due to the collectible nature
          of trading cards, we only accept returns under specific conditions.
        </p>

        <div className="mt-10 space-y-6">
          <div>
            <h2 className="text-[18px] font-semibold tracking-tight">Eligible returns</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-[var(--ink-2)]">
              You may request a return within 7 days of delivery if you received the wrong item, your
              item arrived damaged, the seal was broken on arrival, or the item was not as described.
              You must contact us before sending anything back and include clear photos.
            </p>
          </div>

          <div>
            <h2 className="text-[18px] font-semibold tracking-tight">Non-returnable items</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-[var(--ink-2)]">
              We do not accept returns on opened products, cards pulled from sealed products, products
              returned outside the 7-day window, or items returned without prior authorisation.
              Pre-order items cannot be cancelled or returned once dispatched.
            </p>
          </div>

          <div>
            <h2 className="text-[18px] font-semibold tracking-tight">Exchanges & refunds</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-[var(--ink-2)]">
              Approved exchanges are subject to availability. Approved refunds are issued to the
              original payment method within 5–10 business days after inspection. Return shipping is
              covered when the return is due to our error.
            </p>
          </div>

          <div>
            <h2 className="text-[18px] font-semibold tracking-tight">How to request a return</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-[var(--ink-2)]">
              Email <a href="mailto:support@pokemonrush.com" className="text-[var(--accent)] hover:opacity-70">support@pokemonrush.com</a> with your order number, a description of the issue, and photos of the item
              and packaging. We will respond within 24–48 hours with next steps.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
