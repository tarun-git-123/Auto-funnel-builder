import { connectToDB } from "@/lib/mongodb";
import { Funnel } from "@/models/Funnel";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDB();
    const funnels = await Funnel.find().sort({ createdAt: -1 });
    return NextResponse.json({ funnels });
}