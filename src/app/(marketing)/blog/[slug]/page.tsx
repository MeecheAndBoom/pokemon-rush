import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Prose } from "@/components/content/Prose";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPost, posts } from "@/data/posts";
import { guideCover } from "@/lib/media";
import { getSiteSettings } from "@/lib/settings";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { postSeo } from "@/data/seo";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found", robots: { index: false } };
  const seo = postSeo[post.slug];
  return pageMetadata({
    title: seo?.title ?? post.title,
    description: seo?.description ?? post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: seo?.keywords ?? [post.category, "sealed trading cards"],
    type: "article",
    publishedTime: post.date,
    authors: [post.author],
    section: post.category,
    // The colocated opengraph-image route renders the card.
    image: null,
  });
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const settings = await getSiteSettings();
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const article = articleJsonLd(
    {
      title: post.title,
      description: post.excerpt,
      slug: post.slug,
      date: post.date,
      author: post.author,
      category: post.category,
      image: guideCover(post.slug),
    },
    {
      name: settings.name,
      description: settings.description,
      email: settings.email,
      phone: settings.phone,
      addressLine: settings.addressLine,
      address: settings.address,
    }
  );

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <article className="pt-14 pb-10 sm:pt-20">
      <JsonLd data={article} />
      <JsonLd data={breadcrumbs} />
      <Container size="narrow">
        <p className="text-[13px] text-[var(--ink-2)]">
          <Link href="/blog" className="hover:text-[var(--foreground)]">
            Blog & guides
          </Link>
          {" / "}
          <span>{post.category}</span>
        </p>
        <h1 className="mt-5 text-[34px] font-semibold leading-tight tracking-[-0.03em] sm:text-[46px]">
          {post.title}
        </h1>
        <p className="mt-5 text-[13px] text-[var(--ink-2)]">
          {post.author} · {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}{" "}
          · {post.readingMinutes} min read
        </p>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-[var(--surface-2)]">
          <Image
            src={guideCover(post.slug)}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 768px) 48rem, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-10 border-t border-[var(--hairline)] pt-2">
          <Prose body={post.body} />
        </div>

        <div className="mt-16 border-t border-[var(--hairline)] pt-10">
          <h2 className="text-[17px] font-semibold tracking-tight">Keep reading</h2>
          <ul className="mt-6 grid gap-8 sm:grid-cols-3">
            {more.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[var(--surface-2)]">
                    <Image
                      src={guideCover(p.slug)}
                      alt={p.title}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-4 text-[13px] text-[var(--ink-2)]">{p.category}</p>
                  <p className="mt-1.5 text-[16px] font-medium leading-snug tracking-tight">
                    {p.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </article>
  );
}
