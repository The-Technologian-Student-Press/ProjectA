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
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface PitchDetailsStepProps {
  onPrevious: () => void;
  onNext: () => void;
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
  onNext,
}: PitchDetailsStepProps) {
  const form = useFormContext();

  const handleNext = () => {
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
      onNext();
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

  return (
    <div className="space-y-4">
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

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="px-8 py-2"
        >
          Previous
        </Button>
        <Button type="button" onClick={handleNext} className="px-8 py-2">
          Next
        </Button>
      </div>
    </div>
  );
}
