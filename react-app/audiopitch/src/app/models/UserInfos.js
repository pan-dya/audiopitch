import { model, models, Schema } from "mongoose";

const UserInfoSchema = new Schema(
  {
    email: { type: String, required: true },
    media: { type: String },
    role: { type: String },
    admin: { type: Boolean, default: false },
    feedback: { type: String },
  },
  { timestamps: true }
);

export const UserInfo = models?.UserInfo || model("UserInfo", UserInfoSchema);
