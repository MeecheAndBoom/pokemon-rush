import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { brands, filterProducts, languages, productTypes } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shop all trading cards",
  description:
    "Browse every sealed Pokémon, One Piece, and Weiss Schwarz product we stock, including booster boxes, bundles, Elite Trainer Boxes, and cases.",
};

type SearchParams = Promise<{
  brand?: string;
  language?: string;
  type?: string;
  sort?: string;
  q?: string;
}>;

function buildHref(
  base: Record<string, string | undefined>,
  patch: Record<string, string | undefined>
) {
  const merged = { ...base, ...patch };
  const params = new URLSearchParams();
  Object.entries(merged).forEach(([k, v]) => {
    if (v) params.set(k, v);
  });
  const qs = params.toString();
  return qs ? `/shop?${qs}` : "/shop";
}

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const items = filterProducts(sp);

  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-4 py-1.5 text-[13px] transition-colors",
      active
        ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
        : "border-[var(--hairline)] text-[var(--ink-2)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
    );

  return (
    <div className="pt-14 pb-10 sm:pt-20">
      <Container>
        <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">Shop</h1>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[var(--ink-2)]">
          {items.length} sealed {items.length === 1 ? "product" : "products"} available. Every
          item is checked before dispatch.
        </p>

        <div className="mt-10 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={buildHref(sp, { brand: undefined })} className={chip(!sp.brand)}>
              All
            </Link>
            {brands.map((b) => (
              <Link
                key={b.slug}
                href={buildHref(sp, { brand: b.slug })}
                className={chip(sp.brand === b.slug)}
              >
                {b.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {languages.map((l) => (
              <Link
                key={l.slug}
                href={buildHref(sp, { language: sp.language === l.slug ? undefined : l.slug })}
                className={chip(sp.language === l.slug)}
              >
                {l.label}
              </Link>
            ))}
            {productTypes.map((t) => (
              <Link
                key={t.slug}
                href={buildHref(sp, { type: sp.type === t.slug ? undefined : t.slug })}
                className={chip(sp.type === t.slug)}
              >
                {t.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href={buildHref(sp, { sort: undefined })} className={chip(!sp.sort)}>
              Featured
            </Link>
            <Link
              href={buildHref(sp, { sort: "price-asc" })}
              className={chip(sp.sort === "price-asc")}
            >
              Price: low to high
            </Link>
            <Link
              href={buildHref(sp, { sort: "price-desc" })}
              className={chip(sp.sort === "price-desc")}
            >
              Price: high to low
            </Link>
            <Link
              href={buildHref(sp, { sort: "name-asc" })}
              className={chip(sp.sort === "name-asc")}
            >
              Name
            </Link>
          </div>
        </div>

        <div className="mt-14">
          <ProductGrid products={items} />
        </div>
      </Container>
    </div>
  );
}
