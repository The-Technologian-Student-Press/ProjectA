"use client";

import HeaderNav from "@/components/header-nav";
import ArticlesSection from "@/components/landing/articles-section";
import AboutSection from "@/components/landing/about-section";
import FAQSection from "@/components/landing/faq-section";
import ContactSection from "@/components/landing/contact-section";
import FooterSection from "@/components/landing/footer-section";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeaderNav />
      <main>
        <ArticlesSection />
        <AboutSection />
        <FAQSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}
