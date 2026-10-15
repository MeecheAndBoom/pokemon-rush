import type { MetadataRoute } from "next";
import { catalog, brands } from "@/lib/catalog";
import { posts } from "@/data/posts";
import { legalDocs } from "@/data/legal";
import { siteUrl } from "@/lib/site-url";

// Sitemap entries are rebuilt whenever the catalogue or posts change.
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1, changeFrequency: "daily" },
    { path: "/shop", priority: 0.9, changeFrequency: "daily" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/services", priority: 0.7, changeFrequency: "monthly" },
    { path: "/reviews", priority: 0.5, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/support", priority: 0.6, changeFrequency: "monthly" },
    { path: "/track-order", priority: 0.4, changeFrequency: "monthly" },
    { path: "/shipping-delivery", priority: 0.6, changeFrequency: "monthly" },
    { path: "/returns-refunds", priority: 0.5, changeFrequency: "monthly" },
    { path: "/wholesale", priority: 0.7, changeFrequency: "monthly" },
    { path: "/talk-to-a-specialist", priority: 0.6, changeFrequency: "monthly" },
    { path: "/finance-disclosure", priority: 0.3, changeFrequency: "yearly" },
    { path: "/legal", priority: 0.3, changeFrequency: "yearly" },
    { path: "/legal/sitemap", priority: 0.2, changeFrequency: "yearly" },
  ].map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: route.priority,
  }));

  const brandRoutes: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${siteUrl}/shop/${brand.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.9,
  }));

  const productRoutes: MetadataRoute.Sitemap = catalog
    .filter((product) => product.status === "published")
    .map((product) => ({
      url: `${siteUrl}/shop/product/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const legalRoutes: MetadataRoute.Sitemap = Object.keys(legalDocs).map((slug) => ({
    url: `${siteUrl}/legal/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.2,
  }));

  return [...staticRoutes, ...brandRoutes, ...productRoutes, ...postRoutes, ...legalRoutes];
}
