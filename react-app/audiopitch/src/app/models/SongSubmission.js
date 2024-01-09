import { Schema, model, models } from "mongoose";

const SongSubmissionsSchema = new Schema(
  {
    artist: { type: String, required: true },
    title: { type: String },
    curator: { type: String },
    url: { type: String },
    date: { type: String },
    description: { type: String },
    feedback: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

export const SongSubmissions =
  models?.SongSubmissions || model("SongSubmissions", SongSubmissionsSchema);
