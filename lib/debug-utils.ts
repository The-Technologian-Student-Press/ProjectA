/**
 * Development mode utilities for easier debugging
 */

export const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Get default form values based on environment
 * In development: returns sample data for easier testing
 * In production: returns empty values
 */
export const getDevelopmentDefaults = {
  personalInfo: {
    fullName: "John Doe",
    courseAndYear: "BS Computer Science 3rd Year",
    citId: "22-1437-172",
    phoneNumber: "+63 912 345 6789",
    personalEmail: "john.doe@example.com",
  },
  pitchDetails: {
    typeOfPitch: "Feature",
    aboutPitch:
      "This is a sample pitch about technology trends in 2024. I want to write about how artificial intelligence is transforming various industries and what this means for the future of work.",
    penName: "TechWriter",
    linkUrl: "https://example.com/sample-document.pdf",
  },
  empty: {
    fullName: "",
    courseAndYear: "",
    citId: "",
    phoneNumber: "",
    personalEmail: "",
    typeOfPitch: "",
    aboutPitch: "",
    penName: "",
    linkUrl: "",
  },
};

/**
 * Get appropriate default values based on environment
 */
export const getDefaultFormValues = () => {
  if (isDevelopment) {
    return {
      ...getDevelopmentDefaults.personalInfo,
      ...getDevelopmentDefaults.pitchDetails,
    };
  }
  return getDevelopmentDefaults.empty;
};

/**
 * Development mode indicator component props
 */
export const getDevelopmentIndicator = () => {
  if (!isDevelopment) return null;

  return {
    message:
      "🐛 Development Mode: Form pre-filled with sample data for testing",
    className: "mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg",
    textClassName: "text-sm text-yellow-800 font-medium",
  };
};
