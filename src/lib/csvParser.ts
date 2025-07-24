import Papa from "papaparse";
import fs from "fs";

export async function parseCSV(filePath: string): Promise<any[]> {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return new Promise((resolve, reject) => {
    Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (err) => reject(err),
    });
  });
}