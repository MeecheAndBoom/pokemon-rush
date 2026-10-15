import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
          "/cart",
          "/checkout",
          "/checkout/",
        ],
      },
      // Image and rich-result crawlers are explicitly welcome on product media.
      {
        userAgent: ["Googlebot-Image", "Bingbot", "Googlebot"],
        allow: "/",
        disallow: ["/admin", "/api/", "/cart", "/checkout"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
