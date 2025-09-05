"use client";
import { motion } from "framer-motion";
import { Lightbulb, PenTool, RefreshCw, CheckCircle } from "lucide-react";
import type { Variants } from "framer-motion";
import config from "../../config.json"
import Link from "next/link";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const timelineVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: "easeOut" }
  }
};

export default function HowItWorksSection() {
  const processSteps = [
    {
      id: 1,
      title: "Share Your Vision",
      description: "Tell us about your e-book idea, target audience, and specific requirements. We'll discuss your goals and create a personalized writing plan.",
      icon: Lightbulb,
      color: "from-book-yellow-500 to-book-blue-500",
      bgColor: "bg-book-yellow-500/10",
      borderColor: "border-book-yellow-500/30"
    },
    {
      id: 2,
      title: "Expert Writing",
      description: "Our professional writers craft your content with careful attention to structure, flow, and your unique voice. Quality is our top priority.",
      icon: PenTool,
      color: "from-book-blue-500 to-book-green-500",
      bgColor: "bg-book-blue-500/10",
      borderColor: "border-book-blue-500/30"
    },
    {
      id: 3,
      title: "Review & Refine",
      description: "Collaborate with us through feedback rounds. We'll revise and polish your content until it perfectly matches your vision.",
      icon: RefreshCw,
      color: "from-book-green-500 to-book-blue-600",
      bgColor: "bg-book-green-500/10",
      borderColor: "border-book-green-500/30"
    },
    {
      id: 4,
      title: "Final Delivery",
      description: "Receive your publication-ready e-book in multiple formats, complete with professional formatting and design elements.",
      icon: CheckCircle,
      color: "from-book-blue-600 to-book-yellow-500",
      bgColor: "bg-book-blue-600/10",
      borderColor: "border-book-blue-600/30"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-book-blue-50 to-white relative overflow-hidden" id="how-it-works">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-book-yellow-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-book-blue-500/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm bg-book-blue-100 text-book-blue-800 backdrop-blur-sm border border-book-blue-200 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-book-blue-500 mr-2 animate-pulse"></span>
            Simple 4-Step Process
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-book-blue-900">
            <span className="block bg-gradient-to-r from-book-blue-600 to-book-green-500 bg-clip-text text-transparent">
              <span className="bg-clip-text text-transparent" style={{
                backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
              }}>How it works</span>
            </span>
          </h2>
          <p className="text-xl text-blue-800 leading-relaxed">
            Our proven process transforms your vision into a professional e-book that engages readers and achieves your goals.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Timeline Line */}
          <motion.div
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-book-blue-500 to-book-green-500 origin-top"
            style={{ height: 'calc(100% - 100px)', top: '50px' }}
          ></motion.div>

          {/* Process Steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-24"
          >
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={step.id}
                  variants={cardVariants}
                  className="relative"
                >
                  {/* Timeline Marker */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-20">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-xl border-4 border-white`}>
                      <span className="text-white font-bold text-lg">{step.id}</span>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}>
                    {/* Text Content */}
                    <div className={`${isEven ? 'lg:pr-16' : 'lg:pl-16 lg:order-2'}`}>
                      <div className={`p-8 rounded-2xl border-2 ${step.borderColor} ${step.bgColor} backdrop-blur-sm relative`}>
                        {/* Connector Line */}
                        <div className={`absolute top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r ${step.color} ${
                          isEven ? '-right-8' : '-left-8'
                        } hidden lg:block`}></div>
                        
                        <div className="flex items-center mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center mr-4`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-book-blue-900">
                            {step.title}
                          </h3>
                        </div>
                        
                        <p className="text-book-blue-700 text-lg leading-relaxed mb-6">
                          {step.description}
                        </p>

                        {/* Step-specific features */}
                        {step.id === 1 && (
                          <div className="flex flex-wrap gap-2">
                            {['Free Consultation', 'Project Planning', 'Timeline Setup'].map((feature) => (
                              <span key={feature} className="px-3 py-1 bg-book-yellow-500/20 text-book-yellow-800 rounded-full text-sm font-medium">
                                {feature}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {step.id === 2 && (
                          <div className="flex flex-wrap gap-2">
                            {['Professional Writers', 'Quality Assurance', 'Progress Updates'].map((feature) => (
                              <span key={feature} className="px-3 py-1 bg-book-blue-500/20 text-book-blue-800 rounded-full text-sm font-medium">
                                {feature}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {step.id === 3 && (
                          <div className="flex flex-wrap gap-2">
                            {['Unlimited Revisions', 'Client Collaboration', 'Content Refinement'].map((feature) => (
                              <span key={feature} className="px-3 py-1 bg-book-green-500/20 text-book-green-800 rounded-full text-sm font-medium">
                                {feature}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {step.id === 4 && (
                          <div className="flex flex-wrap gap-2">
                            {['Multiple Formats', 'Professional Design', 'Publishing Ready'].map((feature) => (
                              <span key={feature} className="px-3 py-1 bg-book-blue-600/20 text-book-blue-800 rounded-full text-sm font-medium">
                                {feature}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Visual Element */}
                    <div className={`${isEven ? 'lg:pl-16' : 'lg:pr-16 lg:order-1'}`}>
                      <div className="relative group">
                        <div className={`absolute -inset-4 bg-gradient-to-r ${step.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                        <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-book-blue-100">
                          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 mx-auto`}>
                            <IconComponent className="w-10 h-10 text-white" />
                          </div>
                          
                          <div className="text-center">
                            <h4 className="text-lg font-bold text-book-blue-900 mb-2">
                              Step {step.id}
                            </h4>
                            <p className="text-book-blue-600 text-sm">
                              {step.title}
                            </p>
                          </div>

                          {/* Progress Indicator */}
                          <div className="mt-6">
                            <div className="w-full bg-book-blue-100 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full bg-gradient-to-r ${step.color} transition-all duration-1000`}
                                style={{ width: `${(step.id / 4) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-book-blue-600 mt-2 text-center">
                              {Math.round((step.id / 4) * 100)}% Complete
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-20"
        >
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-book-blue-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-book-blue-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-book-blue-700 mb-6">
              Choose the perfect package for your e-book project and begin your publishing journey today.
            </p>
            <Link href={"/pricing"}>
            <button className="px-8 py-4 text-white rounded-xl font-semibold text-lg button-glow hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-book-blue-500 focus:ring-offset-2" style={{
                backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
              }}>
              View Our Packages
            </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}