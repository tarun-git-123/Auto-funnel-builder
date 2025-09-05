"use client";

import { useState } from "react";
import { Code2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function CodeEditorButton({ funnelId }: { funnelId: string}) {
    const [hover, setHover] = useState(false);
    const router = useRouter();

    const handleOpenEditor = ()=>{
        router.push(`/code-editor/${funnelId}`);
    }
    return (
        <div className="relative inline-block">
            <button
                onClick={handleOpenEditor}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-white to-gray-300 hover:bg-gray-200 border border-gray-200 transition"
                aria-label="Open code editor"
                type="button"
            >
                <Code2 size={18} />
            </button>

            {hover && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-md bg-black text-white text-xs px-2 py-1 shadow">
                    Open code editor
                </div>
            )}
        </div>
    );
}
