"use client";

import { useEditor } from "@/context/EditorContext";
import { FileType } from "@/types/site-config";
import * as ContextMenu from "@radix-ui/react-context-menu";

export default function FileExplorerContextMenu({
    children,
    onAddFile,
    onAddFolder,
    onRename,
    onDelete,
    isDirectory
}: {
    children: React.ReactNode;
    onAddFile: () => void;
    onAddFolder: () => void;
    onRename: () => void;
    onDelete: () => void;
    isDirectory: boolean;
}) {
    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
            <ContextMenu.Portal>
                <ContextMenu.Content
                    className="min-w-[250px] rounded-sm border border-gray-500 p-1 bg-[#1E1E1E] text-sm font-extralight text-gray-100"
                >
                    {
                        isDirectory && (
                            <>
                                <ContextMenu.Item
                                    className="flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-blue-600 cursor-pointer"
                                    onClick={onAddFile}
                                >
                                    Add File
                                </ContextMenu.Item>

                                <ContextMenu.Item
                                    className="flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-blue-600 cursor-pointer"
                                    onClick={onAddFolder}
                                >
                                    Add Folder
                                </ContextMenu.Item>
                                <ContextMenu.Separator className="h-px bg-gray-500 my-1" />
                            </>
                        )
                    }

                    <ContextMenu.Item
                        className="flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-blue-600 cursor-pointer"
                        onClick={onRename}
                    >
                        Rename
                    </ContextMenu.Item>

                    <ContextMenu.Item
                        className="flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-blue-600 cursor-pointer"
                        onClick={onDelete}
                    >
                        Delete
                    </ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Portal>
        </ContextMenu.Root>
    );
}
