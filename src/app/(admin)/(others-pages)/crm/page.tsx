import Link from "next/link";
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { connectToDB } from "@/lib/mongodb";
import { CRM } from "@/models/Crm";
import { Delete, DeleteIcon, EditIcon, LucideDelete } from "lucide-react";
import DeleteCrm from "./DeleteCrm";

export default async function CRMPage() {
    await connectToDB();
    const crms = await CRM.find({});

    return (
        <div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="space-y-6">
                    <div className=" flex items-center justify-between">
                        <h2 className="text-xl font-semibold mt-6">CRM</h2>
                        <div className="flex">
                            <Link href="/crm/create"><button className="px-4 py-2 bg-blue-500 text-white rounded mt-2 mx-2">Create</button></Link>
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
                                    Label
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    CRM
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Endpoint
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Username
                                </TableCell>
                                
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        {crms.length > 0 &&
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {crms.map((crm) => (
                                    <TableRow key={`${crm._id}`}>
                                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {crm.label}
                                            </span>
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {crm.crm}
                                            </span>
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {crm.endpoint}
                                            </span>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {crm.username}
                                            </span>
                                        </TableCell>

                                        <TableCell className="px-4 py-3 flex text-gray-500 text-theme-sm dark:text-gray-400">
                                            <Link href={`/crm/edit/${crm._id.toString()}`} className="text-blue-500 cursor-pointer"><EditIcon/></Link>
                                            <DeleteCrm id={crm._id.toString()} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            ||
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={6} className="px-5 py-4 sm:px-6 text-center">No CRM found</TableCell>
                                </TableRow>
                            </TableBody>
                        }
                    </Table>
                </div>
            </div>
        </div>
    );
}
