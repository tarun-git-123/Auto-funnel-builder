import Papa from "papaparse";

export async function parseCSV(file: File) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => resolve(results.data),
      error: reject,
    });
  });
}