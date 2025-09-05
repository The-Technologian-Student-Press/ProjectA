"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  PenTool,
  Sparkles,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
  const router = useRouter();
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
        toast.success("Pitch submitted successfully!", {
          description: `Submission ID: ${response.submissionId}`,
          duration: 5000,
        });
      }
    },
    onError: (error) => {
      toast.error("Failed to submit pitch", {
        description: error.message || "Please try again later.",
        duration: 5000,
      });
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
        toast.success("Personal information completed", {
          description: "Please fill in your pitch details.",
        });
      } else {
        // Trigger validation errors
        result.error.issues.forEach((issue) => {
          form.setError(issue.path[0] as keyof PitchFormData, {
            type: "manual",
            message: issue.message,
          });
        });
        toast.error("Please complete all required fields", {
          description: "Check the highlighted fields and try again.",
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
    router.push("/");
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-0 bg-gradient-to-br from-card to-card/95 backdrop-blur-sm">
          <CardHeader className="text-center relative overflow-visible pb-8">
            {/* Celebration background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-50" />
            <div className="relative z-10">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-3xl flex items-center justify-center mb-6 shadow-lg animate-bounce">
                <CheckCircle className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Pitch Submitted Successfully!
                </CardTitle>
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                🎉 Thank you for sharing your creative vision! Our editorial
                team will review your pitch and get back to you within{" "}
                <span className="font-semibold text-primary">
                  2-3 business days
                </span>
                .
              </p>
            </div>
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
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <PenTool className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Submit Your Pitch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Share your story ideas with the{" "}
            <span className="font-semibold text-primary">
              Technologian Student Press
            </span>{" "}
            and help shape the narrative of our community
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
          <Card className="w-full max-w-2xl mx-auto border-0 bg-gradient-to-r from-background to-muted/30 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= 1
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-current" />
                  </div>
                  <span
                    className={`text-sm font-medium transition-colors duration-300 ${
                      currentStep >= 1
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                    aria-current={currentStep === 1 ? "step" : undefined}
                  >
                    Personal Information
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= 2
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-sm font-medium transition-colors duration-300 ${
                      currentStep >= 2
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                    aria-current={currentStep === 2 ? "step" : undefined}
                  >
                    Pitch Details & Attachments
                  </span>
                </div>
              </div>
              <div className="relative">
                <Progress
                  value={currentStep * 50}
                  className="h-3 bg-muted/50"
                  aria-label={`Step ${currentStep} of 2`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-full opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form */}
        <Card className="w-full max-w-2xl mx-auto shadow-xl border-0 bg-gradient-to-br from-card to-card/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              {currentStep === 1 ? (
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
              )}
              <CardTitle className="text-2xl font-bold text-center">
                {currentStep === 1
                  ? "Personal Information"
                  : "Pitch Details & Attachments"}
              </CardTitle>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {currentStep === 1
                ? "Tell us a bit about yourself to get started"
                : "Share your creative vision with us"}
            </p>
          </CardHeader>
          <CardContent className="space-y-8 px-8 pb-8">
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
                    isSubmitting={submitMutation.isPending}
                  />
                )}
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Error Display */}
        {submitMutation.isError && (
          <Alert className="mt-6" role="alert" aria-live="polite">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {submitMutation.error?.message ||
                "An error occurred while submitting your pitch. Please try again."}
            </AlertDescription>
          </Alert>
        )}

        {/* Back to Portal Link */}
        <div className="text-center mt-8">
          <Link href="/">
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
