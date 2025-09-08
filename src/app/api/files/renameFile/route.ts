import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
const dirPath = path.join(process.cwd(), 'src/storage');
export async function PUT(req: NextRequest) {
    const { oldFilePath, funnelName, name } = await req.json();
    const fullOldPath = path.join(dirPath, funnelName, oldFilePath);
    const parentDir = path.dirname(fullOldPath);
    const fullNewPath = path.join(parentDir, name);
    const newRelativePath = path.relative(path.join(dirPath, funnelName), fullNewPath);
    try {
        if (!name) throw new Error('Please provide a name for the file');
        const file = await fs.rename(fullOldPath, fullNewPath);
        return NextResponse.json({ success: true, relativePath: newRelativePath }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }
    }
}