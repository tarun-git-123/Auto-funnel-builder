import { NextResponse } from "next/server";
import { CsvRow, SiteConfig } from "@/types/site-config";
import { parse } from "csv-parse/sync";
import { generateThemeCombos } from "@/utils/getRandomTheme";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const text = buffer.toString("utf-8");

    const rows = parse(text, {
      columns: true,
      skip_empty_lines: true,
    }) as CsvRow[];

    const results: SiteConfig[] = [];

    let rowIndex = 0;

    const templateCombosMap = new Map<string,string[][]>();
    const templateIndexMap = new Map<string,number>();

    for (const row of rows) {
      if(!templateCombosMap.has(row.template)){
        const combos = generateThemeCombos(row.template);
        templateCombosMap.set(row.template, combos);
        templateIndexMap.set(row.template, 0);
        
        //console.log("templateCombosMap", templateCombosMap)
      }

      const combos = templateCombosMap.get(row.template)!;
      const currentIndex = templateIndexMap.get(row.template)!;

      const combo = combos[currentIndex % combos.length];

      templateIndexMap.set(row.template, currentIndex+1);

      // console.log("combo", combo);

      const products: { 
        id: string; 
        price: number; 
        name: string; 
        popular: boolean
        descriptions: {
          title1: string;
          title2: string;
          title3: string;
          title4: string;
          title5: string;
          title6: string;
          title7: string;
          title8: string; 
        }
      }[] = [];

      for (const key in row) {
        const match = key.match(/^product(\d+)Id$/);
        if (match) {
          const index = match[1];
          const id = row[`product${index}Id`] as string;
          const price = parseFloat(row[`product${index}Price`] || "0");
          const name = `Product Name ${index}`;
          const popular = false;
          const descriptions = {
            title1: "title1",
            title2: "title2",
            title3: "title3",
            title4: "title4",
            title5: "title5",
            title6: "title6",
            title7: "title7",
            title8: "title8",
          }
          if (id) products.push({ id, price, name, popular, descriptions });
        }
      }

      const config: SiteConfig = {
        siteName: row.siteName,
        template: row.template,
        theme: String(combo),
        campaignId: row.campaignId,
        crm:row.crm,
        products,
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
      results.push(config);
      rowIndex++;
    }

    return NextResponse.json({
      success: true,
      message: `${rows.length} rows`,
      results
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Parse error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
