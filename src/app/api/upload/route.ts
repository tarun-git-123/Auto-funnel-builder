import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { parseCSV } from "@/lib/csvParser";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ message: "No file provided" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadPath = path.join("/tmp", file.name);
  fs.writeFileSync(uploadPath, buffer);

  const parsed = await parseCSV(uploadPath);
  fs.writeFileSync(path.join("/tmp", "batch.json"), JSON.stringify(parsed));

  return NextResponse.json({ message: `CSV uploaded. ${parsed.length} rows parsed.` });
}