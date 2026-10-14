import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { PaymentMethod } from "@/lib/models/PaymentMethod";
import { defaultPaymentMethods } from "@/lib/payment-methods";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const methods = await PaymentMethod.find({ isActive: true }).sort({ order: 1 }).lean();
    if (methods.length === 0) {
      return NextResponse.json({ methods: defaultPaymentMethods, source: "default" });
    }
    return NextResponse.json({
      methods: methods.map((m) => ({
        slug: m.slug,
        label: m.label,
        description: m.description,
        instructions: m.instructions,
        details: m.details ?? [],
      })),
      source: "db",
    });
  } catch {
    return NextResponse.json({ methods: defaultPaymentMethods, source: "fallback" });
  }
}
