"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Modal } from "./ui/modal";
import { useModal } from "@/hooks/useModal";

export const fakeProgressArray = [
    1, 5, 7, 8, 16, 32, 45, 78, 86, 98
];

export default function ReDeployButton({ projectPath, siteName }: { projectPath: string, siteName: string }) {
    const [loading, setLoading] = useState(false);
    const [hover, setHover] = useState(false);
    const [result, setResult] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const successModal = useModal();
    const errorModal = useModal();

    const handleDeploy = async () => {
        setLoading(true);
        setProgress(0);

        const res = await fetch("/api/deploy/cli/", {
            method: "POST",
            body: JSON.stringify({ projectPath }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        console.log(data);

        // if the response is not 200, show the error message
        if (!res.ok) {
            setResult(data.error);
            errorModal.openModal();
        }
        if (!data.success) {
            setResult(`Deployment failed`);
            errorModal.openModal();
            setLoading(false);
            setProgress(0);
        } else {
            setProgress(100);
            setTimeout(() => {
                setResult(`${siteName} Deployment successful!`);
                successModal.openModal();
                setLoading(false);
                setProgress(0);
            }, 1000);
        }
        // show the success message
    };

    // fake progress 
    useEffect(() => {
        if (!loading) return;

        let index = 0;
        const interval = setInterval(() => {
            if (index < fakeProgressArray.length) {
                setProgress(fakeProgressArray[index]);
                index++;
            } else {
                setProgress(99);
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [loading]);

    return (
        <div className="relative inline-block items-start gap-2">
            <button
                onClick={handleDeploy}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 
                   text-white font-semibold rounded-lg shadow hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {
                    loading ? (
                        <>
                            <svg
                                className="w-5 h-5 animate-spin text-white"
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
                                    d="M4 12a8 8 0 018-8v8z"
                                ></path>
                            </svg>
                            {progress > 0 && `${progress}%`}
                        </>
                    ) : (
                        <>
                            <RefreshCw className="w-5 h-5" />
                        </>
                    )
                }
            </button >

            {hover && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-md bg-black text-white text-xs px-2 py-1 shadow">
                    Deploy
                </div>
            )}

            {/* Success Modal */}
            <Modal
                isOpen={successModal.isOpen}
                onClose={successModal.closeModal}
                className="max-w-[500px] p-5 lg:p-5"
            >
                <div className="text-center">
                    <div className="relative flex items-center justify-center z-1 mb-7">
                        <svg
                            className="fill-success-50 dark:fill-success-500/15"
                            width="90"
                            height="90"
                            viewBox="0 0 90 90"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M34.364 6.85053C38.6205 -2.28351 51.3795 -2.28351 55.636 6.85053C58.0129 11.951 63.5594 14.6722 68.9556 13.3853C78.6192 11.0807 86.5743 21.2433 82.2185 30.3287C79.7862 35.402 81.1561 41.5165 85.5082 45.0122C93.3019 51.2725 90.4628 63.9451 80.7747 66.1403C75.3648 67.3661 71.5265 72.2695 71.5572 77.9156C71.6123 88.0265 60.1169 93.6664 52.3918 87.3184C48.0781 83.7737 41.9219 83.7737 37.6082 87.3184C29.8831 93.6664 18.3877 88.0266 18.4428 77.9156C18.4735 72.2695 14.6352 67.3661 9.22531 66.1403C-0.462787 63.9451 -3.30193 51.2725 4.49185 45.0122C8.84391 41.5165 10.2138 35.402 7.78151 30.3287C3.42572 21.2433 11.3808 11.0807 21.0444 13.3853C26.4406 14.6722 31.9871 11.951 34.364 6.85053Z"
                                fill=""
                                fillOpacity=""
                            />
                        </svg>

                        <span className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                            <svg
                                className="fill-success-600 dark:fill-success-500"
                                width="38"
                                height="38"
                                viewBox="0 0 38 38"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.9375 19.0004C5.9375 11.7854 11.7864 5.93652 19.0014 5.93652C26.2164 5.93652 32.0653 11.7854 32.0653 19.0004C32.0653 26.2154 26.2164 32.0643 19.0014 32.0643C11.7864 32.0643 5.9375 26.2154 5.9375 19.0004ZM19.0014 2.93652C10.1296 2.93652 2.9375 10.1286 2.9375 19.0004C2.9375 27.8723 10.1296 35.0643 19.0014 35.0643C27.8733 35.0643 35.0653 27.8723 35.0653 19.0004C35.0653 10.1286 27.8733 2.93652 19.0014 2.93652ZM24.7855 17.0575C25.3713 16.4717 25.3713 15.522 24.7855 14.9362C24.1997 14.3504 23.25 14.3504 22.6642 14.9362L17.7177 19.8827L15.3387 17.5037C14.7529 16.9179 13.8031 16.9179 13.2173 17.5037C12.6316 18.0894 12.6316 19.0392 13.2173 19.625L16.657 23.0647C16.9383 23.346 17.3199 23.504 17.7177 23.504C18.1155 23.504 18.4971 23.346 18.7784 23.0647L24.7855 17.0575Z"
                                    fill=""
                                />
                            </svg>
                        </span>
                    </div>
                    <p className="text-lg leading-6 text-green-500 dark:text-gray-400">
                        {result}
                    </p>



                    {/* <div className="flex items-center justify-center w-full gap-3 mt-7">
                        <button
                            type="button"
                            className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-success-500 shadow-theme-xs hover:bg-success-600 sm:w-auto"
                        >
                            Close
                        </button>
                    </div> */}
                </div>
            </Modal>

            {/* Error Modal */}
            <Modal
                isOpen={errorModal.isOpen}
                onClose={errorModal.closeModal}
                className="max-w-[500px] p-5 lg:p-10"
            >
                <div className="text-center">
                    <div className="relative flex items-center justify-center z-1 mb-7">
                        <svg
                            className="fill-error-50 dark:fill-error-500/15"
                            width="90"
                            height="90"
                            viewBox="0 0 90 90"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M34.364 6.85053C38.6205 -2.28351 51.3795 -2.28351 55.636 6.85053C58.0129 11.951 63.5594 14.6722 68.9556 13.3853C78.6192 11.0807 86.5743 21.2433 82.2185 30.3287C79.7862 35.402 81.1561 41.5165 85.5082 45.0122C93.3019 51.2725 90.4628 63.9451 80.7747 66.1403C75.3648 67.3661 71.5265 72.2695 71.5572 77.9156C71.6123 88.0265 60.1169 93.6664 52.3918 87.3184C48.0781 83.7737 41.9219 83.7737 37.6082 87.3184C29.8831 93.6664 18.3877 88.0266 18.4428 77.9156C18.4735 72.2695 14.6352 67.3661 9.22531 66.1403C-0.462787 63.9451 -3.30193 51.2725 4.49185 45.0122C8.84391 41.5165 10.2138 35.402 7.78151 30.3287C3.42572 21.2433 11.3808 11.0807 21.0444 13.3853C26.4406 14.6722 31.9871 11.951 34.364 6.85053Z"
                                fill=""
                                fillOpacity=""
                            />
                        </svg>

                        <span className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                            <svg
                                className="fill-error-600 dark:fill-error-500"
                                width="38"
                                height="38"
                                viewBox="0 0 38 38"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M9.62684 11.7496C9.04105 11.1638 9.04105 10.2141 9.62684 9.6283C10.2126 9.04252 11.1624 9.04252 11.7482 9.6283L18.9985 16.8786L26.2485 9.62851C26.8343 9.04273 27.7841 9.04273 28.3699 9.62851C28.9556 10.2143 28.9556 11.164 28.3699 11.7498L21.1198 18.9999L28.3699 26.25C28.9556 26.8358 28.9556 27.7855 28.3699 28.3713C27.7841 28.9571 26.8343 28.9571 26.2485 28.3713L18.9985 21.1212L11.7482 28.3715C11.1624 28.9573 10.2126 28.9573 9.62684 28.3715C9.04105 27.7857 9.04105 26.836 9.62684 26.2502L16.8771 18.9999L9.62684 11.7496Z"
                                    fill=""
                                />
                            </svg>
                        </span>
                    </div>
                    <h4 className="mb-2 text-2xl font-semibold text-red-400 dark:text-white/90 sm:text-title-sm">
                        {result}
                    </h4>
                </div>
            </Modal>
        </div>
    );
}
