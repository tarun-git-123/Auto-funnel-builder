import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request, { params }: { params: { site: string } }) {
  const storageDir = path.join(process.cwd(), "storage");
  const zipPath = path.join(storageDir, `${params.site}.zip`);

  if (!fs.existsSync(zipPath)) {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(zipPath);
  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${params.site}.zip"`,
    },
  });
}
