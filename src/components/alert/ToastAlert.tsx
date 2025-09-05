"use client";
import { useEffect } from "react";

type ToastAlertProps = {
  message?: string | null;
  position?: "bottom-left" | "bottom-right";
  type?: "success" | "error";
  onClose: () => void;
};

export const ToastAlert = ({
  message,
  position = "bottom-right",
  type = "success",
  onClose,
}: ToastAlertProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed z-50 px-5 py-3 font-stretch-50% font-normal text-gray-300 bg-black shadow-lg transition-all
        ${position === "bottom-left" ? "bottom-2 left-2" : "bottom-2 right-2"}
      `}
    >
      {message}
    </div>
  );
};
