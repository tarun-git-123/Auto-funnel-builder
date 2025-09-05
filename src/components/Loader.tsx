// components/Loader.tsx
export default function Loader() {
    return (
        <div className="flex justify-center items-center fixed inset-0 bg-[#1e1e1e] bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-blue-600"></div>
        </div>
    );
}
