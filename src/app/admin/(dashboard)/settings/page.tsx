import { changeAdminEmailAction, changePasswordAction, saveSiteSettingsAction } from "@/app/admin/actions/content";
import { requireSession } from "@/app/admin/actions/auth";
import { getSiteSettings } from "@/lib/settings";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

const input =
  "mt-1.5 h-10 w-full rounded-lg border border-[var(--hairline)] bg-transparent px-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";
const label = "text-[13px] text-[var(--ink-2)]";
const button =
  "inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-[15px] font-medium text-white";

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

function Notice({ tone, children }: { tone: "good" | "warn"; children: React.ReactNode }) {
  return (
    <p
      className={`mt-4 rounded-lg px-4 py-3 text-[14px] ${
        tone === "good" ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-900"
      }`}
    >
      {children}
    </p>
  );
}

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; changed?: string; saved?: string }>;
}) {
  const session = await requireSession();
  const { error, changed, saved } = await searchParams;
  const settings = await getSiteSettings();

  const errorMessage =
    error === "short"
      ? "The new password must be at least 8 characters."
      : error === "email"
        ? "Enter a valid email address."
        : error === "taken"
          ? "Another admin already uses that email address."
          : error
            ? "Your current password is not correct."
            : null;

  return (
    <div className="max-w-2xl">
      <h1 className="text-[26px] font-semibold tracking-[-0.02em]">Settings</h1>
      <p className="mt-2 text-[14px] text-[var(--ink-2)]">
        Storefront contact details update the header, footer, contact and about pages immediately.
      </p>

      {saved ? (
        <Notice tone="good">
          {saved === "email"
            ? "Admin email updated. Use it the next time you sign in."
            : "Storefront details saved."}
        </Notice>
      ) : null}

      <section className="mt-10">
        <h2 className="text-[15px] font-semibold tracking-tight">Storefront contact</h2>
        <p className="mt-2 text-[14px] text-[var(--ink-2)]">
          Shown in the header, footer, contact page and legal pages.
        </p>

        <form action={saveSiteSettingsAction} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="phone">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                defaultValue={settings.phone}
                placeholder="(213) 300-5923"
                className={input}
              />
            </div>
            <div>
              <label className={label} htmlFor="whatsapp">
                WhatsApp number
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                defaultValue={settings.whatsapp}
                placeholder="12133005923"
                inputMode="tel"
                className={input}
              />
            </div>
          </div>

          <div>
            <label className={label} htmlFor="whatsappMessage">
              WhatsApp greeting
            </label>
            <input
              id="whatsappMessage"
              name="whatsappMessage"
              defaultValue={settings.whatsappMessage}
              className={input}
            />
            <p className="mt-1.5 text-[12px] text-[var(--ink-2)]">
              Pre-filled in the message box when a customer taps the floating WhatsApp button.
            </p>
          </div>

          <fieldset className="rounded-xl border border-[var(--hairline)] p-5">
            <legend className="px-1 text-[13px] text-[var(--ink-2)]">Business location</legend>
            <div className="space-y-4">
              <div>
                <label className={label} htmlFor="addressLine1">
                  Address line 1
                </label>
                <input
                  id="addressLine1"
                  name="addressLine1"
                  defaultValue={settings.address.line1}
                  placeholder="Street address"
                  className={input}
                />
              </div>
              <div>
                <label className={label} htmlFor="addressLine2">
                  Address line 2
                </label>
                <input
                  id="addressLine2"
                  name="addressLine2"
                  defaultValue={settings.address.line2}
                  placeholder="Suite, unit, floor"
                  className={input}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="addressCity">
                    City, state & ZIP
                  </label>
                  <input
                    id="addressCity"
                    name="addressCity"
                    defaultValue={settings.address.city}
                    placeholder="Los Angeles, CA 90015"
                    className={input}
                  />
                </div>
                <div>
                  <label className={label} htmlFor="addressCountry">
                    Country
                  </label>
                  <input
                    id="addressCountry"
                    name="addressCountry"
                    defaultValue={settings.address.country}
                    placeholder="United States"
                    className={input}
                  />
                </div>
              </div>
            </div>
          </fieldset>

          <p className="text-[13px] text-[var(--ink-2)]">
            Shown on the storefront as: <span className="text-[var(--foreground)]">{settings.addressLine}</span>
          </p>

          <button type="submit" className={button}>
            Save storefront details
          </button>
        </form>
      </section>

      <section className="mt-12">
        <h2 className="text-[15px] font-semibold tracking-tight">Admin account</h2>
        <p className="mt-2 text-[14px] text-[var(--ink-2)]">
          Orders and contact messages are emailed to {settings.adminEmail || session.email}.
        </p>

        {saved === "email" ? <Notice tone="good">Admin email updated.</Notice> : null}
        {error && error !== "short" ? <Notice tone="warn">{errorMessage}</Notice> : null}

        <form action={changeAdminEmailAction} className="mt-6 space-y-4">
          <div>
            <label className={label} htmlFor="email">
              Admin email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={session.email}
              autoComplete="email"
              className={input}
            />
          </div>
          <div>
            <label className={label} htmlFor="emailPassword">
              Confirm with your password
            </label>
            <input
              id="emailPassword"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className={input}
            />
          </div>
          <button type="submit" className={button}>
            Update admin email
          </button>
        </form>
      </section>

      <section className="mt-12">
        <h2 className="text-[15px] font-semibold tracking-tight">Password</h2>
        <p className="mt-2 text-[14px] text-[var(--ink-2)]">Signed in as {session.email}.</p>

        {changed ? <Notice tone="good">Password updated.</Notice> : null}
        {error === "short" || error === "current" ? (
          <Notice tone="warn">{errorMessage}</Notice>
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
          <button type="submit" className={button}>
            Change password
          </button>
        </form>
      </section>

      <section className="mt-12">
        <h2 className="text-[15px] font-semibold tracking-tight">Environment</h2>
        <ul className="mt-4 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          <Status ok={Boolean(process.env.MONGODB_URI)} label="MongoDB connection" />
          <Status
            ok={Boolean(process.env.CLOUDINARY_URL || process.env.CLOUDINARY_API_KEY)}
            label="Cloudinary uploads"
          />
          <Status
            ok={Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)}
            label="Outbound email (SMTP)"
          />
          <Status ok={Boolean(process.env.ADMIN_JWT_SECRET)} label="Admin session secret" />
        </ul>
        <p className="mt-3 text-[12px] text-[var(--ink-2)]">
          Public support address: {site.email} · Sales: {site.salesEmail}
        </p>
      </section>
    </div>
  );
}
