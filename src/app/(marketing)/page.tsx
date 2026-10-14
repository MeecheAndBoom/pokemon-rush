import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Headphones,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Stars } from "@/components/content/Stars";
import { brands, catalog, getBrandCounts, getFeatured } from "@/lib/catalog";
import { reviewSummary, reviews } from "@/data/reviews";
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

export default function HomePage() {
  const featured = getFeatured(8);
  const brandCounts = getBrandCounts();
  const hero = featured[0];
  const stats = [
    { value: `${catalog.length}+`, label: "Sealed products listed" },
    { value: `${brands.length}`, label: "Card brands stocked" },
    { value: "40+", label: "Countries shipped to" },
    { value: reviewSummary.average.toFixed(1), label: `Average from ${reviewSummary.count} reviews` },
  ];

  return (
    <>
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <h1 className="max-w-2xl text-[40px] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-[60px]">
                Trading cards, sealed and ready to ship.
              </h1>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[var(--ink-2)] sm:text-[19px]">
                Factory-sealed Pokémon, One Piece, and Weiss Schwarz. Sourced through official
                distribution, checked before dispatch, and packed to arrive exactly as it left.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[17px]">
                <Link href="/shop" className="text-[var(--accent)] transition-opacity hover:opacity-70">
                  Shop all cards
                </Link>
                <Link
                  href="/about"
                  className="text-[var(--accent)] transition-opacity hover:opacity-70"
                >
                  Why collectors buy from us
                </Link>
              </div>
            </div>

            {hero ? (
              <Link
                href={`/shop/product/${hero.slug}`}
                className="group relative block overflow-hidden rounded-3xl bg-[var(--surface-2)]"
              >
                <div className="relative aspect-[4/3] sm:aspect-[5/4]">
                  {hero.images[0] ? (
                    <Image
                      src={hero.images[0].url}
                      alt={hero.images[0].alt || hero.name}
                      fill
                      priority
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      className="object-contain p-12 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  ) : null}
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[var(--surface-2)] to-transparent p-6 pt-20">
                  <div>
                    <p className="text-[13px] text-[var(--ink-2)]">New in</p>
                    <p className="mt-1 max-w-xs text-[16px] font-semibold tracking-tight">
                      {hero.name}
                    </p>
                  </div>
                </div>
              </Link>
            ) : null}
          </div>
        </Container>
      </section>

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

      <section className="py-16 sm:py-24">
        <Container>
          <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[36px]">
            Shop by collection
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--ink-2)]">
            Four houses of cards, one standard: authentic product, honestly described, packed to
            survive the trip.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {brandCounts
              .filter((brand) => brand.count > 0)
              .map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/shop/${brand.slug}`}
                  className="group flex flex-col rounded-2xl bg-[var(--surface-2)] p-6 transition-colors hover:bg-[color-mix(in_srgb,var(--surface-2)_70%,var(--foreground)_6%)]"
                >
                  <p className="text-[19px] font-semibold tracking-tight">{brand.label}</p>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[var(--ink-2)]">
                    {brand.blurb}
                  </p>
                  <p className="mt-6 text-[13px] text-[var(--ink-2)]">
                    {brand.count} {brand.count === 1 ? "item" : "items"}
                  </p>
                </Link>
              ))}
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container>
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[36px]">New in</h2>
            <Link href="/shop" className="text-[15px] text-[var(--accent)] hover:opacity-70">
              See everything
            </Link>
          </div>
          <div className="mt-10">
            <ProductGrid products={featured} />
          </div>
        </Container>
      </section>

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

      <section className="bg-[var(--surface-2)] py-16 sm:py-24">
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
                  “{review.body}”
                </p>
                <p className="mt-5 text-[13px] text-[var(--ink-2)]">
                  {review.name} · {review.location}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[36px]">
                Built for collectors, not for upsells
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-[var(--ink-2)]">
                We are collectors first. That means we stock the releases you actually want, describe
                condition plainly, and never push you toward a more expensive box than you need.
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-[var(--ink-2)]">
                Whether you are building a binder, breaking boxes for content, or stacking sealed
                product for the long haul, the same standard applies to every order.
              </p>
            </div>
            <ul className="space-y-6">
              {[
                {
                  icon: BadgeCheck,
                  title: "Authentic, official distribution",
                  body: "No middlemen and no grey-market stock. Japanese and English printings, both sourced properly.",
                },
                {
                  icon: PackageCheck,
                  title: "Packed to protect value",
                  body: "Rigid outer cartons, void fill, and sealed inner protection so corners and seals arrive untouched.",
                },
                {
                  icon: ShieldCheck,
                  title: "Inspected before dispatch",
                  body: "Anything that fails our check is set aside and replaced rather than shipped with an apology.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4">
                  <item.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-[16px] font-semibold tracking-tight">{item.title}</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--ink-2)]">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="rounded-3xl bg-[var(--surface-2)] px-6 py-14 text-center sm:px-16">
            <h2 className="text-[24px] font-semibold tracking-tight sm:text-[30px]">
              Looking for something we do not list?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-[var(--ink-2)]">
              Tell us the set, the language, or the case you are after. We will tell you what we can
              source and what it costs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[17px]">
              <Link href="/talk-to-a-specialist" className="text-[var(--accent)] hover:opacity-70">
                Talk to a specialist
              </Link>
              <a href={site.phoneHref} className="text-[var(--accent)] hover:opacity-70">
                {site.phone}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
