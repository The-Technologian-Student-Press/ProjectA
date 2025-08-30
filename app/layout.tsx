import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Providers from "@/components/providers/provider";
import FloatingChatButton from "@/components/FloatingChatButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Technologian Student Press",
  description:
    "Submit your pitches and request assistance from the Technologian Student Press",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <FloatingChatButton />
        </Providers>
      </body>
    </html>
  );
}
