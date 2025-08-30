import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

import FooterSection from "@/components/landing/footer-section";
import Head from 'next/head';
import Script from 'next/script';

import { structuredData } from '@/lib/constants/structured-data';

export default function LandingPage() {
  return (
    <>
      <Head>
        <Script key="structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }} />
      </Head>
      <main className="min-h-screen  relative overflow-hidden" role="main">

        {/* Dotted Grid */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="absolute inset-0 bg-white/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
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
                  <Link href="/pitch" className="flex items-center justify-center w-full">
                    Get Started
                    <Sparkles className="ml-2 w-4 h-4" aria-hidden="true" />
                  </Link>
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
                  <Link href="/request-assistance" className="flex items-center justify-center w-full">
                    Get Started
                    <Send className="ml-2 w-4 h-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </article>
          </nav>
        </section>
      </main>

      <FooterSection />
    </>
  );
}
