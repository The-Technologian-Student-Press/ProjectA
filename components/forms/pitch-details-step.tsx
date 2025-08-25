"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { FileUploadSection } from "./file-upload-section";

interface PitchDetailsStepProps {
  onPrevious: () => void;
  fileAttachment: File | undefined;
  setFileAttachment: (file: File | undefined) => void;
  linkUrl: string;
  setLinkUrl: (url: string) => void;
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
  fileAttachment,
  setFileAttachment,
  linkUrl,
  setLinkUrl,
}: PitchDetailsStepProps) {
  const form = useFormContext();

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

      <FormField
        control={form.control}
        name="aboutPitch"
        render={({ field }) => (
          <FormItem>
            <FormLabel>About the Pitch *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Please provide detailed information about your pitch..."
                rows={6}
                {...field}
              />
            </FormControl>
            <FormDescription>Minimum 10 characters required</FormDescription>
            <FormMessage />
          </FormItem>
        )}
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

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please provide either a file attachment, a link, or both. All other
          fields marked with * are required.
        </AlertDescription>
      </Alert>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="px-8 py-2"
        >
          Previous
        </Button>
        <Button type="submit" className="px-8 py-2">
          Submit Pitch
        </Button>
      </div>
    </div>
  );
}
