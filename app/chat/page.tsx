"use client";

import Link from "next/link";
import { ArrowLeft, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header Section */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-accent"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-sm">
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Chat
                </h1>
                <p className="text-sm text-muted-foreground">
                  Connect with Technologian Student Press
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2" style={{ minHeight: 0 }}>
            {/* Empty state - no messages yet */}
          </div>

          {/* Input Section */}
          <div className="border-t bg-background pt-4 mt-4">
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <Input
                  placeholder="Type your message..."
                  className="min-h-[44px] resize-none border-input/50 focus:border-primary/50 focus-visible:ring-primary/20"
                />
              </div>
              <Button 
                size="icon"
                className="min-h-[44px] min-w-[44px] bg-primary hover:bg-primary/90 shadow-sm hover:shadow-md transition-all duration-200"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Press Enter to send
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}