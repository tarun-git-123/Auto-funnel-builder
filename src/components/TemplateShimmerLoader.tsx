export default function TemplateShimmerLoader() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse border border-gray-300 rounded-lg shadow">
            <div className="bg-gray-300 h-[150px] w-full" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="flex justify-center gap-4 p-4 border-t">
              <div className="bg-gray-300 h-10 w-20 rounded" />
              <div className="bg-gray-300 h-10 w-20 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }