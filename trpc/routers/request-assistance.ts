import { z } from "zod";
import { createTRPCRouter, baseProcedure } from "../init";
import { requestAssistanceFormSchema } from "../schemas/request-assistance";

export const requestAssistanceRouter = createTRPCRouter({
  submit: baseProcedure
    .input(requestAssistanceFormSchema)
    .mutation(async (opts) => {
      const { input } = opts;
      // Log the submission data
      console.log("Request Assistance Submission:", {
        requesterInfo: {
          fullName: input.fullName,
          courseAndYear: input.courseAndYear,
          idNumber: input.idNumber,
          phoneNumber: input.phoneNumber,
          personalEmail: input.personalEmail,
          organizationName: input.organizationName,
        },
        requestDetails: {
          typeOfRequest: input.typeOfRequest,
          requestDate: input.requestDate,
          requestTime: input.requestTime,
          location: input.location,
          requestDescription: input.requestDescription,
        },
        attachments: {
          hasLinkUrl: !!input.linkUrl,
        },
      });

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Return success response
      return {
        success: true,
        submissionId: `RA-${Date.now()}`,
        message: "Request assistance submitted successfully",
      };
    }),
});
