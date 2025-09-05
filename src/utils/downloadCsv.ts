import { fixedPrices, productCount } from "./productPrices";
export const downloadSampleCSVTemplate = () => {
    // const headers = [
    //   "siteName", "template", "theme", "crm", "campaignId",
    //   ...Array.from({ length: 12 }, (_, i) => [`product${i + 1}Id`, `product${i + 1}Price`]).flat(),
    //   "primaryColor", "secondaryColor", "companyName", "companyAddress", "ein", "email", "phone",
    // ];

    const headers = [
      "siteName", "template", "crm", "campaignId",
      ...Array.from({ length: productCount }, (_, i) => [`product${i + 1}Id`, `product${i + 1}Price`]).flat(),
      "primaryColor", "secondaryColor", "companyName", "companyAddress", "ein", "email", "phone",
    ];
    
    const exampleRow = [
        "MySite", "template1", "crm1", "123456",
        ...Array.from({ length: productCount }, (_, i) => [(100 + i + 1),fixedPrices[i] || 0]).flat(),
        "#c3b71a", "#e38f6f","My Company",`"abc 123, CA 50001"`, "3234568787", "support@example.com", "9876543210"
    ];
    const csvContent = [headers.join(","), exampleRow.join(",")].join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "deployment-template.csv");
    link.click();
};