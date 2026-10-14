import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { brands, catalog, languages, productTypes } from "@/lib/catalog";
import { footerNav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Every page on the Pokemon Rush website in one place.",
};

export default function SitemapPage() {
  const sections: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: "Shop",
      links: [
        { label: "All products", href: "/shop" },
        ...brands.map((b) => ({ label: b.label, href: `/shop/${b.slug}` })),
        ...productTypes.map((t) => ({ label: t.label, href: `/shop?type=${t.slug}` })),
        ...languages.map((l) => ({ label: l.label, href: `/shop?language=${l.slug}` })),
      ],
    },
    ...footerNav,
    {
      title: "Legal",
      links: [
        { label: "Terms & conditions", href: "/legal/terms" },
        { label: "Privacy policy", href: "/legal/privacy" },
        { label: "Cookies policy", href: "/legal/cookies" },
        { label: "Accessibility", href: "/legal/accessibility" },
        { label: "Disclaimer", href: "/legal/disclaimer" },
      ],
    },
  ];

  return (
    <div className="pt-14 pb-10 sm:pt-20">
      <Container>
        <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">Sitemap</h1>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[var(--ink-2)]">
          Every page on Pokemon Rush, grouped so you can find what you need quickly.
        </p>

        <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-[15px] font-semibold tracking-tight">{section.title}</h2>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={`${section.title}-${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-[var(--ink-2)] hover:text-[var(--foreground)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-[15px] font-semibold tracking-tight">All products</h2>
          <ul className="mt-4 grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {catalog.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/shop/product/${product.slug}`}
                  className="text-[14px] text-[var(--ink-2)] hover:text-[var(--foreground)]"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}
