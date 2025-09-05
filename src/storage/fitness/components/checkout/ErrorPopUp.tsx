interface ErrorPopUpProps {
    formErrors: string[];
    setFormErrors: React.Dispatch<React.SetStateAction<string[]>>;
}
export default function ErrorPopUp({setFormErrors, formErrors}: ErrorPopUpProps) {
    return (
        <div className="fixed top-6 inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white border border-orange-200 text-black px-6 py-4 rounded-lg shadow-lg w-[90%] max-w-md max-h-[80vh] overflow-y-auto relative">
                <button
                    onClick={() => setFormErrors([])}
                    className="absolute top-3 right-4 text-red-500 font-bold text-xl"
                >
                    ✕
                </button>
                <h4 className="font-bold mb-2 text-red-600">
                    Please correct the following errors:
                </h4>
                <ul className="list-disc pl-5 text-sm space-y-1">
                    {formErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
