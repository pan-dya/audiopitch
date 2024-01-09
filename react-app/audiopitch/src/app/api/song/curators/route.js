import { User } from "@/app/models/User";
import { UserInfo } from "@/app/models/UserInfos";
import mongoose from "mongoose";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  const usersWithRole = await UserInfo.find({ role: "Curator" }).lean();
  const curators = await Promise.all(
    usersWithRole.map(async (curator) => {
      const user = await User.findOne({ email: curator.email });
      return {
        email: curator.email,
        name: user?.name || "Unknown",
      };
    })
  );
  return Response.json(curators);
}
