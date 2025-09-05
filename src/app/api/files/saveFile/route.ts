import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
const dirPath = path.join(process.cwd(), 'src/storage');

export async function POST(req:NextRequest){
    const {filePath,funnelName } = await req.json();
    const {path:relativePath,content} = filePath;
    const fullPath = path.join(dirPath, `${funnelName}/${relativePath}`);

    try {
        const file = await fs.writeFile(fullPath, content);
        return NextResponse.json({success:true, data:file}, {status:200});
    } catch (error:unknown) {
        if(error instanceof Error) {
            console.error(error.message);
            return NextResponse.json({success:false, error: error.message}, {status:500});
        }
    }
}