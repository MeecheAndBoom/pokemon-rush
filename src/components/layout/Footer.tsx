import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { footerNav } from "@/lib/site";
import { BRAND_LOGO_PATH } from "@/lib/brand";
import type { SiteSettings } from "@/lib/settings";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="mt-24 border-t border-[var(--hairline)] bg-[var(--surface-2)]">
      <Container size="wide" className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))]">
          <div>
            <Link href="/" aria-label={settings.name} className="inline-flex">
              <Image
                src={BRAND_LOGO_PATH}
                alt={settings.name}
                width={900}
                height={309}
                sizes="160px"
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-4 text-[15px] font-semibold tracking-tight">{settings.name}</p>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-[var(--ink-2)]">
              {settings.description}
            </p>
            <div className="mt-6 space-y-2.5 text-[13px] text-[var(--ink-2)]">
              <p className="flex items-center gap-2.5">
                <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <a href={settings.phoneHref} className="hover:text-[var(--foreground)]">
                  {settings.phone}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-[var(--foreground)]"
                >
                  {settings.email}
                </a>
              </p>
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <span>{settings.addressLine}</span>
              </p>
            </div>

            <NewsletterForm />
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <p className="text-[13px] font-semibold tracking-tight">{group.title}</p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-[var(--ink-2)] transition-colors hover:text-[var(--foreground)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--hairline)] pt-6 text-[12px] text-[var(--ink-2)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {settings.name}. All rights reserved.
          </p>
          <p>
            {settings.name} is an independent reseller and is not affiliated with Nintendo,
            Creatures, GAME FREAK, The Pokémon Company, Bandai, or Bushiroad.
          </p>
        </div>
      </Container>
    </footer>
  );
}
