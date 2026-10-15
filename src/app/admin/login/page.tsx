import type { Metadata } from "next";
import { loginAction } from "@/app/admin/actions/auth";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false },
};

const messages: Record<string, string> = {
  invalid: "That email and password combination is not correct.",
  missing: "Enter your email and password.",
  db: "Could not reach the database. Check your connection string.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <div className="flex min-h-dvh items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-[26px] font-semibold tracking-[-0.02em]">PokéStore Direct admin</h1>
        <p className="mt-2 text-[14px] text-[var(--ink-2)]">
          Sign in to manage products, orders, and content.
        </p>

        <form action={loginAction} className="mt-8 space-y-5">
          <input type="hidden" name="next" value={next || "/admin"} />
          <div>
            <label htmlFor="email" className="text-[14px]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="mt-2 h-11 w-full rounded-lg border border-[var(--hairline)] bg-transparent px-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-[14px]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 h-11 w-full rounded-lg border border-[var(--hairline)] bg-transparent px-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>

          {error ? (
            <p aria-live="polite" className="text-[14px] text-red-600">
              {messages[error] || "Sign in failed."}
            </p>
          ) : null}

          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--accent)] text-[15px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.98]"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
