"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { trpc } from "@/trpc/client";
import { Form } from "@/components/ui/form";
import { PersonalInfoStep } from "./personal-info-step";
import { PitchDetailsStep } from "./pitch-details-step";
import { Button } from "@/components/ui/button";
import {
  getDefaultFormValues,
  getDevelopmentIndicator,
} from "@/lib/debug-utils";
import { pitchFormSchema, personalInfoSchema } from "@/trpc/schemas/pitch";

type PitchFormData = z.infer<typeof pitchFormSchema>;

export function PitchForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [links, setLinks] = useState<string[]>([]);

  const form = useForm<PitchFormData>({
    resolver: zodResolver(pitchFormSchema),
    defaultValues: getDefaultFormValues(),
    mode: "onChange",
  });

  const submitMutation = trpc.pitch.submit.useMutation({
    onSuccess: (response) => {
      if (response.success) {
        setIsSubmitted(true);
        setSubmissionId(response.submissionId || "");
      }
    },
  });

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate personal info step
      const personalInfoData = {
        fullName: form.getValues("fullName"),
        courseAndYear: form.getValues("courseAndYear"),
        citId: form.getValues("citId"),
        phoneNumber: form.getValues("phoneNumber"),
        personalEmail: form.getValues("personalEmail"),
      };

      const result = personalInfoSchema.safeParse(personalInfoData);
      if (result.success) {
        setCurrentStep(2);
      } else {
        // Trigger validation errors
        result.error.issues.forEach((issue) => {
          form.setError(issue.path[0] as keyof PitchFormData, {
            type: "manual",
            message: issue.message,
          });
        });
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: PitchFormData) => {
    const submitData = {
      ...data,
      files,
      links,
    };
    submitMutation.mutate(submitData);
  };

  const handleBackToPortal = () => {
    window.location.href = "/portal";
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold text-foreground mb-2">
              Pitch Submitted Successfully!
            </CardTitle>
            <p className="text-lg text-muted-foreground">
              Thank you for your submission. We'll review your pitch and get
              back to you soon.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {submissionId && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Submission ID:</strong> {submissionId}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleBackToPortal}
                className="flex-1"
                variant="outline"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portal
              </Button>
              <Link href="/pitch" className="flex-1">
                <Button className="w-full">Submit Another Pitch</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Submit Your Pitch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your story ideas with the Technologian Student Press
          </p>
          {(() => {
            const indicator = getDevelopmentIndicator();
            if (!indicator) return null;
            return (
              <div className={`${indicator.className} mt-6`}>
                <p className={indicator.textClassName}>{indicator.message}</p>
              </div>
            );
          })()}
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <Card className="w-full max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`text-sm font-medium ${
                    currentStep >= 1 ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Personal Information
                </span>
                <span
                  className={`text-sm font-medium ${
                    currentStep >= 2 ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Pitch Details & Attachments
                </span>
              </div>
              <Progress value={currentStep * 50} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Form */}
        <Card className="w-full max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {currentStep === 1
                ? "Personal Information"
                : "Pitch Details & Attachments"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {currentStep === 1 && (
                  <PersonalInfoStep onNext={handleNextStep} />
                )}

                {currentStep === 2 && (
                  <PitchDetailsStep
                    onPrevious={handlePreviousStep}
                    onSubmit={form.handleSubmit(onSubmit)}
                    files={files}
                    setFiles={setFiles}
                    links={links}
                    setLinks={setLinks}
                  />
                )}
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Error Display */}
        {submitMutation.isError && (
          <Alert className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {submitMutation.error?.message ||
                "An error occurred while submitting your pitch. Please try again."}
            </AlertDescription>
          </Alert>
        )}

        {/* Back to Portal Link */}
        <div className="text-center mt-8">
          <Link href="/portal">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
