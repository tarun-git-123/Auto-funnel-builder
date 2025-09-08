"use client";
import React from 'react';
import RenderTree from "./RenderTree";
import Toast from '@/components/Toast';
import { LucideFilePlus2, LucideFolderPlus } from 'lucide-react';
import { useEditor } from '@/context/EditorContext';

const Sidebar = () => {
    const {
        funnelName,
        editorState,
        setState,
        toast,
        handleAddClick,
        handleAddFile,
        handleRenameFile,
        modalOpen,
        editModalOpen,
        name,
        setModalOpen,
        setEditModalOpen,
        modalType,
        submitting,
        setName
    } = useEditor();

    const handleResetPath = () => {
        setState({ selectedPath: "/" });
    }

    return (
        <>
            <aside className="w-[20%] h-[90vh] bg-[#1e1e1e] border-r border-gray-700 flex flex-col">
                {/* Header */}
                <div className="w-full px-2 py-[8px] font-light flex items-center justify-between border-b border-gray-700" onClick={handleResetPath}>
                    <span className="font-light text-gray-200">{funnelName}</span>
                    <div className="flex gap-2">
                        <button
                            title='Add Folder'
                            onClick={(e) => { e.stopPropagation(); handleAddClick("folder", editorState.selectedPath!) }}
                        >
                            <LucideFolderPlus size={19} />
                        </button>
                        <button
                            title='Add File'
                            onClick={(e) => { e.stopPropagation(); handleAddClick("file", editorState.selectedPath!) }}
                        >
                            <LucideFilePlus2 size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 text-[15px] font-extralight overflow-y-auto custom-scroll">
                    {editorState.fileTree?.map((file) => (
                        <RenderTree
                            key={file.absolutePath}
                            file={file}
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
                                disabled={submitting}
                                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 text-white transition"
                                onClick={handleAddFile}
                            >
                                {submitting ? "Adding..." : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-gray-600 p-6 rounded shadow-lg w-[450px] relative">
                        {/* Cross Button */}
                        <button
                            className="absolute top-2 right-2 text-gray-800 hover:text-gray-800 font-bold text-xl"
                            onClick={() => setEditModalOpen(false)}
                        >
                            ×
                        </button>

                        <h2 className="text-gray-300 font-light mb-4">
                            Rename {modalType === "folder" ? "Folder" : "File"}
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
                                onClick={() => setEditModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                disabled={submitting}
                                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 text-white transition"
                                onClick={handleRenameFile}
                            >
                                {submitting ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Toast toast={toast} />
        </>

    );
};

export default Sidebar;
