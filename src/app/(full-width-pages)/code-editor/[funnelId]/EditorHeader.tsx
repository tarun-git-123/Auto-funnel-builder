"use client";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Save, Play, Eye, Sun, Moon, Check, X } from "lucide-react";
import { EditorState } from "@/types/site-config";

interface EditorHeaderProps {
    editorState: EditorState;
    funnelName: string;
    setState: (updates: Partial<EditorState>) => void;
    funnelUrl: string;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
    editorState,
    funnelName,
    setState,
    funnelUrl
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [toast, setToast] = useState<{ message: string; show: boolean, color: string }>({
        message: "",
        show: false,
        color: ""
    });

    const showToast = (message: string, color: string) => {
        setToast({ message, show: true, color });
        setTimeout(() => setToast({ message: "", show: false, color: "" }), 4000); // auto hide
    };


    async function handleFileSave() {
        try {
            if(!editorState.activeFile) return
            const file = editorState.activeFile;
            if (!file || !file.dirty) {
                showToast("No changes to save", "bg-yellow-600");
                return;
            }

            setLoading(true);
            const res = await fetch(`/api/files/saveFile`, {
                method: 'POST',
                body: JSON.stringify({filePath:editorState.activeFile, funnelName: funnelName}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) throw new Error("Failed to save file");

            showToast("File saved successfully", "bg-green-700");

            setState({
                activeFile:{...file, dirty:false},
                openedFiles: editorState.openedFiles.map((f)=>(
                    f.path === file.path? {...f, dirty:false}:f
                ))
            })
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err.message);
                showToast("Unable to save file. Please try again later.", "bg-red-700");
            }
        } finally {
            setLoading(false);
        }
    }


    const handlePreview = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/deploy/cli/preview/", {
                method: "POST",
                body: JSON.stringify({ funnelName }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

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

            {toast.show && (
                <div className={`fixed z-[99999] top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 ${toast.color} text-white px-6 py-2 rounded-lg shadow-lg animate-slide-from-top`}>

                    <span>{toast.message}</span>
                    <button
                        onClick={() => setToast({ message: "", show: false, color: "" })}
                        className="ml-3 text-white hover:text-gray-200"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}
        </>
    );
};

export default EditorHeader;
