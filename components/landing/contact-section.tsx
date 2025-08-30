'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  MapPin,
  Send,
  MessageSquare,
  ExternalLink,
  Navigation
} from "lucide-react"

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us your questions, ideas, or feedback",
    contact: "thetechnologianstudentpress@gmail.com",
    action: "mailto:thetechnologianstudentpress@gmail.com"
  },
  {
    icon: MessageSquare,
    title: "Social Media",
    description: "Follow us for updates and quick responses",
    contact: "@TheTechnologianStudentPress",
    action: "#social"
  }
]

const locationDetails = {
  name: "Cebu Institute of Technology - University",
  address: "7VVJ+QFR, Natalio B. Bacalso Ave, Cebu City, 6000 Cebu",
  coordinates: {
    lat: 10.2937,
    lng: 123.8854
  },
  // Place ID from the Google Maps embed for more accurate directions
  placeId: "ChIJM_K0FQGcmzMR-DRGj5mD1pU"
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    setIsSubmitting(false)

    // Show success message (you can implement toast notification here)
    alert('Message sent successfully! We\'ll get back to you soon.')
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const openInMaps = () => {
    // Use the Google Maps share link for accurate location
    const mapsUrl = 'https://maps.app.goo.gl/gSVm4AMZDk3jR8GP9'
    window.open(mapsUrl, '_blank')
  }

  const getDirections = () => {
    // Use the Google Maps share link for accurate directions
    const directionsUrl = 'https://maps.app.goo.gl/gSVm4AMZDk3jR8GP9'
    window.open(directionsUrl, '_blank')
  }

  return (
    <section className="py-16 bg-dotted-grid-minimal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Have a question, idea, or want to collaborate? We'd love to hear from you.
            Visit us at our campus or reach out digitally.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto mb-24">
         
          <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 shadow-sm">
            {/* Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-black font-semibold text-sm">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="border-gray-300 focus:border-black focus:ring-black h-12"
                  required
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-black font-semibold text-sm">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="border-gray-300 focus:border-black focus:ring-black h-12"
                  required
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-3">
              <Label htmlFor="subject" className="text-black font-semibold text-sm">Subject *</Label>
              <Input
                id="subject"
                type="text"
                placeholder="Brief description of your inquiry"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className="border-gray-300 focus:border-black focus:ring-black h-12"
                required
              />
            </div>

            {/* Message */}
            <div className="space-y-3">
              <Label htmlFor="message" className="text-black font-semibold text-sm">Message *</Label>
              <Textarea
                id="message"
                placeholder="Tell us more about your inquiry, question, or idea..."
                rows={6}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="border-gray-300 focus:border-black focus:ring-black min-h-[120px]"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 h-14 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Contact Information and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Contact Information */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-black mb-8">Contact Information</h3>
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div key={index} className="flex items-start space-x-6 p-6 rounded-2xl border border-gray-200 hover:shadow-md transition-all duration-300">
                  <div className="p-3 bg-gray-100 rounded-xl shrink-0">
                    <method.icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-black mb-2">
                      {method.title}
                    </h4>
                    <p className="text-gray-600 mb-3 leading-relaxed">
                      {method.description}
                    </p>
                    <a
                      href={method.action}
                      className="text-black hover:text-gray-700 font-semibold flex items-center"
                    >
                      {method.contact}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Google Maps */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-black mb-8">Visit Our Campus</h3>

            {/* Map */}
            <div className="mb-8">
              <div className="aspect-video bg-gray-200 relative rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1962.7855879414078!2d123.88070043884056!3d10.296093836475976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99c015a4bf233%3A0x95d783198f4634f8!2sCebu%20Institute%20of%20Technology%20-%20University!5e0!3m2!1sen!2sph!4v1756548569835!5m2!1sen!2sph"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button onClick={openInMaps} className="flex-1 bg-black text-white hover:bg-gray-800 h-12 font-semibold">
                  <MapPin className="mr-2 h-5 w-5" />
                  Open in Maps
                </Button>
                <Button onClick={getDirections} variant="outline" className="flex-1 border-gray-300 hover:bg-gray-50 h-12 font-semibold">
                  <Navigation className="mr-2 h-5 w-5" />
                  Get Directions
                </Button>
              </div>
            </div>

            {/* Campus Address */}
            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl">
              <MapPin className="h-6 w-6 text-gray-700 mt-1 shrink-0" />
              <div>
                <p className="font-bold text-black text-lg mb-1">{locationDetails.name}</p>
                <p className="text-gray-600 leading-relaxed">{locationDetails.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-24">
          <div className="bg-black text-white rounded-2xl p-12 lg:p-16 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Connect?
            </h3>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Whether you want to pitch a story, collaborate on a project, or just say hello,
              we're here to listen and engage with our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button className="bg-white text-black hover:bg-gray-100 h-14 px-8 font-semibold text-lg">
                Pitch an Idea
              </Button>
              <Button className="bg-red-600 text-white hover:bg-red-700 h-14 px-8 font-semibold text-lg">
                Request Assistance
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}