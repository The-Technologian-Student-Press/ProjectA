"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RichTextEditorField } from "../general/rich-text-editor-field";
import { FileUploadSection } from "../general/file-upload-section";
import { StandardFormField } from "../general/standard-form-field";
import { StandardSelectField } from "../general/standard-select-field";
import { PenTool, FileText } from "lucide-react";

interface PitchDetailsStepProps {
  readonly onPrevious: () => void;
  readonly onSubmit: () => void;
  readonly files: File[];
  readonly setFiles: (files: File[]) => void;
  readonly links: string[];
  readonly setLinks: (links: string[]) => void;
  readonly isSubmitting?: boolean;
}

const pitchTypeOptions = [
  { value: "News", label: "News" },
  { value: "Feature", label: "Feature" },
  { value: "Editorial", label: "Editorial" },
  { value: "Literary", label: "Literary" },
  { value: "Event Coverage", label: "Event Coverage" },
  { value: "Content Idea", label: "Content Idea" },
];

export function PitchDetailsStep({
  onPrevious,
  onSubmit,
  files,
  setFiles,
  links,
  setLinks,
  isSubmitting = false,
}: PitchDetailsStepProps) {
  const form = useFormContext();

  const handleSubmit = () => {
    // Validate pitch details step
    const pitchDetailsData = {
      typeOfPitch: form.getValues("typeOfPitch"),
      aboutPitch: form.getValues("aboutPitch"),
      penName: form.getValues("penName"),
    };

    // Check if required fields are filled
    if (
      pitchDetailsData.typeOfPitch &&
      pitchDetailsData.aboutPitch &&
      pitchDetailsData.aboutPitch.length >= 10 &&
      pitchDetailsData.penName
    ) {
      onSubmit();
    } else {
      // Trigger validation errors
      if (!pitchDetailsData.typeOfPitch) {
        form.setError("typeOfPitch", {
          type: "manual",
          message: "Type of pitch is required",
        });
      }
      if (
        !pitchDetailsData.aboutPitch ||
        pitchDetailsData.aboutPitch.length < 10
      ) {
        form.setError("aboutPitch", {
          type: "manual",
          message:
            "About the pitch is required and must be at least 10 characters",
        });
      }
      if (!pitchDetailsData.penName) {
        form.setError("penName", {
          type: "manual",
          message: "Pen name is required",
        });
      }
    }
  };

  // Convert files array to single file for FileUploadSection compatibility
  const fileAttachment = files.length > 0 ? files[0] : undefined;
  const setFileAttachment = (file: File | undefined) => {
    setFiles(file ? [file] : []);
  };

  // Links are now handled directly as array

  return (
    <div className="space-y-8">
      {/* Pitch Details Section */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <StandardSelectField
            name="typeOfPitch"
            label="Type of Pitch"
            icon={FileText}
            placeholder="Select a pitch type"
            helpText="Choose the category that best fits your story idea or content proposal"
            options={pitchTypeOptions}
            required
          />

          <StandardFormField
            name="penName"
            label="Pen Name"
            icon={PenTool}
            placeholder="Enter your pen name"
            helpText="The byline name you want to appear on your published articles"
            required
          />
        </div>

        <RichTextEditorField
          name="aboutPitch"
          label="About the Pitch"
          icon={FileText}
          description="Minimum 10 characters required. Share your creative vision and story concept."
          helpText="Create engaging content that clearly presents your ideas and creative vision"
          placeholder="Please provide detailed information about your pitch..."
          required={true}
          minLength={10}
        />
      </div>

      <FileUploadSection
        fileAttachment={fileAttachment}
        setFileAttachment={setFileAttachment}
        links={links}
        setLinks={setLinks}
      />

      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="px-8 py-3 h-12 font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
        >
          ← Previous
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          className="px-8 py-3 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
          disabled={isSubmitting}
          aria-describedby={isSubmitting ? "submit-status" : undefined}
        >
          {isSubmitting ? "Submitting..." : "Submit Pitch ✨"}
        </Button>
        {isSubmitting && (
          <div id="submit-status" className="sr-only" aria-live="polite">
            Submitting your pitch, please wait...
          </div>
        )}
      </div>
    </div>
  );
}
