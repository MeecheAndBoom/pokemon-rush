"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/Order";
import { requireSession } from "@/app/admin/actions/auth";

export async function updateOrderStatusAction(formData: FormData) {
  await requireSession();
  await connectDB();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "pending");

  await Order.updateOne(
    { _id: id },
    {
      $set: { status },
      $push: {
        timeline: {
          at: new Date(),
          type: "status",
          message: `Status changed to ${status}`,
          actor: "admin",
        },
      },
    }
  );

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
  redirect(`/admin/orders/${id}?updated=1`);
}

export async function updateFulfillmentAction(formData: FormData) {
  await requireSession();
  await connectDB();
  const id = String(formData.get("id") || "");
  const carrier = String(formData.get("carrier") || "");
  const trackingNumber = String(formData.get("trackingNumber") || "");
  const trackingUrl = String(formData.get("trackingUrl") || "");

  await Order.updateOne(
    { _id: id },
    {
      $set: {
        "fulfillment.carrier": carrier,
        "fulfillment.trackingNumber": trackingNumber,
        "fulfillment.trackingUrl": trackingUrl,
      },
    }
  );

  revalidatePath(`/admin/orders/${id}`);
  redirect(`/admin/orders/${id}?tracked=1`);
}

export async function addOrderNoteAction(formData: FormData) {
  await requireSession();
  await connectDB();
  const id = String(formData.get("id") || "");
  const message = String(formData.get("message") || "").trim();
  if (!message) redirect(`/admin/orders/${id}`);

  await Order.updateOne(
    { _id: id },
    {
      $push: {
        timeline: { at: new Date(), type: "note", message, actor: "admin" },
      },
    }
  );

  revalidatePath(`/admin/orders/${id}`);
  redirect(`/admin/orders/${id}`);
}
