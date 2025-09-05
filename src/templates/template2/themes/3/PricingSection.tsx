"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import config from "../../config.json";

export default function PricingSectionAlt() {
  // Define pricing tiers for e-book writing
  const pricingTiers = [
    {
      name: "Basic E-Book",
      price: 9.99,
      wordCount: "5,000 words",
      description: "A concise e-book perfect for short guides or introductory topics",
      features: ["Professional writing", "1 revision round", "Delivered as plain text"],
      notIncluded: ["Formatting", "Proofreading"],
      delivery: "7 days",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-900",
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
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-900",
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
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-900",
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
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-900",
    },
    {
      name: "Professional E-Book",
      price: 89.5,
      wordCount: "20,000 words",
      description: "Extended e-book with quality formatting",
      features: [
        "Professional writing",
        "Expert proofreading",
        "3 revision rounds",
        "Basic formatting",
        "Delivered as HTML and Markdown",
      ],
      notIncluded: ["Research", "Design elements"],
      delivery: "21 days",
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-50",
      textColor: "text-rose-900",
    },
    {
      name: "Enterprise E-Book",
      price: 119.5,
      wordCount: "Custom length",
      description: "Custom-length e-book for businesses and authors",
      features: [
        "Professional writing",
        "Expert proofreading",
        "3 revision rounds",
        "Standard formatting",
        "Delivered in HTML and Markdown",
      ],
      notIncluded: ["Research", "Advanced design"],
      delivery: "Custom timeline",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-900",
    },
  ]

  return (
    <section
      className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
      id="pricing-alt"
    >

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-6 py-2 rounded-full text-white text-sm font-semibold mb-6" style={{
              backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
            }}>
              💎 Premium Packages
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent" style={{
              backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
            }}>
              Pricing That Scales
            </h2>
            <p className="text-slate-600 text-xl leading-relaxed">
              Transform your ideas into professional e-books with our expert writing services
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards - Hexagonal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className={`relative group ${tier.popular ? "md:scale-110 z-10" : ""}`}
            >
              {/* Card Container */}
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-6 py-2 rounded-full shadow-lg animate-bounce">
                      ⭐ MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Gradient Header */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${tier.color}`}></div>

                {/* Price Circle */}
                <div className="flex justify-center mb-6">
                  <div
                    className={`relative w-24 h-24 bg-gradient-to-r ${tier.color} rounded-full flex items-center justify-center shadow-lg`}
                  >
                    <div className="text-center">
                      <div className="text-white text-lg font-bold">${tier.price}</div>
                      <div className="text-white text-xs opacity-90">per project</div>
                    </div>
                    {/* Rotating Ring */}
                    <div
                      className={`absolute inset-0 border-4 border-dashed border-white opacity-30 rounded-full animate-spin`}
                      style={{ animationDuration: "10s" }}
                    ></div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold ${tier.textColor} mb-2`}>{tier.name}</h3>
                  <div
                    className={`inline-block px-4 py-1 ${tier.bgColor} ${tier.textColor} rounded-full text-sm font-medium mb-3`}
                  >
                    {tier.wordCount}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{tier.description}</p>
                </div>

                {/* Features Grid */}
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 gap-3">
                    {tier.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Not Included */}
                  {tier.notIncluded && (
                    <div className="grid grid-cols-1 gap-2 mt-4">
                      {tier.notIncluded.map((item, nidx) => (
                        <div key={nidx} className="flex items-center space-x-3 p-2 bg-red-50 rounded-lg">
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-500 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Delivery Badge */}
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-gray-100 rounded-full">
                    <span className="text-gray-700 text-sm font-semibold">🚀 {tier.delivery}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link href={`/checkout?package=${encodeURIComponent(tier.name)}&price=${tier.price.toFixed(2)}`}>
                  <button
                    className={`w-full py-4 px-6 bg-gradient-to-r ${tier.color} text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group-hover:shadow-2xl`}
                  >
                    Choose This Package
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="relative bg-gradient-to-r from-slate-800 to-gray-900 p-12 rounded-3xl shadow-2xl border border-gray-700 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
            </div>

            <div className="relative z-10 text-center">
              <div className="inline-block p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Need Something Custom?</h3>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                Every project is unique. Let's create a personalized package that perfectly fits your vision and budget.
              </p>
              <Link href="/contact">
                <button className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-white to-gray-100 text-gray-900 font-bold rounded-2xl hover:from-gray-100 hover:to-white transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                  <span>Get Custom Quote</span>
                  <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}