import Link from "next/link";
import { PostForm } from "@/components/admin/PostForm";
import { savePostAction } from "@/app/admin/actions/content";

export const dynamic = "force-dynamic";

export default function AdminNewPostPage() {
  return (
    <div>
      <p className="text-[13px] text-[var(--ink-2)]">
        <Link href="/admin/blog" className="hover:text-[var(--foreground)]">
          Blog
        </Link>
      </p>
      <h1 className="mt-3 text-[26px] font-semibold tracking-[-0.02em]">New post</h1>
      <div className="mt-8">
        <PostForm action={savePostAction} submitLabel="Create post" />
      </div>
    </div>
  );
}
