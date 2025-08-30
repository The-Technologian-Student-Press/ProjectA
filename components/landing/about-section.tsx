'use client'

import { BookOpen, Newspaper, Camera, Code } from "lucide-react"

const teamRoles = [
  {
    icon: Newspaper,
    title: "Editorial Team",
    description: "Student editors and writers from various CIT-U programs who craft compelling stories and ensure editorial excellence.",
    skills: ["Content Writing", "Editorial Review", "Story Development"]
  },
  {
    icon: Camera,
    title: "Media & Design",
    description: "Creative students who handle photography, graphic design, and multimedia content for our digital and print publications.",
    skills: ["Photography", "Graphic Design", "Video Production"]
  },
  {
    icon: Code,
    title: "Digital Team",
    description: "Tech-savvy students who manage our website, social media presence, and digital distribution platforms.",
    skills: ["Web Development", "Social Media", "Digital Marketing"]
  },
  {
    icon: BookOpen,
    title: "Research & Analysis",
    description: "Students who conduct in-depth research, fact-checking, and analysis for our investigative and feature stories.",
    skills: ["Research", "Data Analysis", "Fact-Checking"]
  }
]



const stats = [
  { number: "37", label: "Years of Excellence", sublabel: "Since 1987" },
  { number: "15K+", label: "Students Served", sublabel: "CIT-U Community" },
  { number: "100+", label: "Contributors", sublabel: "Student Writers & Staff" }
]

export default function AboutSection() {
  return (
    <section className="py-16 bg-dotted-grid-subtle relative overflow-hidden">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            About The Technologian
          </h2>
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Ad Astra Per Aspera
            </p>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
            The official student publication of Cebu Institute of Technology - University,
            dedicated to excellence in journalism and serving our campus community with integrity and wisdom.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span className="text-gray-700 font-medium">Established 1987</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span className="text-gray-700 font-medium">CIT-U Official Publication</span>
            </div>
          </div>
        </div>

        {/* Mission & Vision - Clean Professional Layout */}
        <div className="relative mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Mission Side */}
            <div className="relative bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-6">
                <div className="w-4 h-16 bg-red-600 rounded-full mb-4"></div>
                <h3 className="text-3xl font-bold text-black">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                To serve as the authentic voice of Teknoys by delivering accurate, engaging, and impactful journalism
                that informs our campus community, celebrates student achievements, and fosters meaningful dialogue
                about issues that matter to our university family.
              </p>
            </div>

            {/* Vision Side */}
            <div className="relative bg-black rounded-2xl p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-6">
                <div className="w-4 h-16 bg-white rounded-full mb-4"></div>
                <h3 className="text-3xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                To be the premier student publication in Cebu, recognized for our unwavering commitment to
                journalistic excellence and integrity. We aspire to shape informed, engaged Teknoys who
                embody wisdom and integrity in all their endeavors, carrying forward CIT-U's legacy of excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Stats - Professional Layout */}
        <div className="mb-24">
          <div className="border-t border-b border-gray-200 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center relative">
                  {index < stats.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 w-px h-16 bg-gray-200 transform -translate-y-1/2"></div>
                  )}
                  <div className="mb-4">
                    <div className="text-4xl md:text-5xl font-bold text-black mb-2">
                      {stat.number}
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {stat.sublabel}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>



        {/* Team Roles - Professional Grid Layout */}
        <div>
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Join Our Team
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Be part of CIT-U's premier student publication and help shape the future of campus journalism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamRoles.map((role, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start space-x-6">
                  <div className="shrink-0">
                    <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
                      <role.icon className="h-8 w-8 text-neutral-700 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-black mb-3">{role.title}</h4>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {role.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 group-hover:bg-red-50 group-hover:text-red-700 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  )
}