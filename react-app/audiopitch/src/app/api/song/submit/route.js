import mongoose from "mongoose";
import { UserInfo } from "@/app/models/UserInfos";
import {authOptions} from "../../auth/[...nextauth]/route"
import { SongSubmissions } from "@/app/models/SongSubmission";
import { getServerSession } from "next-auth";

export async function isArtist() {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) return false;
    const userInfo = await UserInfo.findOne({ email: userEmail });
    if (!userInfo) return false;
    if (userInfo.role === "Artist") return true
    else return false
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    const user = await UserInfo.find().lean();
    const submissions = await SongSubmissions.find().lean()
    return Response.json(user, submissions);
}

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    console.log(data);

    const session = await getServerSession(authOptions);
    const email = session.user.email;

    if (isArtist()) {
        const result = await SongSubmissions.create({ artist: email, ...data })
        console.log(result)
        return Response.json(true)
    } else {
        return Response.json(false)
    }
}