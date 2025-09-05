"use client";
import { useRef, useState } from "react";
import { SiteConfig } from "@/types/site-config";

export default function UploadCSV({ onComplete }: { onComplete?: (results: SiteConfig[]) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const upload = async () => {
    setError(null);

    if (!file) {
      setError("Please select a CSV file.");
      return;
    }

    if (!file.name.endsWith(".csv")) {
      setError("Only .csv files are allowed.");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setError("File size should not exceed 2MB.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/deploy/csv/verify-rows", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        onComplete?.(data.results);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong.");
      }

    } finally {
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // ✅ clear the input
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className="block w-full text-sm text-gray-700 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          onChange={(e) => {
            setError(null);
            setFile(e.target.files?.[0] || null);
          }}
        />

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2 my-3">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={upload}
          disabled={loading}
          className="w-full flex items-center justify-center my-3 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            "Upload"
          )}
        </button>
      </div>

    </>

  );
}
