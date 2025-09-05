export function formatDate(dateString: string, format = "dd-mm-yyyy") {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const shortYear = String(year).slice(2);
  
    switch (format) {
      case "mm-dd-yy":
        return `${month}-${day}-${shortYear}`;
      case "yyyy/mm/dd":
        return `${year}/${month}/${day}`;
      case "dd-mm-yyyy":
      default:
        return `${day}-${month}-${year}`;
    }
  }