import { Container } from "@/components/layout/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & delivery",
  description: "How orders are processed, packed, and shipped from Pokemon Rush.",
};

export default function ShippingPage() {
  return (
    <div className="pt-14 pb-10 sm:pt-20">
      <Container size="narrow">
        <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">Shipping & delivery</h1>
        <p className="mt-5 text-[16px] leading-relaxed text-[var(--ink-2)]">
          We process orders within one business day. Once your order is dispatched, tracking details
          are sent to the email address you provided at checkout. We pack every order to protect
          factory seals and corners during transit.
        </p>
        <div className="mt-10 space-y-6">
          <div>
            <h2 className="text-[18px] font-semibold tracking-tight">Delivery times</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-[var(--ink-2)]">
              Estimated delivery windows are provided at the time of dispatch. Times can vary slightly
              by region and carrier due to factors outside our control.
            </p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold tracking-tight">Shipping method & tracking</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-[var(--ink-2)]">
              Your shipping method and tracking link are sent along with your payment instructions
              after your order is placed, as noted in your confirmation email.
            </p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold tracking-tight">Damaged or missing parcels</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-[var(--ink-2)]">
              If your parcel arrives damaged, take clear photos of the packaging and the items and
              email them to us within 48 hours of delivery. We will work with you to resolve it as
              quickly as possible.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
