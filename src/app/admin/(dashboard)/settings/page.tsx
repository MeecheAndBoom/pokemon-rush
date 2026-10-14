import { changePasswordAction } from "@/app/admin/actions/content";
import { requireSession } from "@/app/admin/actions/auth";

export const dynamic = "force-dynamic";

const input =
  "mt-1.5 h-10 w-full rounded-lg border border-[var(--hairline)] bg-transparent px-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";
const label = "text-[13px] text-[var(--ink-2)]";

function Status({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li className="flex items-center justify-between gap-4 py-3">
      <span className="text-[14px]">{label}</span>
      <span
        className={`rounded-full px-2.5 py-1 text-[12px] ${
          ok ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-900"
        }`}
      >
        {ok ? "Configured" : "Missing"}
      </span>
    </li>
  );
}

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; changed?: string }>;
}) {
  const session = await requireSession();
  const { error, changed } = await searchParams;

  return (
    <div className="max-w-2xl">
      <h1 className="text-[26px] font-semibold tracking-[-0.02em]">Settings</h1>

      <section className="mt-8">
        <h2 className="text-[15px] font-semibold tracking-tight">Environment</h2>
        <ul className="mt-4 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          <Status ok={Boolean(process.env.MONGODB_URI)} label="MongoDB connection" />
          <Status ok={Boolean(process.env.CLOUDINARY_URL || process.env.CLOUDINARY_API_KEY)} label="Cloudinary uploads" />
          <Status
            ok={Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)}
            label="Outbound email (SMTP)"
          />
          <Status ok={Boolean(process.env.ADMIN_JWT_SECRET)} label="Admin session secret" />
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-[15px] font-semibold tracking-tight">Account</h2>
        <p className="mt-2 text-[14px] text-[var(--ink-2)]">Signed in as {session.email}.</p>

        {changed ? (
          <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-[14px] text-green-800">
            Password updated.
          </p>
        ) : null}
        {error ? (
          <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-[14px] text-amber-900">
            {error === "short"
              ? "The new password must be at least 8 characters."
              : "Your current password is not correct."}
          </p>
        ) : null}

        <form action={changePasswordAction} className="mt-6 space-y-4">
          <div>
            <label className={label} htmlFor="current">
              Current password
            </label>
            <input
              id="current"
              name="current"
              type="password"
              required
              autoComplete="current-password"
              className={input}
            />
          </div>
          <div>
            <label className={label} htmlFor="next">
              New password
            </label>
            <input
              id="next"
              name="next"
              type="password"
              required
              autoComplete="new-password"
              className={input}
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-[15px] font-medium text-white"
          >
            Change password
          </button>
        </form>
      </section>
    </div>
  );
}
