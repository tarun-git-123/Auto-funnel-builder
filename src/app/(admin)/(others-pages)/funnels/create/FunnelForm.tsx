'use client';
import React, { useState } from 'react';
import templateMap from '@/templates/templateMap';
import TemplateShimmerLoader from '@/components/TemplateShimmerLoader';
import useTemplates from '@/hooks/useTemplates';
import useDeploy from '@/hooks/useDeploy';
import { SiteConfig } from '@/types/site-config';
import { fixedPrices } from "@/utils/productPrices";
import useCRM from '@/hooks/useCRM';

type Product = {
    productId: string;
    price: number | null;
    isFixed: boolean;
};


export default function FunnelForm() {
    const { loading, templates } = useTemplates();
    const { crms } = useCRM();
    const [step, setStep] = useState(1);
    const [siteName, setSiteName] = useState('');
    const [template, setTemplate] = useState('template1');
    const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
    const [campaignId, setCampaignId] = useState('');
    const [crm, setCrm] = useState<string | null>(null);
    const [primaryColor, setPrimaryColor] = useState("");
    const [secondaryColor, setSecondaryColor] = useState("");
    const [company, setCompany] = useState({
        name: '',
        address: '',
        ein: '',
        email: '',
        phone: ''
    });
    const [products, setProducts] = useState<Product[]>(
        fixedPrices.map(price => ({
            productId: "",
            price,
            isFixed: true,
        }))
    );
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { handleDeploy } = useDeploy();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleChange = (index: number, field: keyof Product, value: string) => {
        const updated = [...products];
        updated[index][field] = value as never
        setProducts(updated);
    };

    const addProduct = () => {
        setProducts([
            ...products,
            { productId: "", price: null, isFixed: false },
        ]);
    };

    const removeProduct = (index: number) => {
        const updated = [...products];
        updated.splice(index, 1);
        setProducts(updated);
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    function resetForm() {
        setSiteName('');
        setTemplate('template1');
        setPreviewTemplate(null);
        setCampaignId('');
        setCrm(null);
        setPrimaryColor('');
        setSecondaryColor('');
        setCompany({
            name: '',
            address: '',
            ein: '',
            email: '',
            phone: ''
        });
        setProducts(fixedPrices.map(price => ({
            productId: "",
            price,
            isFixed: true,
        })));
        setErrors({});
        setTimeout(() => {
            setStep(1);
        }, 2000);
    }

    const validateStep1 = () => {
        const newErrors: { [key: string]: string } = {};

        if (!siteName.trim()) newErrors.siteName = "Site name is required.";
        if (!primaryColor) newErrors.primaryColor = "Primary color is required.";
        if (!secondaryColor) newErrors.secondaryColor = "Secondary color is required.";
        if (!template) newErrors.template = "Please select a template.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors: { [key: string]: string } = {};

        if (!campaignId.trim()) newErrors.campaignId = "Campaign ID is required.";
        if (!crm) newErrors.crm = "CRM is required.";

        products.forEach((product, index) => {
            if (!product.productId)
                newErrors[`product-${index}-id`] = "Product ID is required.";
            if (!product.price)
                newErrors[`product-${index}-price`] = "Price is required.";
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors: { [key: string]: string } = {};

        if (!company.name.trim()) newErrors.company_name = "Company name is required.";
        if (!company.address.trim()) newErrors.address = "Address required.";
        if (!company.ein) newErrors.ein = "Ein is required.";
        if (!company.email) newErrors.email = "Email is required.";
        if (!company.phone) newErrors.phone = "phone is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    function handleNext() {
        if (step === 1) {
            if (!validateStep1()) return;
            nextStep();
        } else if (step === 2) {
            if (!validateStep2()) return;
            nextStep();
        }

        console.log(step);
    }

    const handlePreview = (template: string) => {
        const { hostname, protocol } = window.location;
        const isLocalhost = hostname === 'localhost' || hostname.startsWith('127.');

        const previewUrl = isLocalhost
            ? `${protocol}//${hostname}:3000/preview/${template}`
            : `https://your-preview-domain.com/preview/${template}`;

        window.open(previewUrl, '_blank');
    };

    const handleSubmit = async () => {
        if (!validateStep3()) return;
        const config: SiteConfig = {
            siteName,
            template,
            campaignId,
            crm,
            products: products.map((p) => ({
                id: p.productId,
                price: p.price,
            })) as SiteConfig["products"],
            primaryColor,
            secondaryColor,
            company,
        };
        setIsSubmitting(true)
        const result = await handleDeploy(config);
        setIsSubmitting(false)
        resetForm();
    };

    return (
        <div className="max-w-full mx-auto p-6 space-y-8 bg-white">

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
                <div
                    className={`h-full rounded-full transition-all duration-300 ${step === 1 ? 'w-1/3 bg-blue-600' : step === 2 ? 'w-2/3 bg-blue-600' : 'w-full bg-green-600'
                        }`}
                />
            </div>
            {step === 1 && (
                <>
                    <h2 className="text-2xl font-bold text-gray-800">Step 1: Funnel Details</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {/* Site Name */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Site Name</label>
                            <input
                                type="text"
                                placeholder="example-site"
                                value={siteName}
                                onChange={(e) => setSiteName(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.siteName && <p className="text-red-500 text-sm mt-1">{errors.siteName}</p>}
                        </div>

                        {/* Primary Color */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                            <input
                                type="color"
                                value={primaryColor}
                                onChange={(e) => setPrimaryColor(e.target.value)}
                                className="w-full h-10 p-1 border border-gray-300 rounded"
                            />
                            {errors.primaryColor && <p className="text-red-500 text-sm mt-1">{errors.primaryColor}</p>}
                        </div>

                        {/* Secondary Color */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
                            <input
                                type="color"
                                value={secondaryColor}
                                onChange={(e) => setSecondaryColor(e.target.value)}
                                className="w-full h-10 p-1 border border-gray-300 rounded"
                            />
                            {errors.secondaryColor && <p className="text-red-500 text-sm mt-1">{errors.secondaryColor}</p>}
                        </div>
                    </div>

                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Choose Template</label></div>
                    {loading ? (
                        <TemplateShimmerLoader />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {templates.map((temp) => (
                                <div
                                    key={temp}
                                    className={`border border-gray-300 rounded-lg overflow-hidden transition-all hover:shadow-lg ${temp === template ? 'ring-2 ring-blue-500 border-blue-500' : 'shadow'}`}
                                >
                                    <img
                                        src={`/templates/${temp}/preview.png`}
                                        alt={`${temp} preview`}
                                        className="w-full h-[150px] object-cover"
                                    />
                                    <div className="p-4 text-center font-semibold capitalize text-gray-700">{temp}</div>
                                    <div className="flex justify-center gap-4 p-4 border-t">
                                        <button
                                            type="button"
                                            onClick={() => setTemplate(temp)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                        >
                                            Select
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handlePreview(temp)}
                                            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition"
                                        >
                                            Preview
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {errors.template && <p className="text-red-500 text-sm mt-1">{errors.template}</p>}
                        </div>
                    )}
                </>
            )}

            {step === 2 && (
                <>
                    <h2 className="text-2xl font-bold text-gray-800">Step 2: Campaign & Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Campaign ID</label>
                            <input
                                type="text"
                                placeholder="Enter Campaign ID"
                                value={campaignId}
                                onChange={(e) => setCampaignId(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.campaignId && <p className="text-red-500 text-sm mt-1">{errors.campaignId}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">CRM</label>
                            <select value={crm || ''} onChange={(e)=>{setCrm(e.target.value)}} name="crm" id="crm" className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Select CRM</option>
                                {crms?.map((crm) => (
                                    <option key={crm._id} value={crm.label}>
                                        {crm.label}
                                    </option>
                                ))}
                            </select>
                            {errors.crm && <p className="text-red-500 text-sm mt-1">{errors.crm}</p>}
                        </div>
                    </div>


                    <h3 className="mt-6 mb-2 text-lg font-semibold text-gray-800">Enter Product IDs</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {products.map((product, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 flex flex-col gap-4"
                            >
                                {/* Price Field */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">Price</label>
                                    <input
                                        type="tel"
                                        value={product.price || ""}
                                        placeholder="Enter price"
                                        onChange={(e) =>
                                            !product.isFixed && handleChange(index, "price", e.target.value)
                                        }
                                        className={`px-3 py-2 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${product.isFixed
                                            ? "bg-gray-100 cursor-not-allowed"
                                            : "bg-white border-gray-300"
                                            }`}
                                        readOnly={product.isFixed}
                                    />
                                    {errors[`product-${index}-price`] && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors[`product-${index}-price`]}
                                        </p>
                                    )}
                                </div>

                                {/* Product ID Field */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">Product ID</label>
                                    <input
                                        type="tel"
                                        placeholder="Enter product ID"
                                        value={product.productId}
                                        onChange={(e) => handleChange(index, "productId", e.target.value)}
                                        className="px-3 py-2 border border-gray-300 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors[`product-${index}-id`] && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors[`product-${index}-id`]}
                                        </p>
                                    )}
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() => removeProduct(index)}
                                    className="self-end text-sm text-red-600 hover:text-red-800"
                                >
                                    ✕ Remove
                                </button>
                            </div>
                        ))}

                        {/* Add Button */}
                        <div className="flex items-start">
                            <button
                                onClick={addProduct}
                                className="mt-1 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm shadow-md"
                            >
                                + Add More Product
                            </button>
                        </div>
                    </div>


                </>
            )}

            {step === 3 && (
                <>
                    <h2 className="text-2xl font-bold text-gray-800">Step 3: Company Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Company Name</label>
                            <input
                                type="text"
                                placeholder="Your Company Name"
                                value={company.name}
                                onChange={(e) => setCompany({ ...company, name: e.target.value })}
                                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.company_name && <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Support Email</label>
                            <input
                                type="email"
                                placeholder="support@example.com"
                                value={company.email}
                                onChange={(e) => setCompany({ ...company, email: e.target.value })}
                                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <textarea
                                onChange={(e) => setCompany({ ...company, address: e.target.value })}
                                value={company.address}
                                placeholder='Company Address'
                                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">EIN Number</label>
                            <input
                                type="text"
                                placeholder="123456789"
                                value={company.ein}
                                onChange={(e) => setCompany({ ...company, ein: e.target.value })}
                                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.ein && <p className="text-red-500 text-sm mt-1">{errors.ein}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Support Phone</label>
                            <input
                                type="text"
                                placeholder="+1 555 123 4567"
                                value={company.phone}
                                onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>
                    </div>
                </>
            )}

            <div className="flex justify-between items-center pt-6 border-t border-gray-500 mt-6">
                {step > 1 ? (
                    <button
                        onClick={prevStep}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                    >
                        Back
                    </button>
                ) : <span />}

                {step < 3 ? (
                    <button
                        onClick={handleNext}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                    >
                        {isSubmitting ? 'Deploying...' : 'Deploy'}
                    </button>
                )}
            </div>

            {previewTemplate && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-99999">
                    <div className="relative bg-white w-full max-w-[90%] h-[96vh] rounded-lg overflow-x-scroll shadow-lg">
                        <button
                            className="z-[100] absolute top-6 right-4 bg-gray-800 text-white px-3 py-1 rounded"
                            onClick={() => setPreviewTemplate(null)}
                        >
                            Close
                        </button>
                        {templateMap[previewTemplate] && React.createElement(templateMap[previewTemplate])}
                    </div>
                </div>
            )}
        </div>
    );
}
