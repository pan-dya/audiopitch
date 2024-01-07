import { model, models, Schema } from "mongoose";

const SubmissionsSchema = new Schema(
  {
    email: { type: String, required: true },
    media: { type: String },
    role: { type: String },
  },
  { timestamps: true }
);

export const Submissions =
  models?.Submissions || model("Submissions", SubmissionsSchema);
