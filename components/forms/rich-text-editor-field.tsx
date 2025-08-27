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

interface RichTextEditorFieldProps {
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
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
  description,
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
        <FormItem className="w-full">
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Editor
              editorSerializedState={editorState}
              onSerializedChange={handleEditorChange}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
