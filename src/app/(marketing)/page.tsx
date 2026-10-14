import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Boxes,
  CreditCard,
  Headphones,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { SplitFeature } from "@/components/content/SplitFeature";
import { FaqList } from "@/components/content/FaqList";
import { Stars } from "@/components/content/Stars";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { catalog, filterProducts, getBrandCounts, getFeatured } from "@/lib/catalog";
import { media, guideCover } from "@/lib/media";
import { reviewSummary, reviews } from "@/data/reviews";
import { posts } from "@/data/posts";
import { supportFaqs } from "@/data/faq";
import { site } from "@/lib/site";

const valueProps = [
  {
    icon: ShieldCheck,
    title: "Sealed and verified",
    body: "Every box is checked for intact factory seals, clean corners, and sharp edges before it is packed. If something is not right, it does not ship.",
  },
  {
    icon: Truck,
    title: "Shipping to 40+ countries",
    body: "Orders leave our facility within one business day. Tracking details are emailed to you as soon as your parcel is on its way.",
  },
  {
    icon: Headphones,
    title: "Talk to a person",
    body: "Not sure which set to buy, or whether to hold a case? Call us or send a message and a collector on our team will answer.",
  },
];

const process = [
  {
    step: "01",
    title: "You order",
    body: "Checkout takes a minute and takes no card details. You receive an order reference and payment instructions by email.",
  },
  {
    step: "02",
    title: "We confirm and inspect",
    body: "Once payment is confirmed we pick your product, check the seal, corners, and edges, and set aside anything that fails.",
  },
  {
    step: "03",
    title: "We pack it properly",
    body: "Rigid outer carton, void fill, corner protection. The wrap never touches tape and nothing can slide in transit.",
  },
  {
    step: "04",
    title: "It ships with tracking",
    body: "Your parcel leaves with tracking and you get the details immediately. Questions along the way reach a real person.",
  },
];

const guarantees = [
  { icon: PackageCheck, label: "Shipping & delivery", href: "/shipping-delivery" },
  { icon: RotateCcw, label: "Returns & refunds", href: "/returns-refunds" },
  { icon: CreditCard, label: "Payment & finance", href: "/finance-disclosure" },
  { icon: Boxes, label: "Wholesale & bulk", href: "/wholesale" },
];

export default function HomePage() {
  const featured = getFeatured(8);
  const brandCounts = getBrandCounts();
  const activeBrands = brandCounts.filter((brand) => brand.count > 0);
  const japanese = filterProducts({ language: "japanese" }).slice(0, 8);
  const latestGuides = posts.slice(0, 3);
  const stats = [
    { value: `${catalog.length}+`, label: "Sealed products listed" },
    { value: `${activeBrands.length}`, label: "Card brands stocked" },
    { value: "40+", label: "Countries shipped to" },
    {
      value: reviewSummary.average.toFixed(1),
      label: `Average from ${reviewSummary.count} reviews`,
    },
  ];

  return (
    <>
      {/* 1. Hero */}
      <section className="pt-14 pb-12 sm:pt-20 sm:pb-16">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] px-3.5 py-1.5 text-[13px] text-[var(--ink-2)]">
                <BadgeCheck className="h-3.5 w-3.5 text-[var(--accent)]" strokeWidth={1.75} aria-hidden="true" />
                Authentic stock, sourced through official distribution
              </p>
              <h1 className="mt-6 max-w-2xl text-[40px] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-[58px]">
                Trading cards, sealed and ready to ship.
              </h1>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[var(--ink-2)] sm:text-[19px]">
                Factory-sealed Pokémon, One Piece, and Weiss Schwarz. Checked before dispatch and
                packed to arrive exactly as it left — across Japan, North America, Europe, and beyond.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[17px]">
                <Link href="/shop" className="text-[var(--accent)] transition-opacity hover:opacity-70">
                  Shop all cards
                </Link>
                <Link
                  href="/talk-to-a-specialist"
                  className="text-[var(--accent)] transition-opacity hover:opacity-70"
                >
                  Talk to a specialist
                </Link>
              </div>
              <p className="mt-8 text-[14px] text-[var(--ink-2)]">
                Free advice by phone on {site.phone} · {site.hours}
              </p>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[var(--surface-2)]">
                <Image
                  src={media.hero}
                  alt="Sealed Pokémon Elite Trainer Box"
                  fill
                  priority
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-contain p-10"
                />
              </div>
              <div className="absolute -bottom-5 -left-2 hidden rounded-2xl border border-[var(--hairline)] bg-[var(--background)] p-4 shadow-sm sm:block">
                <p className="text-[13px] text-[var(--ink-2)]">Inspected before every dispatch</p>
                <div className="mt-2 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[var(--success)]" strokeWidth={2} aria-hidden="true" />
                  <span className="text-[13px] tracking-tight">Seal, corners, and edges</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Stats */}
      <section className="border-y border-[var(--hairline)] bg-[var(--surface-2)]">
        <Container>
          <dl className="grid grid-cols-2 gap-y-8 py-10 sm:grid-cols-4 sm:py-12">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[34px]">
                  {stat.value}
                </dt>
                <dd className="mt-1.5 text-[13px] leading-relaxed text-[var(--ink-2)]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 3. Categories */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[36px]">
                Shop by collection
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-[var(--ink-2)]">
                Three houses of cards, one standard: authentic product, honestly described, packed to
                survive the trip.
              </p>
            </div>
            <Link href="/shop" className="text-[15px] text-[var(--accent)] hover:opacity-70">
              See everything
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {activeBrands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/shop/${brand.slug}`}
                className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-3xl"
              >
                <Image
                  src={media.brand[brand.slug] ?? media.hero}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="relative p-6 text-white">
                  <p className="text-[20px] font-semibold tracking-tight">{brand.label}</p>
                  <p className="mt-1 text-[13px] text-white/80">
                    {brand.count} {brand.count === 1 ? "item" : "items"} in stock
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Spotlight: Pokemon */}
      <section className="border-t border-[var(--hairline)] py-16 sm:py-24">
        <Container>
          <SplitFeature
            image={media.section.pokemon}
            imageAlt="Sealed Pokémon product"
            eyebrow="Pokémon TCG"
            title="The set you want, still sealed"
            body={[
              "Booster boxes, Elite Trainer Boxes, booster bundles, and sealed cases across English, Japanese, and Chinese print runs. Current releases sit alongside older sets that are still collectible.",
              "Japanese product is prized for its print consistency and artwork; English print runs give you the widest single set. We stock both, and we list the language on every item so there are no surprises.",
            ]}
            points={[
              "Japanese and English print runs listed side by side",
              "Pre-orders for releases that have not shipped yet",
              "Seal and corners verified before packing",
            ]}
            href="/shop/pokemon"
            cta="Browse Pokémon"
          />
        </Container>
      </section>

      {/* 5. New in */}
      <section className="pb-16 sm:pb-24">
        <Container>
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[36px]">New in</h2>
            <Link href="/shop" className="text-[15px] text-[var(--accent)] hover:opacity-70">
              Shop all
            </Link>
          </div>
          <div className="mt-10">
            <ProductGrid products={featured} />
          </div>
        </Container>
      </section>

      {/* 5b. Spotlight: One Piece */}
      <section className="border-t border-[var(--hairline)] py-16 sm:py-24">
        <Container>
          <SplitFeature
            reverse
            image={media.section["one-piece"]}
            imageAlt="Sealed One Piece Card Game product"
            eyebrow="One Piece Card Game"
            title="Built for players and long-term collectors"
            body={[
              "From Romance Dawn through the latest releases, we carry sealed One Piece booster boxes and cases in both English and Japanese. Each set introduces new leaders, powerful characters, and rare pulls that keep the game moving.",
              "If you are building a deck, a few boxes will get you there. If you are holding for the long run, a factory-sealed case is the cleanest way to own a set unsearched and untouched.",
            ]}
            points={[
              "English and Japanese booster boxes",
              "Factory-sealed cases for long-term holds",
              "Every case checked for intact factory tape",
            ]}
            href="/shop/one-piece"
            cta="Shop One Piece"
          />
        </Container>
      </section>

      {/* 6. Value props */}
      <section className="border-t border-[var(--hairline)] py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 sm:grid-cols-3 sm:gap-10">
            {valueProps.map((prop) => (
              <div key={prop.title}>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--surface-2)] text-[var(--accent)]">
                  <prop.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-[17px] font-semibold tracking-tight">{prop.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">{prop.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. Featured shelf */}
      <section className="bg-[var(--surface-2)] py-16 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[36px]">
                Japanese print runs
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-[var(--ink-2)]">
                Sought after for their print quality, centering, and exclusive artwork. A strong
                starting point for collectors and anyone chasing a card for grading.
              </p>
            </div>
            <Link
              href="/shop/pokemon/japanese"
              className="text-[15px] text-[var(--accent)] hover:opacity-70"
            >
              All Japanese cards
            </Link>
          </div>
          <div className="mt-10">
            <ProductGrid products={japanese} />
          </div>
        </Container>
      </section>

      {/* 8. Spotlight: Weiss Schwarz */}
      <section className="py-16 sm:py-24">
        <Container>
          <SplitFeature
            image={media.section["weiss-schwarz"]}
            imageAlt="Sealed Weiss Schwarz product"
            eyebrow="Weiss Schwarz"
            title="A crossover game with deep licences"
            body={[
              "Weiss Schwarz is built almost entirely around licensed properties, from anime series to games. That makes it a different kind of collecting: you are often collecting a series first and a game second.",
              "Trial decks are the simplest way in. From there, booster boxes and packs let you build a collection and improve a deck for the series you actually care about.",
            ]}
            points={[
              "Trial decks and booster boxes",
              "Japanese and English print runs",
              "Advice on which series and language to start with",
            ]}
            href="/shop/weiss-schwarz"
            cta="Explore Weiss Schwarz"
          />
        </Container>
      </section>

      {/* 9. Process */}
      <section className="border-t border-[var(--hairline)] py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="relative overflow-hidden rounded-3xl bg-[var(--surface-2)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src={media.section.shipping}
                  alt="Packing a sealed trading card order"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[36px]">
                From order to doorstep
              </h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[var(--ink-2)]">
                No card details on this site, no guesswork after checkout. Here is exactly what
                happens between your order and the box arriving.
              </p>
              <ol className="mt-10 space-y-8">
                {process.map((item) => (
                  <li key={item.step} className="flex gap-5">
                    <span className="text-[13px] font-medium tabular-nums text-[var(--accent)]">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-[17px] font-semibold tracking-tight">{item.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-2)]">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* 10. Reviews */}
      <section className="border-t border-[var(--hairline)] bg-[var(--surface-2)] py-16 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[36px]">
                What collectors say
              </h2>
              <div className="mt-4 flex items-center gap-3">
                <Stars rating={reviewSummary.average} size={16} />
                <p className="text-[14px] text-[var(--ink-2)]">
                  {reviewSummary.average.toFixed(1)} out of 5 · {reviewSummary.count} reviews
                </p>
              </div>
            </div>
            <Link href="/reviews" className="text-[15px] text-[var(--accent)] hover:opacity-70">
              Read all reviews
            </Link>
          </div>

          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-3">
            {reviews.slice(0, 3).map((review) => (
              <li key={`${review.name}-${review.date}`} className="flex flex-col">
                <Stars rating={review.rating} size={15} />
                <h3 className="mt-4 text-[16px] font-semibold tracking-tight">{review.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[var(--ink-2)]">
                  &ldquo;{review.body}&rdquo;
                </p>
                <p className="mt-5 text-[13px] text-[var(--ink-2)]">
                  {review.name} · {review.location}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 11. Guides */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[36px]">
                From the guides
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-[var(--ink-2)]">
                Practical reading on buying, storing, and collecting sealed product. No hype, no
                affiliate padding.
              </p>
            </div>
            <Link href="/blog" className="text-[15px] text-[var(--accent)] hover:opacity-70">
              All guides
            </Link>
          </div>

          <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {latestGuides.map((post) => (
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
                <h3 className="mt-2 text-[19px] font-semibold leading-snug tracking-tight">
                  {post.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">
                  {post.excerpt}
                </p>
                <p className="mt-4 text-[13px] text-[var(--ink-2)]">{post.readingMinutes} min read</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 12. FAQ */}
      <section className="border-t border-[var(--hairline)] py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[36px]">
                Common questions
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-[var(--ink-2)]">
                Payment, shipping, and returns, answered plainly. Anything else, ask us directly.
              </p>
              <Link
                href="/support"
                className="mt-6 inline-block text-[15px] text-[var(--accent)] hover:opacity-70"
              >
                Visit the support centre
              </Link>
            </div>
            <FaqList items={supportFaqs.slice(0, 6)} />
          </div>
        </Container>
      </section>

      {/* 13. Guarantees */}
      <section className="border-t border-[var(--hairline)] py-12">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-4 rounded-2xl border border-[var(--hairline)] p-5 transition-colors hover:border-[var(--foreground)]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--surface-2)] text-[var(--accent)]">
                  <item.icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="text-[15px] tracking-tight">{item.label}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 13b. CTA band with background image */}
      <section className="relative mt-16 overflow-hidden sm:mt-24">
        <Image
          src={media.section.store}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--foreground)_78%,transparent)]" />
        <Container className="relative">
          <div className="py-20 text-center sm:py-28">
            <h2 className="mx-auto max-w-2xl text-[28px] font-semibold tracking-[-0.02em] text-[var(--background)] sm:text-[38px]">
              Looking for something we do not list?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-[color-mix(in_srgb,var(--background)_78%,transparent)]">
              Tell us the set, the language, or the case you are after. We will tell you what we can
              source, what it costs, and how long it takes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[17px]">
              <Link
                href="/talk-to-a-specialist"
                className="text-[var(--background)] underline decoration-white/40 underline-offset-4 hover:opacity-80"
              >
                Talk to a specialist
              </Link>
              <a
                href={site.phoneHref}
                className="text-[var(--background)] underline decoration-white/40 underline-offset-4 hover:opacity-80"
              >
                {site.phone}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* 14. Newsletter */}
      <section className="border-t border-[var(--hairline)] py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <h2 className="text-[24px] font-semibold tracking-[-0.02em] sm:text-[30px]">
                New releases, straight to your inbox
              </h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-[var(--ink-2)]">
                Occasional emails when a set we rate goes live or a pre-order opens. No daily
                blasting, and you can unsubscribe in one click.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </Container>
      </section>
    </>
  );
}
