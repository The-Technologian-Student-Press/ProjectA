import { baseProcedure, createTRPCRouter } from "../init";
import { pitchFormSchema, citIdValidationSchema } from "../schemas/pitch";

export const pitchRouter = createTRPCRouter({
  submit: baseProcedure.input(pitchFormSchema).mutation(async (opts) => {
    const { input } = opts;

    // Validate that at least one attachment method is provided
    if (!input.fileAttachment && !input.linkUrl) {
      throw new Error("Please provide either a file attachment or a link");
    }

    // Validate file type if provided
    if (
      input.fileAttachment &&
      input.fileAttachment.type !== "application/pdf"
    ) {
      throw new Error("Only PDF files are allowed");
    }

    // Generate a dummy submission ID
    const submissionId = `PITCH-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Log the submission (in a real app, this would be saved to a database)
    console.log("Pitch submission received:", {
      submissionId,
      fullName: input.fullName,
      courseAndYear: input.courseAndYear,
      citId: input.citId,
      phoneNumber: input.phoneNumber,
      personalEmail: input.personalEmail,
      typeOfPitch: input.typeOfPitch,
      aboutPitch: input.aboutPitch,
      penName: input.penName,
      hasFile: !!input.fileAttachment,
      fileSize: input.fileAttachment?.size,
      linkUrl: input.linkUrl,
      timestamp: new Date().toISOString(),
    });

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
