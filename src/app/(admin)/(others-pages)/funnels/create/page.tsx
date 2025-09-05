"use client";

// import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import FunnelForm from "@/app/(admin)/(others-pages)/funnels/create/FunnelForm";

export default function CreateFunnel() {
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="flex items-center justify-between px-4">
          <h2 className="text-xl font-semibold mt-6">Add Funnel</h2>
          <Link href="/funnels"><button className="px-4 py-2 bg-gray-500 text-white rounded mt-2">Cancel</button></Link>
          </div>
        <div className="space-y-6">
          <FunnelForm/>
        </div>
      </div>
    </div>
  );
}
