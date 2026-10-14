import Link from "next/link";
import { ProductForm } from "@/components/admin/ProductForm";
import { createProductAction } from "@/app/admin/actions/products";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  return (
    <div>
      <p className="text-[13px] text-[var(--ink-2)]">
        <Link href="/admin/products" className="hover:text-[var(--foreground)]">
          Products
        </Link>
      </p>
      <h1 className="mt-3 text-[26px] font-semibold tracking-[-0.02em]">New product</h1>
      <div className="mt-10">
        <ProductForm action={createProductAction} submitLabel="Create product" />
      </div>
    </div>
  );
}
