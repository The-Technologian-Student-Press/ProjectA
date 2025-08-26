"use client";

import * as React from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface DropzoneProps extends DropzoneOptions {
  src?: File[];
  className?: string;
  children?: React.ReactNode;
}

const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
  ({ src, className, children, ...props }, ref) => {
    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragReject,
      isDragAccept,
    } = useDropzone(props);

    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          className
        )}
      >
        <div
          {...getRootProps()}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-6 transition-colors",
            isDragActive && "border-primary bg-primary/5",
            isDragReject && "border-destructive bg-destructive/5",
            isDragAccept && "border-primary bg-primary/5",
            "hover:border-primary/50 cursor-pointer"
          )}
        >
          <input {...getInputProps()} />
          {children || (
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Click to upload</span> or drag and drop
              </div>
              <p className="text-xs text-muted-foreground">
                {props.accept && Object.keys(props.accept).length > 0
                  ? `Accepted file types: ${Object.keys(props.accept)
                      .map((type) => type.replace("*", ""))
                      .join(", ")}`
                  : "All file types accepted"}
              </p>
              {props.maxSize && (
                <p className="text-xs text-muted-foreground">
                  Max file size: {(props.maxSize / (1024 * 1024)).toFixed(1)}MB
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);
Dropzone.displayName = "Dropzone";

const DropzoneContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("mt-4", className)}
      {...props}
    />
  );
});
DropzoneContent.displayName = "DropzoneContent";

const DropzoneEmptyState = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("text-center py-4", className)}
      {...props}
    />
  );
});
DropzoneEmptyState.displayName = "DropzoneEmptyState";

export { Dropzone, DropzoneContent, DropzoneEmptyState };
