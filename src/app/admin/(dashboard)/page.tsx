import Link from "next/link";
import { getDashboardStats, getRecentOrders } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const result = await getDashboardStats();
  const recent = await getRecentOrders();

  return (
    <div>
      <h1 className="text-[26px] font-semibold tracking-[-0.02em]">Dashboard</h1>

      {!result.ok ? (
        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-[14px] text-amber-900">
          <p className="font-medium">The database is not reachable right now.</p>
          <p className="mt-1">
            Check <code>MONGODB_URI</code> in <code>.env.local</code>. The storefront still works
            from the bundled catalogue.
          </p>
          <p className="mt-2 text-[13px] opacity-80">{result.error}</p>
        </div>
      ) : null}

      {result.ok ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Products" value={result.stats.products} sub={`${result.stats.published} published`} href="/admin/products" />
          <StatCard label="Orders" value={result.stats.orders} sub={`${result.stats.pendingOrders} awaiting confirmation`} href="/admin/orders" />
          <StatCard label="Messages" value={result.stats.messages} sub={`${result.stats.newMessages} new`} href="/admin/submissions" />
          <StatCard label="Reviews" value={result.stats.pendingReviews} sub="awaiting moderation" href="/admin/reviews" />
          <StatCard label="Blog posts" value={result.stats.posts} sub="guides and updates" href="/admin/blog" />
          <StatCard label="Coupons" value={result.stats.coupons} sub={`${result.stats.paymentMethods} payment methods`} href="/admin/coupons" />
        </div>
      ) : null}

      <div className="mt-12">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-[17px] font-semibold tracking-tight">Recent orders</h2>
          <Link href="/admin/orders" className="text-[14px] text-[var(--accent)] hover:opacity-70">
            All orders
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="mt-4 text-[14px] text-[var(--ink-2)]">No orders yet.</p>
        ) : (
          <ul className="mt-5 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
            {recent.map((order) => (
              <li key={order.id}>
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="flex items-center justify-between gap-4 py-4 text-[14px] hover:text-[var(--accent)]"
                >
                  <span className="font-medium tabular-nums">{order.orderNumber}</span>
                  <span className="hidden flex-1 truncate text-[var(--ink-2)] sm:block">
                    {order.email}
                  </span>
                  <span className="text-[var(--ink-2)] capitalize">{order.status}</span>
                  <span className="tabular-nums">
                    ${(order.total / 100).toFixed(2)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  href,
}: {
  label: string;
  value: number;
  sub: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-[var(--hairline)] p-5 transition-colors hover:border-[var(--foreground)]"
    >
      <p className="text-[13px] text-[var(--ink-2)]">{label}</p>
      <p className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.02em] tabular-nums">
        {value}
      </p>
      <p className="mt-2 text-[13px] text-[var(--ink-2)]">{sub}</p>
    </Link>
  );
}
