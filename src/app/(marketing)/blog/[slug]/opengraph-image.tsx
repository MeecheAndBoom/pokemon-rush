import { ogArtForBrand } from "@/lib/brand";
import { ogCard, ogContentType, ogSize } from "@/lib/og";
import { getPost, posts } from "@/data/posts";

export const alt = "Sealed trading card guides from PokéStore Direct";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return ogCard({
    title: post?.title ?? "Sealed trading card guides",
    eyebrow: post?.category ?? "Blog & guides",
    meta: post ? `By ${post.author}` : undefined,
    art: ogArtForBrand("pokemon"),
  });
}
