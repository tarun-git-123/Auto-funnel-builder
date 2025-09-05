import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";

export async function POST(req: Request) {
    const body = await req.json();
    const projectPath = body.projectPath; // e.g., "./storage/ebook-v1"

    const token = process.env.VERCEL_TOKEN;

    if (!token) {
        return NextResponse.json(
            { success: false, error: "Missing VERCEL_TOKEN in environment variables" },
            { status: 500 }
        );
    }

    return new Promise((resolve) => {
        exec(`cd ${projectPath} && vercel --prod --token=${token}`, (error, stdout, stderr) => {
            if (error) {
                console.error(error);
                resolve(NextResponse.json({ success: false, error: error.message }));
                return;
            }
            resolve(
                NextResponse.json({
                    success: true,
                    stdout,
                    stderr,
                })
            );
        });
    });
}
