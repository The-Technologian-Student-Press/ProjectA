import { z } from "zod";

// Personal information schema
export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  courseAndYear: z.string().min(1, "Course and year is required"),
  citId: z
    .string()
    .regex(/^\d+-\d+-\d+$/, "CIT ID must be in format XX-XXXX-XXX"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  personalEmail: z.string().email("Please enter a valid email address"),
});

// Pitch details schema
export const pitchDetailsSchema = z.object({
  typeOfPitch: z.string().min(1, "Please select a pitch type"),
  aboutPitch: z
    .string()
    .min(10, "Please provide more details about your pitch"),
  penName: z.string().min(1, "Pen name is required"),
});

// File upload schema - files will be validated in router
export const fileUploadSchema = z.object({
  files: z.array(z.any()).optional(),
  links: z.array(z.string().url()).optional(),
});

// Combined pitch form schema
export const pitchFormSchema = personalInfoSchema
  .merge(pitchDetailsSchema)
  .merge(fileUploadSchema);

// CIT ID validation schema
export const citIdValidationSchema = z.object({
  citId: z.string(),
});
