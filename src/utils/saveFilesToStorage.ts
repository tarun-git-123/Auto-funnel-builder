import path from "path";
import fs from "fs";

const storageDir = path.join(process.cwd(), "src/storage"); // <- project root

export async function saveFilesToStorage(
  files: { file: string; data: string }[],
  siteName: string,
  projectId: string,
  orgId: string
) {
  const baseDir = path.join(storageDir, siteName);

  for (const { file, data } of files) {
    const filePath = path.join(baseDir, file);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, data);
  }

  // .vercel folder
  const vercelDir = path.join(baseDir, ".vercel");
  fs.mkdirSync(vercelDir, { recursive: true });
  fs.writeFileSync(
    path.join(vercelDir, "project.json"),
    JSON.stringify({ projectId, orgId }, null, 2)
  );

  //console.log(`✅ Files and .vercel/project.json saved to ${baseDir}`);
}
