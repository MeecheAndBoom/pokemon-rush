import nodemailer from "nodemailer";
import { BRAND_LOGO_PATH, BRAND_LOGO_SIZE } from "@/lib/brand";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/site-url";

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM } = process.env;

export const mailConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

let transporter: nodemailer.Transporter | null = null;

export function getTransporter() {
  if (!mailConfigured) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return transporter;
}

export type MailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

/**
 * Keeps the sending address from EMAIL_FROM/SMTP_USER but always presents the
 * PokéStore Direct brand name, so a stale display name in the environment can
 * never leak into an outgoing email.
 */
function senderFrom(): string | undefined {
  const raw = EMAIL_FROM || SMTP_USER;
  if (!raw) return undefined;
  const address = raw.match(/<([^>]+)>/)?.[1]?.trim() || raw.trim();
  return `${site.name} <${address}>`;
}

export async function sendMail({ to, subject, html, text, replyTo }: MailInput) {
  const t = getTransporter();
  if (!t) {
    console.warn("[mail] SMTP is not configured; skipping send to", to);
    return { skipped: true };
  }
  try {
    const info = await t.sendMail({
      from: senderFrom(),
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]+>/g, " "),
      replyTo,
    });
    return { sent: true, messageId: info.messageId };
  } catch (err) {
    console.error("[mail] Failed to send email:", err);
    return { sent: false, error: String(err) };
  }
}

/** Rendered width of the header wordmark, in pixels. */
const LOGO_WIDTH = 180;
const LOGO_HEIGHT = Math.round((LOGO_WIDTH * BRAND_LOGO_SIZE.height) / BRAND_LOGO_SIZE.width);

export function shell(title: string, body: string) {
  const logoUrl = absoluteUrl(BRAND_LOGO_PATH);
  const homeUrl = absoluteUrl("/");
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head><body style="margin:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1d1d1f;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <a href="${homeUrl}" style="display:inline-block;text-decoration:none;margin:0 0 24px;">
      <img src="${logoUrl}" width="${LOGO_WIDTH}" height="${LOGO_HEIGHT}" alt="${site.name}" style="display:block;width:${LOGO_WIDTH}px;max-width:${LOGO_WIDTH}px;height:auto;border:0;outline:none;text-decoration:none;" />
    </a>
    <div style="background:#ffffff;border-radius:16px;padding:32px;">
      <h1 style="font-size:22px;margin:0 0 16px;letter-spacing:-0.01em;">${title}</h1>
      ${body}
    </div>
    <p style="font-size:12px;color:#6e6e73;margin:24px 0 0;">You received this email because you placed an order or contacted ${site.name}.</p>
  </div>
</body></html>`;
}
