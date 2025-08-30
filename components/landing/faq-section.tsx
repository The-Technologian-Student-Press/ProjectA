'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HelpCircle, Plus, Minus } from "lucide-react"

const faqs = [
    {
        id: 1,
        question: "What is The Technologian Student Press?",
        answer: "The Technologian is the official student publication of Cebu Institute of Technology - University, dedicated to covering technology, innovation, campus life, and student achievements. We serve as the voice of CIT-U students, providing news, insights, and stories that matter to our university community."
    },
    {
        id: 2,
        question: "How can CIT-U students join The Technologian?",
        answer: "CIT-U students can join our team as writers, editors, photographers, or digital content creators. We welcome students from all programs who are passionate about journalism, technology, and storytelling. Contact us through our campus office or use the 'Pitch an Idea' button to get started."
    },
    {
        id: 3,
        question: "What kind of stories does The Technologian cover?",
        answer: "We cover campus news, student achievements, technology trends, academic programs at CIT-U, faculty spotlights, student organizations, research projects, and events happening within our university community. We also feature tech tutorials, career guidance, and industry insights relevant to our students."
    },
    {
        id: 4,
        question: "How often does The Technologian publish content?",
        answer: "We publish content regularly throughout the academic year, including weekly articles, event coverage, and special features. Our digital platform allows us to share timely news and updates as they happen on campus and in the tech industry."
    },
    {
        id: 5,
        question: "Can non-CIT-U students contribute to The Technologian?",
        answer: "While we primarily focus on our CIT-U community, we welcome guest contributions from other universities, alumni, and industry professionals who can provide valuable insights to our student readers. Use our 'Request Assistance' feature to discuss collaboration opportunities."
    },
    {
        id: 6,
        question: "Where can I find The Technologian on campus?",
        answer: "You can find us at our office within the CIT-U campus on Natalio B. Bacalso Avenue. We're also active on social media and our digital platforms. Follow us @TheTechnologianStudentPress for the latest updates and announcements."
    },
    {
        id: 7,
        question: "Does The Technologian offer scholarships or awards?",
        answer: "We recognize outstanding student journalists and contributors through various awards and recognition programs. We also provide opportunities for students to build their portfolios, gain journalism experience, and develop professional skills that can benefit their academic and career goals."
    },
    {
        id: 8,
        question: "How can I submit a story idea or news tip?",
        answer: "You can submit story ideas, news tips, or press releases through our contact form, email us directly, or use the 'Pitch an Idea' button in our header. We encourage the CIT-U community to share newsworthy events, achievements, and stories that would interest our readers."
    }
]

export default function FAQSection() {
    const [openItems, setOpenItems] = useState<number[]>([])

    const toggleItem = (id: number) => {
        setOpenItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        )
    }

    return (
        <section className="py-16 bg-white relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
            </div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Everything you need to know about The Technologian Student Press, our mission, and how to get involved
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <div 
                            key={faq.id} 
                            className="group border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-100 hover:border-red-200"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <button
                                className="w-full px-8 py-6 text-left transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                                onClick={() => toggleItem(faq.id)}
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-8 leading-relaxed">
                                        {faq.question}
                                    </h3>
                                    <div className="flex-shrink-0">
                                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                            openItems.includes(faq.id) 
                                                ? 'bg-red-600 border-red-600 rotate-180' 
                                                : 'border-gray-300 group-hover:border-red-300'
                                        }`}>
                                            {openItems.includes(faq.id) ? (
                                                <Minus className="h-4 w-4 text-white" />
                                            ) : (
                                                <Plus className="h-4 w-4 text-gray-600 group-hover:text-red-600" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </button>
                            
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                openItems.includes(faq.id) 
                                    ? 'max-h-96 opacity-100' 
                                    : 'max-h-0 opacity-0'
                            }`}>
                                <div className="px-8 pb-6">
                                    <div className="pt-2 border-t border-red-100">
                                        <p className="text-gray-600 leading-relaxed text-lg mt-4">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}