import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { importCatalogAction } from "@/app/admin/actions/products";
import { formatPrice } from "@/lib/catalog";

export const dynamic = "force-dynamic";

type Row = {
  id: string;
  name: string;
  slug: string;
  status: string;
  price: number;
  currency: string;
  brand: string;
  language: string;
  productType: string;
};

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; imported?: string; created?: string; deleted?: string }>;
}) {
  const { q, imported, created, deleted } = await searchParams;

  let rows: Row[] = [];
  let error = "";

  try {
    await connectDB();
    const filter = q
      ? { name: { $regex: q, $options: "i" } }
      : {};
    const docs = await Product.find(filter).sort({ createdAt: -1 }).limit(200).lean();
    rows = docs.map((d) => ({
      id: String(d._id),
      name: d.name,
      slug: d.slug,
      status: d.status ?? "draft",
      price: d.price,
      currency: d.currency ?? "USD",
      brand: d.brand ?? "",
      language: d.language ?? "",
      productType: d.productType ?? "",
    }));
  } catch (err) {
    error = err instanceof Error ? err.message : "Database error";
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[26px] font-semibold tracking-[-0.02em]">Products</h1>
        <div className="flex flex-wrap items-center gap-3">
          <form action={importCatalogAction}>
            <button
              type="submit"
              className="inline-flex h-10 items-center rounded-full border border-[var(--hairline)] px-5 text-[14px] hover:border-[var(--foreground)]"
            >
              Import bundled catalogue
            </button>
          </form>
          <Link
            href="/admin/products/new"
            className="inline-flex h-10 items-center rounded-full bg-[var(--accent)] px-5 text-[14px] font-medium text-white"
          >
            New product
          </Link>
        </div>
      </div>

      {imported ? (
        <p className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-[14px] text-green-800">
          Imported {imported} products from the bundled catalogue.
        </p>
      ) : null}
      {created ? (
        <p className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-[14px] text-green-800">
          Product created.
        </p>
      ) : null}
      {deleted ? (
        <p className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-[14px] text-green-800">
          Product deleted.
        </p>
      ) : null}
      {error ? (
        <p className="mt-5 rounded-lg bg-amber-50 px-4 py-3 text-[14px] text-amber-900">
          Database error: {error}
        </p>
      ) : null}

      <form className="mt-6 flex max-w-sm items-center gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search by name"
          className="h-10 flex-1 rounded-lg border border-[var(--hairline)] bg-transparent px-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
        <button
          type="submit"
          className="inline-flex h-10 items-center rounded-full border border-[var(--hairline)] px-4 text-[14px] hover:border-[var(--foreground)]"
        >
          Search
        </button>
      </form>

      <p className="mt-6 text-[13px] text-[var(--ink-2)]">
        {rows.length} {rows.length === 1 ? "product" : "products"}
      </p>

      <ul className="mt-4 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
        {rows.map((row) => (
          <li key={row.id} className="flex items-center gap-4 py-4">
            <div className="min-w-0 flex-1">
              <Link
                href={`/admin/products/${row.id}`}
                className="text-[15px] font-medium leading-snug hover:text-[var(--accent)]"
              >
                {row.name}
              </Link>
              <p className="mt-0.5 text-[13px] text-[var(--ink-2)]">
                {[row.brand, row.language, row.productType].filter(Boolean).join(" · ")}
              </p>
            </div>
            <span className="hidden text-[14px] tabular-nums sm:block">
              {formatPrice(row.price, row.currency)}
            </span>
            <span
              className={`rounded-full px-2.5 py-1 text-[12px] ${
                row.status === "published"
                  ? "bg-green-50 text-green-800"
                  : "bg-[var(--surface-2)] text-[var(--ink-2)]"
              }`}
            >
              {row.status}
            </span>
            <Link
              href={`/admin/products/${row.id}`}
              className="text-[13px] text-[var(--accent)] hover:opacity-70"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>

      {rows.length === 0 && !error ? (
        <p className="mt-8 text-[14px] text-[var(--ink-2)]">
          No products yet. Use &ldquo;Import bundled catalogue&rdquo; to load the 134 products, or
          create one manually.
        </p>
      ) : null}
    </div>
  );
}
