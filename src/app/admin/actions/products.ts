"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { catalog } from "@/lib/catalog";
import { requireSession } from "@/app/admin/actions/auth";

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function toCents(value: string | null) {
  const n = Number(String(value || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? Math.round(n * 100) : 0;
}

function lines(value: string | null) {
  return String(value || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function parseImages(value: string | null, name: string) {
  const raw = String(value || "").trim();
  if (!raw) return [];
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((url) => ({ url, alt: name }));
}

function buildPayload(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const specsRaw = String(formData.get("specs") || "");
  const specs: Record<string, string> = {};
  specsRaw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .forEach((line) => {
      const [k, ...rest] = line.split(":");
      if (k && rest.length) specs[k.trim()] = rest.join(":").trim();
    });

  return {
    name,
    slug: slugInput ? slugify(slugInput) : slugify(name),
    subtitle: String(formData.get("subtitle") || ""),
    brand: String(formData.get("brand") || "pokemon"),
    language: String(formData.get("language") || "english"),
    productType: String(formData.get("productType") || "booster-box"),
    setName: String(formData.get("setName") || ""),
    price: toCents(String(formData.get("price") || "")),
    compareAtPrice: formData.get("compareAtPrice")
      ? toCents(String(formData.get("compareAtPrice")))
      : undefined,
    currency: String(formData.get("currency") || "USD"),
    condition: String(formData.get("condition") || "new-sealed"),
    description: String(formData.get("description") || ""),
    highlights: lines(String(formData.get("highlights") || "")),
    specs,
    images: parseImages(String(formData.get("images") || ""), name),
    tags: String(formData.get("tags") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    status: String(formData.get("status") || "draft"),
    featured: formData.get("featured") === "on",
  };
}

export async function createProductAction(formData: FormData) {
  await requireSession();
  await connectDB();
  const payload = buildPayload(formData);
  if (!payload.name) redirect("/admin/products/new?error=name");
  try {
    await Product.create(payload);
  } catch {
    redirect(`/admin/products/new?error=duplicate`);
  }
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect("/admin/products?created=1");
}

export async function updateProductAction(formData: FormData) {
  await requireSession();
  await connectDB();
  const id = String(formData.get("id") || "");
  const payload = buildPayload(formData);
  await Product.updateOne({ _id: id }, { $set: payload });
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
  revalidatePath("/shop");
  redirect(`/admin/products/${id}?saved=1`);
}

export async function deleteProductAction(formData: FormData) {
  await requireSession();
  await connectDB();
  const id = String(formData.get("id") || "");
  await Product.deleteOne({ _id: id });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect("/admin/products?deleted=1");
}

export async function importCatalogAction() {
  await requireSession();
  await connectDB();

  const operations = catalog.map((p) => ({
    updateOne: {
      filter: { slug: p.slug },
      update: {
        $set: {
          name: p.name,
          slug: p.slug,
          subtitle: p.subtitle ?? "",
          setName: p.setName ?? "",
          brand: p.brand,
          language: p.language === "n/a" ? "n/a" : p.language,
          productType: p.productType,
          price: p.price,
          compareAtPrice: p.compareAtPrice ?? undefined,
          currency: p.currency,
          condition: p.condition,
          description: p.description,
          highlights: p.highlights,
          specs: p.specs,
          images: p.images,
          tags: p.tags,
          status: p.status,
          featured: p.featured,
        },
      },
      upsert: true,
    },
  }));

  let imported = 0;
  const chunkSize = 50;
  for (let i = 0; i < operations.length; i += chunkSize) {
    const chunk = operations.slice(i, i + chunkSize);
    // The catalogue types are intentionally looser than the schema unions.
    const res = await Product.bulkWrite(chunk as never[], { ordered: false });
    imported += (res.upsertedCount || 0) + (res.modifiedCount || 0);
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect(`/admin/products?imported=${operations.length}`);
}

