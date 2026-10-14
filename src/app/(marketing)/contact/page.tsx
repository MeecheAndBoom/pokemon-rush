import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Pokemon Rush about an order, a release, or wholesale.",
};

const channels = [
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: site.phoneHref,
    note: site.hours,
  },
  {
    icon: Mail,
    label: "Support",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Order questions, returns, and delivery.",
  },
  {
    icon: Mail,
    label: "Sales & wholesale",
    value: site.salesEmail,
    href: `mailto:${site.salesEmail}`,
    note: "Sourcing requests, bulk pricing, and partnerships.",
  },
  {
    icon: MapPin,
    label: "Address",
    value: `${site.address.line1}, ${site.address.city}`,
    note: site.address.country,
  },
];

export default function ContactPage() {
  return (
    <div className="pt-14 pb-16 sm:pt-20">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">Contact</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-[var(--ink-2)]">
            Have a question about an order, a specific release, or wholesale? Send us a message and a
            person on our team will reply within one business day. If it is urgent, the phone is
            fastest during opening hours.
          </p>
        </div>

        <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel) => (
            <div key={`${channel.label}-${channel.value}`}>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--surface-2)] text-[var(--accent)]">
                <channel.icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <dt className="mt-4 text-[13px] font-medium tracking-tight text-[var(--ink-2)]">
                {channel.label}
              </dt>
              <dd className="mt-1.5 text-[15px] leading-relaxed">
                {channel.href ? (
                  <a href={channel.href} className="text-[var(--accent)] hover:opacity-70">
                    {channel.value}
                  </a>
                ) : (
                  channel.value
                )}
                {channel.note ? (
                  <p className="mt-1 text-[13px] text-[var(--ink-2)]">{channel.note}</p>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid gap-12 border-t border-[var(--hairline)] pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="text-[22px] font-semibold tracking-tight">Before you write</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-2)]">
              Including a few details helps us answer in one reply instead of three.
            </p>
            <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-[var(--ink-2)]">
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" strokeWidth={1.75} />
                <span>
                  <span className="text-[var(--foreground)]">Order questions:</span> include your
                  order reference and the email you used at checkout.
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" strokeWidth={1.75} />
                <span>
                  <span className="text-[var(--foreground)]">Damaged parcels:</span> attach photos of
                  the outer box, the inner packaging, and the product.
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" strokeWidth={1.75} />
                <span>
                  <span className="text-[var(--foreground)]">Sourcing requests:</span> tell us the
                  set, language, quantity, and your budget if you have one.
                </span>
              </li>
            </ul>
          </div>

          <div>
            <ContactForm type="contact" />
          </div>
        </div>
      </Container>
    </div>
  );
}
