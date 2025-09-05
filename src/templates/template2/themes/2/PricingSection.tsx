"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import config from "../../config.json"

export default function PricingSection() {
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
      color: "rose",
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
      color: "indigo",
    },
  ]

  const getColorClasses = (color: string, popular?: boolean) => {
    const colors = {
      blue: {
        bg: popular ? "bg-gradient-to-br from-blue-50 to-blue-100" : "bg-white",
        border: popular ? "border-blue-300 shadow-blue-100" : "border-gray-200",
        text: "text-blue-900",
        price: "text-blue-800",
        accent: "text-blue-600",
        button: popular
          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
          : "bg-blue-50 text-blue-700 hover:bg-blue-100",
      },
      purple: {
        bg: popular ? `bg-gradient-to-br from-purple-50 to-purple-100` : "bg-white",
        border: popular ? "border-purple-300 shadow-purple-100" : "border-gray-200",
        text: "text-purple-900",
        price: "text-purple-800",
        accent: "text-purple-600",
        button: popular
          ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800"
          : "bg-purple-50 text-purple-700 hover:bg-purple-100",
      },
      emerald: {
        bg: popular ? "bg-gradient-to-br from-emerald-50 to-emerald-100" : "bg-white",
        border: popular ? "border-emerald-300 shadow-emerald-100" : "border-gray-200",
        text: "text-emerald-900",
        price: "text-emerald-800",
        accent: "text-emerald-600",
        button: popular
          ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800"
          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
      },
      orange: {
        bg: popular ? "bg-gradient-to-br from-orange-50 to-orange-100" : "bg-white",
        border: popular ? "border-orange-300 shadow-orange-100" : "border-gray-200",
        text: "text-orange-900",
        price: "text-orange-800",
        accent: "text-orange-600",
        button: popular
          ? "bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800"
          : "bg-orange-50 text-orange-700 hover:bg-orange-100",
      },
      rose: {
        bg: popular ? "bg-gradient-to-br from-rose-50 to-rose-100" : "bg-white",
        border: popular ? "border-rose-300 shadow-rose-100" : "border-gray-200",
        text: "text-rose-900",
        price: "text-rose-800",
        accent: "text-rose-600",
        button: popular
          ? "bg-gradient-to-r from-rose-600 to-rose-700 text-white hover:from-rose-700 hover:to-rose-800"
          : "bg-rose-50 text-rose-700 hover:bg-rose-100",
      },
      indigo: {
        bg: popular ? "bg-gradient-to-br from-indigo-50 to-indigo-100" : "bg-white",
        border: popular ? "border-indigo-300 shadow-indigo-100" : "border-gray-200",
        text: "text-indigo-900",
        price: "text-indigo-800",
        accent: "text-indigo-600",
        button: popular
          ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800"
          : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
      },
    }
    return colors[color as keyof typeof colors]
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >

            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent" style={{
              backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
            }}>
              Choose Your Perfect Package
            </h2>
            <p className="text-slate-600 text-xl leading-relaxed">
              Professional e-book writing services tailored to your needs. All packages include expert writing by our
              experienced team.
            </p>
          </motion.div>
        </div>

        {/* Pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {pricingTiers.map((tier, index) => {
            const colorClasses = getColorClasses(tier.color, tier.popular)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-2xl border-2 ${ colorClasses.border} ${colorClasses.bg} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${tier.popular ? "scale-105 shadow-2xl" : ""
                  }`}
              >
                {tier.popular && (
                  <div className="absolute -top-1 -right-1">
                    <div className=" text-white text-xs font-bold px-4 py-2 rounded-bl-2xl rounded-tr-2xl shadow-lg" style={{
                      backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
                    }}>
                      ⭐ MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className={`text-2xl font-bold ${colorClasses.text} mb-2`}>{tier.name}</h3>
                    <div className="flex items-baseline mb-2">
                      <span className={`text-4xl font-bold ${colorClasses.price}`}>${tier.price}</span>
                      <span className={`ml-2 ${colorClasses.accent}`}>/project</span>
                    </div>
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colorClasses.accent} bg-opacity-10 ${colorClasses.bg}`}
                    >
                      {tier.wordCount}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 mb-6 leading-relaxed">{tier.description}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <div className={`text-sm font-semibold ${colorClasses.text} mb-3`}>✅ What's included:</div>
                    <ul className="space-y-2">
                      {tier.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Not included */}
                  {tier.notIncluded && (
                    <div className="mb-6">
                      <div className={`text-sm font-semibold ${colorClasses.text} mb-3`}>❌ Not included:</div>
                      <ul className="space-y-2">
                        {tier.notIncluded.map((item, nidx) => (
                          <li key={nidx} className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                              <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-slate-500 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Delivery */}
                  <div className="text-sm text-slate-600 mb-8 p-3 bg-slate-50 rounded-lg">
                    <span className="font-semibold text-slate-800">🚀 Delivery:</span> {tier.delivery}
                  </div>

                  {/* CTA */}
                  <Link href={`/checkout?package=${encodeURIComponent(tier.name)}&price=${tier.price.toFixed(2)}`}>
                    <button
                      className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${tier.popular ? '' : colorClasses.button} transform hover:scale-105 shadow-md hover:shadow-lg`}
                      style={tier.popular ? {
                        color:"#ffffff",
                        backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
                      } : {}}>
                      Choose This Package
                    </button>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">🎯 Need Something Custom?</h3>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                For custom word counts, specialized topics, or additional services not listed above, we'd love to create
                a personalized package just for you.
              </p>
              <Link href="/contact">
                <button className="inline-flex items-center px-8 py-4  text-white font-semibold rounded-xl hover:from-slate-800 hover:to-slate-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" style={{
                  backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
                }}>
                  <span>Contact for Custom Quote</span>
                  <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
