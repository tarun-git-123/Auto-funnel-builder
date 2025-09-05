"use client"
import UploadCSV from '@/components/form/UploadCSV'
import useDeploy from '@/hooks/useDeploy'
import useTemplates from '@/hooks/useTemplates'
import { SiteConfig } from '@/types/site-config'
import { downloadSampleCSVTemplate } from '@/utils/downloadCsv'
import { CheckIcon, RotateCcw, UploadCloud } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CreateFunnelByCSV = () => {
    const router = useRouter();
    const [results, setResults] = useState<SiteConfig[]>([]);
    const [matchedResults, setMatchedResults] = useState<SiteConfig[]>([]);
    const [unMatchedResults, setUnMatchedResults] = useState<SiteConfig[]>([]);
    const { templates } = useTemplates();
    const { deploymentStatus, handleDeploy } = useDeploy();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentResult, setCurrentResult] = useState<SiteConfig | null>(null);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [validateMessage, setValidateMessage] = useState<string | null>(null);
    const [validateTemplateMessage, setValidateTemplateMessage] = useState<Record<string, string>>({});

    const handleResults = (results: SiteConfig[]) => {
        setResults(results);
    };

    const handleValidateRows = (result: SiteConfig) => {
        const blankRows = validateRows(result);
        if (blankRows.length === 0) {
            setValidateTemplateMessage((prev) => ({
                ...prev,
                [result?.siteName as string]: "Please choose the correct template"
            }))
            return
        }
        const initFormData = blankRows.reduce((acc, row) => {
            acc[row] = '';
            return acc
        }, {} as Record<string, string>);
        setFormData(initFormData);
        setCurrentResult(result);
        setIsModalOpen(true);
    }

    function setNestedValue(obj: any, path: string, value: any) {
        const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
        let current = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            current = current[key];
        }
        current[keys[keys.length - 1]] = value;
    }

    const handleSubmitForm = () => {
        const updated = { ...currentResult };
        for (const [key, value] of Object.entries(formData)) {
            setNestedValue(updated, key, value);
        }
        const blankRows = validateRows(updated as SiteConfig);
        if (blankRows.length > 0) {
            setValidateMessage("Please fill in all required fields");
            return
        }
        setCurrentResult(updated as SiteConfig);
        console.log("currentResult", updated);
        setIsModalOpen(false);
        handleRedeploy(updated as SiteConfig);
        setValidateMessage(null);
    }

    const deployMatchedSites = async () => {
        for (const config of matchedResults) {
            await handleDeploy(config);
        }
    }

    function validateRows(obj: SiteConfig, parentKey = '', blankRows: string[] = []): string[] {
        for (const [key, value] of Object.entries(obj)) {
            const fullKey = parentKey ? `${parentKey}.${key}` : key;
            //console.log(value, typeof value)
            if (
                value === null ||
                value === undefined ||
                (typeof value === "string" && value.trim() === "")
            ) {
                blankRows.push(fullKey);

            } else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    if (typeof item === "object" && item !== null) {
                        validateRows(item as SiteConfig, `${fullKey}.${index}`, blankRows);
                    }
                });

            } else if (typeof value === "object") {
                validateRows(value as SiteConfig, fullKey, blankRows);
            }
        }
        return blankRows;
    }

    const handleRedeploy = async (result: SiteConfig) => {
        await handleDeploy(result);
        router.refresh();
        setValidateTemplateMessage((prev) => ({
            ...prev,
            [result?.siteName as string]: ""
        }))
    }

    useEffect(() => {
        // const filterMatched = results.filter((result) => {
        //     return templates.includes(result.template);
        // })
        // setMatchedResults(filterMatched);

        const filterMatched = results.filter((result) => {
            return validateRows(result).length == 0 && templates.includes(result.template as string);
        })
        setMatchedResults(filterMatched);

        const filterUnMatched = results.filter((result) => {
            return validateRows(result).length > 0 || !templates.includes(result.template as string);
        })
        setUnMatchedResults(filterUnMatched);
    }, [results, templates])

    useEffect(() => {
        if (matchedResults.length > 0) {
            deployMatchedSites();
        }
    }, [matchedResults])

    function handleSelectTemplate(e: React.ChangeEvent<HTMLSelectElement>, result: SiteConfig) {
        const template = e.target.value;
        result.template = template;
    }
    return (
        <>
            <div className='flex w-full gap-4 flex-col md:flex-row'>
                <div className='md:w-[40%] max-h-[250px] w-full rounded-xl shadow-sm p-6 mt-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 space-y-4'>
                    <div className="flex justify-between items-center gap-2 text-gray-800 dark:text-white">
                        <div className='flex gap-2'>
                            <UploadCloud className="w-5 h-5 text-green-600" />
                            <h2 className="text-lg font-semibold">Upload CSV File</h2>
                        </div>
                        <Link href="/funnels" className='text-blue-500 hover:underline'>Back</Link>
                    </div>
                    <div>
                        <UploadCSV onComplete={handleResults} />
                    </div>
                    <div className="w-full gap-3 mt-6">
                        <button className="text-blue-700" onClick={downloadSampleCSVTemplate}>Download Sample CSV Template</button>
                    </div>
                </div>
                {matchedResults && matchedResults.length > 0 && (
                    <div className="bg-white overflow-x-auto mt-2 rounded-xl border border-gray-200 shadow-sm">
                        <table className="min-w-full text-sm text-left text-gray-700">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-4 py-3 font-medium">#</th>
                                    <th className="px-4 py-3 font-medium">Site</th>
                                    <th className="px-4 py-3 font-medium">Template</th>
                                    <th className="px-4 py-3 font-medium">Validation</th>
                                    <th className="px-4 py-3 font-medium">Select Template</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {matchedResults.map((result, index) => {
                                    const deployStatus = deploymentStatus[result.siteName as string]?.status || "Queued";
                                    const deployUrl = deploymentStatus[result.siteName as string]?.url;

                                    return (
                                        <tr key={`${result.siteName}-${index}`} className="even:bg-gray-50">
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <td className="px-4 py-3 font-medium">{result.siteName}</td>

                                            <td className="px-4 py-3 capitalize">{result.template}</td>
                                            <td className="px-4 py-3 capitalize"><span className='text-green-600'>Success</span></td>

                                            <td className="px-4 py-3">
                                                <select disabled onChange={(e) => handleSelectTemplate(e, result)} className="cursor-not-allowed w-full px-3 py-2 border rounded-md text-sm bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                                    <option disabled selected>
                                                        Select
                                                    </option>
                                                    {templates.map((tpl) => (
                                                        <option key={tpl} value={tpl}>
                                                            {tpl}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-4 py-3">
                                                { deployStatus === "Queued" && (
                                                    <div className="flex items-center gap-1 text-gray-500">
                                                        <span>Queued</span>
                                                    </div>
                                                )}
                                                { deployStatus === "deploying" && (
                                                    <div className="flex items-center gap-1 text-gray-500">
                                                        <span className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></span>
                                                        <span>Deploying...</span>
                                                    </div>
                                                )}
                                                {deployStatus === "success" && deployUrl && (
                                                    <div className="flex items-center gap-1 text-green-600">
                                                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                                                        <span>Deployed</span>
                                                    </div>
                                                )}
                                                {deployStatus === "error" && (
                                                    <div className="flex items-center gap-1 text-red-600">
                                                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                                                        <span>Failed</span>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}

                                {unMatchedResults &&
                                    unMatchedResults.map((result, index) => {
                                        const disablaed = deploymentStatus[result.siteName as string]?.status === "success" || templates.includes(result.template as string);
                                        return (
                                            <tr key={`unmatched-${result.siteName}-${index}`} className="even:bg-gray-50">
                                                <td className="px-4 py-3">{matchedResults.length + index + 1}</td>
                                                <td className="px-4 py-3 font-medium">{result.siteName}</td>

                                                <td className="px-4 py-3 capitalize">{result.template}</td>
                                                <td className="px-4 py-3">
                                                    {deploymentStatus[result.siteName as string]?.status === "success" && (
                                                        <span className="text-green-600">Success</span>
                                                    ) ||
                                                        <span className="text-yellow-600 cursor-pointer" onClick={() => handleValidateRows(result)}>Missing</span>
                                                    }
                                                </td>
                                                <td className="px-4 py-3">
                                                    <select disabled={disablaed} onChange={(e) => handleSelectTemplate(e, result)} className={`w-full px-3 py-2 border rounded-md text-sm ${disablaed ? "bg-gray-300" : "bg-white"} focus:outline-none focus:ring-1 focus:ring-blue-500`}>
                                                        <option disabled selected>
                                                            Select
                                                        </option>
                                                        {templates.map((tpl) => (
                                                            <option key={tpl} value={tpl}>
                                                                {tpl}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {validateTemplateMessage[result.siteName as string]!=="" && <p className="text-red-500 mt-2">{validateTemplateMessage[result.siteName as string]}</p>}
                                                </td>
                                                <td className="px-4 py-3">

                                                    {deploymentStatus[result.siteName]?.status === "success" ? (
                                                        <div className="flex items-center gap-1 text-green-600">
                                                            
                                                            <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                                                            <span>Deployed</span>
                                                        </div>
                                                    ) : deploymentStatus[result.siteName as string]?.status === "deploying" ? (
                                                        <div className="flex items-center gap-1 text-blue-500">
                                                            <span className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></span>
                                                            <span>Deploying...</span>
                                                        </div>
                                                    ) :
                                                        <button onClick={() => handleRedeploy(result)} className="text-blue-600 hover:underline text-sm font-medium"><RotateCcw className="w-4 h-4" /></button>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-[99999]">
                    <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                            Fill Missing Fields
                        </h2>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(formData).map(([key, value]) => {
                                const keys = key.split(".");
                                const label = keys
                                    .map(k => {
                                        const num = Number(k);
                                        return isNaN(num) ? k : (num + 1).toString();
                                    })
                                    .join(" ");
                                return (
                                    <div key={key}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{label} <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-lg px-3 py-2 text-sm outline-none"
                                            value={value}
                                            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                        />
                                    </div>
                                )
                            })}
                        </form>

                        <div className="flex justify-end mt-6 gap-3">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
                                onClick={() => { setIsModalOpen(false); setValidateMessage(null) }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                                onClick={handleSubmitForm}
                            >
                                Save & Redeploy
                            </button>
                        </div>
                        {validateMessage && <p className="text-red-500 mt-2">{validateMessage}</p>}
                    </div>
                </div>
            )}

        </>

    )
}

export default CreateFunnelByCSV
