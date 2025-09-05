'use client';

const ProcessingLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Black + Blur Background Layer */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Popup */}
      <div className="relative bg-white rounded-lg p-6 shadow-lg text-center w-80 z-10">
        <div className="mb-4">
          <svg
            className="animate-spin h-8 w-8 text-orange-500 mx-auto"
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
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
            />
          </svg>
        </div>
        <p className="text-lg font-medium text-gray-800">Please wait…</p>
        <p className="text-sm text-gray-600 mt-2">Your order is being processed</p>
      </div>
    </div>
  );
};

export default ProcessingLoader;
