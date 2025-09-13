import { createTRPCRouter, baseProcedure } from "../init";
import { requestAssistanceFormSchema } from "../schemas/request-assistance";
import { googleSheetsService } from "../../services/google-sheets";
import type { RequestAssistanceData } from "../../types";

export const requestAssistanceRouter = createTRPCRouter({
  submit: baseProcedure
    .input(requestAssistanceFormSchema)
    .mutation(async (opts) => {
      const { input } = opts;

      // File validation is handled on the frontend

      // Generate a submission ID
      const submissionId = `RA-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`;

      // Prepare data for Google Sheets
      const requestData: RequestAssistanceData = {
        fullName: input.fullName,
        courseAndYear: input.courseAndYear,
        idNumber: input.idNumber,
        phoneNumber: input.phoneNumber,
        personalEmail: input.personalEmail,
        organizationName: input.organizationName,
        typeOfRequest: input.typeOfRequest,
        requestDate: input.requestDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
        requestTime: input.requestTime,
        location: input.location,
        requestDescription: input.requestDescription,
        linkUrl: input.linkUrl ?? "",
        files: input.files?.map((file) => file.name) || [],
        links: input.links || [],
        submissionId,
        submittedAt: new Date().toISOString(),
      };

      // Submit to Google Sheets
      const sheetsResult = await googleSheetsService.submitRequestAssistance(
        requestData
      );

      if (!sheetsResult.success) {
        console.error("Google Sheets submission failed:", sheetsResult.error);
        throw new Error(
          `Failed to save submission to database: ${sheetsResult.error}`
        );
      }

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Return success response
      return {
        success: true,
        submissionId,
        message: "Request assistance submitted successfully",
        sheetsRowId: sheetsResult.rowId,
      };
    }),
});
