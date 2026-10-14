import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Prose } from "@/components/content/Prose";
import { legalDocs } from "@/data/legal";

type Params = Promise<{ slug: string }>;

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

  return (
    <div className="pt-14 pb-10 sm:pt-20">
      <Container size="narrow">
        <p className="text-[13px] text-[var(--ink-2)]">
          <Link href="/legal" className="hover:text-[var(--foreground)]">
            Legal
          </Link>
        </p>
        <h1 className="mt-5 text-[34px] font-semibold leading-tight tracking-[-0.03em] sm:text-[44px]">
          {doc.title}
        </h1>
        <p className="mt-4 text-[13px] text-[var(--ink-2)]">
          Last updated{" "}
          {new Date(doc.lastUpdated).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="mt-10 border-t border-[var(--hairline)] pt-2">
          <Prose body={doc.intro} />
        </div>

        <div className="mt-6">
          {doc.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-[18px] font-semibold tracking-tight">{section.heading}</h2>
              <Prose body={section.body} className="[&>p]:my-3" />
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-[var(--hairline)] pt-8">
          <p className="text-[14px] text-[var(--ink-2)]">
            See also{" "}
            {Object.values(legalDocs)
              .filter((d) => d.slug !== doc.slug)
              .map((d, i, arr) => (
                <span key={d.slug}>
                  <Link href={`/legal/${d.slug}`} className="text-[var(--accent)] hover:opacity-70">
                    {d.title}
                  </Link>
                  {i < arr.length - 1 ? ", " : "."}
                </span>
              ))}
          </p>
        </div>
      </Container>
    </div>
  );
}
