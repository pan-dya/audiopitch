import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { UserInfo } from "@/app/models/UserInfos";


export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return Response.json({});
    }
    const userInfo = await UserInfo.findOne({ email }).lean();

    if (userInfo && userInfo.role) {
        return Response.json({role: userInfo.role})
    } else {
        return Response.json({ role: "" });
    }
  }