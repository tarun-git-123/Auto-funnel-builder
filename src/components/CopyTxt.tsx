"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function Copytxt({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        title="Copy to clipboard"
        className="p-2 rounded bg-gray-100 hover:bg-gray-200 transition"
        aria-label="Copy to clipboard"
      >
        {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
      </button>
    </div>
  );
}
