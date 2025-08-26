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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { requestTypeOptions } from "@/trpc/schemas/request-assistance";
import { FileUploadSection } from "./file-upload-section";
import { RichTextEditorField } from "./rich-text-editor-field";

interface RequestDetailsStepProps {
  onPrevious: () => void;
  fileAttachment: File | undefined;
  setFileAttachment: (file: File | undefined) => void;
  linkUrl: string;
  setLinkUrl: (url: string) => void;
}

export function RequestDetailsStep({
  onPrevious,
  fileAttachment,
  setFileAttachment,
  linkUrl,
  setLinkUrl,
}: RequestDetailsStepProps) {
  const form = useFormContext();

  const timeOptions = [
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:30 PM",
    "09:00 PM",
  ];

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="typeOfRequest"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type of Request *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a request type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {requestTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="requestDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Request Date *</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requestTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Request Time *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location *</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., Main Campus Auditorium, Room 101"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Please provide the specific location where assistance is needed
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <RichTextEditorField
        name="requestDescription"
        label="Request Description"
        description="Minimum 10 characters. Be as detailed as possible to help us better assist you."
        placeholder="Please provide detailed information about your request, including the purpose, expected outcomes, and any specific requirements..."
        required={true}
        minLength={10}
      />

      <FileUploadSection
        fileAttachment={fileAttachment}
        setFileAttachment={setFileAttachment}
        linkUrl={linkUrl}
        setLinkUrl={setLinkUrl}
      />

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous Step
        </Button>
        <Button type="submit" className="px-8 py-2">
          Submit Request
        </Button>
      </div>
    </div>
  );
}
