import fs from "fs";
import path from "path";
import { SiteConfig } from "@/types/site-config";
import { getTemplateConfig } from "./getTemplateSection";

const read = (relativePath: string) =>
	fs.readFileSync(path.join(process.cwd(), relativePath), "utf-8");

function sanitizeProjectName(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9._-]/g, "-")  // replace invalid chars with '-'
		.replace(/---+/g, "-")          // collapse multiple dashes
		.replace(/^-+|-+$/g, "");       // trim leading/trailing dashes
}

export function buildTemplateFiles(template: string, config: SiteConfig): { file: string; data: string }[] {
	const basePath = `src/templates/${template}`;

	const themeCombo = config.theme?.split(',').map(t => t.trim()) ?? [];
	//console.log("themeCombo", themeCombo);
	const homeSections = getTemplateConfig(template);
	let homeSectionComponentArray = [];

	for (const [section, component] of Object.entries(homeSections)) {
		// Find index of section to pick the right themeCombo index
		const sectionIndex = Object.keys(homeSections).indexOf(section);
		//console.log(sectionIndex);

		homeSectionComponentArray.push({
			file: `components/home/${component}`,
			data: read(`${basePath}/themes/${themeCombo[sectionIndex] || 1}/${component}`)
		});
	}

	let otherFiles = [
		// Pages inside /app
		{ file: "app/layout.tsx", data: read(`${basePath}/app/layout.tsx`) },
		{ file: "app/page.tsx", data: read(`${basePath}/app/home.tsx`) },
		{ file: "app/about/page.tsx", data: read(`${basePath}/app/about/about.tsx`) },
		{ file: "app/contact/page.tsx", data: read(`${basePath}/app/contact/contact.tsx`) },
		{ file: "app/pricing/page.tsx", data: read(`${basePath}/app/pricing/pricing.tsx`) },
		{ file: "app/checkout/page.tsx", data: read(`${basePath}/app/checkout/checkout.tsx`) },
		{ file: "app/thank-you/page.tsx", data: read(`${basePath}/app/thank-you/thank-you.tsx`) },
		{ file: "app/globals.css", data: read(`${basePath}/app/globals.css`) },

		// legal pages
		{ file: "app/legal/cookies/page.tsx", data: read(`${basePath}/app/legal/cookies/cookies.tsx`) },
		{ file: "app/legal/cookies/cookies-content.ts", data: read(`${basePath}/app/legal/cookies/cookies-content.ts`) },
		{ file: "app/legal/privacy/page.tsx", data: read(`${basePath}/app/legal/privacy/privacy.tsx`) },
		{ file: "app/legal/privacy/privacy-content.ts", data: read(`${basePath}/app/legal/privacy/privacy-content.ts`) },
		{ file: "app/legal/terms/page.tsx", data: read(`${basePath}/app/legal/terms/terms.tsx`) },
		{ file: "app/legal/terms/terms-content.ts", data: read(`${basePath}/app/legal/terms/terms-content.ts`) },
		{ file: "app/legal/LegalContent.tsx", data: read(`${basePath}/app/legal/LegalContent.tsx`) },

		// Components folder
		{ file: "components/layout/Navbar.tsx", data: read(`${basePath}/components/layout/Navbar.tsx`) },
		{ file: "components/layout/Footer.tsx", data: read(`${basePath}/components/layout/Footer.tsx`) },

		{ file: "components/pricing/PricingHero.tsx", data: read(`${basePath}/components/pricing/PricingHero.tsx`) },
		{ file: "components/pricing/PricingTabs.tsx", data: read(`${basePath}/components/pricing/PricingTabs.tsx`) },

		{ file: "components/checkout/CheckoutPage.tsx", data: read(`${basePath}/components/checkout/CheckoutPage.tsx`) },
		{ file: "components/checkout/ErrorPopUp.tsx", data: read(`${basePath}/components/checkout/ErrorPopUp.tsx`) },
		{ file: "components/checkout/Form.tsx", data: read(`${basePath}/components/checkout/Form.tsx`) },
		{ file: "components/checkout/LoaderProcessing.tsx", data: read(`${basePath}/components/checkout/LoaderProcessing.tsx`) },

		{ file: "components/contact/ContactForm.tsx", data: read(`${basePath}/components/contact/ContactForm.tsx`) },
		{ file: "components/contact/ContactInfo.tsx", data: read(`${basePath}/components/contact/ContactInfo.tsx`) },

		{ file: "components/ui/LegalPopup.tsx", data: read(`${basePath}/components/ui/LegalPopup.tsx`) },

		// utils folder
		{ file: "utils/products/product.utils.ts", data: read(`${basePath}/utils/products/product.utils.ts`) },

		// config for getting the details of product company etc
		{ file: "config.json", data: JSON.stringify(config, null, 2) },

		// config for dynamically takes the sections
		{ file: "template.json", data: read(`${basePath}/template.json`) },

		// hooks folder
		{ file: "hooks/useFormFields.ts", data: read(`${basePath}/hooks/useFormFields.ts`) },

		// api
		{ file: "app/api/legal/route.ts", data: read(`${basePath}/app/api/legal/route.ts`) },
		{ file: "app/api/order/route.ts", data: read(`${basePath}/app/api/order/route.ts`) },

		// package.json
		{
			file: "package.json",
			data: JSON.stringify(
				{
					name: sanitizeProjectName(config.siteName),
					version: "1.0.0",
					private: true,
					scripts: {
						dev: "next dev",
						build: "next build",
						start: "next start"
					},
					dependencies: {
						next: "15.4.2",
						react: "19.1.0",
						"react-dom": "19.1.0",
						"framer-motion": "^12.23.9",
						"axios": "^1.11.0",
						"lucide-react": "^0.533.0"
					},
					devDependencies: {
						typescript: "^5.4.2",
						"@types/react": "^18.2.21",
						"@types/node": "^20.11.30",
						tailwindcss: "^4",
						"@tailwindcss/postcss": "^4",
						postcss: "^8.4.38"
					}
				},
				null,
				2
			)
		},
		{
			file: "postcss.config.mjs",
			data: `const config = {
  plugins: {
	"@tailwindcss/postcss": {},
  },
};
export default config;`
		},
		{
			file: "tsconfig.json",
			data: read("tsconfig.json")
		},
		{
			file: "next.config.js",
			data: `/** @type {import('next').NextConfig} */
	const nextConfig = {
	  reactStrictMode: true,
	  images: {
		domains: ["images.unsplash.com"],
	  },
	};
	module.exports = nextConfig;`
		}
	];

	return [...homeSectionComponentArray, ...otherFiles]
}


export async function createProject(projectName: string, framework: string = "nextjs") {
	const token = process.env.VERCEL_TOKEN!;
	const sanitizedName = sanitizeProjectName(projectName);
	const res = await fetch(`https://api.vercel.com/v9/projects`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: sanitizedName,
			framework,
		}),
	});

	const json = await res.json();
	if (!res.ok) {
		return {
			success: false,
			message: `❌ Failed to create project: ${JSON.stringify(json)}`,
		}
		//throw new Error(`❌ Failed to create project: ${JSON.stringify(json)}`);
	}

	//console.log(`✅ Project created: ${json.id} (${json.name})`);
	return {
		success: true,
		id: json.id
	}
}

export async function deployToVercel(
	files: { file: string; data: string }[],
	projectName: string,
	projectId: string
) {
	const token = process.env.VERCEL_TOKEN!;
	const sanitizedName = sanitizeProjectName(projectName);

	const res = await fetch("https://api.vercel.com/v13/deployments", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: sanitizedName,
			project: projectId,
			files,
			projectSettings: {
				framework: "nextjs",
			},
			buildCommand: "npm run build",
			devCommand: "npm run dev",
			outputDirectory: ".next",
		}),
	});

	const json = await res.json();

	if (!res.ok) {
		return {
			success: false,
			message: `Deployment failed: ${json.error?.message || "Unknown error"}`,
		}
	}

	return {
		success: true,
		data: json
	}
}

export async function uploadEnvVars(projectId: string, envVars: { key: string; value: string }[]) {
	const token = process.env.VERCEL_TOKEN;
	for (const env of envVars) {
		const payload = {
			key: env.key,
			value: env.value,
			target: ["production"],
			type: "encrypted",
		};

		const res = await fetch(`https://api.vercel.com/v10/projects/${projectId}/env`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		const json = await res.json();
		//console.log("json", json);
		if (!res.ok) {
			return {
				success: false,
				message: `❌ Failed to upload ${env.key}:`, json,
			}
		}
	}
	return {
		success: true
	}
}

export async function getBuildLogs(deployedId: string) {
	const res = await fetch(`https://api.vercel.com/v3/deployments/${deployedId}/events`, {
		headers: {
			'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`
		}
	});
	const logs = await res.json();
	return logs;
}


// Poll build logs until deployment is ready
export async function getDeploymentStatus(deploymentId: string): Promise<string> {
	let ready = false;
	let deploymenStatus = "";
	while (!ready) {
		// Fetch deployment status
		const statusRes = await fetch(
			`https://api.vercel.com/v13/deployments/${deploymentId}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
				},
			}
		);
		const statusData = await statusRes.json();
		//console.log("statusData", statusData.readyState);
		deploymenStatus = statusData.readyState;
		ready = statusData.readyState === "READY" || statusData.readyState === "ERROR";

		console.log("deploymenStatus", deploymenStatus);

		if (!ready) {
			await new Promise((r) => setTimeout(r, 3000));
		}
	}

	return deploymenStatus
}