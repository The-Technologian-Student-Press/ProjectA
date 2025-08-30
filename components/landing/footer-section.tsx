'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Mail } from "lucide-react"
import Image from "next/image"
import { navigationLinks, footerSections } from "@/lib/navigation"

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/thetechnologian",
    icon: "/img/facebook.svg"
  },
  {
    name: "Instagram",
    href: "https://instagram.com/thetechnologian",
    icon: "/img/instagram.svg"
  }
]

export default function FooterSection() {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src="/img/logo-white-emblem.webp"
                width={48}
                height={48}
                alt="The Technologian Logo"
                className="w-12 h-12"
              />
              <div>
                <h3 className="text-xl font-bold">The Technologian</h3>
                <p className="text-xs text-white/60 uppercase tracking-wider">Ad Astra Per Aspera!</p>
              </div>
            </div>

            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              The official student publication of Cebu Institute of Technology - University
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors duration-200"
                  title={social.name}
                >
                  <Image
                    src={social.icon}
                    width={16}
                    height={16}
                    alt={social.name}
                    className="w-4 h-4 brightness-0 invert"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-6 text-white">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                    >
                      {link.name}
                      <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Actions */}
          <div>
            <h4 className="text-lg font-semibold mb-2 text-white">Get Involved</h4>

            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                <div className="text-white/70 text-sm">
                  <p>CIT-University, N. Bacalso Ave</p>
                  <p>Cebu City, Philippines</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-red-400 shrink-0" />
                <a
                  href="mailto:thetechnologianstudentpress@gmail.com"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                >
                  thetechnologianstudentpress@gmail.com
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full font-medium text-sm text-black bg-white border-gray-300 transition-all duration-300">
                Pitch an Idea
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
              <Button variant="destructive" className="w-full font-medium text-sm bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 transition-all duration-300">
                Request Assistance
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-white/60">
              <p>&copy; {new Date().getFullYear()} The Technologian Student Press. All rights reserved.</p>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <a href="/privacy" className="text-white/60 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="text-white/60 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}