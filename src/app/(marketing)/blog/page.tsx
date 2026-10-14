import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { posts } from "@/data/posts";
import { guideCover, media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Blog & guides",
  description:
    "Guides on buying, storing, and collecting sealed trading cards, written by the team at Pokemon Rush.",
};

const topics = [
  {
    title: "Buying sealed product",
    body: "What factory seals should look like, how to compare print runs, and which products make sense whether you open or hold.",
  },
  {
    title: "Languages and print runs",
    body: "The practical differences between Japanese, English, and Chinese product, from set composition to card stock.",
  },
  {
    title: "Storing and protecting",
    body: "Temperature, humidity, and light, explained without jargon, plus how to keep cases and boxes from warping.",
  },
  {
    title: "Shipping and claims",
    body: "How to receive high-value parcels, when to open on camera, and what to send us if something arrives damaged.",
  },
];

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPage() {
  const [lead, ...rest] = posts;

  return (
    <div className="pt-14 pb-16 sm:pt-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-[13px] text-[var(--ink-2)]">Journal</p>
            <h1 className="mt-3 text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">
              Blog & guides
            </h1>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[var(--ink-2)]">
              Practical writing on buying, storing, and collecting sealed cards. Written by the
              people who pack and ship them. No hype, no filler.
            </p>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-[var(--surface-2)]">
            <Image
              src={media.section.storage}
              alt="Sealed trading card products"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {lead ? (
          <Link href={`/blog/${lead.slug}`} className="group mt-14 block">
            <div className="grid gap-8 rounded-3xl bg-[var(--surface-2)] p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div>
                <p className="text-[13px] text-[var(--ink-2)]">{lead.category}</p>
                <h2 className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.02em] sm:text-[34px]">
                  {lead.title}
                </h2>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[var(--ink-2)]">
                  {lead.excerpt}
                </p>
                <p className="mt-6 text-[13px] text-[var(--ink-2)]">
                  {formatDate(lead.date)}
                  {" · "}
                  {lead.readingMinutes} min read
                </p>
                <p className="mt-6 text-[15px] text-[var(--accent)]">Read the guide →</p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={guideCover(lead.slug)}
                  alt={lead.title}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </Link>
        ) : null}

        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[var(--surface-2)]">
                <Image
                  src={guideCover(post.slug)}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-5 text-[13px] text-[var(--ink-2)]">{post.category}</p>
              <h2 className="mt-2 text-[19px] font-semibold leading-snug tracking-tight">
                {post.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">
                {post.excerpt}
              </p>
              <p className="mt-4 text-[13px] text-[var(--ink-2)]">
                {formatDate(post.date)} · {post.readingMinutes} min read
              </p>
            </Link>
          ))}
        </div>
      </Container>

      <section className="mt-20 border-y border-[var(--hairline)] bg-[var(--surface-2)] py-16 sm:py-20">
        <Container>
          <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[36px]">
            What we write about
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--ink-2)]">
            Every guide answers a question we actually get asked by customers, by phone or by email.
          </p>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((topic) => (
              <div key={topic.title}>
                <h3 className="text-[17px] font-semibold tracking-tight">{topic.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">
                  {topic.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="mt-16">
        <Container>
          <div className="rounded-3xl border border-[var(--hairline)] p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-[24px] font-semibold tracking-[-0.02em] sm:text-[30px]">
                  Get the next guide
                </h2>
                <p className="mt-4 text-[16px] leading-relaxed text-[var(--ink-2)]">
                  Occasional emails with new writing, new sets, and pre-order openings. Unsubscribe
                  in one click.
                </p>
              </div>
              <NewsletterForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
