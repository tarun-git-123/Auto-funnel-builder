import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
const dirPath = path.join(process.cwd(), 'src/storage');

export async function POST(req:NextRequest){
    const {filePath, funnelName, name, type} = await req.json();
    const fullPath = path.join(dirPath, `${funnelName}/${filePath}`);
    const relativePath = path.join(filePath);
    try {
        if(!name) throw new Error(`${type} name is required`);
        if(type === 'file'){
           const file = await fs.writeFile(fullPath, '');
        }else{
            const file = await fs.mkdir(fullPath, { recursive: true });
        }

        return NextResponse.json({success:true, relativePath}, {status:200});
    } catch (error:unknown) {
        if(error instanceof Error) {
            console.error(error.message);
            return NextResponse.json({success:false, error: error.message}, {status:500});
        }
    }
}