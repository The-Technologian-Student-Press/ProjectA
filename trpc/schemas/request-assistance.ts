import { z } from "zod";

// Requester information schema
export const requesterInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  courseAndYear: z.string().min(1, "Course and year is required"),
  idNumber: z.string().min(1, "ID number is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  personalEmail: z.string().email("Please enter a valid email address"),
  organizationName: z
    .string()
    .min(1, "Organization or college name is required"),
});

// Request details schema
export const requestDetailsSchema = z.object({
  typeOfRequest: z.string().min(1, "Please select a request type"),
  requestDate: z.date({
    error: "Please select a date",
  }),
  requestTime: z.string().min(1, "Please select a time"),
  location: z.string().min(1, "Location is required"),
  requestDescription: z
    .string()
    .min(10, "Please provide more details about your request"),
  linkUrl: z.string().url().optional().or(z.literal("")),
});

// File upload schema - files will be validated in router
export const fileUploadSchema = z.object({
  files: z.array(z.any()).optional(),
  links: z.array(z.string().url()).optional(),
});

// Combined request assistance form schema
export const requestAssistanceFormSchema = requesterInfoSchema
  .merge(requestDetailsSchema)
  .merge(fileUploadSchema);

// Request type options
export const requestTypeOptions = [
  { value: "news-coverage", label: "News/Photos Coverage" },
  { value: "camera-assistance", label: "Camera Assistance for Online/Live" },
  { value: "others", label: "Others" },
] as const;
