import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { generateSite } from "@/lib/siteGenerator";
import { zipDirectory } from "@/lib/zipHelper";
import { deployToVercel } from "@/lib/vercelDeploy";

import { getStorageDir } from "@/lib/storagePath";


export async function GET() {
  const storageDir = getStorageDir();
  const reportPath = path.join(storageDir, "report.json");
  if (!fs.existsSync(reportPath)) return NextResponse.json([]);
  return NextResponse.json(JSON.parse(fs.readFileSync(reportPath, "utf-8")));
}
export async function POST() {
  const storageDir = getStorageDir();
  const batchPath = path.join(storageDir, "batch.json");

  if (!fs.existsSync(batchPath)) {
    return NextResponse.json({ message: "No batch uploaded" }, { status: 400 });
  }

  const batch = JSON.parse(fs.readFileSync(batchPath, "utf-8"));
  const report: any[] = [];
  
  for (const row of batch) {
    const siteDir = await generateSite(row);
    const zipPath = path.join(storageDir, `${row.site_name}.zip`);
    await zipDirectory(siteDir, zipPath);
    const vercelUrl = await deployToVercel(siteDir, row.site_name);
    report.push({ site_name: row.site_name, status: "done", vercel_url: vercelUrl });
  }

  fs.writeFileSync(path.join(storageDir, "report.json"), JSON.stringify(report, null, 2));
  return NextResponse.json({ message: "Batch processed", report });
}
