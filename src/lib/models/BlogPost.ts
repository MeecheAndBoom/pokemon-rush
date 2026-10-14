import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const BlogPostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    coverAlt: { type: String, default: "" },
    author: { type: String, default: "Pokemon Rush" },
    category: { type: String, default: "Guides" },
    tags: { type: [String], default: [] },
    readingMinutes: { type: Number, default: 5 },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    publishedAt: { type: Date },
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export type BlogPostDoc = InferSchemaType<typeof BlogPostSchema>;

export const BlogPost: Model<BlogPostDoc> =
  (mongoose.models.BlogPost as Model<BlogPostDoc>) ||
  mongoose.model<BlogPostDoc>("BlogPost", BlogPostSchema);
