import type { Metadata } from "next";
import { absoluteUrl, siteUrl } from "@/lib/site-url";
import { site } from "@/lib/site";
import { brandLabels, productTypeLabels, type CatalogProduct } from "@/lib/catalog";
import { pageSeo } from "@/data/seo";
import { BRAND_ACCENT, BRAND_LOGO_PATH, BRAND_LOGO_SIZE, DEFAULT_OG_IMAGE } from "@/lib/brand";

export { BRAND_ACCENT, BRAND_LOGO_PATH, DEFAULT_OG_IMAGE };

/** Dimensions of the hand-made brand OG image in /public/brand. */
export const OG_IMAGE_SIZE = { width: 1200, height: 675 } as const;

export type OgImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export const defaultOgImage: OgImage = {
  url: DEFAULT_OG_IMAGE,
  width: OG_IMAGE_SIZE.width,
  height: OG_IMAGE_SIZE.height,
  alt: `${site.name} — factory-sealed trading cards`,
};

/** Trims text to a meta-description-friendly length, breaking on a word. */
export function metaDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut;
  return `${base.trimEnd()}…`;
}

/**
 * Builds metadata for a static route straight from the keyword-research data.
 * Throws at build time if a path has no entry, which keeps the table honest.
 */
export function seoMetadata(
  path: keyof typeof pageSeo,
  /** Pass `{ image: null }` when a colocated opengraph-image file renders the card. */
  options: { image?: OgImage | null } = {}
): Metadata {
  const entry = pageSeo[path];
  if (!entry) {
    throw new Error(`No SEO entry registered for "${String(path)}" in src/data/seo.ts`);
  }
  return pageMetadata({
    title: entry.title,
    description: entry.description,
    path,
    keywords: entry.keywords,
    absoluteTitle: entry.absolute,
    image: options.image,
  });
}

type PageMetadataInput = {
  /** Page title. The root layout adds " | PokéStore Direct" unless `absoluteTitle`. */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/shop/pokemon". Used for the canonical URL. */
  path: string;
  keywords?: readonly string[];
  /**
   * Social image. Omit to use the brand default; pass `null` when a colocated
   * `opengraph-image` file supplies the image (file conventions win over config,
   * so setting both would be confusing).
   */
  image?: OgImage | null;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: readonly string[];
  section?: string;
  tags?: readonly string[];
  /** Set for pages that should not be indexed (cart, checkout, thank-you pages). */
  noindex?: boolean;
  /** Bypass the title template when the title already reads as a full sentence. */
  absoluteTitle?: boolean;
};

/**
 * Builds a complete, self-consistent metadata object for a page.
 *
 * Every page defines its own `openGraph`/`twitter` block, which is important:
 * Next.js replaces nested metadata fields wholesale, so a page that only sets
 * `openGraph.title` would drop the description and URL inherited from the root
 * layout.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
  noindex = false,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image === null ? null : (image ?? defaultOgImage);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords?.length ? { keywords: [...keywords] } : {}),
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true, nocache: true }
      : { index: true, follow: true },
    openGraph: {
      type,
      siteName: site.name,
      title,
      description,
      url,
      locale: "en_US",
      ...(ogImage ? { images: [ogImage] } : {}),
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors: authors ? [...authors] : undefined,
            section,
            tags: tags ? [...tags] : undefined,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage.url] } : {}),
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Structured data                                                            */
/* -------------------------------------------------------------------------- */

export type OrgProfile = {
  name: string;
  description: string;
  email: string;
  phone: string;
  addressLine: string;
  address: { line1: string; line2: string; city: string; country: string };
};

/** Splits "Los Angeles, CA" into a locality and a region when possible. */
function postalAddress(address: OrgProfile["address"], addressLine: string) {
  const [cityPart, regionPart] = (address.city || "").split(",").map((p) => p.trim());
  const street = [address.line1, address.line2].map((p) => p.trim()).filter(Boolean).join(", ");
  return {
    "@type": "PostalAddress" as const,
    ...(street ? { streetAddress: street } : {}),
    ...(cityPart ? { addressLocality: cityPart } : {}),
    ...(regionPart ? { addressRegion: regionPart } : {}),
    ...(address.country ? { addressCountry: address.country } : {}),
    ...(!cityPart && addressLine ? { addressLocality: addressLine } : {}),
  };
}

/** Organization + WebSite graph that every page can reference. */
export function organizationJsonLd(profile: OrgProfile) {
  return {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: profile.name,
    url: siteUrl,
    description: profile.description,
    email: profile.email,
    telephone: profile.phone,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(BRAND_LOGO_PATH),
      width: BRAND_LOGO_SIZE.width,
      height: BRAND_LOGO_SIZE.height,
    },
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    address: postalAddress(profile.address, profile.addressLine),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: profile.email,
        telephone: profile.phone,
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
    ],
  };
}

export function webSiteJsonLd(profile: OrgProfile) {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: profile.name,
    description: profile.description,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/shop?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Organization + WebSite in a single @graph block. */
export function siteGraphJsonLd(profile: OrgProfile) {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(profile), webSiteJsonLd(profile)],
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(items: readonly Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListJsonLd(
  name: string,
  items: readonly { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(item.path),
      name: item.name,
    })),
  };
}

export function productJsonLd(product: CatalogProduct, profile: OrgProfile) {
  const url = absoluteUrl(`/shop/product/${product.slug}`);
  const category = [
    brandLabels[product.brand] ?? product.brand,
    productTypeLabels[product.productType] ?? product.productType,
  ];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: product.description,
    url,
    sku: product.slug,
    mpn: product.slug,
    category: category.join(" > "),
    image: product.images.map((image) => image.url),
    brand: { "@type": "Brand", name: brandLabels[product.brand] ?? product.brand },
    manufacturer: { "@type": "Organization", name: brandLabels[product.brand] ?? product.brand },
    itemCondition: "https://schema.org/NewCondition",
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/shop/product/${product.slug}`),
      priceCurrency: product.currency,
      price: (product.price / 100).toFixed(2),
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      availability: product.preorder
        ? "https://schema.org/PreOrder"
        : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${siteUrl}/#organization` },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/ReturnShippingFees",
        merchantReturnLink: absoluteUrl("/returns-refunds"),
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingSettingsLink: absoluteUrl("/shipping-delivery"),
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
      },
    },
  };
}

export function itemListJsonLdForProducts(
  name: string,
  products: readonly CatalogProduct[],
  path: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: absoluteUrl(path),
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/shop/product/${product.slug}`),
      name: product.name,
    })),
  };
}

export type ArticleInput = {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  image: string;
};

export function articleJsonLd(post: ArticleInput, profile: OrgProfile) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    author: { "@type": "Organization", name: post.author, url: siteUrl },
    publisher: { "@id": `${siteUrl}/#organization`, name: profile.name },
    image: [post.image.startsWith("http") ? post.image : absoluteUrl(post.image)],
    inLanguage: "en",
  };
}

export function faqJsonLd(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function contactPageJsonLd(profile: OrgProfile) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${profile.name}`,
    url: absoluteUrl("/contact"),
    mainEntity: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: profile.name,
      email: profile.email,
      telephone: profile.phone,
      address: postalAddress(profile.address, profile.addressLine),
    },
  };
}

export type CollectionInput = {
  name: string;
  description: string;
  path: string;
  products: readonly CatalogProduct[];
};

export function collectionPageJsonLd(collection: CollectionInput) {
  const url = absoluteUrl(collection.path);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.name,
    description: collection.description,
    url,
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: collection.products.length,
      itemListElement: collection.products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/shop/product/${product.slug}`),
        name: product.name,
      })),
    },
  };
}

/** Human-readable product type label, used in titles and schema. */
export function productTypeLabel(product: CatalogProduct) {
  return productTypeLabels[product.productType] ?? "Sealed product";
}
