import { NextResponse } from "next/server";
import { brands, catalogCards, languages, productTypes, publishedProducts } from "@/lib/catalog";
import { brandLabels, productTypeLabels } from "@/lib/product-meta";
import {
  EMPTY_SEARCH_RESPONSE,
  MIN_SEARCH_LENGTH,
  matchCategories,
  matchesQuery,
  rankProducts,
  type SearchResponse,
} from "@/lib/search";

/**
 * Type-ahead used by the site search box. Returns a handful of ranked products
 * plus matching brand / type / language shortcuts, and the total the listing
 * would show for the same term so the panel can offer "see all N results".
 *
 * The catalogue is a static JSON file, so nothing here touches the database and
 * the whole payload is cacheable per query string.
 */
export const dynamic = "force-dynamic";

const MAX_PRODUCTS = 6;

export async function GET(request: Request) {
  const query = (new URL(request.url).searchParams.get("q") ?? "").trim();

  if (query.length < MIN_SEARCH_LENGTH) {
    return NextResponse.json(
      { ...EMPTY_SEARCH_RESPONSE, query },
      { headers: { "Cache-Control": "public, max-age=0, s-maxage=60" } }
    );
  }

  const products = catalogCards(publishedProducts());
  const total = products.filter((product) => matchesQuery(product.search, query)).length;

  const payload: SearchResponse = {
    query,
    total,
    products: rankProducts(products, query, MAX_PRODUCTS).map((product) => ({
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      brandLabel: brandLabels[product.brand] ?? product.brand,
      typeLabel: productTypeLabels[product.productType] ?? product.productType,
      price: product.price,
      currency: product.currency,
      image: product.images[0]?.url ?? null,
      imageAlt: product.images[0]?.alt ?? product.name,
      preorder: product.preorder,
    })),
    categories: matchCategories(query, { brands, productTypes, languages }),
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
