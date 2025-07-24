"use client";
import { useState } from "react";

export default function UploadCSV({ onComplete }: { onComplete?: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setLoading(false);
    // alert(data.message || "Upload complete");
    console.log(data);
    onComplete?.();
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold">Upload CSV</h2>
      <input
        type="file"
        accept=".csv"
        className="mt-2"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        className="px-4 py-2 bg-green-600 text-white rounded mt-2"
        onClick={upload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
