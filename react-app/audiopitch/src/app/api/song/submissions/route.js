import mongoose from "mongoose";
import { SongSubmissions } from "@/app/models/SongSubmission";
import { UserInfo } from "@/app/models/UserInfos";
import { User } from "@/app/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  const user = await UserInfo.findOne({ email }).lean();
  let submissionsQuery;

  if (user.admin) {
    submissionsQuery = await SongSubmissions.find().lean()
  } else if (user.role === "Curator") {
    submissionsQuery = await SongSubmissions.find({curator: email}).lean()
  } else if (user.role === "Artist") {
    submissionsQuery = await SongSubmissions.find({artist: email}).lean()
  }

  const submissions = submissionsQuery

  const result = await Promise.all(
    submissions.map(async (res) => {
      const artistUser = await User.findOne({ email: res.artist });
      return {
        id: res._id,
        email: res.artist,
        name: artistUser?.name || "Unknown",
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
