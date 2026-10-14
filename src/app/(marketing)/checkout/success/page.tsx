import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Order received",
  robots: { index: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <div className="pt-20 pb-10 sm:pt-28">
      <Container size="narrow">
        <h1 className="text-[34px] font-semibold tracking-[-0.03em] sm:text-[44px]">
          Thank you. Your order is in.
        </h1>
        <p className="mt-6 text-[16px] leading-relaxed text-[var(--ink-2)]">
          We have emailed you a confirmation with your order reference, payment instructions, and
          shipping details. Orders are usually confirmed within one business day.
        </p>

        {order ? (
          <div className="mt-10 rounded-2xl bg-[var(--surface-2)] p-6">
            <p className="text-[14px] text-[var(--ink-2)]">Your order reference</p>
            <p className="mt-1 text-[22px] font-semibold tracking-tight tabular-nums">{order}</p>
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[16px]">
          <Link href="/shop" className="text-[var(--accent)] hover:opacity-70">
            Continue shopping
          </Link>
          <Link href="/track-order" className="text-[var(--accent)] hover:opacity-70">
            Track your order
          </Link>
        </div>
      </Container>
    </div>
  );
}
