"use client";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Save, Play, Eye, Sun, Moon } from "lucide-react";
import Toast from "@/components/Toast";
import { useEditor } from "@/context/EditorContext";

const EditorHeader = () => {
    const {
        editorState, 
        setState, 
        toast, 
        funnelUrl, 
        loading, 
        handlePreview,
        handleFileSave, 
        } = useEditor();
    const router = useRouter();
    

    return (
        <>
            <header className="sticky top-0 h-[10vh] z-50 flex w-full bg-[#1e1e1e] border-b border-gray-700 text-white shadow-md">
                <div className="flex items-center justify-between w-full px-4 lg:px-6 py-2">
                    {/* Left Section */}
                    <div className="flex items-center gap-4">
                        {/* Back Button */}
                        <button
                            onClick={() => router.back()}
                            className="flex items-center justify-center w-9 h-9 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300"
                            aria-label="Go Back"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.5 3L5.5 8L10.5 13"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        {/* Funnel URL Badge */}
                        <Link
                            href={`https://${funnelUrl}`}
                            target="_blank"
                            className="text-sm font-light px-4 py-1 rounded-full border border-gray-500 hover:border-gray-400 text-gray-300 hover:text-white transition"
                        >
                            {funnelUrl}
                        </Link>
                    </div>

                    {/* Right Section */}

                    <div className="flex items-center gap-3">
                        {/* Save Button */}
                        <button
                            disabled={loading}
                            onClick={handleFileSave}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-sm"
                        >
                            <Save size={16} />
                            <span>{loading ? "Saving..." : "Save"}</span>
                        </button>

                        {/* Deploy Button */}
                        <button

                            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-600 hover:bg-green-500 text-sm text-white"
                        >
                            <Play size={16} />
                            <span>Deploy</span>
                        </button>

                        {/* Preview Button */}
                        <button
                            disabled={loading}
                            onClick={handlePreview}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-sm text-white"
                        >
                            <Eye size={16} />
                            <span>{loading ? "Building..." : "Preview"}</span>
                        </button>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={() => setState({ theme: editorState.theme === "dark" ? "light" : "dark" })}
                            className="flex items-center justify-center w-9 h-9 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300"
                            aria-label="Toggle Theme"
                        >
                            {editorState.theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                        </button>
                    </div>

                </div>
            </header>

            <Toast toast={toast} />
        </>
    );
};

export default EditorHeader;
