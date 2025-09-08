import { ToastState, useToast } from '@/hooks/useToast'
import { X } from 'lucide-react';
import React from 'react'

const Toast = ({ toast }: { toast: ToastState }) => {
    const {setToast} = useToast();

    if (!toast.show) return null

    const colorMap = {
        success: "bg-green-600",
        error: "bg-red-600",
        warning: "bg-yellow-500",
        info: "bg-blue-600",
    };


    return (
        <div className={`fixed z-[99999] top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 ${colorMap[toast.color]} text-white px-6 py-2 rounded-sm shadow-lg animate-slide-from-top`}>

            <span>{toast.message}</span>
            <button
                onClick={() => setToast({ message: "", show: false, color: "info" })}
                className="ml-3 text-white hover:text-gray-200"
            >
                <X size={16} />
            </button>
        </div>
    )
}

export default Toast
