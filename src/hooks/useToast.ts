import { useState } from "react";

export interface ToastState {
  message: string;
  show: boolean;
  color: "success" | "error" | "warning" | "info";
}

export const useToast = ()=>{
    const [toast, setToast] = useState<{ message: string; show: boolean, color: ToastState["color"] }>({
        message: "",
        show: false,
        color: "info",
    });

    const showToast = (message: string, color: ToastState["color"] = "info") => {
        setToast({ message, show: true, color });
        setTimeout(() => setToast({ message: "", show: false, color: "info" }), 4000);
    };

    return { toast, showToast, setToast };
}