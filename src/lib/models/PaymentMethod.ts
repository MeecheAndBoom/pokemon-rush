import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const PaymentMethodSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    label: { type: String, required: true },
    description: { type: String, default: "" },
    instructions: { type: String, default: "" },
    details: [{ label: String, value: String }],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export type PaymentMethodDoc = InferSchemaType<typeof PaymentMethodSchema>;

export const PaymentMethod: Model<PaymentMethodDoc> =
  (mongoose.models.PaymentMethod as Model<PaymentMethodDoc>) ||
  mongoose.model<PaymentMethodDoc>("PaymentMethod", PaymentMethodSchema);
