import type { Metadata } from "next";
import { BadgeCheck, Boxes, PackageSearch, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Talk to a specialist",
  description:
    "Speak with someone who knows sealed trading cards. Ask about specific sets, cases, pre-orders, or sourcing.",
};

const help = [
  {
    icon: PackageSearch,
    title: "Sourcing a specific release",
    body: "A set, a language, or a variant we do not list. We will tell you plainly whether we can get it and how long it takes.",
  },
  {
    icon: Boxes,
    title: "Bulk and wholesale pricing",
    body: "Buying for a shop, a break, or an event? We quote volume pricing on boxes and cases based on quantity.",
  },
  {
    icon: BadgeCheck,
    title: "Condition and authenticity",
    body: "Questions about seals, corners, printings, or how to hold product long term. We answer like collectors, not salespeople.",
  },
];

export default function SpecialistPage() {
  return (
    <div className="pt-14 pb-16 sm:pt-20">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">
            Talk to a specialist
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-[var(--ink-2)]">
            Tell us what you are looking for and we will give you a straight answer — what is
            available, what it costs, and how long it takes. No scripts, no pressure, and no pushing
            you toward the most expensive box on the shelf.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[16px]">
            <a href={site.phoneHref} className="text-[var(--accent)] hover:opacity-70">
              {site.phone}
            </a>
            <a href={`mailto:${site.salesEmail}`} className="text-[var(--accent)] hover:opacity-70">
              {site.salesEmail}
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-[22px] font-semibold tracking-tight">What we can help with</h2>
            <ul className="mt-8 space-y-7">
              {help.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--surface-2)] text-[var(--accent)]">
                    <item.icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[16px] font-semibold tracking-tight">{item.title}</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--ink-2)]">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
              <li className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--surface-2)] text-[var(--accent)]">
                  <ShieldCheck className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[16px] font-semibold tracking-tight">
                    Choosing between sets
                  </p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--ink-2)]">
                    Tell us your budget and what you want from the product, and we will point you at
                    the right one rather than the priciest.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-[var(--surface-2)] p-8 sm:p-10">
            <h2 className="text-[19px] font-semibold tracking-tight">Send us the details</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">
              The more you tell us, the more precise our answer. We reply within one business day.
            </p>
            <div className="mt-8">
              <ContactForm
                type="specialist"
                subjectLabel="What are you looking for?"
                cta="Send to a specialist"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
