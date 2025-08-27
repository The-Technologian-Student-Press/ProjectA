"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon, HelpCircle } from "lucide-react";

interface SelectOption {
  readonly value: string;
  readonly label: string;
}

interface StandardSelectFieldProps {
  readonly name: string;
  readonly label: string;
  readonly icon?: LucideIcon;
  readonly placeholder?: string;
  readonly description?: string;
  readonly helpText?: string;
  readonly required?: boolean;
  readonly options: readonly SelectOption[];
  readonly className?: string;
  readonly defaultValue?: string;
}

export function StandardSelectField({
  name,
  label,
  icon: Icon,
  placeholder,
  description,
  helpText,
  required = false,
  options,
  className = "",
  defaultValue,
}: StandardSelectFieldProps) {
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
          <Select
            onValueChange={field.onChange}
            defaultValue={defaultValue ?? field.value}
          >
            <FormControl>
              <div className="relative">
                <SelectTrigger
                  className={`${
                    Icon ? "pl-10" : "pl-3"
                  } !h-12 border-2 focus:border-primary transition-colors`}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                {Icon && (
                  <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                )}
              </div>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && (
            <FormDescription className="text-sm text-muted-foreground">
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
