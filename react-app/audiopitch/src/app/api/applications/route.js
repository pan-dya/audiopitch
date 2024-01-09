import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";
import { Submissions } from "@/app/models/Submissions";
import { UserInfo } from "@/app/models/UserInfos";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  //   const submission = await Submissions.find();
  //   const userInfo = await UserInfo.find();
  //   return Response.json({ ...submission, ...userInfo });

  try {
    const userInfo = await UserInfo.find().lean();
    const applications = await Submissions.find().lean();
    return Response.json(applications, ...userInfo);
  } catch (error) {
    console.error("Fetching Error", error);
    return Response.json({ message: "Error fetching submissions" });
  }
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (await isAdmin()) {
    try {
      const result = await Submissions.deleteOne({ _id });
      // console.log("Delete result:", result); // Log for debugging
      return Response.json(true);
    } catch (error) {
      // console.error("Error deleting submission:", error);
      return Response.json({
        success: false,
        message: "Error deleting submission",
      });
    }
  }
}

export async function PATCH(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  const { feedback } = await req.json();
  console.log(email, feedback);
  if (await isAdmin()) {
    try {
      const result = await UserInfo.findOneAndUpdate(
        { email },
        { $set: { role: feedback } }
      );
      // console.log("Result: ", result);
      return Response.json(true);
    } catch (error) {
      return Response.json({
        success: false,
        message: "Error updating userInfo",
      });
    }
  }
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  const { role } = await req.json();
  console.log(email, role);
  if (await isAdmin()) {
    try {
      const result = await UserInfo.findOneAndUpdate(
        { email },
        { $set: { role: role } }
      );
      console.log("Result", result);
      return Response.json(true);
    } catch (error) {
      return Response.json({
        success: false,
        message: "Error updating userInfo",
      });
    }
  }
}
