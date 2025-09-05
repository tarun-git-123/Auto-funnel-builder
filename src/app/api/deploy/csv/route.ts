import { NextResponse } from "next/server";
import { buildTemplateFiles, deployToVercel } from "@/utils/deployToVercel";
import { CsvRow, SiteConfig } from "@/types/site-config";
import { parse } from "csv-parse/sync";
import { Funnel } from "@/models/Funnel";
import { connectToDB } from "@/lib/mongodb";
import { CRM } from "@/models/Crm";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const envVars = [];
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    await connectToDB();

    const buffer = Buffer.from(await file.arrayBuffer());
    const text = buffer.toString("utf-8");

    const rows = parse(text, {
      columns: true,
      skip_empty_lines: true,
    }) as CsvRow[];

    const results = [];

    for (const [index, row] of rows.entries()) {
      const config: SiteConfig = {
        siteName: row.siteName,
        template: row.template,
        theme:1,
        campaignId: row.campaignId,
        crm: row.crm,
        products: Array.from({ length: 12 }).map((_, i) => ({
          id: String(row[`product${i + 1}Id`]),
          price: parseFloat(row[`product${i + 1}Price`]),
        })),
        primaryColor: row.primaryColor,
        secondaryColor: row.secondaryColor,
        company: {
          name: row.companyName,
          address: row.companyAddress,
          ein: row.ein,
          email: row.email,
          phone: row.phone,
        },
      };

      try {

        const crmDetails = await CRM.findOne({ label: config.crm });
        if (crmDetails) {
          envVars.push(
            { key: "CRM_ENDPOINT", value: crmDetails.endpoint },
            { key: "CRM_USERNAME", value: crmDetails.username },
            { key: "CRM_PASSWORD", value: crmDetails.password },
          )
        }

        const files = buildTemplateFiles(row.template, config);
        const result = await deployToVercel(files, row.siteName, envVars);

        if (!result.url && !result.inspectUrl) throw new Error("No URL found");

        await Funnel.create({
          ...config,
          deployedUrl: result?.url || result?.inspectUrl,
          status: "success",
        });

        results.push({
          index,
          siteName: row.siteName,
          status: "success",
          url: result?.url || result?.inspectUrl,
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(`Error in row ${index} (${row.siteName}):`, err);
          results.push({
            index,
            siteName: row.siteName,
            status: "error",
            message: err.message || "Unknown error",
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${rows.length} rows`,
      results,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Unexpected server error:", error);
      return NextResponse.json({ error: "Failed to process file" }, { status: 500 });
    }
  }
}
