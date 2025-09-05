import { getTreeFiles } from "@/utils/fileManager/getTreeFiles";
import fs from "fs/promises"
import path from "path";
import {NextRequest, NextResponse} from "next/server";

const ROOT = path.join(process.cwd(), "src/storage"); // root directory
export async function GET(req:NextRequest) {
    const { searchParams } = new URL(req.url);
    //console.log(searchParams)
    const filePath = searchParams.get('filePath');
    if(!filePath) {
        return NextResponse.json({ success: false, error: 'No file path provided' }, { status: 400 });
    }
    const dirPath = path.join(ROOT, filePath);
    try {
        const files = await getTreeFiles(dirPath);
        return NextResponse.json({ success: true, data: files }, { status: 200 });
    } catch (err : unknown) {
        if(err instanceof Error) {
            console.error(err.message);
            return NextResponse.json({success: false, error: err.message },{status:500});
        }
    }
}