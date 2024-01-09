import mongoose from "mongoose";
import { SongSubmissions } from "@/app/models/SongSubmission";
import { User } from "@/app/models/User";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  const submissions = await SongSubmissions.find().lean();
  const result = await Promise.all(
    submissions.map(async (res) => {
      const user = await User.findOne({ email: res.artist });
      return {
        id: res._id,
        email: res.artist,
        name: user?.name || "Unknown",
        title: res.title,
        curator: res.curator,
        url: res.url,
        date: res.date,
        description: res.description,
        status: res.status,
        feedback: res.feedback,
      };
    })
  );
  return Response.json(result);
}
