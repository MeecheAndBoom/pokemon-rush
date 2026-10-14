import { formatPrice } from "@/lib/catalog";
import { shell } from "@/lib/mail";

export { sendMail } from "@/lib/mail";

export type OrderEmailData = {
  orderNumber: string;
  email: string;
  name: string;
  items: { name: string; quantity: number; lineTotal: number }[];
  subtotal: number;
  total: number;
  currency: string;
  paymentLabel: string;
  paymentInstructions: string;
  shippingAddress?: Record<string, string>;
};

function addressBlock(addr?: Record<string, string>) {
  if (!addr) return "";
  const parts = [addr.line1, addr.line2, addr.city, addr.region, addr.postalCode, addr.country]
    .filter(Boolean)
    .join(", ");
  return `<p style="font-size:14px;color:#6e6e73;margin:8px 0 0;">${parts}</p>`;
}

export function orderConfirmation(data: OrderEmailData) {
  const rows = data.items
    .map(
      (i) =>
        `<tr><td style="padding:8px 0;font-size:14px;">${i.name} × ${i.quantity}</td>
         <td style="padding:8px 0;font-size:14px;text-align:right;">${formatPrice(i.lineTotal, data.currency)}</td></tr>`
    )
    .join("");

  return shell(
    `Order ${data.orderNumber} received`,
    `<p style="font-size:15px;line-height:1.6;color:#6e6e73;margin:0 0 24px;">
       Thank you, ${data.name || "there"}. We have your order and will confirm it shortly. Keep this
       email — it contains your reference number and payment details.
     </p>
     <p style="font-size:14px;margin:0 0 4px;"><strong>Order reference</strong></p>
     <p style="font-size:16px;margin:0 0 24px;">${data.orderNumber}</p>
     <table style="width:100%;border-collapse:collapse;border-top:1px solid #e5e5e7;border-bottom:1px solid #e5e5e7;">
       ${rows}
       <tr><td style="padding:12px 0;font-size:14px;font-weight:600;">Total</td>
       <td style="padding:12px 0;font-size:14px;font-weight:600;text-align:right;">${formatPrice(data.total, data.currency)}</td></tr>
     </table>
     <p style="font-size:14px;font-weight:600;margin:24px 0 4px;">Payment</p>
     <p style="font-size:14px;color:#6e6e73;margin:0 0 8px;">${data.paymentLabel}</p>
     <div style="font-size:14px;color:#6e6e73;line-height:1.6;white-space:pre-line;">${data.paymentInstructions}</div>
     ${addressBlock(data.shippingAddress)}
     <p style="font-size:13px;color:#6e6e73;margin:24px 0 0;">
       Questions? Reply to this email or call (313) 364-9615.
     </p>`
  );
}

export function adminOrderNotification(data: OrderEmailData) {
  const rows = data.items
    .map(
      (i) =>
        `<tr><td style="padding:6px 0;font-size:14px;">${i.name} × ${i.quantity}</td>
         <td style="padding:6px 0;font-size:14px;text-align:right;">${formatPrice(i.lineTotal, data.currency)}</td></tr>`
    )
    .join("");

  return shell(
    `New order ${data.orderNumber}`,
    `<p style="font-size:14px;color:#6e6e73;margin:0 0 16px;">${data.name} · ${data.email}</p>
     <table style="width:100%;border-collapse:collapse;">${rows}
     <tr><td style="padding:10px 0;font-weight:600;">Total</td>
     <td style="padding:10px 0;font-weight:600;text-align:right;">${formatPrice(data.total, data.currency)}</td></tr></table>
     <p style="font-size:14px;color:#6e6e73;margin:16px 0 0;">Payment method: ${data.paymentLabel}</p>`
  );
}

export function contactAutoReply(name: string) {
  return shell(
    "We have your message",
    `<p style="font-size:15px;line-height:1.6;color:#6e6e73;margin:0;">
       Hi ${name || "there"}, thanks for getting in touch. A member of the team will reply within
       one business day. If it is urgent, call (313) 364-9615.
     </p>`
  );
}

export function contactNotification(input: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  type: string;
}) {
  return shell(
    `New ${input.type} message`,
    `<p style="font-size:14px;color:#6e6e73;margin:0 0 4px;">${input.name} · ${input.email}${
      input.phone ? ` · ${input.phone}` : ""
    }</p>
     <p style="font-size:14px;margin:0 0 16px;"><strong>${input.subject || "No subject"}</strong></p>
     <p style="font-size:14px;line-height:1.6;color:#6e6e73;white-space:pre-line;margin:0;">${input.message}</p>`
  );
}
