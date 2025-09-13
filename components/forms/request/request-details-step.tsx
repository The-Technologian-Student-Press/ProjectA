"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Calendar as CalendarIconLucide,
  Clock,
  MapPin,
  FileText,
  HelpCircle,
} from "lucide-react";
import { StandardFormField } from "../general/standard-form-field";
import { StandardSelectField } from "../general/standard-select-field";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { requestTypeOptions } from "@/trpc/schemas/request-assistance";
import { FileUploadSection } from "../general/file-upload-section";
import { RichTextEditorField } from "../general/rich-text-editor-field";

interface RequestDetailsStepProps {
  readonly onPrevious: () => void;
  readonly fileAttachment: File | undefined;
  readonly setFileAttachment: (file: File | undefined) => void;
  readonly files?: File[];
  readonly setFiles?: (files: File[]) => void;
  readonly links: string[];
  readonly setLinks: (links: string[]) => void;
  readonly isSubmitting?: boolean;
}

export function RequestDetailsStep({
  onPrevious,
  fileAttachment,
  setFileAttachment,
  files = [],
  setFiles,
  links,
  setLinks,
  isSubmitting = false,
}: RequestDetailsStepProps) {
  const form = useFormContext();

  const timeOptions = [
    { value: "08:00 AM", label: "08:00 AM" },
    { value: "08:30 AM", label: "08:30 AM" },
    { value: "09:00 AM", label: "09:00 AM" },
    { value: "09:30 AM", label: "09:30 AM" },
    { value: "10:00 AM", label: "10:00 AM" },
    { value: "10:30 AM", label: "10:30 AM" },
    { value: "11:00 AM", label: "11:00 AM" },
    { value: "11:30 AM", label: "11:30 AM" },
    { value: "12:00 PM", label: "12:00 PM" },
    { value: "12:30 PM", label: "12:30 PM" },
    { value: "01:00 PM", label: "01:00 PM" },
    { value: "01:30 PM", label: "01:30 PM" },
    { value: "02:00 PM", label: "02:00 PM" },
    { value: "02:30 PM", label: "02:30 PM" },
    { value: "03:00 PM", label: "03:00 PM" },
    { value: "03:30 PM", label: "03:30 PM" },
    { value: "04:00 PM", label: "04:00 PM" },
    { value: "04:30 PM", label: "04:30 PM" },
    { value: "05:00 PM", label: "05:00 PM" },
    { value: "05:30 PM", label: "05:30 PM" },
    { value: "06:00 PM", label: "06:00 PM" },
    { value: "06:30 PM", label: "06:30 PM" },
    { value: "07:00 PM", label: "07:00 PM" },
    { value: "07:30 PM", label: "07:30 PM" },
    { value: "08:00 PM", label: "08:00 PM" },
    { value: "08:30 PM", label: "08:30 PM" },
    { value: "09:00 PM", label: "09:00 PM" },
  ];

  return (
    <div className="space-y-8">
      <StandardSelectField
        name="typeOfRequest"
        label="Type of Request"
        icon={FileText}
        placeholder="Select a request type"
        helpText="Choose the type of assistance you need from the Technologian Student Press"
        options={requestTypeOptions}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <FormField
          control={form.control}
          name="requestDate"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-base font-semibold flex items-center gap-2">
                <CalendarIconLucide className="w-4 h-4 text-primary" />
                Request Date *
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-3.5 h-3.5 text-muted-foreground hover:text-primary cursor-help transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm">
                        Select the date when you need assistance or coverage
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-10 text-left font-normal h-12 border-2 focus:border-primary transition-colors relative",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIconLucide className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <StandardSelectField
          name="requestTime"
          label="Request Time"
          icon={Clock}
          placeholder="Select a time"
          helpText="Choose your preferred time for the assistance or coverage"
          options={timeOptions}
          required
        />
      </div>

      <StandardFormField
        name="location"
        label="Location"
        icon={MapPin}
        placeholder="e.g., Main Campus Auditorium, Room 101"
        description="Please provide the specific location where assistance is needed"
        helpText="Be as specific as possible to help our team find you easily"
        required
      />

      <RichTextEditorField
        name="requestDescription"
        label="Request Description"
        icon={FileText}
        description="Minimum 10 characters. Be as detailed as possible to help us better assist you."
        helpText="Provide comprehensive details about your request to help our team assist you effectively"
        placeholder="Please provide detailed information about your request, including the purpose, expected outcomes, and any specific requirements..."
        required={true}
        minLength={10}
      />

      <FileUploadSection
        fileAttachment={fileAttachment}
        setFileAttachment={setFileAttachment}
        files={files}
        setFiles={setFiles}
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
          type="submit"
          className="px-8 py-3 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
          disabled={isSubmitting}
          aria-describedby={isSubmitting ? "submit-status" : undefined}
        >
          {isSubmitting ? "Submitting..." : "Submit Request 🚀"}
        </Button>
        {isSubmitting && (
          <div id="submit-status" className="sr-only" aria-live="polite">
            Submitting your request, please wait...
          </div>
        )}
      </div>
    </div>
  );
}
