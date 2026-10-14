import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog & guides",
  description:
    "Guides on buying, storing, and collecting sealed trading cards, written by the team at Pokemon Rush.",
};

export default function BlogPage() {
  const [lead, ...rest] = posts;

  return (
    <div className="pt-14 pb-10 sm:pt-20">
      <Container>
        <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">
          Blog & guides
        </h1>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[var(--ink-2)]">
          Practical writing on buying, storing, and collecting sealed cards. No hype.
        </p>

        {lead ? (
          <Link href={`/blog/${lead.slug}`} className="group mt-12 block">
            <div className="grid gap-8 rounded-3xl bg-[var(--surface-2)] p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <p className="text-[13px] text-[var(--ink-2)]">{lead.category}</p>
                <h2 className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.02em] sm:text-[34px]">
                  {lead.title}
                </h2>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[var(--ink-2)]">
                  {lead.excerpt}
                </p>
                <p className="mt-6 text-[13px] text-[var(--ink-2)]">
                  {new Date(lead.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {" · "}
                  {lead.readingMinutes} min read
                </p>
              </div>
              <div className="hidden lg:block" aria-hidden="true" />
            </div>
          </Link>
        ) : null}

        <div className="mt-6 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="aspect-[16/10] rounded-2xl bg-[var(--surface-2)]" />
              <p className="mt-5 text-[13px] text-[var(--ink-2)]">{post.category}</p>
              <h2 className="mt-2 text-[19px] font-semibold leading-snug tracking-tight">
                {post.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">
                {post.excerpt}
              </p>
              <p className="mt-4 text-[13px] text-[var(--ink-2)]">
                {post.readingMinutes} min read
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
