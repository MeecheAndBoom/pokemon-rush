import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { brands, getByBrand, languages, productTypes } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type Params = Promise<{ brand: string }>;
type SearchParams = Promise<{ language?: string; type?: string; sort?: string }>;

export async function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { brand } = await params;
  const b = brands.find((x) => x.slug === brand);
  if (!b) return { title: "Not found" };
  return {
    title: `${b.label} cards`,
    description: `${b.blurb} Browse sealed ${b.label} products at Pokemon Rush.`,
  };
}

export default async function BrandPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { brand } = await params;
  const sp = await searchParams;
  const meta = brands.find((b) => b.slug === brand);
  if (!meta) notFound();

  let items = getByBrand(brand);
  if (sp.language) items = items.filter((p) => p.language === sp.language);
  if (sp.type) items = items.filter((p) => p.productType === sp.type);

  if (sp.sort === "price-asc") items = [...items].sort((a, b) => a.price - b.price);
  if (sp.sort === "price-desc") items = [...items].sort((a, b) => b.price - a.price);

  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-4 py-1.5 text-[13px] transition-colors",
      active
        ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
        : "border-[var(--hairline)] text-[var(--ink-2)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
    );

  const href = (patch: Record<string, string | undefined>) => {
    const merged = { ...sp, ...patch };
    const p = new URLSearchParams();
    Object.entries(merged).forEach(([k, v]) => {
      if (v) p.set(k, v as string);
    });
    const qs = p.toString();
    return qs ? `/shop/${brand}?${qs}` : `/shop/${brand}`;
  };

  return (
    <div className="pt-14 pb-10 sm:pt-20">
      <Container>
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

        <div className="mt-10 flex flex-wrap items-center gap-2">
          {languages.map((l) => (
            <Link
              key={l.slug}
              href={href({ language: sp.language === l.slug ? undefined : l.slug })}
              className={chip(sp.language === l.slug)}
            >
              {l.label}
            </Link>
          ))}
          {productTypes.map((t) => (
            <Link
              key={t.slug}
              href={href({ type: sp.type === t.slug ? undefined : t.slug })}
              className={chip(sp.type === t.slug)}
            >
              {t.label}
            </Link>
          ))}
          <Link
            href={href({ sort: sp.sort === "price-asc" ? undefined : "price-asc" })}
            className={chip(sp.sort === "price-asc")}
          >
            Price: low to high
          </Link>
        </div>

        <div className="mt-14">
          <ProductGrid products={items} />
        </div>
      </Container>
    </div>
  );
}
