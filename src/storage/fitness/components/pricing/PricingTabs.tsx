"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import config from "../../config.json";
export default function PricingTabs() {
  return (
    <section id="pricing-tabs" className="py-20 bg-gradient-to-b from-[#f0f7ff] to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent" style={{
            backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
          }}>Our E-Book Packages</h2>
          <p className="text-lg text-[#1857b2] max-w-3xl mx-auto">
            Simple solutions for all your publishing needs, from mini-guides to complete books.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {config.products.map((pack, index) => (
            <motion.div
              key={pack.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`relative rounded-xl overflow-hidden border ${pack.popular
                ? "border-[#21b87c] shadow-lg"
                : "border-[#e0f0ff] shadow-md"
                } bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              {pack.popular && (
                <div className="absolute top-0 left-0 w-full text-white text-xs font-bold py-1.5 px-4 text-center"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
                  }}>
                  Popular Package
                </div>
              )}
              <div className={`p-6 ${pack.popular ? "pt-10" : ""}`}>
                <h3 className="text-xl font-bold text-[#183d74] mb-2">{pack.name}</h3>
                <div className="flex items-baseline mb-5">
                  <span className="text-4xl font-bold bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
                    }}>
                    ${pack.price}
                  </span>
                  <span className="ml-1 text-[#1857b2]">/book</span>
                </div>

                <div className="border-t border-[#e0f0ff] my-5 pt-5">
                  <div className="space-y-4">
                    <div className="flex items-center bg-[#f0f7ff] p-2 rounded-md">
                      <div className="bg-white p-1.5 rounded-full shadow-sm mr-3">
                        <svg className="w-5 h-5 text-[#21b87c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                      </div>
                      <span className="text-[#164790] font-medium">{pack?.descriptions?.title1}</span>
                    </div>

                    <div className="flex items-center bg-[#f0f7ff] p-2 rounded-md">
                      <div className="bg-white p-1.5 rounded-full shadow-sm mr-3">
                        <svg className="w-5 h-5 text-[#21b87c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <span className="text-[#164790] font-medium">{pack?.descriptions?.title2}</span>
                    </div>

                    <div className="flex items-center bg-[#f0f7ff] p-2 rounded-md">
                      <div className="bg-white p-1.5 rounded-full shadow-sm mr-3">
                        <svg className="w-5 h-5 text-[#21b87c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-[#164790] font-medium">Delivery: {pack?.descriptions?.title3}</span>
                    </div>

                    <div className="flex items-center bg-[#f0f7ff] p-2 rounded-md">
                      <div className="bg-white p-1.5 rounded-full shadow-sm mr-3">
                        {pack?.descriptions?.title4 ? (
                          <svg className="w-5 h-5 text-[#21b87c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-[#7cc5fe]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[#164790] font-medium">
                        {pack?.descriptions?.title4 ? "Cover design included" : "No cover design"}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/checkout?package=${encodeURIComponent(pack.name)}&price=${pack.price.toFixed(2)}`}
                  className="mt-4 w-full block py-3 px-6 text-center text-white font-semibold rounded-lg transition-all duration-300 transform hover:translate-y-[-2px]" style={{
                    backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
                  }}
                >
                  Buy Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 