import fs from "fs";
import path from "path";

const VERCEL_API = "https://api.vercel.com/v13/deployments";

export async function deployToVercel(dir: string, siteName: string): Promise<string> {
  const token = process.env.VERCEL_TOKEN;
  const teamId = process.env.VERCEL_TEAM_ID; // optional
  
  if (!token) throw new Error("Missing VERCEL_TOKEN in environment variables");

  // Prepare files to deploy
  const fs = await import("fs");
  const path = await import("path");

  function getFiles(dirPath: string): any[] {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const files: any[] = [];
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
          files.push(...getFiles(fullPath));
        } else {
          files.push({
            file: path.relative(dir, fullPath).replace(/\\/g, "/"),
            data: fs.readFileSync(fullPath).toString("base64"),
            encoding: "base64" // <— tell Vercel it's base64
          });
        }
      }
      return files;
  }

  createNextFiles(dir, siteName);

  const files = getFiles(dir);

  // Build deployment payload
  const sanitizedSiteName = sanitizeProjectName(siteName);
  const payload = {
    name: sanitizedSiteName,
    files,
    target: "production",
    projectSettings: {
      framework: "nextjs",
    },
  };

  const url = new URL(VERCEL_API);
  if (teamId) url.searchParams.set("teamId", teamId);

  // Deploy
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Vercel API Error: ${error}`);
  }

  const data = await res.json();
  return `https://${data.url}`;
}

function sanitizeProjectName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "-")  // replace invalid chars with '-'
    .replace(/---+/g, "-")          // collapse multiple dashes
    .replace(/^-+|-+$/g, "");       // trim leading/trailing dashes
}
function createNextFiles(dir: string, siteName: string) {
  // package.json
  const pkg = {
    name: siteName,
    version: "1.0.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start"
    },
    dependencies: {
      "next": "14.2.3",
      "react": "18.2.0",
      "react-dom": "18.2.0"
    },
    devDependencies: {
      typescript: "^5.4.2",
      "@types/react": "^18.2.21",
      "@types/node": "^20.11.30"
    }
  };
  fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify(pkg, null, 2));

  // tsconfig.json
  const tsconfig = {
    compilerOptions: {
      jsx: "preserve",
      esModuleInterop: true,
      strict: true,
      moduleResolution: "node",
      module: "esnext",
      target: "es5"
    }
  };
  fs.writeFileSync(path.join(dir, "tsconfig.json"), JSON.stringify(tsconfig, null, 2));

  // next.config.js
  fs.writeFileSync(
    path.join(dir, "next.config.js"),
    `module.exports = { reactStrictMode: true };`
  );
}