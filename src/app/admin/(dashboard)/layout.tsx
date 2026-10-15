import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";
import { logoutAction, requireSession } from "@/app/admin/actions/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[220px_1fr]">
      <aside className="border-b border-[var(--hairline)] lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-4 px-5 pt-5 pb-4">
          <div>
            <p className="text-[14px] font-semibold tracking-tight">PokéStore Direct</p>
            <p className="text-[12px] text-[var(--ink-2)]">Admin</p>
          </div>
          <Link
            href="/"
            className="text-[12px] text-[var(--ink-2)] hover:text-[var(--foreground)]"
          >
            View site
          </Link>
        </div>

        <AdminNav />

        <div className="border-t border-[var(--hairline)] px-5 py-4">
          <p className="truncate text-[12px] text-[var(--ink-2)]">{session.email}</p>
          <form action={logoutAction} className="mt-2">
            <button
              type="submit"
              className="text-[13px] text-[var(--ink-2)] underline-offset-4 hover:text-[var(--foreground)] hover:underline"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0 px-5 py-8 sm:px-8 sm:py-10">{children}</div>
    </div>
  );
}
