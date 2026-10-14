import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Pagination } from "@/components/commerce/Pagination";
import { SearchBox } from "@/components/layout/SearchBox";
import { DecorativeArt } from "@/components/content/DecorativeArt";
import { brands, getByBrand, languages, productTypes } from "@/lib/catalog";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

type Params = Promise<{ brand: string }>;
type SearchParams = Promise<{
  language?: string;
  type?: string;
  sort?: string;
  q?: string;
  page?: string;
}>;

const PAGE_SIZE = 24;

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

  let all = getByBrand(brand);
  if (sp.language) all = all.filter((p) => p.language === sp.language);
  if (sp.type) all = all.filter((p) => p.productType === sp.type);
  if (sp.q) {
    const q = sp.q.toLowerCase();
    all = all.filter(
      (p) => p.name.toLowerCase().includes(q) || p.tags.join(" ").toLowerCase().includes(q)
    );
  }

  if (sp.sort === "price-asc") all = [...all].sort((a, b) => a.price - b.price);
  if (sp.sort === "price-desc") all = [...all].sort((a, b) => b.price - a.price);
  if (sp.sort === "name-asc") all = [...all].sort((a, b) => a.name.localeCompare(b.name));

  const parsedPage = Number.parseInt(sp.page ?? "1", 10);
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const current = Math.min(Math.max(Number.isNaN(parsedPage) ? 1 : parsedPage, 1), totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const items = all.slice(start, start + PAGE_SIZE);

  const base: Record<string, string | undefined> = { ...sp, page: undefined };
  const href = (patch: Record<string, string | undefined>) => {
    const merged = { ...base, ...patch };
    const p = new URLSearchParams();
    Object.entries(merged).forEach(([k, v]) => {
      if (v) p.set(k, v as string);
    });
    const qs = p.toString();
    return qs ? `/shop/${brand}?${qs}` : `/shop/${brand}`;
  };

  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-4 py-1.5 text-[13px] transition-colors",
      active
        ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
        : "border-[var(--hairline)] text-[var(--ink-2)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
    );

  return (
    <div className="pb-16">
      <section
        className={cn(
          "relative overflow-hidden border-b border-[var(--hairline)] bg-gradient-to-b to-[var(--background)] py-12 sm:py-16",
          heroTint
        )}
      >
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
            <SearchBox
              defaultValue={sp.q ?? ""}
              placeholder={`Search ${meta.label}`}
            />
          </div>
        </Container>
      </section>

      <Container>
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

        <div className="mt-10 flex items-baseline justify-between gap-4 border-b border-[var(--hairline)] pb-4">
          <p className="text-[13px] text-[var(--ink-2)]">
            Showing {all.length === 0 ? 0 : start + 1}–{Math.min(start + PAGE_SIZE, all.length)} of{" "}
            {all.length}
          </p>
          {totalPages > 1 ? (
            <p className="text-[13px] text-[var(--ink-2)]">
              Page {current} of {totalPages}
            </p>
          ) : null}
        </div>

        <div className="mt-10">
          <ProductGrid products={items} />
        </div>

        <Pagination
          current={current}
          total={totalPages}
          hrefForPage={(page) => href({ page: page === 1 ? undefined : String(page) })}
          className="mt-16"
        />
      </Container>
    </div>
  );
}
