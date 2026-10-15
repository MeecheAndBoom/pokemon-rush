import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const AddressSchema = new Schema(
  {
    line1: { type: String, default: "" },
    line2: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
  },
  { _id: false }
);

const SiteSettingSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true, default: "site" },
    // Login + order-notification address for the admin account.
    adminEmail: { type: String, default: "" },
    phone: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    whatsappMessage: { type: String, default: "" },
    address: { type: AddressSchema, default: () => ({}) },
  },
  { timestamps: true }
);

export type SiteSettingDoc = InferSchemaType<typeof SiteSettingSchema>;

export const SiteSetting: Model<SiteSettingDoc> =
  (mongoose.models.SiteSetting as Model<SiteSettingDoc>) ||
  mongoose.model<SiteSettingDoc>("SiteSetting", SiteSettingSchema);
