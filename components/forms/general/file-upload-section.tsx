"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/dropzone";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FileText,
  X,
  ExternalLink,
  Plus,
  Paperclip,
  Link,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";

interface FileUploadSectionProps {
  readonly fileAttachment: File | undefined;
  readonly setFileAttachment: (file: File | undefined) => void;
  readonly files?: File[];
  readonly setFiles?: (files: File[]) => void;
  readonly links: string[];
  readonly setLinks: (links: string[]) => void;
}

export function FileUploadSection({
  fileAttachment,
  setFileAttachment,
  files = [],
  setFiles,
  links,
  setLinks,
}: FileUploadSectionProps) {
  const [currentLinkInput, setCurrentLinkInput] = React.useState("");
  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const allowedTypes = [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "image/webp",
        "text/plain",
        "text/markdown",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      // Validate all files
      const validFiles: File[] = [];
      for (const file of acceptedFiles) {
        if (!allowedTypes.includes(file.type)) {
          toast.error(
            `File "${file.name}" type ${file.type} is not allowed. Please upload PDF, images, or text documents only.`
          );
          continue;
        }
        validFiles.push(file);
      }

      if (validFiles.length > 0) {
        if (setFiles) {
          // Multiple files mode
          setFiles([...files, ...validFiles]);
        } else {
          // Single file mode (backward compatibility)
          setFileAttachment(validFiles[0]);
        }
      }
    }
  };

  const removeFile = () => {
    setFileAttachment(undefined);
  };

  const removeFileFromList = (fileToRemove: File) => {
    if (setFiles) {
      setFiles(files.filter((file) => file !== fileToRemove));
    }
  };

  const addLink = () => {
    if (currentLinkInput.trim() && !links.includes(currentLinkInput.trim())) {
      setLinks([...links, currentLinkInput.trim()]);
      setCurrentLinkInput("");
    }
  };

  const removeLink = (linkToRemove: string) => {
    setLinks(links.filter((link) => link !== linkToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addLink();
    }
  };

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <div className="space-y-4">
        <Label className="text-base font-semibold flex items-center gap-2">
          <Paperclip className="w-4 h-4 text-primary" />
          File Attachment (Optional)
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground hover:text-primary cursor-help transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">
                  Upload supporting documents, images, or files related to your
                  submission
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
          <DropzoneEmptyState>
            <div className="flex flex-col items-center justify-center space-y-3 text-center py-8">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                <Plus className="h-10 w-10 text-primary relative z-10" />
              </div>
              <div className="space-y-1">
                <div className="text-base font-semibold text-foreground">
                  <span className="text-primary">Click to upload</span> or drag
                  and drop
                </div>
                <p className="text-sm text-muted-foreground">
                  PDF, images, text documents (max 10MB)
                </p>
              </div>
            </div>
          </DropzoneEmptyState>
          <DropzoneContent>
            {/* Multiple files display */}
            {setFiles && files.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Uploaded Files ({files.length}):
                </Label>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <Card key={`${file.name}-${index}`} className="p-3">
                      <CardContent className="p-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">
                              {file.name}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {(file.size / (1024 * 1024)).toFixed(2)}MB
                            </Badge>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFileFromList(file);
                            }}
                            className="text-destructive hover:text-destructive/80 h-6 w-6 p-0 flex items-center justify-center"
                            aria-label={`Remove file ${file.name}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Single file display (backward compatibility) */}
            {!setFiles && fileAttachment && (
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
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile();
                        }}
                        className="text-destructive hover:text-destructive/80 h-6 w-6 p-0 flex items-center justify-center"
                        aria-label={`Remove file ${fileAttachment.name}`}
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
        <Label className="text-base font-semibold flex items-center gap-2">
          <Link className="w-4 h-4 text-primary" />
          External Link (Optional)
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground hover:text-primary cursor-help transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">
                  Add links to external resources, documents, or references that
                  support your submission
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <div className="space-y-4">
          {/* Add Link Input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type="url"
                placeholder="https://example.com/document.pdf"
                value={currentLinkInput}
                onChange={(e) => setCurrentLinkInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="pl-10 h-12 border-2 focus:border-primary transition-colors"
              />
              <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <button
              type="button"
              onClick={addLink}
              disabled={!currentLinkInput.trim()}
              className="px-4 h-12 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-md font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          {/* Display Added Links */}
          {links.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                Added Links ({links.length})
              </p>
              {links.map((link) => (
                <Card key={link} className="p-3">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <ExternalLink className="h-4 w-4 text-primary flex-shrink-0" />
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-primary hover:underline truncate"
                          title={link}
                        >
                          {link}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeLink(link);
                        }}
                        className="text-destructive hover:text-destructive/80 h-6 w-6 p-0 flex items-center justify-center flex-shrink-0 ml-2"
                        aria-label={`Remove link ${link}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info Alert */}
      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              Supporting Materials
            </p>
            <p className="text-sm text-muted-foreground">
              Enhance your submission by uploading files (PDF, images,
              documents) or adding external links to provide additional context
              and supporting materials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
