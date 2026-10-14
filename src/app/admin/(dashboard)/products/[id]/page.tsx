import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { ProductForm } from "@/components/admin/ProductForm";
import { deleteProductAction, updateProductAction } from "@/app/admin/actions/products";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;

  await connectDB();
  const doc = await Product.findById(id).lean();
  if (!doc) notFound();

  return (
    <div>
      <p className="text-[13px] text-[var(--ink-2)]">
        <Link href="/admin/products" className="hover:text-[var(--foreground)]">
          Products
        </Link>
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[26px] font-semibold tracking-[-0.02em]">{doc.name}</h1>
        <Link
          href={`/shop/product/${doc.slug}`}
          className="text-[14px] text-[var(--accent)] hover:opacity-70"
        >
          View on site
        </Link>
      </div>

      {saved ? (
        <p className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-[14px] text-green-800">
          Changes saved.
        </p>
      ) : null}

      <div className="mt-10">
        <ProductForm
          action={updateProductAction}
          submitLabel="Save changes"
          product={{
            id: String(doc._id),
            name: doc.name,
            slug: doc.slug,
            subtitle: doc.subtitle,
            brand: doc.brand,
            language: doc.language,
            productType: doc.productType,
            setName: doc.setName,
            price: doc.price,
            compareAtPrice: doc.compareAtPrice ?? null,
            currency: doc.currency,
            condition: doc.condition,
            status: doc.status,
            featured: doc.featured,
            tags: doc.tags,
            description: doc.description,
            highlights: doc.highlights,
            specs: (doc.specs ?? {}) as Record<string, string>,
            images: (doc.images ?? []).map((i) => ({ url: i.url })),
          }}
        />
      </div>

      <form action={deleteProductAction} className="mt-10 border-t border-[var(--hairline)] pt-6">
        <input type="hidden" name="id" value={String(doc._id)} />
        <button
          type="submit"
          className="text-[14px] text-red-600 underline-offset-4 hover:underline"
        >
          Delete this product
        </button>
      </form>
    </div>
  );
}
