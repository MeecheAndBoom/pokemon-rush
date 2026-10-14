import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { brands, getBrandCounts, getFeatured } from "@/lib/catalog";
import { site } from "@/lib/site";

export default function HomePage() {
  const featured = getFeatured(8);
  const brandCounts = getBrandCounts();

  return (
    <>
      <section className="pt-20 pb-16 sm:pt-28 sm:pb-24">
        <Container>
          <h1 className="max-w-3xl text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[64px]">
            Trading cards, sealed and ready to ship.
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[var(--ink-2)] sm:text-[19px]">
            Factory-sealed Pokémon, One Piece, and Weiss Schwarz. Sourced through official
            distribution, checked before dispatch, and packed to arrive exactly as it left.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[17px]">
            <Link
              href="/shop"
              className="text-[var(--accent)] transition-opacity hover:opacity-70"
            >
              Shop all cards
            </Link>
            <Link
              href="/about"
              className="text-[var(--accent)] transition-opacity hover:opacity-70"
            >
              Why collectors buy from us
            </Link>
          </div>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {brandCounts
              .filter((brand) => brand.count > 0)
              .map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/shop/${brand.slug}`}
                  className="group rounded-2xl bg-[var(--surface-2)] p-6 transition-colors hover:bg-[color-mix(in_srgb,var(--surface-2)_70%,var(--foreground)_6%)]"
                >
                  <p className="text-[19px] font-semibold tracking-tight">{brand.label}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--ink-2)]">
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

      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[36px]">
              New in
            </h2>
            <Link href="/shop" className="text-[15px] text-[var(--accent)] hover:opacity-70">
              See everything
            </Link>
          </div>
          <div className="mt-10">
            <ProductGrid products={featured} />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <h3 className="text-[17px] font-semibold tracking-tight">Sealed and verified</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">
                Every box is checked for intact factory seals and clean corners before it is
                packed. If something is not right, we fix it.
              </p>
            </div>
            <div>
              <h3 className="text-[17px] font-semibold tracking-tight">Shipping to 40+ countries</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">
                Orders leave our facility within one business day. Tracking details are sent as
                soon as your parcel is on its way.
              </p>
            </div>
            <div>
              <h3 className="text-[17px] font-semibold tracking-tight">Talk to a person</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">
                Not sure which set to buy? Call {site.phone} or send us a note and we will help
                you choose.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <FeaturedShelf />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="rounded-3xl bg-[var(--surface-2)] px-6 py-14 text-center sm:px-16 sm:py-20">
            <h2 className="mx-auto max-w-2xl text-[28px] font-semibold tracking-[-0.02em] sm:text-[40px]">
              Looking for a set we do not carry yet?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-[var(--ink-2)]">
              Tell us what you are hunting for. We source specific releases and sealed cases on
              request, and we will let you know what is possible.
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

function FeaturedShelf() {
  const picks = brands
    .map((brand) => getFeatured(8).find((p) => p.brand === brand.slug) ?? null)
    .filter(Boolean);

  return (
    <section className="py-4">
      <Container>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {picks.map((product) => {
            if (!product) return null;
            const image = product.images[0];
            return (
              <Link
                key={product.slug}
                href={`/shop/product/${product.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-[var(--surface-2)]"
              >
                <div className="relative aspect-[4/5]">
                  {image ? (
                    <Image
                      src={image.url}
                      alt={image.alt || product.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-8 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  ) : null}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--surface-2)] to-transparent p-6 pt-16">
                  <p className="text-[13px] text-[var(--ink-2)]">Featured</p>
                  <p className="mt-1 text-[16px] font-semibold tracking-tight">
                    {product.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
