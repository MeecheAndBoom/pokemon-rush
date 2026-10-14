import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const SubmissionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["contact", "support", "specialist", "wholesale", "newsletter"],
      default: "contact",
      index: true,
    },
    name: { type: String, default: "" },
    email: { type: String, required: true, index: true },
    phone: { type: String, default: "" },
    orderNumber: { type: String, default: "" },
    subject: { type: String, default: "" },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "open", "closed"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true }
);

export type SubmissionDoc = InferSchemaType<typeof SubmissionSchema>;

export const Submission: Model<SubmissionDoc> =
  (mongoose.models.Submission as Model<SubmissionDoc>) ||
  mongoose.model<SubmissionDoc>("Submission", SubmissionSchema);
