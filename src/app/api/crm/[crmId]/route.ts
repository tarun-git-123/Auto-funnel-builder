import { NextRequest, NextResponse } from "next/server";
import { CRM } from '@/models/Crm';
import { connectToDB } from "@/lib/mongodb";
import { connect } from "http2";

export async function GET(
  req: NextRequest,
  { params }: { params: { crmId: string } }
) {
  try {
    const { crmId } = params;

    await connectToDB();

    const crm = await CRM.findOne({ _id: crmId });

    if (!crm) {
      return NextResponse.json(
        { success: false, message: "CRM not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, crm }, { status: 200 });
  } catch (error) {
    console.error("Error fetching CRM:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req:NextRequest, { params }: { params: Promise<{ crmId: string }> }) {
  try{
    const {crmId} = await params;
    await connectToDB();
    const body = await req.json();
    const crm = await CRM.findOneAndUpdate({_id:crmId},body,{new:true});
    return NextResponse.json({success:true, crm, message:"CRM updated successfully"},{status:200});
  }catch(err:unknown){
    if(err instanceof Error){
      console.error("❌ Save error:", err);
      return NextResponse.json({success: false, error: err.message}, { status: 500 });
    }
  }
}

export async function DELETE(req:NextRequest, {params}:{params:Promise<{crmId:String}>}){
  try {
    const {crmId} = (await params);
    await connectToDB();
    if(!crmId){
      return NextResponse.json({
        success:false,
        message:"CRM not found"
      })
    }
    const res = await CRM.deleteOne({_id:crmId});
    return NextResponse.json({
      success:true,
      message:"CRM deleted successfully"
    },{
      status:200
    })
  } catch (error:unknown) {
      if(error instanceof Error){
        console.error("❌ Save error:", error);
        return NextResponse.json({success: false, error: error.message}, { status: 500 });
      }
  }
}
