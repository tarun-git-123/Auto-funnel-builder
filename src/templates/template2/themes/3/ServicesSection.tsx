"use client"

import { motion } from "framer-motion"
import config from "../../config.json";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7 },
  },
}

export default function ServicesSection() {
  const services = [
    {
      title: "Business & Professional E-Books",
      description: "Transform your expertise into comprehensive guides, business manuals, and industry reports.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      bgGradient: "from-blue-50 via-slate-50 to-blue-50",
      accentColor: "bg-blue-600",
      features: [
        "Market research & industry analysis",
        "Professional business tone",
        "Actionable insights and strategies",
        "Expert terminology and references",
      ],
    },
    {
      title: "Educational & How-To Guides",
      description: "Create clear, informative guides that teach valuable skills and share knowledge effectively.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      bgGradient: "from-emerald-50 via-teal-50 to-emerald-50",
      accentColor: "bg-emerald-600",
      features: [
        "Step-by-step instruction formats",
        "Clear explanations of complex concepts",
        "Helpful illustrations planning",
        "Progressive learning structure",
      ],
    },
    {
      title: "Fiction & Creative Writing",
      description: "Bring your story ideas to life with engaging narratives, compelling characters, and rich worlds.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      bgGradient: "from-purple-50 via-pink-50 to-purple-50",
      accentColor: "bg-purple-600",
      features: [
        "Engaging plot & character development",
        "Genre-appropriate writing style",
        "Dialogue and scene construction",
        "Story arc and pacing refinement",
      ],
    },
    {
      title: "Personal Memoirs & Biographies",
      description: "Document life stories and experiences with sensitivity, authenticity, and compelling narrative.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      bgGradient: "from-orange-50 via-red-50 to-orange-50",
      accentColor: "bg-orange-600",
      features: [
        "Chronological life story structuring",
        "Voice and perspective development",
        "Key life event highlighting",
        "Meaningful reflection and insights",
      ],
    },
  ]

  return (
    <section className="py-10 bg-gray-50 relative overflow-hidden" id="services">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6  bg-clip-text text-transparent" style={{
              backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
            }}>
              Our Services
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed">
              We specialize in crafting exceptional e-books across diverse genres, each tailored to your unique vision
              and objectives.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <div
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${service.bgGradient} p-8 md:p-12 hover:scale-[1.02] transition-all duration-500 border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div
                    className={`w-full h-full ${service.accentColor} transform rotate-45 translate-x-16 -translate-y-16`}
                  ></div>
                </div>
                <div className="absolute bottom-0 left-0 w-24 h-24 opacity-5">
                  <div
                    className={`w-full h-full ${service.accentColor} rounded-full transform -translate-x-12 translate-y-12`}
                  ></div>
                </div>

                <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
                  {/* Icon and Title */}
                  <div className="md:col-span-1">
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${service.accentColor} text-white mb-6 group-hover:rotate-12 transition-transform duration-500`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-1">
                    <p className="text-gray-700 text-lg leading-relaxed">{service.description}</p>
                  </div>

                  {/* Features */}
                  <div className="md:col-span-1">
                    <div className="space-y-3">
                      {service.features.map((feature, fidx) => (
                        <div key={fidx} className="flex items-start gap-3">
                          <div
                            className={`flex-shrink-0 w-6 h-6 rounded-full ${service.accentColor} flex items-center justify-center mt-0.5`}
                          >
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-800 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#pricing"
            className="inline-flex items-center gap-3 px-10 py-5 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group text-lg bg-clip-text"
            style={{
              backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
            }}>
            <span>View Our Pricing Packages</span>
            <svg
              className="w-6 h-6 group-hover:translate-x-2 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}