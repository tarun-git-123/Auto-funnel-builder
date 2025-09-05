import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
const dirPath = path.join(process.cwd(), 'src/storage');
export async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const funnelName = searchParams.get('funnelName');
    const relativePath = searchParams.get('filePath');
    const fullPath = path.join(dirPath, `${funnelName}/${relativePath}`);

    try {
        if(!relativePath) throw new Error('No file path provided');
        const file = await fs.readFile(fullPath, 'utf-8');
        return NextResponse.json({success:true, data:file}, {status:200});
    } catch (error:unknown) {
        if(error instanceof Error) {
            console.error(error.message);
            return NextResponse.json({success:false, error: error.message}, {status:500});
        }
    }
}