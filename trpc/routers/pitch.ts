import { baseProcedure, createTRPCRouter } from "../init";
import { pitchFormSchema, citIdValidationSchema } from "../schemas/pitch";

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

    // Validate file types if provided
    if (input.files && input.files.length > 0) {
      for (const file of input.files) {
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

        if (!allowedTypes.includes(file.type)) {
          throw new Error(
            `File type ${file.type} is not allowed. Please upload PDF, images, or text documents only.`
          );
        }
      }
    }

    // Generate a dummy submission ID
    const submissionId = `PITCH-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: "Pitch submitted successfully",
      submissionId,
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
