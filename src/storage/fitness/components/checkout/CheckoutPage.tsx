"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Form from "./Form";
import { getProductIdByPrice } from '../../utils/products/product.utils';
import config from "../../config.json"

interface OrderSummary {
  name: string | null;
  price: number;
  product1_id: string;
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);

  useEffect(() => {
    // Get product information from URL parameters
    const name = searchParams.get("package");
    const priceParam = searchParams.get("price");
    const price = priceParam ? parseFloat(priceParam) : 0;

    if (price) {
      const product1_id = getProductIdByPrice(price);

      if (product1_id) {
        setOrderSummary({
          name,
          price: price,
          product1_id
        });
      }
    }
  }, [searchParams]);

  if (!orderSummary) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="responsive-heading my-8 text-center bg-clip-text text-transparent" style={{
        backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
      }}>Secure Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Order Summary */}
        <div className="lg:w-[33%]">
          <div className="glass-effect p-6">
            <h2 className="text-xl font-semibold mb-4 pb-4 border-b border-gray-400">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-lg">{orderSummary?.name}</p>
                </div>
                <p className="font-medium text-lg">${orderSummary?.price.toFixed(2)}</p>
              </div>

              <div className="pt-4 border-t border-gray-400 mt-6">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold bg-clip-text text-transparent" style={{
                backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
              }}>Total</p>
                  <p className="text-lg font-bold">${orderSummary?.price.toFixed(2)}</p>
                </div>
              </div>

              {/* <div className="mt-4 text-sm text-gray-400">
                                <p>Charges will appear as &quot;{COMPANY.descriptor}&quot; on your bank statement.</p>
                            </div> */}
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <Form orderSummary={orderSummary} />
      </div>
    </div>

  );
} 