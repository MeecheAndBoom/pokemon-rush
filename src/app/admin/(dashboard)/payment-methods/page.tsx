import { connectDB } from "@/lib/db";
import { PaymentMethod } from "@/lib/models/PaymentMethod";
import {
  savePaymentMethodAction,
  deletePaymentMethodAction,
} from "@/app/admin/actions/content";

export const dynamic = "force-dynamic";

const input =
  "mt-1.5 h-10 w-full rounded-lg border border-[var(--hairline)] bg-transparent px-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";
const area =
  "mt-1.5 w-full rounded-lg border border-[var(--hairline)] bg-transparent px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";
const label = "text-[13px] text-[var(--ink-2)]";

type Row = {
  id: string;
  slug: string;
  label: string;
  description: string;
  instructions: string;
  order: number;
  isActive: boolean;
};

export default async function AdminPaymentMethodsPage() {
  let rows: Row[] = [];
  let error = "";

  try {
    await connectDB();
    const docs = await PaymentMethod.find().sort({ order: 1 }).lean();
    rows = docs.map((d) => ({
      id: String(d._id),
      slug: d.slug,
      label: d.label,
      description: d.description ?? "",
      instructions: d.instructions ?? "",
      order: d.order ?? 0,
      isActive: Boolean(d.isActive),
    }));
  } catch (err) {
    error = err instanceof Error ? err.message : "Database error";
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-[26px] font-semibold tracking-[-0.02em]">Payment methods</h1>
      <p className="mt-2 text-[14px] text-[var(--ink-2)]">
        These appear at checkout. Customers choose one and receive your instructions by email.
      </p>

      {error ? (
        <p className="mt-5 rounded-lg bg-amber-50 px-4 py-3 text-[14px] text-amber-900">
          Database error: {error}
        </p>
      ) : null}

      {rows.length === 0 && !error ? (
        <p className="mt-8 rounded-lg bg-[var(--surface-2)] px-4 py-3 text-[14px] text-[var(--ink-2)]">
          No payment methods yet. Run the seed script or add one below.
        </p>
      ) : (
        <ul className="mt-8 space-y-6">
          {rows.map((row) => (
            <li key={row.id} className="rounded-2xl border border-[var(--hairline)] p-5">
              <form action={savePaymentMethodAction}>
                <input type="hidden" name="id" value={row.id} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={label}>Label</label>
                    <input name="label" defaultValue={row.label} required className={input} />
                  </div>
                  <div>
                    <label className={label}>Slug</label>
                    <input name="slug" defaultValue={row.slug} className={input} />
                  </div>
                </div>
                <div className="mt-4">
                  <label className={label}>Short description (shown at checkout)</label>
                  <textarea
                    name="description"
                    rows={2}
                    defaultValue={row.description}
                    className={area}
                  />
                </div>
                <div className="mt-4">
                  <label className={label}>Email instructions (sent with the order)</label>
                  <textarea
                    name="instructions"
                    rows={3}
                    defaultValue={row.instructions}
                    className={area}
                  />
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={label}>Sort order</label>
                    <input
                      name="order"
                      inputMode="numeric"
                      defaultValue={String(row.order)}
                      className={input}
                    />
                  </div>
                  <div className="flex items-end gap-3 pb-2">
                    <input
                      id={`active-${row.id}`}
                      name="isActive"
                      type="checkbox"
                      defaultChecked={row.isActive}
                      className="h-4 w-4 accent-[var(--accent)]"
                    />
                    <label htmlFor={`active-${row.id}`} className="text-[14px]">
                      Active at checkout
                    </label>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-5">
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center rounded-full bg-[var(--accent)] px-5 text-[14px] font-medium text-white"
                  >
                    Save
                  </button>
                </div>
              </form>

              <form action={deletePaymentMethodAction} className="mt-3">
                <input type="hidden" name="id" value={row.id} />
                <button type="submit" className="text-[13px] text-red-600 hover:underline">
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}

      <form
        action={savePaymentMethodAction}
        className="mt-10 rounded-2xl border border-dashed border-[var(--hairline)] p-5"
      >
        <h2 className="text-[15px] font-semibold tracking-tight">Add a payment method</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Label</label>
            <input name="label" required className={input} placeholder="Bank transfer" />
          </div>
          <div>
            <label className={label}>Slug</label>
            <input name="slug" className={input} placeholder="bank-transfer" />
          </div>
        </div>
        <div className="mt-4">
          <label className={label}>Short description</label>
          <textarea name="description" rows={2} className={area} />
        </div>
        <div className="mt-4">
          <label className={label}>Email instructions</label>
          <textarea name="instructions" rows={3} className={area} />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <input
            id="new-active"
            name="isActive"
            type="checkbox"
            defaultChecked
            className="h-4 w-4 accent-[var(--accent)]"
          />
          <label htmlFor="new-active" className="text-[14px]">
            Active at checkout
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 inline-flex h-10 items-center rounded-full border border-[var(--hairline)] px-5 text-[14px] hover:border-[var(--foreground)]"
        >
          Add payment method
        </button>
      </form>
    </div>
  );
}
