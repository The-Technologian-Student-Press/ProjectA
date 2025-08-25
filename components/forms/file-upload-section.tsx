"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Link as LinkIcon, FileText } from "lucide-react";

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
  const [uploadMethod, setUploadMethod] = useState<"file" | "link" | "both">(
    "file"
  );
  const form = useFormContext();

  // Set initial upload method based on development mode
  React.useEffect(() => {
    if (process.env.NODE_ENV === "development" && linkUrl) {
      setUploadMethod("both");
    }
  }, [linkUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFileAttachment(file);
      form.setValue("fileAttachment", file);
    }
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setLinkUrl(url);
    form.setValue("linkUrl", url);
  };

  const removeFile = () => {
    setFileAttachment(undefined);
    form.setValue("fileAttachment", undefined);
  };

  return (
    <div className="space-y-3">
      <Label>File Attachment or Link</Label>

      <div className="flex space-x-2">
        <Button
          type="button"
          variant={uploadMethod === "file" ? "default" : "outline"}
          onClick={() => setUploadMethod("file")}
          className="flex items-center space-x-2"
        >
          <Upload className="h-4 w-4" />
          <span>File</span>
        </Button>
        <Button
          type="button"
          variant={uploadMethod === "link" ? "default" : "outline"}
          onClick={() => setUploadMethod("link")}
          className="flex items-center space-x-2"
        >
          <LinkIcon className="h-4 w-4" />
          <span>Link</span>
        </Button>
        <Button
          type="button"
          variant={uploadMethod === "both" ? "default" : "outline"}
          onClick={() => setUploadMethod("both")}
          className="flex items-center space-x-2"
        >
          <FileText className="h-4 w-4" />
          <span>Both</span>
        </Button>
      </div>

      {(uploadMethod === "file" || uploadMethod === "both") && (
        <div className="space-y-2">
          <Input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          {fileAttachment && (
            <div className="flex items-center space-x-2 p-2 bg-primary/10 border border-primary/20 rounded">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground">
                {fileAttachment.name}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="text-destructive hover:text-destructive/80"
              >
                Remove
              </Button>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Only PDF files are accepted
          </p>
        </div>
      )}

      {(uploadMethod === "link" || uploadMethod === "both") && (
        <div className="space-y-2">
          <Input
            type="url"
            placeholder="https://example.com/document.pdf"
            value={linkUrl}
            onChange={handleLinkChange}
          />
          <p className="text-xs text-muted-foreground">
            Provide a direct link to your document
          </p>
        </div>
      )}
    </div>
  );
}
