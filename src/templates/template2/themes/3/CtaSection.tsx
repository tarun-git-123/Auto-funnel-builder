"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import config from "../../config.json";

export default function CtaSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 1000)
  }

  return (
    <section className="py-14 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/3 w-80 h-80 bg-purple-200/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-200/25 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-cyan-200/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center rounded-full px-6 py-3 text-sm bg-white/80 text-blue-600 backdrop-blur-sm border border-blue-200 mb-6 shadow-lg">
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-3 animate-pulse"></span>
              Ready to Start Your Journey?
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
              Let's Create Your
              <span className="block  bg-clip-text text-transparent" style={{
                        backgroundImage: `linear-gradient(to right, ${config.secondaryColor}, ${config.primaryColor})`,
                      }}>
                Next Bestseller
              </span>
            </h2>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of authors who've transformed their ideas into professional e-books with our expert writing
              team.
            </p>
          </motion.div>

          {/* Main Content - Horizontal Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mr-4 shadow-lg" style={{
                        backgroundImage: `linear-gradient(to right, ${config.secondaryColor}, ${config.primaryColor})`,
                      }}>
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-800">500+</h3>
                      <p className="text-slate-600 font-medium">E-Books Published</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mr-4 shadow-lg" style={{
                        backgroundImage: `linear-gradient(to right, ${config.secondaryColor}, ${config.primaryColor})`,
                      }}>
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-800">7 Days</h3>
                      <p className="text-slate-600 font-medium">Average Delivery</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300 sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mr-4 shadow-lg" style={{
                        backgroundImage: `linear-gradient(to right, ${config.secondaryColor}, ${config.primaryColor})`,
                      }}>
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-800">98%</h3>
                      <p className="text-slate-600 font-medium">Client Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-200/50 shadow-2xl">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Get Your Free Quote Today</h3>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 bg-slate-50/80 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 transition-all duration-300"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50/80 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 transition-all duration-300"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-semibold text-slate-700 mb-2">
                        Project Type *
                      </label>
                      <select
                        id="service"
                        className="w-full px-4 py-3 bg-slate-50/80 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 transition-all duration-300"
                        required
                      >
                        <option value="">Choose your e-book type</option>
                        <option value="business">Business & Professional Guide</option>
                        <option value="educational">Educational & How-To Manual</option>
                        <option value="fiction">Fiction & Creative Writing</option>
                        <option value="memoir">Memoir & Biography</option>
                        <option value="self-help">Self-Help & Personal Development</option>
                        <option value="other">Other (please specify in message)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                        Project Description *
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 bg-slate-50/80 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 transition-all duration-300 resize-none"
                        placeholder="Tell us about your e-book idea, target audience, desired length, and any specific requirements..."
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg shadow-lg transition-all duration-300 ${loading
                          ? "opacity-80 cursor-not-allowed"
                          : "hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] hover:from-blue-700 hover:to-purple-700"
                        }`}
                      disabled={loading}
                      style={{
                        backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
                      }}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing Your Request...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Get My Free Quote
                          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </span>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-6 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 mb-3">Thank You for Your Interest!</h4>
                    <p className="text-slate-600 text-lg mb-4">
                      We've received your project details and will send a personalized quote to
                    </p>
                    <p className="text-slate-800 font-semibold text-lg mb-6">{email}</p>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <p className="text-blue-800 text-sm">
                        ⚡ Expect to hear from our team within 2-4 hours during business hours
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}