"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import config from "../../config.json"

export default function HeroSection() {
    return (
        <section className="relative min-h-screen bg-gradient-to-br from-book-blue-50 via-white to-book-blue-100 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-32 right-[15%] w-96 h-96 bg-book-blue-600/10 rounded-full filter blur-3xl animate-pulse-glow"></div>
                <div className="absolute bottom-32 left-[10%] w-80 h-80 bg-book-yellow-500/20 rounded-full filter blur-3xl animate-float"></div>
                <div className="absolute top-64 left-[40%] w-72 h-72 bg-book-green-500/15 rounded-full filter blur-2xl animate-float-delay"></div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(213,219,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(213,219,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
                {/* Header with badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center rounded-full px-4 py-2 text-sm bg-book-blue-100/80 text-book-blue-800 backdrop-blur-sm border border-book-blue-200 mb-8">
                        <span className="flex h-2 w-2 rounded-full bg-book-blue-500 mr-3 animate-pulse"></span>
                        Professional E-Book Writing Services
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-book-blue-900 mb-8 leading-tight">
                        Craft Your
                        <br />
                        <span className="bg-clip-text text-transparent" style={{
                backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
              }}>Perfect Story</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-blue-800 max-w-3xl mx-auto mb-12 leading-relaxed">
                        Transform your ideas into compelling e-books with our expert writing team.
                        From concept to publication, we bring your vision to life.
                    </p>
                </motion.div>

                {/* Main content area with cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Left card - Services */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-book-blue-200 shadow-elegant hover:shadow-xl transition-all duration-300"
                    >
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{
                backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
              }}>
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-book-blue-900 mb-4">Expert Writing</h3>
                        <p className="text-book-blue-800 mb-6">Professional writers with expertise across all genres and industries.</p>
                        <ul className="space-y-3 text-book-blue-800">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-book-blue-500 rounded-full mr-3"></span>
                                Business & Self-Help
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-book-blue-500 rounded-full mr-3"></span>
                                Fiction & Memoirs
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-book-blue-500 rounded-full mr-3"></span>
                                Technical Guides
                            </li>
                        </ul>
                    </motion.div>

                    {/* Center card - Process */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-gradient-to-br from-book-blue-600 to-book-green-500 rounded-3xl p-8 text-white shadow-elegant hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
                        <p className="mb-6 opacity-90">Quick turnaround without compromising on quality.</p>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span>Research & Outline</span>
                                <span className="text-book-yellow-500 font-bold">2-3 days</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>First Draft</span>
                                <span className="text-book-yellow-500 font-bold">5-7 days</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Final Polish</span>
                                <span className="text-book-yellow-500 font-bold">2-3 days</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right card - Quality */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-book-blue-200 shadow-elegant hover:shadow-xl transition-all duration-300"
                    >
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{
                backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
              }}>
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-book-blue-900 mb-4">Quality Guaranteed</h3>
                        <p className="text-book-blue-800 mb-6">Every project includes comprehensive editing and unlimited revisions.</p>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-book-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    <span className="text-book-blue-600 font-bold text-sm">✓</span>
                                </div>
                                <span className="text-book-blue-800">Professional Editing</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-book-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    <span className="text-book-blue-600 font-bold text-sm">✓</span>
                                </div>
                                <span className="text-book-blue-800">Unlimited Revisions</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-book-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    <span className="text-book-blue-600 font-bold text-sm">✓</span>
                                </div>
                                <span className="text-book-blue-800">100% Satisfaction</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center"
                >
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/pricing"><button className="px-8 py-4 text-white rounded-xl font-semibold text-lg button-glow hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-book-blue-500 focus:ring-offset-2" style={{
                backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
              }}>
                            View Our Packages
                        </button>
                        </Link>
                    </div>

                    <p className="text-book-blue-800 mt-6 text-sm">
                        ✨ Free consultation • 📚 Portfolio available • ⚡ Quick response
                    </p>
                </motion.div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute top-1/4 right-8 hidden lg:block">
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-24 h-32 bg-white/90 rounded-lg shadow-lg border border-book-blue-200 p-4 backdrop-blur-sm"
                >
                    <div className="w-full h-2 bg-book-blue-200 rounded mb-2"></div>
                    <div className="w-3/4 h-2 bg-book-blue-100 rounded mb-2"></div>
                    <div className="w-full h-2 bg-book-blue-100 rounded mb-2"></div>
                    <div className="w-1/2 h-2 bg-book-blue-100 rounded"></div>
                </motion.div>
            </div>

            <div className="absolute bottom-1/4 left-8 hidden lg:block">
                <motion.div
                    animate={{
                        y: [0, 15, 0],
                        rotate: [0, -3, 0]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="w-20 h-28 bg-gradient-to-br from-book-yellow-500 to-book-blue-600 rounded-lg shadow-lg p-3 text-white"
                >
                    <div className="text-xs font-bold mb-1">E-BOOK</div>
                    <div className="w-full h-1 bg-white/40 rounded mb-1"></div>
                    <div className="w-2/3 h-1 bg-white/30 rounded mb-1"></div>
                    <div className="w-full h-1 bg-white/30 rounded"></div>
                </motion.div>
            </div>
        </section>
    );
}