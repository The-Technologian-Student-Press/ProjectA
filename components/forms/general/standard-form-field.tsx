"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon, HelpCircle } from "lucide-react";

interface StandardFormFieldProps {
  readonly name: string;
  readonly label: string;
  readonly icon?: LucideIcon;
  readonly type?: "text" | "email" | "tel";
  readonly placeholder?: string;
  readonly description?: string;
  readonly helpText?: string;
  readonly required?: boolean;
  readonly className?: string;
}

export function StandardFormField({
  name,
  label,
  icon: Icon,
  type = "text",
  placeholder,
  description,
  helpText,
  required = false,
  className = "",
}: StandardFormFieldProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`space-y-1 ${className}`}>
          <FormLabel className="text-base font-semibold flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-primary" />}
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
            {helpText && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-3.5 h-3.5 text-muted-foreground hover:text-primary cursor-help transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">{helpText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={type}
                placeholder={placeholder}
                className={`${
                  Icon ? "pl-10" : "pl-3"
                } h-12 border-2 focus:border-primary transition-colors`}
                {...field}
              />
              {Icon && (
                <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              )}
            </div>
          </FormControl>
          {description && (
            <FormDescription
              className={`text-sm text-muted-foreground ${Icon ? "pl-10" : ""}`}
            >
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
