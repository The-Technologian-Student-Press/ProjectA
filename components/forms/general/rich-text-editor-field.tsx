"use client";

import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { SerializedEditorState } from "lexical";
import { Editor } from "@/components/blocks/editor-00/editor";
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

interface RichTextEditorFieldProps {
  readonly name: string;
  readonly label: string;
  readonly icon?: LucideIcon;
  readonly description?: string;
  readonly helpText?: string;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly minLength?: number;
}

// Convert rich text editor state to plain text
const editorStateToPlainText = (editorState: SerializedEditorState): string => {
  if (!editorState?.root?.children) return "";

  const extractText = (node: any): string => {
    if (node.type === "text") {
      return node.text || "";
    }

    if (node.children) {
      return node.children.map(extractText).join(" ");
    }

    return "";
  };

  return editorState.root.children.map(extractText).join("\n").trim();
};

// Convert plain text to initial editor state
const plainTextToEditorState = (text: string): SerializedEditorState => {
  if (!text) {
    return {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "",
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    } as unknown as SerializedEditorState;
  }

  return {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: text,
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  } as unknown as SerializedEditorState;
};

export function RichTextEditorField({
  name,
  label,
  icon: Icon,
  description,
  helpText,
  placeholder,
  required = false,
  minLength = 0,
}: Readonly<RichTextEditorFieldProps>) {
  const form = useFormContext();
  const [editorState, setEditorState] = useState<SerializedEditorState>(
    plainTextToEditorState(form.getValues(name) || "")
  );

  // Sync form value with editor state
  useEffect(() => {
    const subscription = form.watch((value, { name: fieldName }) => {
      if (fieldName === name) {
        const plainText = value[name] || "";
        setEditorState(plainTextToEditorState(plainText));
      }
    });
    return () => subscription.unsubscribe();
  }, [form, name]);

  const handleEditorChange = (newEditorState: SerializedEditorState) => {
    setEditorState(newEditorState);
    const plainText = editorStateToPlainText(newEditorState);
    form.setValue(name, plainText, { shouldValidate: true });
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full space-y-1">
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
            <Editor
              editorSerializedState={editorState}
              onSerializedChange={handleEditorChange}
            />
          </FormControl>
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
