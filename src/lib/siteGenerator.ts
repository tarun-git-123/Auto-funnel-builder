import { getRandomTemplate } from "./templateBank";
import fs from "fs-extra";
import path from "path";

export async function generateSite(data: any) {
  const siteDir = path.join("/tmp", data.site_name);
  await fs.ensureDir(siteDir);

  const sections = {
    hero: getRandomTemplate("hero"),
    services: getRandomTemplate("services"),
    howItWorks: getRandomTemplate("howItWorks"),
    pricing: getRandomTemplate("pricing"),
    cta: getRandomTemplate("cta"),
  };

  const indexContent = `
    export default function Home() {
      return (
        <div style={{ backgroundColor: "${data.primary_color}", color: "${data.secondary_color}" }}>
          <h1>${data.site_name}</h1>
          <p>${data.legal_name}</p>
          <p>${data.address} | EIN: ${data.ein}</p>
        </div>
      )
    }
  `;

  await fs.writeFile(path.join(siteDir, "index.tsx"), indexContent);
  return siteDir;
}
