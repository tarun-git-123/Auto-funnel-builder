import config from "../../config.json"

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
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
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
      gradient: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
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
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
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
      gradient: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      features: [
        "Chronological life story structuring",
        "Voice and perspective development",
        "Key life event highlighting",
        "Meaningful reflection and insights",
      ],
    },
  ]

  return (
    <section
      className="py-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden"
      id="services"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block">

            <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">

              <span className="block text-transparent bg-clip-text" style={{
                backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
              }}>
                Our Services
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From business insights to personal narratives, we transform your ideas into compelling e-books
            </p>
          </div>
        </div>

        {/* Timeline Services */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 rounded-full hidden lg:block"></div>

          {services.map((service, index) => (
            <div
              key={index}
              className={`relative mb-16 lg:mb-24 ${index % 2 === 0 ? "lg:pr-1/2 lg:text-right" : "lg:pl-1/2 lg:ml-8"}`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-gray-900 rounded-full z-10 hidden lg:block"></div>

              {/* Service Card */}
              <div className={`group relative ${index % 2 === 0 ? "lg:mr-12" : "lg:ml-4"}`}>
                <div
                  className={`relative p-8 lg:p-10 ${service.bgColor} rounded-3xl border-2 border-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden`}
                >
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                  ></div>

                  {/* Floating Number */}
                  <div
                    className={`absolute -top-4 ${index % 2 === 0 ? "lg:-right-4" : "lg:-left-4"} -right-4 w-12 h-12 bg-gradient-to-br ${service.gradient} text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500`}
                  >
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.gradient} text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    {service.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">{service.description}</p>

                  {/* Features with Custom Bullets */}
                  <div className="space-y-4">
                    {service.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-start gap-4">
                        <div
                          className={`flex-shrink-0 w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mt-3`}
                        ></div>
                        <span className="text-gray-700 leading-relaxed font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Decorative Arrow */}
                  {index < services.length - 1 && (
                    <div
                      className={`absolute -bottom-8 ${index % 2 === 0 ? "lg:left-full lg:ml-4" : "lg:right-full lg:mr-4"} left-1/2 transform lg:transform-none -translate-x-1/2 lg:translate-x-0 hidden lg:block`}
                    >
                      <div
                        className={`w-8 h-8 bg-gradient-to-br ${service.gradient} rounded-lg transform rotate-45 opacity-60`}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-block p-8 bg-white rounded-3xl shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Begin Your Journey?</h3>
            <p className="text-gray-600 mb-6 text-lg">Let's transform your vision into a compelling e-book</p>
            <a
              href="#pricing"
              className="inline-flex items-center gap-3 px-8 py-4 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group text-lg"
              style={{
                backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
              }}>
              Start Your Project
              <svg
                className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
