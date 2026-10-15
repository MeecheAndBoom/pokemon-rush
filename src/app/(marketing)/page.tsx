import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Boxes,
  CreditCard,
  ExternalLink,
  Headphones,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { SplitFeature } from "@/components/content/SplitFeature";
import { HeroSlideshow } from "@/components/content/HeroSlideshow";
import { DecorativeArt } from "@/components/content/DecorativeArt";
import { FaqList } from "@/components/content/FaqList";
import { Stars } from "@/components/content/Stars";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import {
  filterProducts,
  getBrandCounts,
  getByBrand,
  getFeatured,
} from "@/lib/catalog";
import { media, guideCover, heroSlides } from "@/lib/media";
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
    body: "Orders leave our facility within one business day. Tracking details are emailed as soon as your parcel is on its way.",
  },
  {
    icon: BadgeCheck,
    title: "Guaranteed authentic",
    body: "We source through official distribution only. No repacks, no reseals, no “mystery” lots dressed up as sealed product.",
  },
  {
    icon: Headphones,
    title: "Talk to a person",
    body: "Not sure which set to buy, or whether to hold a case? Call us or send a message and a collector on our team answers.",
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

const trustedResources = [
  { label: "Official Pokémon", href: "https://www.pokemon.com/" },
  { label: "Pokémon TCG", href: "https://tcg.pokemon.com/" },
  { label: "PSA grading", href: "https://www.psacard.com/" },
  { label: "Beckett grading", href: "https://www.beckett.com/grading" },
  { label: "CGC Cards", href: "https://www.cgccards.com/" },
];

export default function HomePage() {
  const featured = getFeatured(8);
  const brandCounts = getBrandCounts();
  const activeBrands = brandCounts.filter((brand) => brand.count > 0);
  const japanese = filterProducts({ language: "japanese" }).slice(0, 8);
  const onePiece = getByBrand("one-piece").slice(0, 8);
  const weiss = getByBrand("weiss-schwarz").slice(0, 4);
  const latestGuides = posts.slice(0, 3);

  return (
    <>
      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden border-b border-[var(--hairline)] pt-16 pb-16 sm:pt-24 sm:pb-24">
        <HeroSlideshow slides={heroSlides} className="absolute inset-0 -z-10" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/90 to-white/40" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/60 via-transparent to-[var(--background)]" />
        <Container className="relative">
          <div className="max-w-2xl">
            <h1 className="text-[40px] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-[58px]">
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
          </div>
        </Container>
      </section>

      {/* 2. Categories */}
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
                className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-3xl bg-[var(--surface-2)]"
              >
                <Image
                  src={media.brand[brand.slug] ?? media.hero}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-10 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
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

      {/* 4. New in */}
      <section className="border-t border-[var(--hairline)] py-16 sm:py-20">
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

      {/* 5. Spotlight: Pokemon */}
      <section className="relative overflow-hidden border-t border-[var(--hairline)] bg-[var(--tint-yellow)] py-16 sm:py-24">
        <DecorativeArt
          src={media.art.pikachu}
          opacity={0.16}
          className="-right-8 top-8 w-[180px] sm:-right-14 sm:w-[260px] lg:w-[340px]"
        />
        <DecorativeArt
          src={media.art.charizard}
          opacity={0.1}
          className="-left-6 bottom-0 w-[160px] sm:-left-12 sm:w-[220px] lg:w-[300px]"
        />
        <Container className="relative">
          <SplitFeature
            image={media.section.pokemon}
            imageAlt="Sealed Pokémon product"
            title="Your destination for Japanese Pokémon booster boxes"
            body={[
              "At Pokemon Rush we live and breathe this hobby. Our aim is simple: to get authentic Japanese Pokémon booster boxes into the hands of collectors and players wherever they are. Whether you are hunting an ultra-rare card, chasing a new release, or just love the feeling of cracking a sealed box, we have built the shop around that.",
              "What makes us different is that we collect too. We understand the hunt, and we know what a factory seal should look like. Every box we sell is sealed, inspected, and sourced directly — no middlemen, no resealing, no surprises.",
            ]}
            points={[
              "Japanese sets you will not find in a local store",
              "Guaranteed authenticity — official product only",
              "Boosted and bundled to survive transit",
              "Advice from people who actually collect",
            ]}
            href="/shop/pokemon"
            cta="Shop Pokémon"
          />
        </Container>
      </section>

      {/* 6. One Piece adventure */}
      <section className="relative overflow-hidden border-t border-[var(--hairline)] bg-[var(--tint-blue)] py-16 sm:py-24">
        <DecorativeArt
          src={media.art.luffy}
          opacity={0.12}
          className="-right-6 top-10 w-[170px] sm:-right-10 sm:w-[240px] lg:w-[320px]"
        />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <h2 className="text-[30px] font-semibold tracking-[-0.02em] sm:text-[40px]">
                Join the One Piece adventure
              </h2>
              <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-[var(--ink-2)]">
                <p>
                  Set sail with a trading card game built on the world of One Piece. Every release
                  blends strategic play, collectible value, and artwork pulled straight from the
                  series, giving players and collectors something to chase.
                </p>
                <p>
                  Japanese and English releases each have their own appeal. Japanese sets are prized
                  for vivid printing and exclusive artwork; English sets keep the game accessible
                  and consistent for tournament play. We stock both, and we describe exactly which
                  you are buying.
                </p>
                <p>
                  Factory-sealed product is the honest way to buy. No repacks, no reseals, no
                  guessing whether someone has already been through the box. If you play, a booster
                  box gets you a set. If you collect, a sealed case is the long-term hold.
                </p>
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Booster boxes from Romance Dawn onward",
                  "Sealed English and Japanese cases",
                  "New releases added as they print",
                  "Advice on sets before you commit",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[15px] text-[var(--ink-2)]">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/shop/one-piece"
                className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-[15px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.97]"
              >
                Shop One Piece
              </Link>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[var(--background)]/60 ring-1 ring-[var(--hairline)]">
              <Image
                src={media.section["one-piece"]}
                alt="Sealed One Piece Card Game product"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain p-10"
              />
            </div>
          </div>
          <div className="mt-14">
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="text-[22px] font-semibold tracking-tight">One Piece bestsellers</h3>
              <Link href="/shop/one-piece" className="text-[15px] text-[var(--accent)] hover:opacity-70">
                View all
              </Link>
            </div>
            <div className="mt-8">
              <ProductGrid products={onePiece} />
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Value props */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[36px]">
              Why collectors buy from us
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[var(--ink-2)]">
              We are collectors first. That shapes every decision we make about what we stock and
              how it leaves the door.
            </p>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((prop) => (
              <div key={prop.title}>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--accent-tint)] text-[var(--accent)]">
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
      <section className="relative overflow-hidden border-y border-[var(--hairline)] bg-[var(--tint-purple)] py-16 sm:py-24">
        <DecorativeArt
          src={media.art.goku}
          opacity={0.1}
          className="-left-6 top-4 w-[160px] sm:-left-12 sm:w-[220px] lg:w-[300px]"
        />
        <Container className="relative">
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
              href="/shop/pokemon?language=japanese"
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
      <section className="relative overflow-hidden py-16 sm:py-24">
        <DecorativeArt
          src={media.art.tanjiro}
          opacity={0.1}
          className="-right-6 top-2 w-[150px] sm:-right-12 sm:w-[210px] lg:w-[280px]"
        />
        <Container className="relative">
          <SplitFeature
            reverse
            image={media.section["weiss-schwarz"]}
            imageAlt="Sealed Weiss Schwarz product"
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
          {weiss.length > 0 ? (
            <div className="mt-14">
              <ProductGrid products={weiss} />
            </div>
          ) : null}
        </Container>
      </section>

      {/* 9. Process */}
      <section className="border-t border-[var(--hairline)] bg-[var(--tint-green)] py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="relative overflow-hidden rounded-3xl bg-[var(--background)]">
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
      <section className="relative overflow-hidden border-t border-[var(--hairline)] bg-[var(--tint-pink)] py-16 sm:py-24">
        <DecorativeArt
          src={media.art.zoro}
          opacity={0.07}
          className="-left-6 bottom-0 w-[150px] sm:-left-14 sm:w-[210px] lg:w-[290px]"
        />
        <Container className="relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[36px]">
                What collectors say
              </h2>
              <div className="mt-4 flex items-center gap-3">
                <Stars rating={reviewSummary.average} size={16} />
                <span className="text-[14px] text-[var(--ink-2)]">
                  {reviewSummary.average.toFixed(1)} average from {reviewSummary.count} reviews
                </span>
              </div>
            </div>
            <Link href="/reviews" className="text-[15px] text-[var(--accent)] hover:opacity-70">
              Read all reviews
            </Link>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {reviews.slice(0, 3).map((review) => (
              <figure
                key={review.name}
                className="flex flex-col rounded-3xl bg-[var(--background)] p-7 ring-1 ring-[var(--hairline)]"
              >
                <Stars rating={review.rating} size={15} />
                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-[var(--ink-2)]">
                  {review.body}
                </blockquote>
                <figcaption className="mt-6 text-[13px] text-[var(--ink-2)]">
                  <span className="text-[var(--foreground)]">{review.name}</span> · {review.location}
                </figcaption>
              </figure>
            ))}
          </div>
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

      {/* 13. Long-form: Japanese Pokemon */}
      <section className="relative overflow-hidden border-t border-[var(--hairline)] bg-[var(--tint-yellow)] py-16 sm:py-20">
        <DecorativeArt
          src={media.art.eevee}
          opacity={0.15}
          className="-right-6 bottom-0 w-[150px] sm:-right-10 sm:w-[200px] lg:w-[280px]"
        />
        <Container className="relative">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-[26px] font-semibold leading-tight tracking-[-0.02em] sm:text-[34px]">
              Japanese Pokémon cards, sourced properly
            </h2>
            <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-[var(--ink-2)]">
              <p>
                If you are after Japanese Pokémon cards, we are built for that. Our range covers
                promo cards, booster boxes, graded cards, and the latest Japanese releases — each
                one inspected so what you receive matches what we describe.
              </p>
              <p>
                New stock lands regularly, which means there is always something to complete a
                master set or add to a collection. Whether you are opening for the chase or keeping
                product sealed, the same standard applies: authentic, and packed to survive the trip.
              </p>
              <p>
                Beyond the shop, we publish collecting guides and notes on grading and storage, so
                you can look after what you buy long after it arrives.
              </p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Promo cards and special boxes",
                "Booster boxes and sealed cases",
                "Japanese and English print runs",
                "Graded singles on request",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-[15px] text-[var(--ink-2)]">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 14. Trusted resources */}
      <section className="border-t border-[var(--hairline)] py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="text-[26px] font-semibold tracking-[-0.02em] sm:text-[32px]">
                Trusted resources
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-[var(--ink-2)]">
                The places we point collectors to when it comes to sets, grading, and
                authentication. We do not control these sites and a link is not an endorsement, but
                they are where the hobby actually lives.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {trustedResources.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--hairline)] px-5 py-4 text-[15px] transition-colors hover:border-[var(--foreground)]"
                  >
                    <span>{item.label}</span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-[var(--ink-2)]" strokeWidth={1.75} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 15. Guarantees */}
      <section className="border-t border-[var(--hairline)] py-12">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-4 rounded-2xl border border-[var(--hairline)] p-5 transition-colors hover:border-[var(--foreground)]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--accent-tint)] text-[var(--accent)]">
                  <item.icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="text-[15px] tracking-tight">{item.label}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 16. CTA band */}
      <section className="relative mt-8 overflow-hidden">
        <Image
          src={media.section.storage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <Container className="relative">
          <div className="py-20 text-center sm:py-28">
            <h2 className="mx-auto max-w-2xl text-[28px] font-semibold tracking-[-0.02em] text-white sm:text-[38px]">
              Looking for something we do not list?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-white/80">
              Tell us the set, the language, or the case you are after. We will tell you what we can
              source, what it costs, and how long it takes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[17px]">
              <Link
                href="/talk-to-a-specialist"
                className="text-white underline decoration-white/40 underline-offset-4 hover:opacity-80"
              >
                Talk to a specialist
              </Link>
              <a
                href={site.phoneHref}
                className="text-white underline decoration-white/40 underline-offset-4 hover:opacity-80"
              >
                {site.phone}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* 17. Newsletter */}
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
