import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function RequestAssistancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            Request Assistance
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            This feature is coming soon!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              The request assistance form is currently under development. Please
              check back later or use the pitch submission form for now.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/portal" className="flex-1">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portal
              </Button>
            </Link>
            <Link href="/pitch" className="flex-1">
              <Button className="w-full">Submit a Pitch Instead</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
