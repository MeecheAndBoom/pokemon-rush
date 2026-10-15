import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { legalDocs } from "@/data/legal";
import { getSiteSettings } from "@/lib/settings";

type Params = Promise<{ slug: string }>;

function toId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function generateStaticParams() {
  return Object.keys(legalDocs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const doc = legalDocs[slug];
  if (!doc) return { title: "Not found" };
  return { title: doc.title, description: doc.description };
}

export default async function LegalDocPage({ params }: { params: Params }) {
  const { slug } = await params;
  const doc = legalDocs[slug];
  if (!doc) notFound();

  const updated = new Date(doc.lastUpdated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const others = Object.values(legalDocs).filter((item) => item.slug !== doc.slug);
  const settings = await getSiteSettings();

  return (
    <div className="pt-14 pb-16 sm:pt-20">
      <Container>
        <nav className="text-[13px] text-[var(--ink-2)]">
          <Link href="/legal" className="hover:text-[var(--foreground)]">
            Legal
          </Link>
          <span> / </span>
          <span className="text-[var(--foreground)]">{doc.title}</span>
        </nav>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <h1 className="text-[34px] font-semibold leading-tight tracking-[-0.03em] sm:text-[44px]">
            {doc.title}
          </h1>
          <span className="rounded-full border border-[var(--hairline)] px-3 py-1 text-[12px] text-[var(--ink-2)]">
            Updated {updated}
          </span>
        </div>
        <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-[var(--ink-2)]">
          {doc.description}
        </p>
      </Container>

      <Container className="mt-12">
        <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--ink-2)]">
              On this page
            </p>
            <ol className="mt-4 space-y-2.5 border-l border-[var(--hairline)] pl-4">
              {doc.sections.map((section) => (
                <li key={section.heading}>
                  <a
                    href={`#${toId(section.heading)}`}
                    className="text-[14px] leading-snug text-[var(--ink-2)] hover:text-[var(--accent)]"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div>
            <div className="rounded-3xl bg-[var(--surface-2)] p-6 sm:p-8">
              <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--accent)]">
                In short
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">
                This document is part of the agreement between you and PokéStore Direct. It is written
                to be read as a whole. If anything here is unclear, ask us before you order and we
                will explain it in plain language.
              </p>
            </div>

            <article className="mt-10 space-y-10">
              {doc.sections.map((section) => (
                <section key={section.heading} id={toId(section.heading)} className="scroll-mt-24">
                  <h2 className="text-[19px] font-semibold tracking-tight">{section.heading}</h2>
                  <p className="mt-3 text-[16px] leading-relaxed text-[var(--ink-2)]">
                    {section.body}
                  </p>
                </section>
              ))}
            </article>

            <section className="mt-14 rounded-3xl border border-[var(--hairline)] p-8">
              <h2 className="text-[18px] font-semibold tracking-tight">
                Questions about this document?
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-[var(--ink-2)]">
                Email{" "}
                <a
                  href={`mailto:${settings.email}`}
                  className="text-[var(--accent)] hover:opacity-70"
                >
                  {settings.email}
                </a>{" "}
                or call {settings.phone}. We will respond as plainly as we can.
              </p>
            </section>

            <section className="mt-12">
              <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--ink-2)]">
                Related documents
              </p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/legal/${item.slug}`}
                      className="inline-flex rounded-full border border-[var(--hairline)] px-4 py-2 text-[14px] transition-colors hover:border-[var(--foreground)]"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
