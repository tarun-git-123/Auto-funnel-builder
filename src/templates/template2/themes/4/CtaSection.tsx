"use client"

import type React from "react"
import { useState } from "react"
import config from "../../config.json"

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
    <section className="py-20 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-400 to-blue-400 rotate-45 opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-green-400 to-teal-400 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-yellow-400 to-orange-400 rotate-12 opacity-20 animate-bounce"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full px-8 py-4 text-sm bg-white shadow-lg border border-orange-200 text-orange-600 mb-8">
              <span className="flex h-3 w-3 rounded-full bg-green-500 mr-3 animate-pulse"></span>
              Transform Your Ideas Into Reality
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Ready to Write Your
              <span className="block bg-clip-text text-transparent" style={{
                backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
              }}>
                Success Story?
              </span>
            </h2>

            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Join our community of successful authors and turn your expertise into a profitable e-book
            </p>
          </div>

          {/* Main Content - Vertical Layout with Side Stats */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
            {/* Stats Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-2">500+</h3>
                  <p className="text-gray-600 font-medium">E-Books Published</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-2">7 Days</h3>
                  <p className="text-gray-600 font-medium">Average Delivery</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-2">98%</h3>
                  <p className="text-gray-600 font-medium">Client Satisfaction</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="xl:col-span-3">
              <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Get Your Free Quote Today</h3>
                  <p className="text-gray-600 text-lg">
                    Tell us about your project and we'll send you a personalized quote within hours
                  </p>
                </div>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-3">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 text-gray-900 placeholder-gray-500 transition-all duration-300"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 text-gray-900 placeholder-gray-500 transition-all duration-300"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-bold text-gray-700 mb-3">
                        Project Type *
                      </label>
                      <select
                        id="service"
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 text-gray-900 transition-all duration-300"
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
                      <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-3">
                        Project Description *
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 text-gray-900 placeholder-gray-500 transition-all duration-300 resize-none"
                        placeholder="Tell us about your e-book idea, target audience, desired length, and any specific requirements..."
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-5 px-8 rounded-2xl  text-white font-bold text-xl transition-all duration-300 shadow-xl ${loading
                          ? "opacity-80 cursor-not-allowed"
                          : "hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] hover:from-orange-600 hover:to-purple-600"
                        }`}
                      disabled={loading}
                      style={{
                        backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
                      }}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
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
                          Get My Free Quote Now
                          <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-teal-500 mb-8">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Interest!</h4>
                    <p className="text-gray-600 text-xl mb-4">
                      We've received your project details and will send a personalized quote to
                    </p>
                    <p className="text-gray-900 font-bold text-xl mb-8">{email}</p>
                    <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
                      <p className="text-orange-700 text-lg font-medium">
                        ⚡ Expect to hear from our team within 2-4 hours during business hours
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}