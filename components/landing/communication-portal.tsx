'use client'

import { Button } from "@/components/ui/button"
import { Send, Sparkles } from "lucide-react"
import Image from "next/image"

export default function CommunicationPortal() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Technologian Student Press",
    "description": "Official student publication of Cebu Institute of Technology - University",
    "url": "https://thetechnologian.com",
    "foundingDate": "1987",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "N. Bacalso Ave",
      "addressLocality": "Cebu City",
      "postalCode": "6000",
      "addressRegion": "Cebu",
      "addressCountry": "Philippines"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "thetechnologianstudentpress@gmail.com",
      "contactType": "Editorial"
    },
    "sameAs": [
      "https://facebook.com/thetechnologian",
      "https://instagram.com/thetechnologian"
    ]
  };

  return (
    <main className="min-h-screen bg-dotted-grid-subtle relative overflow-hidden" role="main">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#portal-heading"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-red-600 text-white px-4 py-2 rounded-md z-50 focus:z-50"
      >
        Skip to main content
      </a>
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-red-600/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-black/2 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-red-600/2 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Professional Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Header Section */}
      <header className="relative z-10 pt-12 pb-8 px-4" role="banner">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-4 mb-6">
            <div className="w-14 h-14 bg-black/90 backdrop-blur-sm rounded-xl p-2.5 shadow-lg border border-black/20">
              <Image
                src="/img/logo-white-emblem.webp"
                alt="The Technologian - Official Student Publication Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="text-gray-600 text-xs font-semibold tracking-wider" aria-label="Established 1987, Ad Astra Per Aspera - Through hardships to the stars">
              <abbr title="Established">EST.</abbr> 1987 | <span lang="la">AD ASTRA PER ASPERA!</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-2 tracking-tight">
            THE TECHNOLOGIAN
          </h1>

          <p className="text-lg md:text-xl text-gray-600 font-medium mb-8" role="doc-subtitle">
            Student Press Communication Portal
          </p>

          <div className="sr-only">
            <p>Official student publication of Cebu Institute of Technology - University. Established 1987.</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 pb-20" aria-labelledby="portal-heading">
        <div className="text-center mb-12">
          <h2 id="portal-heading" className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
            How can we help you?
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
            Submit a <span className="text-red-400 font-semibold">pitch for consideration</span> or <span className="text-red-400 font-semibold">request assistance</span> from our editorial team.
          </p>
        </div>

        <nav className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12" role="navigation" aria-label="Communication options">
          {/* Pitch an Idea Card */}
          <article className="group relative bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/80 hover:shadow-2xl transition-all duration-500 overflow-hidden shadow-lg" aria-labelledby="pitch-heading">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-red-500/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors duration-300" aria-hidden="true">
                <Sparkles className="w-8 h-8 text-red-500" />
              </div>
              <h3 id="pitch-heading" className="text-2xl font-bold text-black mb-4">Pitch an Idea</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Share your story ideas, campus insights, or investigative leads with our editorial team.
              </p>
              <Button
                className="w-full bg-red-500/90 backdrop-blur-sm hover:bg-red-500 focus:bg-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white text-white py-3 text-base font-semibold rounded-xl h-12 shadow-lg hover:shadow-xl focus:shadow-xl transition-all duration-300 border border-red-500/20"
                aria-describedby="pitch-heading"
                type="button"
              >
                Get Started
                <Sparkles className="ml-2 w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          </article>

          {/* Request Assistance Card */}
          <article className="group relative bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/80 hover:shadow-2xl transition-all duration-500 overflow-hidden shadow-lg" aria-labelledby="assistance-heading">
            <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-black/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black/20 transition-colors duration-300" aria-hidden="true">
                <Send className="w-8 h-8 text-black" />
              </div>
              <h3 id="assistance-heading" className="text-2xl font-bold text-black mb-4">Request Assistance</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Need help with media coverage, interviews, or collaboration opportunities.
              </p>
              <Button
                className="w-full bg-black/90 backdrop-blur-sm hover:bg-black focus:bg-black focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-white text-white py-3 text-base font-semibold rounded-xl h-12 shadow-lg hover:shadow-xl focus:shadow-xl transition-all duration-300 border border-black/20"
                aria-describedby="assistance-heading"
                type="button"
              >
                Get Started
                <Send className="ml-2 w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          </article>
        </nav>
      </section>
    </main>
  )
}