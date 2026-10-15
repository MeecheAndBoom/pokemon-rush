import nodemailer from "nodemailer";

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

export async function sendMail({ to, subject, html, text, replyTo }: MailInput) {
  const t = getTransporter();
  if (!t) {
    console.warn("[mail] SMTP is not configured; skipping send to", to);
    return { skipped: true };
  }
  try {
    const info = await t.sendMail({
      from: EMAIL_FROM || SMTP_USER,
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

export function shell(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1d1d1f;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <p style="font-size:16px;font-weight:600;margin:0 0 24px;">PokéStore Direct</p>
    <div style="background:#ffffff;border-radius:16px;padding:32px;">
      <h1 style="font-size:22px;margin:0 0 16px;letter-spacing:-0.01em;">${title}</h1>
      ${body}
    </div>
    <p style="font-size:12px;color:#6e6e73;margin:24px 0 0;">You received this email because you placed an order or contacted PokéStore Direct.</p>
  </div>
</body></html>`;
}
