// "use client";
// import { X, AlertTriangle } from "lucide-react";

// interface UnsavedChangesPopupProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onDiscard: () => void;
//     onSave: () => void;
//     fileName?: string;
// }

// export default function UnsavedChangesPopup({
//     isOpen,
//     onClose,
//     onDiscard,
//     onSave,
//     fileName = "this file",
// }: UnsavedChangesPopupProps) {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//             {/* Overlay */}
//             <div
//                 className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//                 onClick={onClose}
//             />


//             {/* Modal */}
//             <div className="relative z-10 w-full max-w-md rounded-lg bg-[#1e1e1e] border border-gray-700 shadow-xl">
//                 {/* Header */}
//                 <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
//                     <div className="flex items-center gap-2">
//                         <AlertTriangle className="w-5 h-5 text-yellow-400" />
//                         <h3 className="text-white font-medium">Unsaved Changes</h3>
//                     </div>
//                     <button
//                         onClick={onClose}
//                         className="p-1 rounded hover:bg-gray-700"
//                     >
//                         <X className="w-5 h-5 text-gray-300" />
//                     </button>
//                 </div>

//                 {/* Body */}
//                 <div className="px-4 py-5 text-sm text-gray-300">
//                     You have unsaved changes in{" "}
//                     <span className="text-white font-medium">{fileName}</span>.
//                     Do you want to save before closing?
//                 </div>

//                 {/* Footer */}
//                 <div className="flex justify-end gap-3 px-4 py-3 border-t border-gray-700">
//                     <button
//                         onClick={onDiscard}
//                         className="px-4 py-2 text-gray-300 rounded hover:bg-gray-700"
//                     >
//                         Don’t Save
//                     </button>
//                     <button
//                         onClick={onClose}
//                         className="px-4 py-2 text-gray-300 rounded hover:bg-gray-700"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={onSave}
//                         className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500"
//                     >
//                         Save
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }


"use client";
import React from "react";

interface UnsavedChangesPopupProps {
  isOpen: boolean;
  fileName?: string;
  onClose: () => void;
  onDiscard: () => void;
  onSave: () => void;
}

const UnsavedChangesPopup: React.FC<UnsavedChangesPopupProps> = ({
  isOpen,
  fileName,
  onClose,
  onDiscard,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white shadow-lg w-[400px] p-6">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Unsaved Changes
        </h2>


        {/* Message */}
        <p className="text-gray-600 mb-6">
          Do you want to save changes before closing{" "}
          <span className="font-medium text-gray-900">{fileName}</span>?
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onDiscard}
            className="px-4 py-2 text-sm text-black border border-blue-300 bg-gray-100 hover:bg-gray-200"
          >
            Don’t Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-black border border-blue-300 bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="px-4 py-2 text-sm text-black border border-blue-300 bg-gray-100 hover:bg-gray-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnsavedChangesPopup;
