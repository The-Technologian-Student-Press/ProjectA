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
import { Form } from "@/components/ui/form";
import { RequesterInfoStep } from "./requester-info-step";
import { RequestDetailsStep } from "./request-details-step";
import { Button } from "@/components/ui/button";
import {
  getDefaultRequestAssistanceValues,
  getDevelopmentIndicator,
} from "@/lib/debug-utils";
import { trpc } from "@/trpc/client";
import {
  requestAssistanceFormSchema,
  requesterInfoSchema,
} from "@/trpc/schemas/request-assistance";

type RequestAssistanceFormData = z.infer<typeof requestAssistanceFormSchema>;

export function RequestAssistanceForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string>("");
  const [fileAttachment, setFileAttachment] = useState<File | undefined>();
  const [linkUrl, setLinkUrl] = useState(
    getDefaultRequestAssistanceValues().linkUrl || ""
  );

  const form = useForm<RequestAssistanceFormData>({
    resolver: zodResolver(requestAssistanceFormSchema),
    defaultValues: getDefaultRequestAssistanceValues(),
    mode: "onChange",
  });

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate requester info step
      const requesterInfoData = {
        fullName: form.getValues("fullName"),
        courseAndYear: form.getValues("courseAndYear"),
        idNumber: form.getValues("idNumber"),
        phoneNumber: form.getValues("phoneNumber"),
        personalEmail: form.getValues("personalEmail"),
        organizationName: form.getValues("organizationName"),
      };

      const result = requesterInfoSchema.safeParse(requesterInfoData);
      if (result.success) {
        setCurrentStep(2);
      } else {
        // Trigger validation errors
        result.error.issues.forEach((issue) => {
          form.setError(issue.path[0] as keyof RequestAssistanceFormData, {
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

  const submitMutation = trpc.requestAssistance.submit.useMutation({
    onSuccess: (response) => {
      if (response.success) {
        setIsSubmitted(true);
        setSubmissionId(response.submissionId || "");
      }
    },
  });

  const onSubmit = (data: RequestAssistanceFormData) => {
    const submitData = {
      ...data,
      linkUrl,
    };

    // Log file attachment info separately since File objects can't be serialized
    if (fileAttachment) {
      console.log("File attachment info:", {
        name: fileAttachment.name,
        size: fileAttachment.size,
        type: fileAttachment.type,
      });
    }

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
              Request Submitted Successfully!
            </CardTitle>
            <p className="text-lg text-muted-foreground">
              Thank you for your request. We'll review it and get back to you
              soon.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {submissionId && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Request ID:</strong> {submissionId}
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
              <Link href="/request-assistance" className="flex-1">
                <Button className="w-full">Submit Another Request</Button>
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
            Request Assistance
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Request media coverage or technical assistance from the Technologian
            Student Press
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
                  Requester Information
                </span>
                <span
                  className={`text-sm font-medium ${
                    currentStep >= 2 ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Request Details
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
              {currentStep === 1 ? "Requester Information" : "Request Details"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {currentStep === 1 && (
                  <RequesterInfoStep onNext={handleNextStep} />
                )}

                {currentStep === 2 && (
                  <RequestDetailsStep
                    onPrevious={handlePreviousStep}
                    fileAttachment={fileAttachment}
                    setFileAttachment={setFileAttachment}
                    linkUrl={linkUrl}
                    setLinkUrl={setLinkUrl}
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
                "An error occurred while submitting your request. Please try again."}
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
