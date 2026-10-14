import type { MetadataRoute } from "next";
import { catalog, brands, productTypes } from "@/lib/catalog";
import { posts } from "@/data/posts";
import { legalDocs } from "@/data/legal";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/shop",
    "/about",
    "/services",
    "/blog",
    "/reviews",
    "/contact",
    "/support",
    "/track-order",
    "/shipping-delivery",
    "/returns-refunds",
    "/finance-disclosure",
    "/talk-to-a-specialist",
    "/wholesale",
    "/legal",
    "/legal/sitemap",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const shopRoutes = [
    ...brands.map((b) => `/shop/${b.slug}`),
    ...productTypes.map((t) => `/shop?type=${t.slug}`),
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const productRoutes = catalog.map((p) => ({
    url: `${base}/shop/product/${p.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const legalRoutes = Object.keys(legalDocs).map((slug) => ({
    url: `${base}/legal/${slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...staticRoutes, ...shopRoutes, ...productRoutes, ...postRoutes, ...legalRoutes];
}
