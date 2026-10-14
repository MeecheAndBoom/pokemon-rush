import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/Order";
import { formatPrice } from "@/lib/catalog";
import {
  updateFulfillmentAction as updateOrderFulfillmentAction,
  updateOrderStatusAction,
} from "@/app/admin/actions/orders";

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

const input =
  "mt-1.5 h-10 w-full rounded-lg border border-[var(--hairline)] bg-transparent px-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";

export default async function AdminOrderDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ updated?: string }>;
}) {
  const { id } = await params;
  const { updated } = await searchParams;

  await connectDB();
  const order = await Order.findById(id).lean();
  if (!order) notFound();

  const address = (order.shippingAddress ?? {}) as Record<string, string>;
  const fulfillment = (order.fulfillment ?? {}) as {
    carrier?: string;
    trackingNumber?: string;
    trackingUrl?: string;
  };

  return (
    <div className="max-w-3xl">
      <p className="text-[13px] text-[var(--ink-2)]">
        <Link href="/admin/orders" className="hover:text-[var(--foreground)]">
          Orders
        </Link>
      </p>
      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] tabular-nums">
          {order.orderNumber}
        </h1>
        <span className="rounded-full bg-[var(--surface-2)] px-3 py-1 text-[13px] capitalize">
          {order.status}
        </span>
      </div>
      <p className="mt-2 text-[14px] text-[var(--ink-2)]">
        {order.email}
        {order.phone ? ` · ${order.phone}` : ""}
      </p>

      {updated ? (
        <p className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-[14px] text-green-800">
          Order updated.
        </p>
      ) : null}

      <section className="mt-10">
        <h2 className="text-[15px] font-semibold tracking-tight">Items</h2>
        <ul className="mt-4 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          {(order.items ?? []).map((item) => (
            <li key={item.slug} className="flex items-center justify-between gap-4 py-3 text-[14px]">
              <span className="min-w-0 flex-1">
                {item.name} <span className="text-[var(--ink-2)]">× {item.quantity}</span>
              </span>
              <span className="tabular-nums">
                {formatPrice(item.lineTotal, order.currency ?? "USD")}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between text-[15px] font-medium">
          <span>Total</span>
          <span className="tabular-nums">{formatPrice(order.total, order.currency ?? "USD")}</span>
        </div>
      </section>

      <section className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-[15px] font-semibold tracking-tight">Shipping address</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--ink-2)]">
            {[address.name, address.line1, address.line2, address.city, address.region, address.postalCode, address.country]
              .filter(Boolean)
              .join(", ") || "Not provided"}
          </p>
        </div>
        <div>
          <h2 className="text-[15px] font-semibold tracking-tight">Payment method</h2>
          <p className="mt-2 text-[14px] text-[var(--ink-2)]">
            {order.paymentMethod?.label || "Not set"}
          </p>
          <p className="mt-1 text-[13px] text-[var(--ink-2)]">
            {order.paymentMethod?.instructions}
          </p>
        </div>
      </section>

      {order.notes ? (
        <section className="mt-10">
          <h2 className="text-[15px] font-semibold tracking-tight">Customer notes</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--ink-2)]">{order.notes}</p>
        </section>
      ) : null}

      <section className="mt-12 grid gap-10 sm:grid-cols-2">
        <form action={updateOrderStatusAction} className="space-y-4">
          <h2 className="text-[15px] font-semibold tracking-tight">Status</h2>
          <input type="hidden" name="id" value={String(order._id)} />
          <select name="status" defaultValue={order.status ?? "pending"} className={input}>
            {statuses.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="inline-flex h-10 items-center rounded-full bg-[var(--accent)] px-5 text-[14px] font-medium text-white"
          >
            Update status
          </button>
        </form>

        <form action={updateOrderFulfillmentAction} className="space-y-4">
          <h2 className="text-[15px] font-semibold tracking-tight">Tracking</h2>
          <input type="hidden" name="id" value={String(order._id)} />
          <input
            name="carrier"
            placeholder="Carrier"
            defaultValue={fulfillment.carrier ?? ""}
            className={input}
          />
          <input
            name="trackingNumber"
            defaultValue={fulfillment.trackingNumber ?? ""}
            placeholder="Tracking number"
            className={input}
          />
          <input
            name="trackingUrl"
            defaultValue={fulfillment.trackingUrl ?? ""}
            placeholder="Tracking URL"
            className={input}
          />
          <button
            type="submit"
            className="inline-flex h-10 items-center rounded-full border border-[var(--hairline)] px-5 text-[14px] hover:border-[var(--foreground)]"
          >
            Save tracking
          </button>
        </form>
      </section>

      <section className="mt-12">
        <h2 className="text-[15px] font-semibold tracking-tight">Timeline</h2>
        <ul className="mt-4 space-y-3">
          {(order.timeline ?? []).map((event, i) => (
            <li key={i} className="text-[14px] text-[var(--ink-2)]">
              <span className="text-[var(--foreground)]">
                {new Date(event.at ?? Date.now()).toLocaleString()}
              </span>{" "}
              — {event.message || event.type || "Update"}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
