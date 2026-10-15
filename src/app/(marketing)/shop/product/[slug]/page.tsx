import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { AddToCart } from "@/components/commerce/AddToCart";
import { ProductGallery } from "@/components/commerce/ProductGallery";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { catalog, formatPrice, getProduct, brandLabels } from "@/lib/catalog";
import { getSiteSettings } from "@/lib/settings";
import { breadcrumbJsonLd, metaDescription, pageMetadata, productJsonLd } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return catalog.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found", robots: { index: false } };
  const brand = brandLabels[product.brand] ?? product.brand;
  return pageMetadata({
    title: product.name,
    description: metaDescription(product.description),
    path: `/shop/product/${product.slug}`,
    keywords: [product.name, brand, product.setName, ...product.tags]
      .filter((value): value is string => Boolean(value))
      .slice(0, 10),
    // Images come from the colocated opengraph-image route.
    image: null,
  });
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const settings = await getSiteSettings();
  const brand = brandLabels[product.brand] ?? product.brand;

  const related = catalog
    .filter(
      (p) =>
        p.slug !== product.slug &&
        p.status === "published" &&
        (p.brand === product.brand || p.productType === product.productType)
    )
    .slice(0, 4);

  const profile = {
    name: settings.name,
    description: settings.description,
    email: settings.email,
    phone: settings.phone,
    addressLine: settings.addressLine,
    address: settings.address,
  };

  const jsonLd = productJsonLd(product, profile);
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: brand, path: `/shop/${product.brand}` },
    { name: product.name, path: `/shop/product/${product.slug}` },
  ]);

  return (
    <div className="pt-10 pb-10 sm:pt-14">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbs} />
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
            {brand}
          </Link>
        </p>

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <ProductGallery images={product.images} name={product.name} />
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
