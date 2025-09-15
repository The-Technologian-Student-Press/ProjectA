"use client";

import { useState } from "react";
import { MessageCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "timing",
    question: "What is the ideal time frame to request coverage from the Press?",
    answer: "1-2 weeks prior your event is ideal. Please do include all important details such as date, time, venue, and the assistance you require from our organization."
  },
  {
    id: "equipment",
    question: "Does the request provide cameras for live coverages?",
    answer: "No, the press is not responsible for providing your equipment for live coverages. Please do contact MSDO prior your request in this portal. The Technologian Student Press can only provide manpower to assist your live."
  },
  {
    id: "posting",
    question: "How soon will pitched articles or requested news coverage be posted in our page?",
    answer: "It will typically take 1–3 days to review, edit, and publish pitched articles or requested news coverage on our page, depending on the complexity of the content and our current editorial schedule."
  },
  {
    id: "confirmation",
    question: "When can we confirm that our request is received and approved by the Press?",
    answer: "It is considered accepted when you've received an official confirmation email from our institutional email ttsp@cit.edu or thetechnologianstudentpress@gmail.com within 1-3 days after your request has been submitted."
  },
  {
    id: "fees",
    question: "Are there any fees for coverage requests?",
    answer: "No, the organization's service is voluntary and thus shall not require any monetary amount from its constituents."
  }
];

export default function FAQ() {
  const [selectedFAQ, setSelectedFAQ] = useState<string | null>(null);

  const handleFAQClick = (faqId: string) => {
    setSelectedFAQ(selectedFAQ === faqId ? null : faqId);
  };

  return (
    <div className="space-y-4">
      {/* FAQ Header */}
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <HelpCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-muted-foreground">
          Click on any question below to get started
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {faqData.map((faq) => (
          <div key={faq.id} className="space-y-2">
            <Button
              variant="outline"
              className="w-full p-4 h-auto text-left justify-start hover:bg-accent/50 border-border/50 transition-all duration-200"
              onClick={() => handleFAQClick(faq.id)}
            >
              <MessageCircle className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
              <span className="text-sm font-medium text-foreground">
                {faq.question}
              </span>
            </Button>
            
            {selectedFAQ === faq.id && (
              <div className="ml-7 p-4 bg-accent/30 rounded-lg border-l-4 border-primary animate-in slide-in-from-top-2 duration-200">
                <p className="text-sm text-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}