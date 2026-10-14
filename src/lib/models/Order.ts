import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const OrderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, default: "" },
    variant: { type: String, default: "" },
    unitPrice: { type: Number, required: true, default: 0 },
    quantity: { type: Number, required: true, default: 1 },
    lineTotal: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const TimelineSchema = new Schema(
  {
    at: { type: Date, default: Date.now },
    type: { type: String, default: "note" },
    message: { type: String, default: "" },
    actor: { type: String, default: "system" },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    email: { type: String, required: true, index: true },
    phone: { type: String, default: "" },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
      ],
      default: "pending",
      index: true,
    },
    currency: { type: String, default: "USD" },
    items: { type: [OrderItemSchema], default: [] },
    subtotal: { type: Number, default: 0 },
    shippingTotal: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    shippingAddress: { type: Schema.Types.Mixed, default: {} },
    billingAddress: { type: Schema.Types.Mixed, default: {} },
    paymentMethod: {
      methodId: { type: Schema.Types.ObjectId, ref: "PaymentMethod" },
      slug: { type: String, default: "" },
      label: { type: String, default: "" },
      instructions: { type: String, default: "" },
      reference: { type: String, default: "" },
      status: { type: String, default: "awaiting_instructions" },
    },
    fulfillment: {
      carrier: { type: String, default: "" },
      trackingNumber: { type: String, default: "" },
      trackingUrl: { type: String, default: "" },
      shippedAt: { type: Date },
      deliveredAt: { type: Date },
    },
    couponCode: { type: String, default: "" },
    notes: { type: String, default: "" },
    internalNotes: { type: String, default: "" },
    timeline: { type: [TimelineSchema], default: [] },
  },
  { timestamps: true }
);

export type OrderDoc = InferSchemaType<typeof OrderSchema>;

export const Order: Model<OrderDoc> =
  (mongoose.models.Order as Model<OrderDoc>) ||
  mongoose.model<OrderDoc>("Order", OrderSchema);
