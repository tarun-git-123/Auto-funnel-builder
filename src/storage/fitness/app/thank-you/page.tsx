"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import config from "../../config.json"

const ThankYouPageContent = () => {
  const searchParams = useSearchParams();
  const order_id = searchParams.get("order_id");
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-16 mt-[40px]">
        <div className="glass-effect p-8 text-center">
          <svg
            className="w-16 h-16 text-prep-teal-500 mx-auto mb-6 animate-float"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="responsive-heading mb-4 bg-clip-text text-transparent" style={{
            backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
          }}>
            Order Confirmed!
          </h2>

          <p className="responsive-subtitle mb-8">
            Thank you for your purchase. Your order ID #
            <span className="font-bold">{order_id}</span>
          </p>
          <Link
            href="/"
            className="button-glow px-6 py-3 text-white font-medium rounded-lg"
            style={{
              backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
            }}
          >
            Return to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="text-center py-16">Loading...</div>}>
      <ThankYouPageContent />
    </Suspense>
  );
}
