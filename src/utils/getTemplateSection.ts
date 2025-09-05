import fs from "fs";
import path from "path";

export function getTemplateConfig(templateName: string) {
  const filePath = path.join(process.cwd(), "src/templates", templateName, "template.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
}