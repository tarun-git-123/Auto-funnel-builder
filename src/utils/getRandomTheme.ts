import { getAvailableThemes } from "./getThemes";
import { getTemplateConfig } from "./getTemplateSection";

export function getRandomSection(template: string): string {
  const themes = getAvailableThemes(template);
  const randomIndex = Math.floor(Math.random() * themes.length);
  return themes[randomIndex];
}

// export function generateThemeCombos(template: string): string[][] {
//     const themes = getAvailableThemes(template);
//     if (themes.length === 0) return [];
//     const combos: string[][] = [];
//     for (const hero of themes) {
//         for (const services of themes) {
//             for (const how of themes) {
//                 for (const pricing of themes) {
//                     for (const cta of themes) {
//                         combos.push([hero, services, how, pricing, cta]);
//                     }
//                 }
//             }
//         }
//     }
//     return shuffleArray(combos);
// }

export function generateThemeCombos(template: string): string[][] {
  const themes = getAvailableThemes(template);
  if (themes.length === 0) return [];
  const homeSections = getTemplateConfig(template);
  const sections = Object.keys(homeSections);
  const combos: string[][] = [];

  function buildCombo(currentCombo: string[], index: number) {
    if (index === sections.length) {
      combos.push([...currentCombo]);
      return;
    }

    for (const theme of themes) {
      currentCombo[index] = theme;
      buildCombo(currentCombo, index + 1);
    }
  }

  buildCombo([], 0);
  //console.log("template", combos);
  return shuffleArray(combos);
}

function shuffleArray(array: string[][]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}