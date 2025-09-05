"use client"

import Link from "next/link"
import config from "../../config.json"

export default function PricingSection() {
  const pricingTiers = [
    {
      name: "Basic E-Book",
      price: 9.99,
      wordCount: "5,000 words",
      description: "A concise e-book perfect for short guides or introductory topics",
      features: ["Professional writing", "1 revision round", "Delivered as plain text"],
      notIncluded: ["Formatting", "Proofreading"],
      delivery: "7 days",
      color: "blue",
    },
    {
      name: "Standard E-Book",
      price: 19.5,
      wordCount: "10,000 words",
      description: "A comprehensive e-book with more detailed content coverage",
      features: ["Professional writing", "1 revision round", "Delivered as text or Markdown"],
      notIncluded: ["Formatting", "Research"],
      delivery: "10 days",
      popular: true,
      color: "purple",
    },
    {
      name: "Premium E-Book",
      price: 29.9,
      wordCount: "15,000 words",
      description: "A thorough e-book with well-organized content",
      features: [
        "Professional writing",
        "Basic proofreading",
        "2 revision rounds",
        "Delivered as text, Markdown, or HTML",
      ],
      notIncluded: ["Research", "Design elements"],
      delivery: "14 days",
      color: "emerald",
    },
    {
      name: "Enhanced E-Book",
      price: 59.5,
      wordCount: "15,000 words",
      description: "Complete e-book package with basic formatting",
      features: [
        "Professional writing",
        "Standard proofreading",
        "2 revision rounds",
        "Simple chapter structure",
        "Delivered in HTML and Markdown",
      ],
      notIncluded: ["Research", "Cover design"],
      delivery: "18 days",
      color: "orange",
    },
  ]

  return (
    <section className="py-20 bg-gray-50" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-6">
            💎 Transparent Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Choose Your <span className="bg-clip-text text-transparent" style={{
                backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
              }}>Perfect Package</span></h2>
          <p className="text-gray-600 text-lg">Professional e-book writing services with clear, upfront pricing</p>
        </div>

        {/* Pricing Table */}
        <div className="max-w-6xl mx-auto">
          {/* Mobile Cards */}
          <div className="block lg:hidden space-y-6">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  tier.popular ? "border-purple-500 ring-4 ring-purple-100" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">${tier.price}</div>
                  <div className="text-gray-500 text-sm">{tier.wordCount}</div>
                </div>

                <p className="text-gray-600 text-sm mb-6 text-center">{tier.description}</p>

                <div className="space-y-3 mb-6">
                  {tier.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center mb-6">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    🚀 {tier.delivery}
                  </span>
                </div>

                <Link href={`/checkout?package=${encodeURIComponent(tier.name)}&price=${tier.price.toFixed(2)}`}>
                  <button
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      tier.popular
                        ? "bg-purple-500 text-white hover:bg-purple-600 shadow-lg"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    Choose Package
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-8 text-left">
                      <div className="text-lg font-semibold text-gray-900">Package Details</div>
                    </th>
                    {pricingTiers.map((tier, index) => (
                      <th
                        key={index}
                        className={`px-6 py-8 text-center relative ${tier.popular ? "bg-purple-50" : ""}`}
                      >
                        {tier.popular && (
                          <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                            <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                              Most Popular
                            </span>
                          </div>
                        )}
                        <div className="text-lg font-bold text-gray-900 mb-1">{tier.name}</div>
                        <div className="text-2xl font-bold text-gray-900">${tier.price}</div>
                        <div className="text-gray-500 text-sm">{tier.wordCount}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="px-6 py-4 font-medium text-gray-900">Description</td>
                    {pricingTiers.map((tier, index) => (
                      <td
                        key={index}
                        className={`px-6 py-4 text-center text-sm text-gray-600 ${tier.popular ? "bg-purple-50" : ""}`}
                      >
                        {tier.description}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Delivery Time</td>
                    {pricingTiers.map((tier, index) => (
                      <td key={index} className={`px-6 py-4 text-center ${tier.popular ? "bg-purple-50" : ""}`}>
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          🚀 {tier.delivery}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Features Rows */}
                  {["Professional writing", "Revision rounds", "Proofreading", "Formatting", "Delivery format"].map(
                    (feature, featureIndex) => (
                      <tr
                        key={featureIndex}
                        className={`border-t border-gray-200 ${featureIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">{feature}</td>
                        {pricingTiers.map((tier, tierIndex) => (
                          <td key={tierIndex} className={`px-6 py-4 text-center ${tier.popular ? "bg-purple-50" : ""}`}>
                            {feature === "Professional writing" ? (
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            ) : feature === "Revision rounds" ? (
                              <span className="text-gray-900 font-medium">
                                {tierIndex === 0 || tierIndex === 1
                                  ? "1 round"
                                  : tierIndex === 2 || tierIndex === 3
                                    ? "2 rounds"
                                    : "3 rounds"}
                              </span>
                            ) : feature === "Proofreading" ? (
                              tierIndex >= 2 ? (
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              ) : (
                                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              )
                            ) : feature === "Formatting" ? (
                              tierIndex >= 3 ? (
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              ) : (
                                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              )
                            ) : (
                              <span className="text-gray-600 text-sm">
                                {tierIndex === 0
                                  ? "Plain text"
                                  : tierIndex === 1
                                    ? "Text/Markdown"
                                    : tierIndex === 2
                                      ? "Text/Markdown/HTML"
                                      : "HTML/Markdown"}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ),
                  )}

                  {/* CTA Row */}
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-6 py-6"></td>
                    {pricingTiers.map((tier, index) => (
                      <td key={index} className={`px-6 py-6 text-center ${tier.popular ? "bg-purple-50" : ""}`}>
                        <Link href={`/checkout?package=${encodeURIComponent(tier.name)}&price=${tier.price.toFixed(2)}`}>
                          <button
                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                              tier.popular
                                ? ""
                                : "bg-gray-900 text-white hover:bg-gray-800"
                            }`}
                          style={tier.popular ? {
                            color:'#ffffff',
                backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
              }:{}}>
                            Choose Package
                          </button>
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Custom Quote Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className=" p-8 rounded-2xl text-center text-slate-900 bg-blue-400">
            <div className="inline-block p-3  rounded-full mb-4" style={{
                backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
              }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Need Something Custom?</h3>
            <p className="text-slate-800 mb-6 max-w-2xl mx-auto">
              Every project is unique. Let's create a personalized package that perfectly fits your vision and budget.
            </p>
            <Link href="/contact">
              <button className="inline-flex items-center px-8 py-3 text-white font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105" style={{
                backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
              }}>
                <span>Get Custom Quote</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
