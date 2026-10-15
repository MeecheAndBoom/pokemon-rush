import type { Metadata } from "next";
import { CheckCircle2, FileText, PackageCheck, RotateCcw, XCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Returns & refunds",
  description: "Our return policy for factory-sealed trading cards.",
};

const eligible = [
  "You received the wrong item or the wrong quantity.",
  "The item arrived damaged in transit.",
  "The factory seal was already broken when it arrived.",
  "The item is materially different from its listing or description.",
];

const notEligible = [
  "Products that have been opened or unsealed by you.",
  "Individual cards removed from a sealed product.",
  "Orders returned after the 7-day window.",
  "Items sent back without prior authorisation.",
  "Pre-order items once they have been dispatched.",
];

export default async function ReturnsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="pt-14 pb-16 sm:pt-20">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">
            Returns & refunds
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-[var(--ink-2)]">
            All items are factory-sealed and inspected before dispatch. Because trading cards are
            collectible and cannot be verified once opened, our return policy is deliberately narrow.
            We will always make right anything that is our fault.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-[var(--hairline)] p-8">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--surface-2)] text-[var(--accent)]">
              <CheckCircle2 className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-[19px] font-semibold tracking-tight">Eligible for a return</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[var(--ink-2)]">
              {eligible.map((item) => (
                <li key={item} className="flex gap-3">
                  <RotateCcw className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--accent)]" strokeWidth={2} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13px] leading-relaxed text-[var(--ink-2)]">
              Requests must be made within 7 days of delivery and approved before anything is sent
              back.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--hairline)] p-8">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--surface-2)] text-[var(--ink-2)]">
              <XCircle className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-[19px] font-semibold tracking-tight">Not returnable</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[var(--ink-2)]">
              {notEligible.map((item) => (
                <li key={item} className="flex gap-3">
                  <XCircle className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--ink-2)]" strokeWidth={2} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 border-t border-[var(--hairline)] pt-14">
          <h2 className="text-[24px] font-semibold tracking-[-0.02em] sm:text-[30px]">
            How to start a return
          </h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Contact us first",
                body: `Email ${settings.email} with your order number, a description of the issue, and photos of the item and packaging.`,
              },
              {
                step: "02",
                title: "We review it",
                body: "We respond within 24–48 hours with a decision and, if approved, the return address and instructions.",
              },
              {
                step: "03",
                title: "Send it back",
                body: "Return the item in its original packaging, securely boxed, within the window we confirm.",
              },
              {
                step: "04",
                title: "Refund or replace",
                body: "Approved refunds are issued to the original payment method within 5–10 business days of inspection.",
              },
            ].map((item) => (
              <div key={item.step}>
                <p className="text-[13px] font-medium tracking-tight text-[var(--accent)]">
                  {item.step}
                </p>
                <h3 className="mt-3 text-[17px] font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-8 rounded-3xl bg-[var(--surface-2)] p-8 sm:p-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--background)] text-[var(--accent)]">
              <PackageCheck className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-[19px] font-semibold tracking-tight">Who pays return shipping</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">
              When the return is due to our error — a wrong, damaged, or misdescribed item — we cover
              return shipping. For any other approved return, return shipping is paid by you.
            </p>
          </div>
          <div>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--background)] text-[var(--accent)]">
              <FileText className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-[19px] font-semibold tracking-tight">Refused and undeliverable parcels</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">
              Parcels refused at delivery or returned as undeliverable are subject to the original
              shipping cost and any carrier fees. We will contact you to arrange redelivery or a
              refund of the product value once the parcel is back with us.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
