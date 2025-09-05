"use client"
import { Lightbulb, PenTool, RefreshCw, CheckCircle } from "lucide-react"
import config from "../../config.json"
export default function HowItWorksSection() {
  const processSteps = [
    {
      id: 1,
      title: "Share Your Vision",
      description:
        "Tell us about your e-book idea, target audience, and specific requirements. We'll discuss your goals and create a personalized writing plan.",
      icon: Lightbulb,
      color: "bg-amber-500",
      features: ["Free Consultation", "Project Planning", "Timeline Setup"],
    },
    {
      id: 2,
      title: "Expert Writing",
      description:
        "Our professional writers craft your content with careful attention to structure, flow, and your unique voice. Quality is our top priority.",
      icon: PenTool,
      color: "bg-blue-500",
      features: ["Professional Writers", "Quality Assurance", "Progress Updates"],
    },
    {
      id: 3,
      title: "Review & Refine",
      description:
        "Collaborate with us through feedback rounds. We'll revise and polish your content until it perfectly matches your vision.",
      icon: RefreshCw,
      color: "bg-emerald-500",
      features: ["Unlimited Revisions", "Client Collaboration", "Content Refinement"],
    },
    {
      id: 4,
      title: "Final Delivery",
      description:
        "Receive your publication-ready e-book in multiple formats, complete with professional formatting and design elements.",
      icon: CheckCircle,
      color: "bg-purple-500",
      features: ["Multiple Formats", "Professional Design", "Publishing Ready"],
    },
  ]

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden" id="how-it-works">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #000 2px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center rounded-full px-6 py-3 text-sm bg-white text-gray-700 border border-gray-200 mb-8 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-3 animate-pulse"></div>
            Simple 4-Step Process
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent" style={{
                backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
              }}>How It Works</h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Our proven process transforms your vision into a professional e-book that engages readers and achieves your
            goals through expert collaboration.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="max-w-4xl mx-auto">
          {processSteps.map((step, index) => {
            const IconComponent = step.icon
            const isEven = index % 2 === 0

            return (
              <div key={step.id} className="relative mb-16 last:mb-0">
                {/* Timeline Line */}
                {index < processSteps.length - 1 && (
                  <div className="absolute left-1/2 top-24 w-0.5 h-16 bg-gradient-to-b from-gray-300 to-gray-200 transform -translate-x-0.5 z-0"></div>
                )}

                {/* Content Container */}
                <div className={`flex items-center ${isEven ? "flex-row" : "flex-row-reverse"} gap-8`}>
                  {/* Content Card */}
                  <div className={`flex-1 ${isEven ? "text-right pr-8" : "text-left pl-8"}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                      <div className={`flex items-center gap-4 mb-6 ${isEven ? "justify-end" : "justify-start"}`}>
                        <div className={`${isEven ? "order-2" : "order-1"}`}>
                          <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                          <div className="text-sm text-gray-500 font-medium">Step {step.id}</div>
                        </div>
                        <div
                          className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${isEven ? "order-1" : "order-2"}`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      <p className="text-gray-600 text-lg leading-relaxed mb-6">{step.description}</p>

                      {/* Features */}
                      <div className={`flex flex-wrap gap-2 ${isEven ? "justify-end" : "justify-start"}`}>
                        {step.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Central Timeline Node */}
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center shadow-lg">
                      <div className={`w-8 h-8 ${step.color} rounded-full flex items-center justify-center`}>
                        <span className="text-white font-bold text-sm">{step.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="flex-1"></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-white p-10 rounded-3xl border border-gray-200 max-w-3xl mx-auto shadow-lg">
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                {processSteps.map((step, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${step.color}`}></div>
                ))}
              </div>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
              Choose the perfect package for your e-book project and begin your publishing journey today with our expert
              team.
            </p>

            <button className="px-10 py-4 text-white rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50" style={{
                backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
              }}>
              View Our Packages
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}