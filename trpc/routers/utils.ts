import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { googleSheetsService } from "../../services/google-sheets";

export const utilsRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),

  testGoogleSheets: baseProcedure.query(async () => {
    const result = await googleSheetsService.validateConnection();
    return {
      success: result.success,
      message: result.success
        ? "Google Sheets connection successful"
        : `Google Sheets connection failed: ${result.error}`,
      error: result.error,
    };
  }),
});
