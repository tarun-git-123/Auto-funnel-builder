import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { parseCSV } from "@/lib/csvParser";
import { getStorageDir } from "@/lib/storagePath";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ message: "No file provided" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  
  // Use project-level storage directory
  const storageDir = getStorageDir();
  if (!fs.existsSync(storageDir)) fs.mkdirSync(storageDir);

  const uploadPath = path.join(storageDir, file.name);
  fs.writeFileSync(uploadPath, buffer);

  const parsed = await parseCSV(uploadPath);
  fs.writeFileSync(path.join(storageDir, "batch.json"), JSON.stringify(parsed));

  return NextResponse.json({ message: `CSV uploaded. ${parsed.length} rows parsed.` });
}
