import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { generateSite } from "@/lib/siteGenerator";
import { zipDirectory } from "@/lib/zipHelper";
import { deployToVercel } from "@/lib/vercelDeploy";

export async function GET() {
  const reportPath = path.join("/tmp", "report.json");
  if (!fs.existsSync(reportPath)) return NextResponse.json([]);
  return NextResponse.json(JSON.parse(fs.readFileSync(reportPath, "utf-8")));
}

export async function POST() {
  console.log("Processing batch...");
  const batch = JSON.parse(fs.readFileSync(path.join("/tmp", "batch.json"), "utf-8"));
  const report: any[] = [];

  for (const row of batch) {
    const siteDir = await generateSite(row);
    const zipPath = path.join("/tmp", `${row.site_name}.zip`);
    await zipDirectory(siteDir, zipPath);
    const vercelUrl = await deployToVercel(siteDir, row.site_name);
    report.push({ site_name: row.site_name, status: "done", vercel_url: vercelUrl });
  }

  fs.writeFileSync(path.join("/tmp", "report.json"), JSON.stringify(report));
  return NextResponse.json({ message: "Batch processed", report });
}
