import { connectToDB } from "@/lib/mongodb";
import { Funnel } from "@/models/Funnel";
import { buildTemplateFiles } from "@/utils/deployToVercel";
import AdmZip from "adm-zip";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { funnelId } = await req.json();
    if (!funnelId) return NextResponse.json({ error: "Missing funnelId" }, { status: 400 });

    await connectToDB();
    const config = await Funnel.findById(funnelId);

    if (!config) return NextResponse.json({ error: "Funnel not found" }, { status: 404 });

    const files = buildTemplateFiles(config.template, config);

    // create .vercel folder inside the files
    files.push({
      file: ".vercel/project.json",
      data: JSON.stringify({
        projectId: config.projectId,
        orgId: config.teamId
      })
    });

    const zip = new AdmZip();

    for (const file of files) {
      zip.addFile(file.file, Buffer.from(file.data, "utf-8"));
    }

    const zipBuffer = zip.toBuffer();

    return new Response(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename=${config.siteName}.zip`,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("❌ Download error:", err);
      return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }

  }
}
