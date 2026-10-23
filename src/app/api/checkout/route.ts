export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/Order";
import { Customer } from "@/lib/models/Customer";
import { PaymentMethod } from "@/lib/models/PaymentMethod";
import { defaultPaymentMethods } from "@/lib/payment-methods";
import { generateOrderNumber } from "@/lib/orders";
import { formatPrice, type CatalogProduct } from "@/lib/catalog";
import { adminOrderNotification, orderConfirmation, sendMail } from "@/lib/emails";
import { getNotificationEmail } from "@/lib/settings";

const lineSchema = z.object({
  slug: z.string(),
  name: z.string(),
  price: z.number().int().nonnegative(),
  quantity: z.number().int().positive(),
  image: z.string().optional(),
});

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  phone: z.string().trim().min(1, "Phone number is required"),
  paymentMethod: z.string(),
  lines: z.array(lineSchema).min(1),
  shippingAddress: z.record(z.string(), z.string()).optional(),
  billingAddress: z.record(z.string(), z.string()).optional(),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid checkout payload" },
        { status: 400 }
      );
    }

    await connectDB();

    const input = parsed.data;
    const methods = await PaymentMethod.find().lean();
    const pm = [...methods, ...defaultPaymentMethods].find((m) => m.slug === input.paymentMethod);

    const subtotal = input.lines.reduce((n, l) => n + l.price * l.quantity, 0);
    const total = subtotal;
    const orderNumber = generateOrderNumber();

    const doc = await Order.create({
      orderNumber,
      email: input.email,
      phone: input.phone || "",
      status: "pending",
      currency: "USD",
      items: input.lines.map((l) => ({
        slug: l.slug,
        name: l.name,
        image: l.image || "",
        unitPrice: l.price,
        quantity: l.quantity,
        lineTotal: l.price * l.quantity,
      })),
      subtotal,
      shippingTotal: 0,
      total,
      shippingAddress: input.shippingAddress || {},
      billingAddress: input.billingAddress || input.shippingAddress || {},
      paymentMethod: {
        slug: pm?.slug || input.paymentMethod,
        label: pm?.label || input.paymentMethod,
        instructions: pm?.instructions || "Instructions will be sent to your email.",
      },
      notes: input.notes || "",
      timeline: [
        { at: new Date(), type: "created", message: "Order placed", actor: "customer" },
      ],
    });

    await Customer.updateOne(
      { email: input.email.toLowerCase() },
      {
        $set: { name: input.name, phone: input.phone || "" },
        $inc: { orderCount: 1 },
        $setOnInsert: { email: input.email.toLowerCase() },
      },
      { upsert: true }
    );

    const emailData = {
      orderNumber: doc.orderNumber,
      email: doc.email,
      phone: doc.phone,
      name: input.name,
      items: doc.items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        lineTotal: i.lineTotal,
      })),
      subtotal: doc.subtotal,
      total: doc.total,
      currency: doc.currency,
      paymentLabel: doc.paymentMethod?.label || "",
      paymentInstructions: doc.paymentMethod?.instructions || "",
      shippingAddress: input.shippingAddress,
    };

    await sendMail({
      to: doc.email,
      subject: `PokéStore Direct – Order ${doc.orderNumber}`,
      html: orderConfirmation(emailData),
    });

    await sendMail({
      to: await getNotificationEmail(),
      subject: `New order ${doc.orderNumber}`,
      html: adminOrderNotification(emailData),
    });

    return NextResponse.json({ ok: true, orderNumber: doc.orderNumber });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}
