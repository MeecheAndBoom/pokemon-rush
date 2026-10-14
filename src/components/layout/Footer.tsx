import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { footerNav, site } from "@/lib/site";

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
            <div className="mt-6 space-y-1 text-[13px] text-[var(--ink-2)]">
              <p>
                <a href={site.phoneHref} className="hover:text-[var(--foreground)]">
                  {site.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-[var(--foreground)]"
                >
                  {site.email}
                </a>
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
