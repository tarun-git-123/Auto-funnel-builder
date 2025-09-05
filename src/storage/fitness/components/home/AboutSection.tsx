"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import config from "../../config.json"

export default function AboutSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-4" id="home">

      {/* Main content */}
      <div className="container flex item-center justify-center mx-auto px-4 md:px-6 relative z-10 py-16 md:py-4">

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

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/#pricing"
              className="px-6 py-3 text-white rounded-lg font-medium button-glow text-center" style={{
                backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
              }}
            >
              See Our Packages
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 