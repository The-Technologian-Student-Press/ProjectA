import { MapPin, Mail } from "lucide-react"
import Image from "next/image"
import { socialLinks } from "@/lib/constants/social-links"
import Link from "next/link"


export default function FooterSection() {
  return (
    <footer className="bg-black text-white border-t border-white/10" role="contentinfo">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Main Footer Content */}
        <section className="text-center mb-8" aria-labelledby="footer-brand">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-white/20">
              <Image
                src="/img/logo-white-emblem.webp"
                alt="The Technologian - Official Student Publication Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <h2 id="footer-brand" className="text-2xl font-bold mb-2">The Technologian Student Press</h2>
          <p className="text-white/70 text-sm mb-6">
            The official student publication of Cebu Institute of Technology - University
          </p>
        </section>

        {/* Contact Information */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8" aria-labelledby="contact-info">
          <address className="text-center md:text-left not-italic">
            <h3 id="contact-info" className="font-semibold mb-3 text-white">Contact Us</h3>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <a
                  href="mailto:thetechnologianstudentpress@gmail.com"
                  className="hover:text-white transition-colors"
                  aria-label="Email The Technologian Student Press"
                >
                  thetechnologianstudentpress@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>N. Bacalso Ave, Cebu City, 6000, Cebu, Philippines</span>
              </div>
            </div>
          </address>

          <nav className="text-center md:text-right" aria-labelledby="social-links">
            <h3 id="social-links" className="font-semibold mb-3 text-white">Follow Us</h3>
            <div className="flex justify-center md:justify-end space-x-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <Image
                    src={social.icon}
                    width={16}
                    height={16}
                    alt={`${social.name} Icon`}
                    className="w-4 h-4 brightness-0 invert"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </nav>
        </section>

        {/* Bottom Bar */}
        <section className="border-t border-white/10 pt-6" aria-labelledby="legal-info">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-sm text-white/60">
            <p>&copy; {new Date().getFullYear()} The Technologian Student Press. All rights reserved.</p>
            <nav className="flex items-center space-x-4" aria-label="Legal information">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>
        </section>
      </div>
    </footer>
  )
}
