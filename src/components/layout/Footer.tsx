import Link from "next/link";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { footerNav, site } from "@/lib/site";

const trustedResources = [
  { label: "Official Pokémon", href: "https://www.pokemon.com/" },
  { label: "Pokémon TCG", href: "https://tcg.pokemon.com/" },
  { label: "PSA grading", href: "https://www.psacard.com/" },
  { label: "Beckett grading", href: "https://www.beckett.com/grading" },
  { label: "CGC Cards", href: "https://www.cgccards.com/" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--hairline)] bg-[var(--surface-2)]">
      <Container size="wide" className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <p className="text-[15px] font-semibold tracking-tight">{site.name}</p>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-[var(--ink-2)]">
              {site.description}
            </p>
            <div className="mt-6 space-y-2.5 text-[13px] text-[var(--ink-2)]">
              <p className="flex items-center gap-2.5">
                <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <a href={site.phoneHref} className="hover:text-[var(--foreground)]">
                  {site.phone}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-[var(--foreground)]"
                >
                  {site.email}
                </a>
              </p>
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <span>
                  {site.address.line1}, {site.address.city}
                </span>
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

        <div className="mt-14 border-t border-[var(--hairline)] pt-8">
          <p className="text-[13px] font-semibold tracking-tight">Trusted resources</p>
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[var(--ink-2)]">
            The places we point collectors to for sets, grading, and authentication. We do not
            control these sites and a link is not an endorsement.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {trustedResources.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] text-[var(--ink-2)] transition-colors hover:text-[var(--foreground)]"
                >
                  {item.label}
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>


        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--hairline)] pt-6 text-[12px] text-[var(--ink-2)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            {site.name} is an independent reseller and is not affiliated with Nintendo,
            Creatures, GAME FREAK, The Pokémon Company, Bandai, or Bushiroad.
          </p>
        </div>
      </Container>
    </footer>
  );
}
