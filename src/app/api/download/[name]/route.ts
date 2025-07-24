import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { name: string } }) {
  const filePath = path.join("/tmp", `${params.name}.zip`);
  if (!fs.existsSync(filePath)) return NextResponse.json({ message: "Not found" }, { status: 404 });

  const fileBuffer = fs.readFileSync(filePath);
  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${params.name}.zip"`,
    },
  });
}
