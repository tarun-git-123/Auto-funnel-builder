"use client";

import { useState } from "react";

export default function CtaSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0078D7]/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00B2A9]/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Accelerate Your Career Journey?
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  Let our experts guide you to professional success with personalized career preparation services.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-[#0078D7] to-[#00B2A9] flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-white">Personalized Approach</h3>
                      <p className="text-gray-400">Tailored to your career goals</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-[#0078D7] to-[#00B2A9] flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-white">Industry Experts</h3>
                      <p className="text-gray-400">Coaches with proven success</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-[#0078D7] to-[#00B2A9] flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-white">Proven Results</h3>
                      <p className="text-gray-400">Thousands of successful clients</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
                  
                  {!submitted ? (
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-[#0078D7] focus:border-[#0078D7] text-white"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-[#0078D7] focus:border-[#0078D7] text-white"
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-[#0078D7] focus:border-[#0078D7] text-white"
                            placeholder="123-456-7890"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
                            Service Needed
                          </label>
                          <select
                            id="service"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-[#0078D7] focus:border-[#0078D7] text-white"
                            required
                          >
                            <option value="">Select a service</option>
                            <option value="resume">Resume/CV</option>
                            <option value="interview">Interview Prep</option>
                            <option value="application">Application Coaching</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                            Your Goals
                          </label>
                          <textarea
                            id="message"
                            rows={4}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-[#0078D7] focus:border-[#0078D7] text-white"
                            placeholder="Tell us about your career goals and how we can help"
                            required
                          ></textarea>
                        </div>
                        
                        <button
                          type="submit"
                          className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#0078D7] to-[#00B2A9] text-white font-medium button-glow transition-all ${
                            loading ? "opacity-80" : "hover:shadow-lg hover:-translate-y-0.5"
                          }`}
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </span>
                          ) : (
                            "Get Started"
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#0078D7] to-[#00B2A9] mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                      <p className="text-gray-300">
                        Thanks for reaching out. A career advisor will contact you at <span className="text-white font-medium">{email}</span> within 24 hours.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
} 