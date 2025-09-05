import fs from 'fs';
import path from 'path';

export function getAvailableTemplates(): string[] {
  const templatesDir = path.join(process.cwd(), 'src/templates');

  if (!fs.existsSync(templatesDir)) {
    console.error('❌ Templates folder not found');
    return [];
  }

  const files = fs.readdirSync(templatesDir, { withFileTypes: true });

  const templates: string[] = [];

  for (const file of files) {
    if (file.isDirectory()) {
      templates.push(file.name);
    }
  }

  //console.log('✅ Found templates:', templates);
  return templates;
}
