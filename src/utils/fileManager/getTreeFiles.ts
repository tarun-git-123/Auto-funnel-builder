import { FileType } from "@/types/site-config";
import fs from "fs/promises";
import path from "path";

export async function getTreeFiles(dirPath: string, rootPath = dirPath): Promise<FileType[]> {
    const dirents = await fs.readdir(dirPath, { withFileTypes: true });

    const results = await Promise.all(
        dirents.map(async (dirent) => {
            const res = path.resolve(dirPath, dirent.name);
            const item: FileType = {
                name: dirent.name,
                isDirectory: dirent.isDirectory(),
                relativePath: path.relative(rootPath, res),
                absolutePath: res,
                collapsed: dirent.isDirectory(),
            };

            if (dirent.isDirectory()) {
                item.children = await getTreeFiles(res, rootPath);
            }

            return item;
        })
    );

    // ✅ Sort directories first, then files
    const directories = results.filter((item) => item.isDirectory);
    const files = results.filter((item) => !item.isDirectory);

    return [...directories, ...files];
}
