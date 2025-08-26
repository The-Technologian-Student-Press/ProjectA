"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/dropzone";
import { FileText, X, ExternalLink } from "lucide-react";

interface FileUploadSectionProps {
  fileAttachment: File | undefined;
  setFileAttachment: (file: File | undefined) => void;
  linkUrl: string;
  setLinkUrl: (url: string) => void;
}

export function FileUploadSection({
  fileAttachment,
  setFileAttachment,
  linkUrl,
  setLinkUrl,
}: FileUploadSectionProps) {
  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFileAttachment(acceptedFiles[0]);
    }
  };

  const removeFile = () => {
    setFileAttachment(undefined);
  };

  const removeLink = () => {
    setLinkUrl("");
  };

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <div className="space-y-4">
        <Label className="text-base font-medium">
          File Attachment (Optional)
        </Label>
        <Dropzone
          accept={{
            "application/pdf": [".pdf"],
            "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
            "text/*": [".txt", ".md", ".doc", ".docx"],
          }}
          maxFiles={1}
          maxSize={1024 * 1024 * 10} // 10MB
          minSize={1024} // 1KB
          onDrop={handleDrop}
          onError={(error) => console.error("Dropzone error:", error)}
        >
          <DropzoneEmptyState />
          <DropzoneContent>
            {fileAttachment && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Uploaded File:</Label>
                <Card className="p-3">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">
                          {fileAttachment.name}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {(fileAttachment.size / (1024 * 1024)).toFixed(2)}MB
                        </Badge>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-destructive hover:text-destructive/80 h-6 w-6 p-0 flex items-center justify-center"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DropzoneContent>
        </Dropzone>
      </div>

      {/* Link Section */}
      <div className="space-y-4">
        <Label className="text-base font-medium">
          External Link (Optional)
        </Label>
        <div className="space-y-2">
          <Input
            type="url"
            placeholder="https://example.com/document.pdf"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
          {linkUrl && (
            <Card className="p-3">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4 text-primary" />
                    <a
                      href={linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline truncate max-w-xs"
                    >
                      {linkUrl}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={removeLink}
                    className="text-destructive hover:text-destructive/80 h-6 w-6 p-0 flex items-center justify-center"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Info Alert */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          You can optionally upload a file (PDF, images, text documents) or add
          an external link to provide additional context for your request.
        </p>
      </div>
    </div>
  );
}
