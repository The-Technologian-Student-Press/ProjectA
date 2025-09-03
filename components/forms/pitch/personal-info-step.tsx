"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  User,
  GraduationCap,
  Hash,
  Phone,
  Mail,
} from "lucide-react";
import { StandardFormField } from "../general/standard-form-field";

interface PersonalInfoStepProps {
  readonly onNext: () => void;
}

export function PersonalInfoStep({ onNext }: PersonalInfoStepProps) {
  const form = useFormContext();

  const handleNext = () => {
    // Trigger validation for all fields in this step
    form
      .trigger([
        "fullName",
        "courseAndYear",
        "citId",
        "phoneNumber",
        "personalEmail",
      ])
      .then((isValid) => {
        if (isValid) {
          onNext();
        }
      });
  };

  return (
    <div className="space-y-8">
      {/* Personal Identity Section */}
      <div className="space-y-6">
        <StandardFormField
          name="fullName"
          label="Full Name"
          icon={User}
          placeholder="Enter your full name"
          helpText="Enter your complete legal name as it appears on official documents"
          required
        />

        <StandardFormField
          name="citId"
          label="CIT ID Number"
          icon={Hash}
          placeholder="XX-XXXX-XXX"
          description="Format: XX-XXXX-XXX (e.g., 22-1437-172)"
          helpText="Your official CIT student identification number"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <StandardFormField
            name="courseAndYear"
            label="Course and Year"
            icon={GraduationCap}
            placeholder="e.g., BS Computer Science 3rd Year"
            helpText="Your current course/program and year level at CIT"
            required
          />
          <StandardFormField
            name="phoneNumber"
            label="Phone Number"
            icon={Phone}
            type="tel"
            placeholder="Enter your phone number"
            helpText="Your active mobile number for contact purposes"
            required
          />
        </div>

        <StandardFormField
          name="personalEmail"
          label="Personal Email"
          icon={Mail}
          type="email"
          placeholder="your.email@example.com"
          description="Please use your personal email, not your CIT email"
          helpText="We'll use this to send you updates about your pitch submission"
          required
        />
      </div>

      <Alert className="border-primary/20 bg-primary/5">
        <AlertCircle className="h-4 w-4 text-primary" />
        <AlertDescription className="text-foreground">
          All fields marked with * are required. Please ensure all information
          is accurate to help us connect with you effectively.
        </AlertDescription>
      </Alert>

      <div className="flex justify-end pt-4">
        <Button
          type="button"
          onClick={handleNext}
          className="px-8 py-3 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
        >
          Next Step →
        </Button>
      </div>
    </div>
  );
}
