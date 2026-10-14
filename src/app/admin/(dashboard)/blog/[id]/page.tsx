import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/lib/models/BlogPost";
import { PostForm } from "@/components/admin/PostForm";
import { savePostAction } from "@/app/admin/actions/content";

export const dynamic = "force-dynamic";

export default async function AdminEditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();
  const post = await BlogPost.findById(id).lean();
  if (!post) notFound();

  return (
    <div>
      <p className="text-[13px] text-[var(--ink-2)]">
        <Link href="/admin/blog" className="hover:text-[var(--foreground)]">
          Blog
        </Link>
      </p>
      <h1 className="mt-3 text-[26px] font-semibold tracking-[-0.02em]">{post.title}</h1>
      <div className="mt-8">
        <PostForm
          action={savePostAction}
          submitLabel="Save changes"
          post={{
            id: String(post._id),
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            coverImage: post.coverImage,
            category: post.category,
            author: post.author,
            readingMinutes: post.readingMinutes,
            status: post.status,
          }}
        />
      </div>
    </div>
  );
}
