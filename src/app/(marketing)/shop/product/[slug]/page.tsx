import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { AddToCart } from "@/components/commerce/AddToCart";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { catalog, formatPrice, getProduct, brandLabels } from "@/lib/catalog";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return catalog.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      images: product.images[0]?.url ? [product.images[0].url] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = catalog
    .filter(
      (p) =>
        p.slug !== product.slug &&
        p.status === "published" &&
        (p.brand === product.brand || p.productType === product.productType)
    )
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((i) => i.url),
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: (product.price / 100).toFixed(2),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="pt-10 pb-10 sm:pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <p className="text-[13px] text-[var(--ink-2)]">
          <Link href="/shop" className="hover:text-[var(--foreground)]">
            Shop
          </Link>
          {" / "}
          <Link
            href={`/shop/${product.brand}`}
            className="hover:text-[var(--foreground)]"
          >
            {brandLabels[product.brand] ?? product.brand}
          </Link>
        </p>

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-[var(--surface-2)]">
              {product.images[0] ? (
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].alt || product.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-10"
                />
              ) : null}
            </div>
            {product.images.length > 1 ? (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.images.slice(1, 5).map((img) => (
                  <div
                    key={img.url}
                    className="relative aspect-square overflow-hidden rounded-xl bg-[var(--surface-2)]"
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || product.name}
                      fill
                      sizes="15vw"
                      className="object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="lg:pt-6">
            <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.02em] sm:text-[36px]">
              {product.name}
            </h1>

            <p className="mt-5 flex items-baseline gap-3 text-[22px] tracking-tight">
              {formatPrice(product.price, product.currency)}
              {product.compareAtPrice ? (
                <span className="text-[16px] text-[var(--ink-2)] line-through">
                  {formatPrice(product.compareAtPrice, product.currency)}
                </span>
              ) : null}
            </p>

            <p className="mt-2 text-[13px] text-[var(--ink-2)]">
              {product.preorder ? "Available to reserve now" : "In stock, ready to ship"}
            </p>

            <div className="mt-8">
              <AddToCart product={product} />
            </div>

            <div className="mt-10 space-y-4 border-t border-[var(--hairline)] pt-8">
              {product.highlights.map((h) => (
                <p key={h} className="text-[15px] leading-relaxed text-[var(--ink-2)]">
                  {h}
                </p>
              ))}
            </div>

            <div className="mt-10 border-t border-[var(--hairline)] pt-8">
              <dl className="grid grid-cols-2 gap-y-4 text-[14px]">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[var(--ink-2)]">{k}</dt>
                    <dd className="mt-1">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-20 max-w-3xl">
          <h2 className="text-[22px] font-semibold tracking-tight">Description</h2>
          <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-[var(--ink-2)]">
            {product.description.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {related.length > 0 ? (
          <div className="mt-24">
            <h2 className="text-[22px] font-semibold tracking-tight">You may also like</h2>
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
