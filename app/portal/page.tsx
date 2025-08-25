import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to Technologian Student Press
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            How can we help you today?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/pitch" className="w-full">
              <Button className="w-full h-24 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors">
                Submit a Pitch
              </Button>
            </Link>
            <Link href="/request-assistance" className="w-full">
              <Button className="w-full h-24 text-lg font-semibold bg-green-600 hover:bg-green-700 transition-colors">
                Request Assistance
              </Button>
            </Link>
          </div>

          <div className="text-center text-sm text-gray-500 mt-8">
            <p>Choose an option above to get started</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
