import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions, isAdmin } from "../auth/[...nextauth]/route";
import { Submissions } from "../../models/Submissions";
import { UserInfo } from "@/app/models/UserInfos";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const session = await getServerSession(authOptions);
  const email = session.user.email;

  await Submissions.findOneAndUpdate({ email }, data, { upsert: true });
  await UserInfo.findOneAndUpdate({ email }, data, { upsert: true });

  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return Response.json({});
  }
  const submission = await Submissions.findOne({ email }).lean();
  const userInfo = await UserInfo.findOne({ email }).lean();
  return Response.json({ ...submission, ...userInfo });
}