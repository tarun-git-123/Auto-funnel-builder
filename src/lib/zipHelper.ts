import archiver from "archiver";
import fs from "fs";
import path from "path";

export async function zipDirectory(sourceDir: string, outPath: string) {
  const output = fs.createWriteStream(outPath);
  const archive = archiver("zip", { zlib: { level: 9 } });
  archive.pipe(output);
  archive.directory(sourceDir, false);
  await archive.finalize();
}
