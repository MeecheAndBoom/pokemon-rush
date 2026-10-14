import { connectDB } from "@/lib/db";
import { Submission } from "@/lib/models/Submission";
import {
  deleteSubmissionAction,
  setSubmissionStatusAction,
} from "@/app/admin/actions/content";

export const dynamic = "force-dynamic";

export default async function AdminSubmissionsPage() {
  let rows: {
    id: string;
    type: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: string;
    createdAt: string;
  }[] = [];
  let error = "";

  try {
    await connectDB();
    const docs = await Submission.find().sort({ createdAt: -1 }).limit(200).lean();
    rows = docs.map((d) => ({
      id: String(d._id),
      type: d.type ?? "contact",
      name: d.name ?? "",
      email: d.email ?? "",
      phone: d.phone ?? "",
      subject: d.subject ?? "",
      message: d.message ?? "",
      status: d.status ?? "pending",
      createdAt: (d.createdAt as Date | undefined)?.toISOString() ?? "",
    }));
  } catch (err) {
    error = err instanceof Error ? err.message : "Database error";
  }

  return (
    <div>
      <h1 className="text-[26px] font-semibold tracking-[-0.02em]">Messages</h1>
      <p className="mt-2 text-[14px] text-[var(--ink-2)]">
        Contact, support, specialist, and wholesale enquiries.
      </p>

      {error ? (
        <p className="mt-5 rounded-lg bg-amber-50 px-4 py-3 text-[14px] text-amber-900">
          Database error: {error}
        </p>
      ) : null}

      {rows.length === 0 && !error ? (
        <p className="mt-8 text-[14px] text-[var(--ink-2)]">No messages yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {rows.map((row) => (
            <li
              key={row.id}
              className="rounded-2xl border border-[var(--hairline)] p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[15px] font-medium">
                    {row.name}{" "}
                    <span className="text-[13px] font-normal text-[var(--ink-2)]">
                      · {row.email}
                    </span>
                  </p>
                  <p className="text-[13px] text-[var(--ink-2)]">
                    {row.type}
                    {row.phone ? ` · ${row.phone}` : ""}
                    {row.createdAt
                      ? ` · ${new Date(row.createdAt).toLocaleDateString()}`
                      : ""}
                  </p>
                </div>
                <span className="rounded-full bg-[var(--surface-2)] px-3 py-1 text-[12px] capitalize">
                  {row.status}
                </span>
              </div>

              {row.subject ? (
                <p className="mt-3 text-[14px] font-medium">{row.subject}</p>
              ) : null}
              <p className="mt-2 whitespace-pre-line text-[14px] leading-relaxed text-[var(--ink-2)]">
                {row.message}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <form action={setSubmissionStatusAction} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={row.id} />
                  <select
                    name="status"
                    defaultValue={row.status}
                    className="h-8 rounded-lg border border-[var(--hairline)] bg-transparent px-2 text-[13px]"
                  >
                    <option value="new">New</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button
                    type="submit"
                    className="text-[13px] text-[var(--accent)] hover:opacity-70"
                  >
                    Save
                  </button>
                </form>
                <a
                  href={`mailto:${row.email}?subject=${encodeURIComponent(
                    `Re: ${row.subject || "Your message to Pokemon Rush"}`
                  )}`}
                  className="text-[13px] text-[var(--accent)] hover:opacity-70"
                >
                  Reply by email
                </a>
                <form action={deleteSubmissionAction}>
                  <input type="hidden" name="id" value={row.id} />
                  <button
                    type="submit"
                    className="text-[13px] text-red-600 underline-offset-4 hover:underline"
                  >
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
