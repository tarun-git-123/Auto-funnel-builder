import { exec } from "child_process";

export async function deployToVercel(dir: string, siteName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`cd ${dir} && vercel --name ${siteName} --yes`, (err, stdout) => {
      if (err) reject(err);
      const url = stdout.match(/https?:\/\/[^\s]+/g)?.[0] || "";
      resolve(url);
    });
  });
}
