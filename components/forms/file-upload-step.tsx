"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dropzone, 
  DropzoneContent, 
  DropzoneEmptyState 
} from "@/components/ui/dropzone";
import { 
  Upload, 
  Link as LinkIcon, 
  FileText, 
  X, 
  Plus,
  ExternalLink 
} from "lucide-react";

interface FileUploadStepProps {
  onPrevious: () => void;
  onSubmit: () => void;
  files: File[];
  setFiles: (files: File[]) => void;
  links: string[];
  setLinks: (links: string[]) => void;
}

export function FileUploadStep({
  onPrevious,
  onSubmit,
  files,
  setFiles,
  links,
  setLinks,
}: FileUploadStepProps) {
  const [newLink, setNewLink] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const form = useFormContext();

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const addLink = () => {
    if (newLink.trim() && !links.includes(newLink.trim())) {
      setLinks([...links, newLink.trim()]);
      setNewLink("");
      setShowLinkInput(false);
    }
  };

  const removeLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  const handleSubmit = () => {
    // Update form values
    form.setValue("files", files);
    form.setValue("links", links);
    onSubmit();
  };

  const canSubmit = files.length > 0 || links.length > 0;

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <div className="space-y-4">
        <Label className="text-base font-medium">File Attachments</Label>
        <Dropzone
          accept={{ 
            'application/pdf': ['.pdf'],
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
            'text/*': ['.txt', '.md', '.doc', '.docx']
          }}
          maxFiles={10}
          maxSize={1024 * 1024 * 10} // 10MB
          minSize={1024} // 1KB
          onDrop={handleDrop}
          onError={(error) => console.error('Dropzone error:', error)}
        >
          <DropzoneEmptyState />
          <DropzoneContent>
            {files.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Uploaded Files:</Label>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <Card key={index} className="p-3">
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
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-destructive hover:text-destructive/80 h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </DropzoneContent>
        </Dropzone>
      </div>

      {/* Links Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">External Links</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowLinkInput(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-3 w-3" />
            <span>Add Link</span>
          </Button>
        </div>

        {showLinkInput && (
          <div className="flex space-x-2">
            <Input
              type="url"
              placeholder="https://example.com/document.pdf"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addLink()}
            />
            <Button
              type="button"
              onClick={addLink}
              disabled={!newLink.trim()}
              size="sm"
            >
              Add
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowLinkInput(false);
                setNewLink("");
              }}
              size="sm"
            >
              Cancel
            </Button>
          </div>
        )}

        {links.length > 0 && (
          <div className="space-y-2">
            {links.map((link, index) => (
              <Card key={index} className="p-3">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ExternalLink className="h-4 w-4 text-primary" />
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline truncate max-w-xs"
                      >
                        {link}
                      </a>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLink(index)}
                      className="text-destructive hover:text-destructive/80 h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Info Alert */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          You can upload multiple files (PDF, images, text documents) and add multiple external links. 
          At least one file or link is required to submit your pitch.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="px-8 py-2"
        >
          Previous
        </Button>
        <Button 
          type="button" 
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="px-8 py-2"
        >
          Submit Pitch
        </Button>
      </div>
    </div>
  );
}
