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
  if (!fs.existsSync(reportPath)) return NextResponse.json([
    { message: "No report found" },
    { status: 404 }
  ]);
  return NextResponse.json(JSON.parse(fs.readFileSync(reportPath, "utf-8")));
}

export async function POST() {
  try {
    const storageDir = getStorageDir();
    if (!fs.existsSync(storageDir)) fs.mkdirSync(storageDir);
    console.log("Storage dir:", storageDir);

    const batchPath = path.join(storageDir, "batch.json");
    if (!fs.existsSync(batchPath)) {
      console.error("No batch.json found");
      return NextResponse.json({ message: "No batch uploaded" }, { status: 400 });
    }

    const batch = JSON.parse(fs.readFileSync(batchPath, "utf-8"));
    console.log("Batch loaded:", batch);

    const report: any[] = [];
    for (const row of batch) {
      try {
        console.log("Processing site:", row.site_name);
        const siteDir = await generateSite(row);
        const zipPath = path.join(storageDir, `${row.site_name}.zip`);
        await zipDirectory(siteDir, zipPath);
        const vercelUrl = await deployToVercel(siteDir, row.site_name);
        report.push({ site_name: row.site_name, status: "done", vercel_url: vercelUrl });
      } catch (err) {
        console.error("Error generating site:", row.site_name, err);
        report.push({ site_name: row.site_name, status: "error", error: String(err) });
      }
    }

    const reportPath = path.join(storageDir, "report.json");
    console.log("Writing report to:", reportPath);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log("Report written.");

    return NextResponse.json({ message: "Batch processed", report });
  } catch (err) {
    console.error("POST /generate failed:", err);
    return NextResponse.json({ message: "Error generating report", error: String(err) }, { status: 500 });
  }
}

