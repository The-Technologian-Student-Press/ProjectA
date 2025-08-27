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
  Building,
} from "lucide-react";
import { StandardFormField } from "../general/standard-form-field";

interface RequesterInfoStepProps {
  readonly onNext: () => void;
}

export function RequesterInfoStep({ onNext }: RequesterInfoStepProps) {
  return (
    <div className="space-y-8">
      {/* Personal Identity Section */}
      <div className="space-y-6">
        {/* Full Name - Solo line */}
        <StandardFormField
          name="fullName"
          label="Full Name"
          icon={User}
          placeholder="Lastname, Firstname Middlename"
          helpText="Enter your name in this format: Lastname, Firstname Middlename (e.g., Dela Cruz, Juan Carlos)"
          required
        />

        {/* ID Number and Course & Year */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <StandardFormField
            name="idNumber"
            label="ID Number"
            icon={Hash}
            placeholder="Enter your ID number"
            helpText="Your student or employee identification number"
            required
          />
          <StandardFormField
            name="courseAndYear"
            label="Course and Year"
            icon={GraduationCap}
            placeholder="e.g., BS Computer Science 3rd Year"
            helpText="Your current course/program and year level"
            required
          />
        </div>

        {/* Email and Phone Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <StandardFormField
            name="personalEmail"
            label="Personal Email"
            icon={Mail}
            type="email"
            placeholder="your.email@example.com"
            description="Please use your personal email, not your institutional email"
            helpText="We'll send updates and coordination details to this email"
            required
          />
          <StandardFormField
            name="phoneNumber"
            label="Phone Number"
            icon={Phone}
            type="tel"
            placeholder="Enter your phone number"
            helpText="Your active mobile number for coordination and follow-ups"
            required
          />
        </div>

        {/* Organization - Solo line */}
        <StandardFormField
          name="organizationName"
          label="Organization or College Name"
          icon={Building}
          placeholder="e.g., College of Engineering, Student Council, CIT Sports Complex"
          helpText="The organization, department, college, or unit you're representing"
          required
        />
      </div>

      <Alert className="border-primary/20 bg-primary/5">
        <AlertCircle className="h-4 w-4 text-primary" />
        <AlertDescription className="text-foreground">
          All fields marked with * are required. Please ensure all information
          is accurate to help us provide the best assistance.
        </AlertDescription>
      </Alert>

      <div className="flex justify-end pt-4">
        <Button
          type="button"
          onClick={onNext}
          className="px-8 py-3 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
        >
          Next Step →
        </Button>
      </div>
    </div>
  );
}
