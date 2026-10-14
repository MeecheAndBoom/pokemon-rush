import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/Order";
import { formatPrice } from "@/lib/catalog";

export const dynamic = "force-dynamic";

const statuses = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
];

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;

  let rows: {
    id: string;
    orderNumber: string;
    email: string;
    status: string;
    total: number;
    currency: string;
    createdAt: string;
    itemCount: number;
  }[] = [];
  let error = "";

  try {
    await connectDB();
    const docs = await Order.find(status ? { status } : {})
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
    rows = docs.map((d) => ({
      id: String(d._id),
      orderNumber: d.orderNumber,
      email: d.email,
      status: d.status ?? "pending",
      total: d.total,
      currency: d.currency ?? "USD",
      createdAt: (d.createdAt as Date | undefined)?.toISOString() ?? "",
      itemCount: (d.items ?? []).reduce((n, i) => n + (i.quantity ?? 0), 0),
    }));
  } catch (err) {
    error = err instanceof Error ? err.message : "Database error";
  }

  return (
    <div>
      <h1 className="text-[26px] font-semibold tracking-[-0.02em]">Orders</h1>

      {error ? (
        <p className="mt-5 rounded-lg bg-amber-50 px-4 py-3 text-[14px] text-amber-900">
          Database error: {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href="/admin/orders"
          className={`rounded-full border px-4 py-1.5 text-[13px] ${
            !status
              ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
              : "border-[var(--hairline)] text-[var(--ink-2)] hover:border-[var(--foreground)]"
          }`}
        >
          All
        </a>
        {statuses.map((s) => (
          <a
            key={s}
            href={`/admin/orders?status=${s}`}
            className={`rounded-full border px-4 py-1.5 text-[13px] capitalize ${
              status === s
                ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                : "border-[var(--hairline)] text-[var(--ink-2)] hover:border-[var(--foreground)]"
            }`}
          >
            {s}
          </a>
        ))}
      </div>

      {rows.length === 0 && !error ? (
        <p className="mt-8 text-[14px] text-[var(--ink-2)]">No orders found.</p>
      ) : (
        <ul className="mt-8 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          {rows.map((order) => (
            <li key={order.id}>
              <a
                href={`/admin/orders/${order.id}`}
                className="flex items-center justify-between gap-4 py-4 text-[14px] hover:text-[var(--accent)]"
              >
                <span className="w-32 font-medium tabular-nums">{order.orderNumber}</span>
                <span className="hidden flex-1 truncate text-[var(--ink-2)] sm:block">
                  {order.email}
                </span>
                <span className="hidden w-20 text-[var(--ink-2)] md:block">
                  {order.itemCount} item{order.itemCount === 1 ? "" : "s"}
                </span>
                <span className="w-24 capitalize text-[var(--ink-2)]">{order.status}</span>
                <span className="w-24 text-right tabular-nums">
                  {formatPrice(order.total, order.currency)}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
