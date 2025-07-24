import path from "path";
import fs from "fs";

export function getStorageDir() {
  const dir = path.join(process.cwd(), "storage");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  return dir;
}