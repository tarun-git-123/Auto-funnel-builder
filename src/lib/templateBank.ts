export const templates = {
  hero: ["hero1", "hero2", "hero3", "hero4", "hero5"],
  services: ["services1", "services2", "services3", "services4", "services5"],
  howItWorks: ["how1", "how2", "how3", "how4", "how5"],
  pricing: ["pricing1", "pricing2", "pricing3", "pricing4", "pricing5"],
  cta: ["cta1", "cta2", "cta3", "cta4", "cta5"],
};

export function getRandomTemplate(type: keyof typeof templates) {
  const options = templates[type];
  return options[Math.floor(Math.random() * options.length)];
}
