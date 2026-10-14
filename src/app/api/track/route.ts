import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/Order";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const orderNumber = url.searchParams.get("orderNumber")?.trim();
  const email = url.searchParams.get("email")?.trim().toLowerCase();

  if (!orderNumber || !email) {
    return NextResponse.json({ error: "Missing orderNumber or email" }, { status: 400 });
  }

  await connectDB();
  const order = await Order.findOne({ orderNumber, email }).lean();
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({
    orderNumber: order.orderNumber,
    status: order.status,
    total: order.total,
    currency: order.currency,
    items: order.items,
    createdAt: order.createdAt,
    shippingAddress: order.shippingAddress,
    fulfillment: order.fulfillment,
    paymentMethod: order.paymentMethod,
  });
}
