import mongoose from "mongoose";
import { SongSubmissions } from "@/app/models/SongSubmission";
import { UserInfo } from "@/app/models/UserInfos";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

async function isCurator() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) return false;
  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) return false;
  //   console.log(userInfo);
  if (userInfo.role === "Curator") return true;
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  try {
    const userInfo = await UserInfo.find().lean();
    const submissions = await SongSubmissions.find().lean();
    return Response.json(...submissions, ...userInfo);
  } catch (error) {
    console.error("Fetching Error", error);
    return Response.json({ message: "Error fetching submissions" });
  }
}

export async function PATCH(req) {
  mongoose.connect(process.env.MONGO_URL);
  // console.log(req)
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const { feedback, status } = await req.json();
  console.log(id, feedback, status);
//   console.log(await SongSubmissions.findOne({ _id: id }).lean());
  if (await isCurator()) {
    try {
      const result = await SongSubmissions.findOneAndUpdate(
        { _id: id },
        { $set: { feedback: feedback, status:status } }
      );
        console.log("Result: ", { result });
      return Response.json(true);
    } catch (error) {
      return Response.json({
        success: false,
        message: "Error updating userInfo",
      });
    }
  }
}