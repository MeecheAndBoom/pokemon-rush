import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Pagination } from "@/components/commerce/Pagination";
import { SearchBox } from "@/components/layout/SearchBox";
import { brands, filterProducts, languages, productTypes } from "@/lib/catalog";
import { media } from "@/lib/media";
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
  page?: string;
}>;

const PAGE_SIZE = 24;

function withPage(
  base: Record<string, string | undefined>,
  page: number
): string {
  const merged: Record<string, string | undefined> = {
    ...base,
    page: page > 1 ? String(page) : undefined,
  };
  const params = new URLSearchParams();
  Object.entries(merged).forEach(([k, v]) => {
    if (v) params.set(k, v);
  });
  const qs = params.toString();
  return qs ? `/shop?${qs}` : "/shop";
}

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const all = filterProducts(sp);

  const parsedPage = Number.parseInt(sp.page ?? "1", 10);
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const current = Math.min(Math.max(Number.isNaN(parsedPage) ? 1 : parsedPage, 1), totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const items = all.slice(start, start + PAGE_SIZE);

  const baseParams: Record<string, string | undefined> = { ...sp, page: undefined };
  const buildHref = (patch: Record<string, string | undefined>) => {
    const merged = { ...baseParams, ...patch };
    const params = new URLSearchParams();
    Object.entries(merged).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    const qs = params.toString();
    return qs ? `/shop?${qs}` : "/shop";
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
      <section className="relative overflow-hidden border-b border-[var(--hairline)] bg-gradient-to-b from-[var(--tint-blue)] to-[var(--background)]">
        <Image
          src={media.art.charizard}
          alt=""
          width={320}
          height={320}
          aria-hidden
          className="pointer-events-none absolute -right-10 top-0 hidden opacity-[0.13] lg:block"
        />
        <Container className="pt-12 pb-10 sm:pt-16">
          <h1 className="text-[36px] font-semibold tracking-[-0.03em] sm:text-[48px]">Shop</h1>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[var(--ink-2)]">
            {all.length} sealed {all.length === 1 ? "product" : "products"} available. Every item is
            checked before dispatch.
          </p>

          <div className="mt-8 max-w-md">
            <SearchBox defaultValue={sp.q ?? ""} placeholder="Search sets, boxes, accessories" />
          </div>
        </Container>
      </section>

      <Container>
        <div className="mt-10 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={buildHref({ brand: undefined })} className={chip(!sp.brand)}>
              All
            </Link>
            {brands.map((b) => (
              <Link
                key={b.slug}
                href={buildHref({ brand: b.slug })}
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
                href={buildHref({ language: sp.language === l.slug ? undefined : l.slug })}
                className={chip(sp.language === l.slug)}
              >
                {l.label}
              </Link>
            ))}
            {productTypes.map((t) => (
              <Link
                key={t.slug}
                href={buildHref({ type: sp.type === t.slug ? undefined : t.slug })}
                className={chip(sp.type === t.slug)}
              >
                {t.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href={buildHref({ sort: undefined })} className={chip(!sp.sort)}>
              Featured
            </Link>
            <Link href={buildHref({ sort: "price-asc" })} className={chip(sp.sort === "price-asc")}>
              Price: low to high
            </Link>
            <Link
              href={buildHref({ sort: "price-desc" })}
              className={chip(sp.sort === "price-desc")}
            >
              Price: high to low
            </Link>
            <Link href={buildHref({ sort: "name-asc" })} className={chip(sp.sort === "name-asc")}>
              Name
            </Link>
          </div>
        </div>

        <div className="mt-10 flex items-baseline justify-between gap-4 border-b border-[var(--hairline)] pb-4">
          <p className="text-[13px] text-[var(--ink-2)]">
            {sp.q ? (
              <>
                Results for <span className="text-[var(--foreground)]">“{sp.q}”</span>
                {" · "}
              </>
            ) : null}
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
          hrefForPage={(page) => buildHref({ page: page === 1 ? undefined : String(page) })}
          className="mt-16"
        />
      </Container>
    </div>
  );
}
