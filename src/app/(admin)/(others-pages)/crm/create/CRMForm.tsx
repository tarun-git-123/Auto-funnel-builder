"use client";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { ToastAlert } from "@/components/alert/ToastAlert";

// TypeScript interface for CRM data
interface CRMFormData {
    label: string;
    crm: string;
    endpoint: string;
    username: string;
    password: string;
}

const formFields = [
    { label: "Label", name: "label", type: "text" },
    { label: "CRM", name: "crm" },
    { label: "Api Endpoint", name: "endpoint", type: "text" },
    { label: "Api Username", name: "username", type: "text" },
    { label: "Api Password", name: "password", type: "text" },
];

const CRMForm: React.FC = () => {
    const [formData, setFormData] = useState<CRMFormData>({
        label: "",
        crm: "",
        endpoint: "",
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [showToast, setShowToast] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/crm", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                setLoading(false);
                setFormData({
                    label: "",
                    crm: "",
                    endpoint: "",
                    username: "",
                    password: "",
                });
                setShowToast(true);
                setToast({ message: data.message, type: "success" });
            } else {
                setShowToast(true);
                setToast({ message: data.message, type: "error" });
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setShowToast(true);
                setToast({ message: "Error occurred. Please try again.", type: "error" });
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="space-y-3 gap-4 grid grid-cols-2 bg-white p-6 border rounded">
                    {formFields.map(({ label, name, type }) => {
                        if (type == 'text') {
                            return (<div key={name}>
                                <label htmlFor={name} className="block text-sm font-semibold text-gray-500 mb-1">
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    name={name}
                                    id={name}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-gray-300 focus:border-gray-300 text-gray-700"
                                    value={formData[name as keyof typeof formData]}
                                    onChange={handleChange}
                                    required
                                />
                            </div>)
                        } else {
                            return (
                                <div key={name}>
                                    <label htmlFor={name} className="block text-sm font-semibold text-gray-500 mb-1">
                                        {label}
                                    </label>
                                    <select name={name} onChange={handleChange} value={formData[name as keyof typeof formData]} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-gray-300 focus:border-gray-300 text-gray-700">
                                        <option value="">Select CRM</option>
                                        <option value="checkout_champ">Checkout Champ</option>
                                        {/* <option value="konnektive">Konnektive</option>
                                        <option value="sticky">Sticky</option> */}
                                    </select>
                                </div>
                            )
                        }
                    })}
                </div>
                <div className="float-right my-2">
                    <Link href="/crm" className="bg-gray-500 hover:bg-gray-600"><Button className="bg-gray-500 hover:bg-gray-600">Cancel</Button></Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="mx-2 bg-blue-500 hover:bg-blue-600 py-3 px-5 text-white rounded-md"
                    >
                        {loading ? "Please wait..." : "Save CRM"}
                    </button>
                </div>
                {showToast && (
                    <ToastAlert
                        message={toast?.message}
                        type={toast?.type}
                        position="bottom-right"
                        onClose={() => setShowToast(false)}
                    />
                )}
            </form>
        </>
    );
};

export default CRMForm;
