"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditorField } from "./rich-text-editor-field";
import { FileUploadSection } from "./file-upload-section";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface PitchDetailsStepProps {
  onPrevious: () => void;
  onSubmit: () => void;
  files: File[];
  setFiles: (files: File[]) => void;
  links: string[];
  setLinks: (links: string[]) => void;
}

const pitchTypes = [
  "News",
  "Feature",
  "Editorial",
  "Literary",
  "Event Coverage",
  "Content Idea",
];

export function PitchDetailsStep({
  onPrevious,
  onSubmit,
  files,
  setFiles,
  links,
  setLinks,
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

  // Convert links array to single link for FileUploadSection compatibility
  const linkUrl = links.length > 0 ? links[0] : "";
  const setLinkUrl = (url: string) => {
    setLinks(url ? [url] : []);
  };

  return (
    <div className="space-y-0">
      <FormField
        control={form.control}
        name="typeOfPitch"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type of Pitch *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a pitch type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {pitchTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <RichTextEditorField
        name="aboutPitch"
        label="About the Pitch"
        description="Minimum 10 characters required"
        placeholder="Please provide detailed information about your pitch..."
        required={true}
        minLength={10}
      />

      <FormField
        control={form.control}
        name="penName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pen Name *</FormLabel>
            <FormControl>
              <Input placeholder="Enter your pen name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FileUploadSection
        fileAttachment={fileAttachment}
        setFileAttachment={setFileAttachment}
        linkUrl={linkUrl}
        setLinkUrl={setLinkUrl}
      />

      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="min-w-[120px]"
        >
          Previous
        </Button>
        <Button type="button" onClick={handleSubmit} className="min-w-[120px]">
          Submit Pitch
        </Button>
      </div>
    </div>
  );
}
