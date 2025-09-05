"use client"
import { motion } from "framer-motion"
import { Lightbulb, PenTool, RefreshCw, CheckCircle } from "lucide-react"
import type { Variants } from "framer-motion"
import config from "../../config.json";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function HowItWorksSection() {
  const processSteps = [
    {
      id: 1,
      title: "Share Your Vision",
      description:
        "Tell us about your e-book idea, target audience, and specific requirements. We'll discuss your goals and create a personalized writing plan.",
      icon: Lightbulb,
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      features: ["Free Consultation", "Project Planning", "Timeline Setup"],
    },
    {
      id: 2,
      title: "Expert Writing",
      description:
        "Our professional writers craft your content with careful attention to structure, flow, and your unique voice. Quality is our top priority.",
      icon: PenTool,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      features: ["Professional Writers", "Quality Assurance", "Progress Updates"],
    },
    {
      id: 3,
      title: "Review & Refine",
      description:
        "Collaborate with us through feedback rounds. We'll revise and polish your content until it perfectly matches your vision.",
      icon: RefreshCw,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      features: ["Unlimited Revisions", "Client Collaboration", "Content Refinement"],
    },
    {
      id: 4,
      title: "Final Delivery",
      description:
        "Receive your publication-ready e-book in multiple formats, complete with professional formatting and design elements.",
      icon: CheckCircle,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      features: ["Multiple Formats", "Professional Design", "Publishing Ready"],
    },
  ]

  return (
    <section className="py-10 bg-gradient-to-br from-slate-50 to-gray-100 relative overflow-hidden" id="how-it-works">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-200/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200/20 rounded-full filter blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center rounded-full px-6 py-3 text-sm bg-white/80 text-slate-700 backdrop-blur-sm border border-slate-200 mb-8 shadow-lg">
            <div className="flex space-x-1 mr-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce delay-200"></div>
            </div>
            Simple 4-Step Process
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-slate-800">
            <span className="block bg-clip-text text-transparent" style={{
              backgroundImage: `linear-gradient(to right, ${config.secondaryColor}, ${config.primaryColor})`,
            }}>
              How It Works
            </span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Our proven process transforms your vision into a professional e-book that engages readers and achieves your
            goals through expert collaboration.
          </p>
        </motion.div>

        {/* Process Steps - Horizontal Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {processSteps.map((step, index) => {
            const IconComponent = step.icon

            return (
              <motion.div key={step.id} variants={cardVariants} className="group relative">
                {/* Connection Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-300 to-slate-400 z-10"></div>
                )}

                {/* Main Card */}
                <div
                  className={`relative p-8 rounded-3xl border-2 ${step.borderColor} ${step.bgColor} backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl h-full`}
                >
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white border-4 border-slate-200 flex items-center justify-center shadow-lg">
                    <span className="text-slate-700 font-bold text-lg">{step.id}</span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{step.title}</h3>

                  <p className="text-slate-600 text-base leading-relaxed mb-6">{step.description}</p>

                  {/* Features */}
                  <div className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <div key={feature} className="flex items-center text-sm">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color} mr-3 flex-shrink-0`}></div>
                        <span className="text-slate-600 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-slate-500">Progress</span>
                      <span className="text-xs font-bold text-slate-700">{Math.round((step.id / 4) * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${step.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${(step.id / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl border border-slate-200 max-w-3xl mx-auto shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full bg-gradient-to-r ${processSteps[i].color}`}></div>
                ))}
              </div>
            </div>

            <h3 className="text-3xl font-bold text-slate-800 mb-4">Ready to Get Started?</h3>
            <p className="text-slate-600 mb-8 text-lg max-w-2xl mx-auto">
              Choose the perfect package for your e-book project and begin your publishing journey today with our expert
              team.
            </p>

            <button className="px-10 py-4 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform hover:-translate-y-1" style={{
              backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
            }}>
              View Our Packages
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}