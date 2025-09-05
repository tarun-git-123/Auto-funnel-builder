import { connectToDB } from "@/lib/mongodb";
import { Funnel } from "@/models/Funnel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await connectToDB();
        const saved = await Funnel.create(body);

        return NextResponse.json({ success: true, funnelId: saved._id });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("❌ Save error:", err);
            return NextResponse.json({ error: "Failed to save project" }, { status: 500 });
        }
    }
}