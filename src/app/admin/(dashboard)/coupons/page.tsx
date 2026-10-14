import { connectDB } from "@/lib/db";
import { Coupon } from "@/lib/models/Coupon";
import {
  createCouponAction,
  deleteCouponAction,
  toggleCouponAction,
} from "@/app/admin/actions/content";

export const dynamic = "force-dynamic";

const input =
  "mt-1.5 h-10 w-full rounded-lg border border-[var(--hairline)] bg-transparent px-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";
const label = "text-[13px] text-[var(--ink-2)]";

export default async function AdminCouponsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error: pageError } = await searchParams;

  let rows: {
    id: string;
    code: string;
    type: string;
    value: number;
    minSubtotal: number;
    usedCount: number;
    usageLimit: number;
    active: boolean;
  }[] = [];
  let error = "";

  try {
    await connectDB();
    const docs = await Coupon.find().sort({ createdAt: -1 }).lean();
    rows = docs.map((d) => ({
      id: String(d._id),
      code: d.code,
      type: d.type ?? "percent",
      value: d.value ?? 0,
      minSubtotal: d.minSubtotal ?? 0,
      usedCount: d.usedCount ?? 0,
      usageLimit: d.usageLimit ?? 0,
      active: Boolean(d.active),
    }));
  } catch (err) {
    error = err instanceof Error ? err.message : "Database error";
  }

  return (
    <div>
      <h1 className="text-[26px] font-semibold tracking-[-0.02em]">Coupons</h1>

      {pageError ? (
        <p className="mt-5 rounded-lg bg-amber-50 px-4 py-3 text-[14px] text-amber-900">
          {pageError === "duplicate" ? "That coupon code already exists." : "Enter a coupon code."}
        </p>
      ) : null}
      {error ? (
        <p className="mt-5 rounded-lg bg-amber-50 px-4 py-3 text-[14px] text-amber-900">
          Database error: {error}
        </p>
      ) : null}

      <form
        action={createCouponAction}
        className="mt-8 max-w-2xl rounded-2xl border border-[var(--hairline)] p-5"
      >
        <h2 className="text-[15px] font-semibold tracking-tight">New coupon</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="code">
              Code
            </label>
            <input id="code" name="code" required className={input} />
          </div>
          <div>
            <label className={label} htmlFor="type">
              Type
            </label>
            <select id="type" name="type" defaultValue="percent" className={input}>
              <option value="percent">Percent off</option>
              <option value="fixed">Fixed amount off</option>
              <option value="free-shipping">Free shipping</option>
            </select>
          </div>
          <div>
            <label className={label} htmlFor="value">
              Value (percent or dollars)
            </label>
            <input id="value" name="value" inputMode="decimal" className={input} />
          </div>
          <div>
            <label className={label} htmlFor="minSubtotal">
              Minimum subtotal (USD)
            </label>
            <input id="minSubtotal" name="minSubtotal" inputMode="decimal" className={input} />
          </div>
          <div>
            <label className={label} htmlFor="usageLimit">
              Usage limit (0 = unlimited)
            </label>
            <input id="usageLimit" name="usageLimit" inputMode="numeric" className={input} />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 inline-flex h-10 items-center rounded-full bg-[var(--accent)] px-5 text-[14px] font-medium text-white"
        >
          Create coupon
        </button>
      </form>

      {rows.length === 0 && !error ? (
        <p className="mt-10 text-[14px] text-[var(--ink-2)]">No coupons yet.</p>
      ) : (
        <ul className="mt-10 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          {rows.map((row) => (
            <li key={row.id} className="flex flex-wrap items-center gap-4 py-4 text-[14px]">
              <span className="w-32 font-medium tracking-wide">{row.code}</span>
              <span className="flex-1 text-[var(--ink-2)]">
                {row.type === "percent"
                  ? `${row.value}% off`
                  : row.type === "fixed"
                    ? `$${(row.value / 100).toFixed(2)} off`
                    : "Free shipping"}
                {row.minSubtotal ? ` · min $${(row.minSubtotal / 100).toFixed(2)}` : ""}
              </span>
              <span className="text-[var(--ink-2)]">
                {row.usedCount}
                {row.usageLimit ? ` / ${row.usageLimit}` : ""} used
              </span>
              <form action={toggleCouponAction}>
                <input type="hidden" name="id" value={row.id} />
                <input type="hidden" name="active" value={row.active ? "0" : "1"} />
                <button
                  type="submit"
                  className={`rounded-full px-3 py-1 text-[12px] ${
                    row.active ? "bg-green-50 text-green-800" : "bg-[var(--surface-2)] text-[var(--ink-2)]"
                  }`}
                >
                  {row.active ? "Active" : "Inactive"}
                </button>
              </form>
              <form action={deleteCouponAction}>
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
