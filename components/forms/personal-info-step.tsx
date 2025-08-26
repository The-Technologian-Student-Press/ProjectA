"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface PersonalInfoStepProps {
  onNext: () => void;
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
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name *</FormLabel>
            <FormControl>
              <Input placeholder="Enter your full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="courseAndYear"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course and Year *</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., BS Computer Science 3rd Year"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="citId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CIT ID Number *</FormLabel>
            <FormControl>
              <Input placeholder="XX-XXXX-XXX" {...field} />
            </FormControl>
            <FormDescription>
              Format: XX-XXXX-XXX (e.g., 22-1437-172)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number *</FormLabel>
            <FormControl>
              <Input placeholder="Enter your phone number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="personalEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Personal Email *</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="your.email@example.com"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Please use your personal email, not your CIT email
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          All fields marked with * are required. Please ensure all information
          is accurate.
        </AlertDescription>
      </Alert>

      <div className="flex justify-end">
        <Button type="button" onClick={handleNext} className="px-8 py-2">
          Next Step
        </Button>
      </div>
    </div>
  );
}
