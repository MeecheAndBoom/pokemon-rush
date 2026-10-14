import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Prose } from "@/components/content/Prose";
import { getPost, posts } from "@/data/posts";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: post.author },
    datePublished: post.date,
  };

  return (
    <article className="pt-14 pb-10 sm:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container size="narrow">
        <p className="text-[13px] text-[var(--ink-2)]">
          <Link href="/blog" className="hover:text-[var(--foreground)]">
            Blog & guides
          </Link>
        </p>
        <h1 className="mt-5 text-[34px] font-semibold leading-tight tracking-[-0.03em] sm:text-[46px]">
          {post.title}
        </h1>
        <p className="mt-5 text-[13px] text-[var(--ink-2)]">
          {post.author} · {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          · {post.readingMinutes} min read
        </p>

        <div className="mt-10 border-t border-[var(--hairline)] pt-2">
          <Prose body={post.body} />
        </div>

        <div className="mt-16 border-t border-[var(--hairline)] pt-10">
          <h2 className="text-[17px] font-semibold tracking-tight">Keep reading</h2>
          <ul className="mt-6 space-y-5">
            {more.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="text-[16px] text-[var(--accent)] hover:opacity-70"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </article>
  );
}
