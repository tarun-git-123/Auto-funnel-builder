// import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Badge from "@/components/ui/badge/Badge";
import DownloadButton from "@/components/DownloadButton";
import { connectToDB } from "@/lib/mongodb";
import { Funnel } from "@/models/Funnel";
import { formatDate } from "@/utils/formatDate";
import BuildingStatus from "./BuildingStatus";
import ReDeployButton from "@/components/RedeployButton";
import path from "path";
import CopyTxt from "@/components/CopyTxt";
import { CodeEditorButton } from "@/components/CodeEditorButton";

export default async function Builder() {
  await connectToDB();
  const funnels = await Funnel.find().sort({ createdAt: -1 });
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold mt-6">Funnels</h2>
            <div className="flex">
              <Link href="/funnels/create"><button className="px-4 py-2 bg-blue-500 text-white rounded mt-2 mx-2">Create</button></Link>
              <Link href="/funnels/csv"><button className="px-4 py-2 bg-blue-500 text-white rounded mt-2 mx-2">Upload CSV</button></Link>
            </div>
          </div>

          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Site Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Vercel URL
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Created At
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Source Path
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            {funnels?.length > 0 &&
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {funnels?.map((funnel) => {
                  const absolutePath = path.join(process.cwd(), "src/storage", funnel.siteName);
                  console.log(absolutePath)
                  return (
                    <TableRow key={`${funnel._id}`}>
                      {/* Site Name */}
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {funnel.siteName}
                        </span>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          color="success"
                        >
                          {funnel.status}
                          {/* <BuildingStatus deploymentId={funnel.deploymentId} initialStatus={funnel.status}/> */}
                        </Badge>
                      </TableCell>

                      {/* Vercel URL */}
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <a href={`https://${funnel.deployedUrl}`} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                          {funnel.deployedUrl}
                        </a>
                      </TableCell>

                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {funnel.createdAt ? formatDate(funnel.createdAt) : "—"}
                        </span>
                      </TableCell>

                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <CopyTxt text={absolutePath}/>
                      </TableCell>

                      {/* Download Button */}
                      <TableCell className="flex gap-1 px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <DownloadButton funnelId={funnel._id.toString()} siteName={funnel.siteName} />
                        <ReDeployButton siteName={funnel.siteName} projectPath={absolutePath} />
                        <CodeEditorButton funnelId={funnel._id.toString()}/>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
              ||
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} className="px-5 py-4 sm:px-6 text-center">No funnels found</TableCell>
                </TableRow>
              </TableBody>
            }
          </Table>
        </div>
      </div>
    </div>
  );
}
