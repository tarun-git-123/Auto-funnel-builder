export function detectLanguageByPath(selectedPath:string) {
    if (selectedPath.endsWith(".js")) return "javascript";
    if (selectedPath.endsWith(".ts")) return "typescript";
    if (selectedPath.endsWith(".tsx")) return "javascript";
    if (selectedPath.endsWith(".jsx")) return "javascript";
    if (selectedPath.endsWith(".html")) return "html";
    if (selectedPath.endsWith(".css")) return "css";
    if (selectedPath.endsWith(".json")) return "json";
    if (selectedPath.endsWith(".env")) return "env";
    if (selectedPath.endsWith("")) return "javascript";
    return "javascript";
}