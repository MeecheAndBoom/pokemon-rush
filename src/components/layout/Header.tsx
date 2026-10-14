"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { CartLink } from "@/components/layout/CartLink";
import { mainNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--hairline)] bg-[color-mix(in_srgb,var(--background)_78%,transparent)] backdrop-blur-xl backdrop-saturate-150">
      <Container size="wide">
        <div className="flex h-14 items-center justify-between gap-6 sm:h-16">
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-tight text-[var(--foreground)]"
          >
            {site.name}
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {mainNav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[14px] tracking-tight transition-colors",
                    active
                      ? "text-[var(--foreground)]"
                      : "text-[var(--ink-2)] hover:text-[var(--foreground)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            <Link
              href="/shop"
              className="hidden text-[14px] text-[var(--ink-2)] transition-colors hover:text-[var(--foreground)] md:inline"
            >
              Search
            </Link>
            <CartLink />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="text-[14px] text-[var(--foreground)] md:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </Container>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-[var(--hairline)] bg-[var(--background)] md:hidden"
        >
          <Container size="wide">
            <nav className="flex flex-col py-3" aria-label="Mobile">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-3 text-[17px] tracking-tight text-[var(--foreground)]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/track-order"
                className="py-3 text-[17px] tracking-tight text-[var(--foreground)]"
              >
                Track an order
              </Link>
              <a
                href={site.phoneHref}
                className="py-3 text-[17px] tracking-tight text-[var(--ink-2)]"
              >
                {site.phone}
              </a>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
