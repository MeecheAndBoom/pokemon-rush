import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { legalDocs } from "@/data/legal";

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Terms, privacy, cookies, accessibility, and disclaimer information for Pokemon Rush.",
};

export default function LegalIndexPage() {
  const docs = Object.values(legalDocs);

  return (
    <div className="pt-14 pb-10 sm:pt-20">
      <Container size="narrow">
        <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">Legal</h1>
        <p className="mt-4 text-[16px] leading-relaxed text-[var(--ink-2)]">
          The documents that govern your use of Pokemon Rush and our relationship with you.
        </p>

        <ul className="mt-14 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          {docs.map((doc) => (
            <li key={doc.slug}>
              <Link
                href={`/legal/${doc.slug}`}
                className="flex flex-col gap-1 py-6 transition-colors hover:text-[var(--accent)]"
              >
                <span className="text-[18px] font-medium tracking-tight">{doc.title}</span>
                <span className="text-[15px] leading-relaxed text-[var(--ink-2)]">
                  {doc.description}
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/legal/sitemap"
              className="flex flex-col gap-1 py-5 text-[16px] hover:text-[var(--accent)]"
            >
              <span className="text-[19px] font-semibold tracking-tight">Sitemap</span>
              <span className="text-[15px] text-[var(--ink-2)]">Every page on this site.</span>
            </Link>
          </li>
        </ul>
      </Container>
    </div>
  );
}
