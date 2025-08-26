"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/portal");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center relative z-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Technologian Student Press
          </h1>
          <p className="text-muted-foreground">Redirecting to Portal...</p>
        </div>
        <div className="flex justify-center">
          <div className="relative">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary/40 animate-ping"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
