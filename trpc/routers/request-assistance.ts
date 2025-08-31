import { z } from "zod";
import { createTRPCRouter, baseProcedure } from "../init";
import { requestAssistanceFormSchema } from "../schemas/request-assistance";

export const requestAssistanceRouter = createTRPCRouter({
  submit: baseProcedure
    .input(requestAssistanceFormSchema)
    .mutation(async (opts) => {
      const { input } = opts;

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
