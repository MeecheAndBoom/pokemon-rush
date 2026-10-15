import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { CatalogListing } from "@/components/commerce/CatalogListing";
import { ShopBrowser } from "@/components/commerce/ShopBrowser";
import { ShopSearch } from "@/components/commerce/ShopSearch";
import { SearchBox } from "@/components/layout/SearchBox";
import { DecorativeArt } from "@/components/content/DecorativeArt";
import { JsonLd } from "@/components/seo/JsonLd";
import { brands, catalogCards, getByBrand, languages, productTypes } from "@/lib/catalog";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";
import { buildListingView, type SortOption } from "@/lib/shop-listing";
import { breadcrumbJsonLd, itemListJsonLdForProducts, pageMetadata } from "@/lib/seo";
import { brandSeo } from "@/data/seo";

type Params = Promise<{ brand: string }>;

// Filtering happens in the browser (see ShopBrowser), so each brand page is
// prerendered from generateStaticParams.
const BRAND_SORTS: readonly SortOption[] = [{ value: "price-asc", label: "Price: low to high" }];

export function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { brand } = await params;
  const entry = brandSeo[brand];
  const meta = brands.find((x) => x.slug === brand);
  if (!entry || !meta) return { title: "Brand not found", robots: { index: false } };
  return pageMetadata({
    title: entry.title,
    description: entry.description,
    path: `/shop/${brand}`,
    keywords: entry.keywords,
    // The colocated opengraph-image.tsx supplies the social image.
    image: null,
  });
}

export default async function BrandPage({ params }: { params: Params }) {
  const { brand } = await params;
  const meta = brands.find((b) => b.slug === brand);
  if (!meta) notFound();

  const brandArt: Record<string, string | undefined> = {
    pokemon: media.art.pikachu,
    "one-piece": media.art.luffy,
    "weiss-schwarz": media.art.tanjiro,
    accessories: media.art.snorlax,
  };
  const brandArtSecondary: Record<string, string | undefined> = {
    pokemon: media.art.charizard,
    "one-piece": media.art.zoro,
    "weiss-schwarz": media.art.deku,
    accessories: media.art.mewtwo,
  };
  const brandTint: Record<string, string> = {
    pokemon: "from-[var(--tint-yellow)]",
    "one-piece": "from-[var(--tint-blue)]",
    "weiss-schwarz": "from-[var(--tint-purple)]",
    accessories: "from-[var(--tint-green)]",
  };
  const heroArt = brandArt[brand];
  const heroArtSecondary = brandArtSecondary[brand];
  const heroTint = brandTint[brand] ?? "from-[var(--tint-blue)]";

  const all = getByBrand(brand);
  const products = catalogCards(all);
  const basePath = `/shop/${brand}`;
  const view = buildListingView({
    products,
    query: {},
    basePath,
    languages,
    productTypes,
    sorts: BRAND_SORTS,
  });

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: meta.label, path: `/shop/${brand}` },
  ];

  return (
    <div className="pb-16">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={itemListJsonLdForProducts(
          `${meta.label} — sealed trading cards`,
          all,
          `/shop/${brand}`
        )}
      />
      <section
        className={cn(
          "relative border-b border-[var(--hairline)] bg-gradient-to-b to-[var(--background)] py-12 sm:py-16",
          heroTint
        )}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {heroArt ? (
            <DecorativeArt
              src={heroArt}
              opacity={0.13}
              className="-right-8 -top-4 w-[170px] sm:-right-12 sm:w-[250px] lg:w-[330px]"
            />
          ) : null}
          {heroArtSecondary ? (
            <DecorativeArt
              src={heroArtSecondary}
              opacity={0.08}
              className="-left-8 -bottom-8 w-[150px] sm:-left-14 sm:w-[210px] lg:w-[290px]"
            />
          ) : null}
        </div>
        <Container className="relative">
          <p className="text-[13px] text-[var(--ink-2)]">
            <Link href="/shop" className="hover:text-[var(--foreground)]">
              Shop
            </Link>
          </p>
          <h1 className="mt-4 text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">
            {meta.label}
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[var(--ink-2)]">
            {meta.blurb}
          </p>

          <div className="mt-8 max-w-md">
            <Suspense fallback={<SearchBox placeholder={`Search ${meta.label}`} />}>
              <ShopSearch placeholder={`Search ${meta.label}`} />
            </Suspense>
          </div>
        </Container>
      </section>

      <Container>
        <Suspense fallback={<CatalogListing view={view} />}>
          <ShopBrowser
            products={products}
            basePath={basePath}
            languages={languages}
            productTypes={productTypes}
            sorts={BRAND_SORTS}
          />
        </Suspense>
      </Container>
    </div>
  );
}
