// app/(dashboard)/create-crm/page.tsx or app/create-crm/page.tsx
import React, { Suspense } from "react";
import EditCRMForm from "./EditCRMForm";

const EditCRMPage = () => {

  return (
    <div className="max-w-4xl mx-auto p-2">
      <h1 className="text-2xl font-medium mb-2 text-gray-800">Edit CRM</h1>
      <Suspense fallback={<ShimmerLoader />}>
        <EditCRMForm />
      </Suspense>
    </div>
  );
};

const ShimmerLoader = () => (
  <div className="space-y-4 animate-pulse grid grid-cols-1 md:grid-cols-2 gap-2">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-10 bg-gray-200 rounded" />
    ))}
    <div className="h-10 w-1/3 bg-blue-200 rounded" />
  </div>
);

export default EditCRMPage;
