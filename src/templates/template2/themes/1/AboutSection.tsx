"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16" id="home">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-book-blue-600/20 rounded-full filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-book-yellow-500/15 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 left-[30%] w-64 h-64 bg-gradient-to-r from-book-blue-600/10 to-book-green-600/10 rounded-full filter blur-2xl animate-float"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-book-blue-100 text-book-blue-800 backdrop-blur-sm border border-book-blue-200">
              <span className="flex h-2 w-2 rounded-full bg-book-blue-500 mr-2"></span>
              About Us
            </div>
            
            <h1 className="responsive-heading text-4xl md:text-5xl font-bold text-book-blue-900">
              Professional <span className="gradient-text">E-Book Writing</span> for <span className="relative">
                <span className="relative z-10">Every Idea</span>
                <svg className="absolute bottom-0 left-0 w-full h-[0.2em] text-book-yellow-500/50" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,0 C50,5 80,5 200,0" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-xl text-book-blue-800 md:text-2xl leading-relaxed">
              From business guides to fiction stories – we bring your vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/#pricing" 
                className="px-6 py-3 bg-gradient-to-r from-book-blue-600 to-book-green-500 text-white rounded-lg font-medium button-glow text-center"
              >
                See Our Packages
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 