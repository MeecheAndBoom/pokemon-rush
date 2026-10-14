import { connectDB } from "@/lib/db";
import { Review } from "@/lib/models/Review";
import { Stars } from "@/components/content/Stars";
import { deleteReviewAction, setReviewStatusAction } from "@/app/admin/actions/content";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  let rows: {
    id: string;
    authorName: string;
    rating: number;
    title: string;
    body: string;
    status: string;
    productId: string;
    createdAt: string;
  }[] = [];
  let error = "";

  try {
    await connectDB();
    const docs = await Review.find().sort({ createdAt: -1 }).limit(200).lean();
    rows = docs.map((d) => ({
      id: String(d._id),
      authorName: d.authorName ?? "",
      rating: d.rating ?? 0,
      title: d.title ?? "",
      body: d.body ?? "",
      status: d.status ?? "pending",
      productId: d.productId ? String(d.productId) : "",
      createdAt: (d.createdAt as Date | undefined)?.toISOString() ?? "",
    }));
  } catch (err) {
    error = err instanceof Error ? err.message : "Database error";
  }

  return (
    <div>
      <h1 className="text-[26px] font-semibold tracking-[-0.02em]">Reviews</h1>
      <p className="mt-2 text-[14px] text-[var(--ink-2)]">
        Approve reviews before they appear on product pages.
      </p>

      {error ? (
        <p className="mt-5 rounded-lg bg-amber-50 px-4 py-3 text-[14px] text-amber-900">
          Database error: {error}
        </p>
      ) : null}

      {rows.length === 0 && !error ? (
        <p className="mt-8 text-[14px] text-[var(--ink-2)]">No reviews yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {rows.map((row) => (
            <li key={row.id} className="rounded-2xl border border-[var(--hairline)] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[15px] font-medium">{row.authorName}</p>
                  <Stars rating={row.rating} />
                </div>
                <span className="rounded-full bg-[var(--surface-2)] px-3 py-1 text-[12px]">
                  {row.status}
                </span>
              </div>
              {row.title ? <p className="mt-3 text-[15px] font-medium">{row.title}</p> : null}
              <p className="mt-1 text-[14px] leading-relaxed text-[var(--ink-2)]">{row.body}</p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <form action={setReviewStatusAction} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={row.id} />
                  <select
                    name="status"
                    defaultValue={row.status}
                    className="h-8 rounded-lg border border-[var(--hairline)] bg-transparent px-2 text-[13px]"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button type="submit" className="text-[13px] text-[var(--accent)] hover:opacity-70">
                    Save
                  </button>
                </form>
                <form action={deleteReviewAction}>
                  <input type="hidden" name="id" value={row.id} />
                  <button type="submit" className="text-[13px] text-red-600 hover:underline">
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
