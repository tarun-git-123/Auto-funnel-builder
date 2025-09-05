'use client';

import { DownloadIcon } from "lucide-react";
import { useState } from "react";

type Props = {
    funnelId: string;
    siteName: string;
};

export default function DownloadButton({ funnelId, siteName }: Props) {
    const [loading, setLoading] = useState(false);
    const [hover, setHover] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        const res = await fetch("/api/download-source-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ funnelId, siteName }),
        });
        const blob = await res.blob();
        console.log(blob)
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${siteName}.zip`;
        a.click();
        setLoading(false);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={handleClick}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500
                 text-white font-semibold rounded-lg shadow hover:scale-105 transition-transform
                 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <svg
                            className="w-5 h-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                            ></path>
                        </svg>
                    </>
                ) : (
                    <>
                        <DownloadIcon className="w-5 h-5" />
                    </>
                )}
            </button>
            {hover && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-md bg-black text-white text-xs px-2 py-1 shadow">
                    Download Source Code
                </div>
            )}
        </div>
    );
}