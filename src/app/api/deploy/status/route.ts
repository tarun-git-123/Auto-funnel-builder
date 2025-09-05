
import { Funnel } from "@/models/Funnel";
import { getDeploymentStatus } from "@/utils/deployToVercel";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const deploymentId = searchParams.get("id");

  if (!deploymentId) {
    return NextResponse.json({ status: "Unknown" });
  }

  let status =await getDeploymentStatus(deploymentId)

  if (status === "BUILDING") status = "BUILDING...";
  if (status === "READY"){
    status = "READY";
    await Funnel.updateOne({ deployedId: deploymentId }, { status });
  } 
  if (status === "ERROR") {
    status = "FAILED";
    await Funnel.updateOne({ deployedId: deploymentId }, { status });
  }

  return NextResponse.json({ status });
}
