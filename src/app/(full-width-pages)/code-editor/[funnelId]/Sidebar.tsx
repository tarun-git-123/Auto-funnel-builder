"use client";
import React, { useState } from 'react';
import RenderTree from "./RenderTree";
import { EditorState, FileType } from '@/types/site-config';

interface sidebarProps {
    editorState: EditorState;
    setState: (updates: Partial<EditorState>) => void;
    funnelName: string;
    fetchFileTree: () => Promise<void>;
}

const Sidebar = ({ editorState, setState, funnelName, fetchFileTree }: sidebarProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"folder" | "file">("folder");
    const [name, setName] = useState("");

    const handleAddClick = (type: "folder" | "file") => {
        setModalType(type);
        setName("");
        setModalOpen(true);
    };

    async function readFileContent(filePath:string, fileName:string) {
        const existingFile = editorState.openedFiles.find(file => file.path === filePath);
        console.log("existingFile", existingFile)
        if (existingFile) {
            editorState.activeFile=existingFile
            return;
        }

        try {
            const res = await fetch(`/api/files/readFile?funnelName=${funnelName}&filePath=${filePath}`);
            if (!res.ok) throw new Error("Failed to read file");
            const result = await res.json();

            if (result.success) {
                const NewFile = {name:fileName, path: filePath, content: result.data};
                setState({ openedFiles: [...editorState.openedFiles, NewFile], activeFile: NewFile});
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name !== "AbortError") {
                    console.error("Error reading file:", error);
                }
            }
        }
    }

    const handleSave = async () => {
        if (!name.trim()) return;
        const newFilePath = `${editorState.selectedPath}/${name.trim()}`;

        try {
            const res = await fetch("/api/files/addFile", {
                method: 'POST',
                body: JSON.stringify({ filePath: newFilePath, funnelName: funnelName, name: name, type: modalType }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!res.ok) throw new Error("Failed to add file");
            const result = await res.json();
            if (!result.success) throw new Error(result.error);
            
            await fetchFileTree();
            await readFileContent(result.relativePath, name);
            setState({ selectedPath: result.relativePath, activeFile: { name: name, path: result.relativePath, content: "" } });
            setModalOpen(false);
            setName("");

        } catch (error: unknown) {
            if (error instanceof Error) console.error(error.message);
        }

    };

    console.log(editorState);

    return (
        <>
            <aside className="w-[20%] h-[90vh] bg-[#1e1e1e] border-r border-gray-700 flex flex-col">
                {/* Header */}
                <div className="w-full px-2 py-[8px] font-light flex items-center justify-between border-b border-gray-700">
                    <span className="font-light text-gray-300">{funnelName}</span>
                    <div className="space-x-1">
                        <button
                            className="bg-gray-700 px-2 rounded text-xs hover:bg-gray-600 transition"
                            onClick={() => handleAddClick("folder")}
                        >
                            +📁
                        </button>
                        <button
                            className="bg-gray-700 px-2 rounded text-xs hover:bg-gray-600 transition"
                            onClick={() => handleAddClick("file")}
                        >
                            +📄
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-2 custom-scroll">
                    {editorState.fileTree?.map((file, index) => (
                        <RenderTree
                            key={file.absolutePath}
                            file={file}
                            editorState={editorState}
                            setState={setState}
                            funnelName={funnelName}
                            readFileContent={readFileContent}
                        />
                    ))}
                </div>
            </aside>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-gray-600 p-6 rounded shadow-lg w-[450px] relative">
                        {/* Cross Button */}
                        <button
                            className="absolute top-2 right-2 text-gray-800 hover:text-gray-800 font-bold text-xl"
                            onClick={() => setModalOpen(false)}
                        >
                            ×
                        </button>

                        <h2 className="text-gray-300 font-light mb-4">
                            Add New {modalType === "folder" ? "Folder" : "File"}
                        </h2>
                        <p className="text-gray-300 font-light text-sm mb-4">
                            <div>Path : {editorState.selectedPath}</div>
                        </p>
                        <input
                            type="text"
                            className="w-full p-2 rounded border border-gray-300 mb-4 font-light focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder={`Enter ${modalType} name`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400 transition"
                                onClick={() => setModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 text-white transition"
                                onClick={handleSave}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
};

export default Sidebar;
