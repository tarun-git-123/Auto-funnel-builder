import { NextResponse } from "next/server";
import { buildTemplateFiles, createProject, deployToVercel, getDeploymentStatus, uploadEnvVars } from "@/utils/deployToVercel";
import { SiteConfig } from "@/types/site-config";
import { Funnel } from "@/models/Funnel";
import { connectToDB } from "@/lib/mongodb";
import { CRM } from "@/models/Crm";
import { getRandomSection } from "@/utils/getRandomTheme";
import { saveFilesToStorage } from "@/utils/saveFilesToStorage";
import { getTemplateConfig } from "@/utils/getTemplateSection";

export async function POST(req: Request) {
    const config: SiteConfig = await req.json();
    const { template: templateName, siteName } = config;
    const envVars = [];
    if (!templateName || !siteName) {
        return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    try {
        await connectToDB();
        const crmDetails = await CRM.findOne({ label: config.crm });
        if (crmDetails) {
            envVars.push(
                { key: "CRM_ENDPOINT", value: crmDetails.endpoint },
                { key: "CRM_USERNAME", value: crmDetails.username },
                { key: "CRM_PASSWORD", value: crmDetails.password },
            )
        }

        if(!config.theme || config.theme =="undefined"){
            const homSections = getTemplateConfig(config.template)
            config.theme = Object.keys(homSections)
  .map(() => getRandomSection(config.template as string))
  .join(',');
        }

        const files = buildTemplateFiles(templateName, config);

        // create project
        const projectId = await createProject(siteName);
        if(!projectId.success){
            throw new Error(projectId?.message);
        }

        // 2. Upload env vars
        const envVarResult = await uploadEnvVars(projectId?.id, envVars);
        if(!envVarResult?.success){
            throw new Error(envVarResult?.message);
        }

        // 3. Deploy project
        const result = await deployToVercel(files, siteName, projectId?.id);
        if(!result?.success){
            throw new Error(result?.message);
        }

        let finalUrl: string | undefined = undefined;

        if (result.data.alias && result.data.alias.length > 0) {
            finalUrl = result.data.alias[0];
        } else if (result.data.automaticAliases && result.data.automaticAliases.length > 0) {
            finalUrl = result.data.automaticAliases[0];
        } else if (result.data.url) {
            finalUrl = result.data.url;
        }

        // get realtime deployment status from vercel
        const status = await getDeploymentStatus(result.data.id);

        if (status === "error" || status === "ERROR") throw new Error("Failed to build funnel");

        await Funnel.create({
            ...config,
            deployedUrl: finalUrl || "", 
            deployedId: result?.data?.id || "", 
            projectId: result?.data?.projectId || "", 
            teamId: result?.data?.team.id || "",
            status: status,
        });

        // 4. Save project file in storage file within file directory
        await saveFilesToStorage(files, siteName, result?.data?.projectId, result?.data?.team.id as string);

        return NextResponse.json({
            success: true,
            url: finalUrl,
            deployedId: result?.data?.id,
            projectId: result?.data?.projectId,
            status: status
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Deploy error:", err.message);
            return NextResponse.json(
                { error: err.message || "Deploy failed" },
                { status: 500 }
            );
        }
    }
}