"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CartLink } from "@/components/layout/CartLink";
import { SearchBox } from "@/components/layout/SearchBox";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header({
  name,
  phone,
  phoneHref,
}: {
  name: string;
  phone: string;
  phoneHref: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  useEffect(() => {
    setOpen(false);
    setMobileSearch(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--hairline)] bg-[color-mix(in_srgb,var(--background)_82%,transparent)] backdrop-blur-xl backdrop-saturate-150">
      <Container size="wide">
        <div className="flex h-14 items-center justify-between gap-4 sm:h-16">
          <Link href="/" className="flex shrink-0 items-center" aria-label={name}>
            <Image
              src="/brand/pokestore-direct-logo.png"
              alt={name}
              width={900}
              height={309}
              priority
              sizes="140px"
              className="h-9 w-auto sm:h-10"
            />
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {mainNav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[13px] tracking-tight transition-colors",
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

          <div className="flex items-center gap-1.5">
            <div className="hidden w-56 lg:block">
              <SearchBox placeholder="Search" className="[&_input]:h-9" />
            </div>

            <button
              type="button"
              aria-label="Search"
              aria-expanded={mobileSearch}
              onClick={() => setMobileSearch((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full text-[var(--foreground)] transition-colors hover:bg-[var(--surface-2)] lg:hidden"
            >
              {mobileSearch ? (
                <X className="h-[18px] w-[18px]" strokeWidth={1.75} />
              ) : (
                <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
              )}
            </button>

            <CartLink />

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full text-[var(--foreground)] transition-colors hover:bg-[var(--surface-2)] md:hidden"
            >
              {open ? (
                <X className="h-[18px] w-[18px]" strokeWidth={1.75} />
              ) : (
                <Menu className="h-[18px] w-[18px]" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
      </Container>

      {mobileSearch ? (
        <div className="border-t border-[var(--hairline)] bg-[var(--background)] lg:hidden">
          <Container size="wide">
            <div className="py-3">
              <SearchBox autoFocus onSubmitted={() => setMobileSearch(false)} />
            </div>
          </Container>
        </div>
      ) : null}

      {open ? (
        <div className="border-t border-[var(--hairline)] bg-[var(--background)] md:hidden">
          <Container size="wide">
            <nav className="flex flex-col py-2" aria-label="Mobile">
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
                href="/reviews"
                className="py-3 text-[17px] tracking-tight text-[var(--foreground)]"
              >
                Reviews
              </Link>
              <Link
                href="/track-order"
                className="py-3 text-[17px] tracking-tight text-[var(--foreground)]"
              >
                Track an order
              </Link>
              <a
                href={phoneHref}
                className="py-3 text-[17px] tracking-tight text-[var(--ink-2)]"
              >
                {phone}
              </a>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
