import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const ImageSchema = new Schema(
  {
    publicId: { type: String, default: "" },
    url: { type: String, required: true },
    alt: { type: String, default: "" },
    width: { type: Number },
    height: { type: Number },
  },
  { _id: false }
);

const ProductSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    subtitle: { type: String, default: "" },
    brand: {
      type: String,
      enum: ["pokemon", "one-piece", "weiss-schwarz", "accessories"],
      default: "pokemon",
      index: true,
    },
    language: {
      type: String,
      enum: ["english", "japanese", "chinese", "korean", "n/a"],
      default: "english",
      index: true,
    },
    productType: {
      type: String,
      enum: [
        "booster-box",
        "booster-bundle",
        "elite-trainer-box",
        "sealed-case",
        "booster-pack",
        "collection",
        "trial-deck",
        "single-card",
        "graded-card",
        "accessory",
      ],
      default: "booster-box",
      index: true,
    },
    categoryIds: [{ type: Schema.Types.ObjectId, ref: "Category", index: true }],
    setName: { type: String, default: "" },
    series: { type: String, default: "" },
    releaseDate: { type: Date },
    sku: { type: String, sparse: true },
    price: { type: Number, required: true, default: 0 },
    compareAtPrice: { type: Number },
    currency: { type: String, default: "USD", enum: ["USD", "CAD", "JPY", "GBP", "EUR"] },
    condition: {
      type: String,
      enum: ["new-sealed", "new", "graded", "used"],
      default: "new-sealed",
    },
    gradingCompany: { type: String, default: "" },
    gradingScore: { type: String, default: "" },
    images: { type: [ImageSchema], default: [] },
    description: { type: String, default: "" },
    highlights: { type: [String], default: [] },
    specs: { type: Schema.Types.Mixed, default: {} },
    tags: { type: [String], default: [], index: true },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },
    featured: { type: Boolean, default: false, index: true },
    ratingAvg: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    soldCount: { type: Number, default: 0 },
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      keywords: { type: [String], default: [] },
    },
  },
  { timestamps: true }
);

ProductSchema.index({ name: "text", description: "text", tags: "text", setName: "text" });
ProductSchema.index({ status: 1, featured: 1 });

export type ProductDoc = InferSchemaType<typeof ProductSchema>;

export const Product: Model<ProductDoc> =
  (mongoose.models.Product as Model<ProductDoc>) ||
  mongoose.model<ProductDoc>("Product", ProductSchema);
