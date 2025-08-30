"use client";

import CommunicationPortal from "@/components/landing/communication-portal";
import FooterSection from "@/components/landing/footer-section";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <CommunicationPortal />
      <FooterSection />
    </div>
  );
}
