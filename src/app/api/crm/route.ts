import { NextRequest, NextResponse } from "next/server";
import { CRM } from "@/models/Crm";
import { connectToDB } from "@/lib/mongodb";
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        await connectToDB();
        // check if crm already exists
        const isExits = await CRM.findOne({label:body.label});
        if(isExits){
            return NextResponse.json({success:false, message:"CRM lebel already exists"}, {status:400});
        }
        const saved = await CRM.create(body);
        return NextResponse.json({ success: true, crmId: saved._id, message:"CRM saved successfully" },{ status:201 });
    } catch (error: unknown) {
        if(error instanceof Error) {
            console.error("❌ Save error:", error.message);
            return NextResponse.json({success: false, error: error.message, message:"Failed to save crm"}, { status: 500 });
        }
    }
}

export async function GET(){
    try{
        await connectToDB();
        const crms = await CRM.find({}).sort({createdAt:-1});
        return NextResponse.json({success:true, crms}, {status:200});
    }catch(error:unknown){
        if(error instanceof Error){
            return NextResponse.json({success:false, message:"Failed to fetch crms"}, {status:500});
        }
    }
}