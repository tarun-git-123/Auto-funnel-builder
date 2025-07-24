import { getRandomTemplate } from "./templateBank";
import fs from "fs-extra";
import path from "path";

export async function generateSite(data: any) {
  const siteDir = path.join("/tmp", data.site_name);
  const appDir = path.join(siteDir, "app");
  await fs.ensureDir(appDir);

  const sections = {
    hero: getRandomTemplate("hero"),
    services: getRandomTemplate("services"),
    howItWorks: getRandomTemplate("howItWorks"),
    pricing: getRandomTemplate("pricing"),
    cta: getRandomTemplate("cta"),
  };

  // Layout
  const layoutContent = `
    import { ReactNode } from "react";
    export default function RootLayout({ children }: { children: ReactNode }) {
      return (
        <html lang="en">
          <body>{children}</body>
        </html>
      );
    }
  `;
  await fs.writeFile(path.join(appDir, "layout.tsx"), layoutContent);

  // Homepage (page.tsx)
  const indexContent = `
    export default function Home() {
      return (
        <div style={{ backgroundColor: "${data.primary_color}", color: "${data.secondary_color}" }}>
          <h1>${data.site_name}</h1>
          <p>${data.legal_name}</p>
          <p>${data.address} | EIN: ${data.ein}</p>
          ${sections.hero}
          ${sections.services}
          ${sections.howItWorks}
          ${sections.pricing}
          ${sections.cta}
        </div>
      )
    }
  `;
  await fs.writeFile(path.join(appDir, "page.tsx"), indexContent);

  return siteDir;
}
