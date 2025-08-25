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
  fileAttachment: z.instanceof(File).optional(),
  linkUrl: z.string().url().optional().or(z.literal("")),
});

// Combined pitch form schema
export const pitchFormSchema = personalInfoSchema.merge(pitchDetailsSchema);

// CIT ID validation schema
export const citIdValidationSchema = z.object({
  citId: z.string(),
});
