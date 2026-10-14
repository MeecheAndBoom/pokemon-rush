import Link from "next/link";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/lib/models/BlogPost";
import { deletePostAction } from "@/app/admin/actions/content";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  let rows: {
    id: string;
    title: string;
    slug: string;
    status: string;
    category: string;
    updatedAt: string;
  }[] = [];
  let error = "";

  try {
    await connectDB();
    const docs = await BlogPost.find().sort({ createdAt: -1 }).lean();
    rows = docs.map((d) => ({
      id: String(d._id),
      title: d.title,
      slug: d.slug,
      status: d.status ?? "draft",
      category: d.category ?? "",
      updatedAt: (d.updatedAt as Date | undefined)?.toISOString() ?? "",
    }));
  } catch (err) {
    error = err instanceof Error ? err.message : "Database error";
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[26px] font-semibold tracking-[-0.02em]">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="inline-flex h-10 items-center rounded-full bg-[var(--accent)] px-5 text-[14px] font-medium text-white"
        >
          New post
        </Link>
      </div>

      {error ? (
        <p className="mt-5 rounded-lg bg-amber-50 px-4 py-3 text-[14px] text-amber-900">
          Database error: {error}
        </p>
      ) : null}

      {rows.length === 0 && !error ? (
        <p className="mt-8 text-[14px] text-[var(--ink-2)]">
          No posts yet. The public blog currently reads from the bundled guides.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          {rows.map((row) => (
            <li key={row.id} className="flex items-center gap-4 py-4">
              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/blog/${row.id}`}
                  className="text-[15px] font-medium leading-snug hover:text-[var(--accent)]"
                >
                  {row.title}
                </Link>
                <p className="mt-0.5 text-[13px] text-[var(--ink-2)]">{row.category}</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[12px] ${
                  row.status === "published"
                    ? "bg-green-50 text-green-800"
                    : "bg-[var(--surface-2)] text-[var(--ink-2)]"
                }`}
              >
                {row.status}
              </span>
              <form action={deletePostAction}>
                <input type="hidden" name="id" value={row.id} />
                <button type="submit" className="text-[13px] text-red-600 hover:underline">
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
