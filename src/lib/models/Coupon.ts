import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const CouponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, index: true, uppercase: true },
    type: {
      type: String,
      enum: ["percent", "fixed", "free-shipping"],
      default: "percent",
    },
    value: { type: Number, default: 0 },
    minSubtotal: { type: Number, default: 0 },
    expiresAt: { type: Date },
    usageLimit: { type: Number, default: 0 },
    usedCount: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type CouponDoc = InferSchemaType<typeof CouponSchema>;

export const Coupon: Model<CouponDoc> =
  (mongoose.models.Coupon as Model<CouponDoc>) ||
  mongoose.model<CouponDoc>("Coupon", CouponSchema);
