import { baseProcedure, createTRPCRouter } from "../init";
import { pitchFormSchema, citIdValidationSchema } from "../schemas/pitch";
import { googleSheetsService } from "../../services/google-sheets";
import type { PitchSubmissionData } from "../../types";

export const pitchRouter = createTRPCRouter({
  submit: baseProcedure.input(pitchFormSchema).mutation(async (opts) => {
    const { input } = opts;

    // Validate that at least one attachment method is provided
    if (
      (!input.files || input.files.length === 0) &&
      (!input.links || input.links.length === 0)
    ) {
      throw new Error("Please provide at least one file or link");
    }

    // File validation is handled on the frontend

    // Generate a submission ID
    const submissionId = `PITCH-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;

    // Prepare data for Google Sheets
    const pitchData: PitchSubmissionData = {
      fullName: input.fullName,
      courseAndYear: input.courseAndYear,
      citId: input.citId,
      phoneNumber: input.phoneNumber,
      personalEmail: input.personalEmail,
      typeOfPitch: input.typeOfPitch,
      aboutPitch: input.aboutPitch,
      penName: input.penName,
      files: input.files?.map((file) => file.name) || [],
      links: input.links || [],
      submissionId,
      submittedAt: new Date().toISOString(),
    };

    // Submit to Google Sheets
    const sheetsResult = await googleSheetsService.submitPitch(pitchData);

    if (!sheetsResult.success) {
      console.error("Google Sheets submission failed:", sheetsResult.error);
      throw new Error(
        `Failed to save submission to database: ${sheetsResult.error}`
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: "Pitch submitted successfully",
      submissionId,
      sheetsRowId: sheetsResult.rowId,
    };
  }),

  validateCitId: baseProcedure
    .input(citIdValidationSchema)
    .query(async (opts) => {
      const { citId } = opts.input;
      const citIdRegex = /^\d+-\d+-\d+$/;
      return {
        isValid: citIdRegex.test(citId),
      };
    }),
});
