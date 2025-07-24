"use client";

// import { Metadata } from "next";
import Link from "next/link";
import UploadCSV from "@/components/form/UploadCSV";
import React from "react";
import { useState, useEffect } from "react";



export default function Builder() {

  const [batches, setBatches] = useState([]);

  const fetchBatches = async () => {
    console.log("Fetching batches...");
    const res = await fetch("/api/generate");
    const data = await res.json();
    setBatches(data);
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UploadCSV onComplete={fetchBatches}/>
      <h2 className="text-xl font-semibold mt-6">Previous Batches</h2>
      <ul className="mt-4 space-y-2">
        {batches.map((batch: any) => (
          <li key={batch.id} className="p-4 bg-white shadow rounded">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{batch.site_name}</p>
                <p>Status: {batch.status}</p>
                <p>
                  Vercel URL:{" "}
                  <a href={batch.vercel_url} className="text-blue-500" target="_blank">
                    {batch.vercel_url}
                  </a>
                </p>
              </div>
              <Link href={`/api/download/${batch.site_name}`} className="px-4 py-2 bg-blue-600 text-white rounded">
                Download ZIP
              </Link>
            </div>
          </li>
        ))}
      </ul>
        </div>
      </div>
    </div>
  );
}
