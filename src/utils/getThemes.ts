import fs from 'fs';
import path from 'path';

export function getAvailableThemes(template: string): string[] {
    const themeDir = path.join(process.cwd(), `src/templates/${template}/themes`);

    if (!fs.existsSync(themeDir)) {
        console.error(`❌ Theme folder not found within ${template} directory`);
        return [];
    }

    const files = fs.readdirSync(themeDir, { withFileTypes: true });

    const themes: string[] = [];

    for (const file of files) {
        if (file.isDirectory()) {
            themes.push(file.name);
        }
    }

    //console.log('✅ Found themes:', themes);
    return themes;
}
