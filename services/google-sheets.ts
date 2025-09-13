import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import type {
  GoogleSheetsConfig,
  PitchSubmissionData,
  RequestAssistanceData,
  GoogleSheetsResponse,
  GoogleSheetsValidationResponse,
} from "../types/google-sheets";

class GoogleSheetsService {
  private readonly config: GoogleSheetsConfig;
  private doc: GoogleSpreadsheet | null = null;

  constructor() {
    this.config = {
      serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? "",
      privateKey: process.env.GOOGLE_PRIVATE_KEY ?? "",
      sheetId: process.env.GOOGLE_SHEETS_SHEET_ID ?? "",
      ownerEmail: process.env.GOOGLE_SHEETS_OWNER_EMAIL ?? "",
    };

    if (
      !this.config.serviceAccountEmail ||
      !this.config.privateKey ||
      !this.config.sheetId
    ) {
      throw new Error(
        "Google Sheets configuration is incomplete. Please check environment variables."
      );
    }
  }

  private async initializeDoc(): Promise<GoogleSpreadsheet> {
    if (this.doc) {
      return this.doc;
    }

    try {
      // Initialize JWT service account authentication
      const serviceAccountAuth = new JWT({
        email: this.config.serviceAccountEmail,
        key: this.config.privateKey,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      // Initialize the Google Sheets document with service account authentication
      this.doc = new GoogleSpreadsheet(this.config.sheetId, serviceAccountAuth);

      // Load document info
      await this.doc.loadInfo();

      return this.doc;
    } catch (error) {
      console.error("Failed to initialize Google Sheets document:", error);
      throw new Error(
        "Failed to connect to Google Sheets. Please check your configuration."
      );
    }
  }

  private async getOrCreateSheet(sheetName: string): Promise<any> {
    const doc = await this.initializeDoc();

    let sheet = doc.sheetsByTitle[sheetName];

    if (!sheet) {
      // Create new worksheet (tab) if it doesn't exist
      sheet = await doc.addSheet({
        title: sheetName,
        headerValues: this.getSheetHeaders(sheetName),
      });
    } else {
      // Always set headers for existing sheets to ensure they're correct
      const headers = this.getSheetHeaders(sheetName);
      await sheet.setHeaderRow(headers);
    }

    return sheet;
  }

  private getSheetHeaders(sheetName: string): string[] {
    if (sheetName === "Pitch Submissions") {
      return [
        "Submission ID",
        "Full Name",
        "Course and Year",
        "CIT ID",
        "Phone Number",
        "Personal Email",
        "Type of Pitch",
        "About Pitch",
        "Pen Name",
        "Files",
        "Links",
        "Submitted At",
      ];
    } else if (sheetName === "Request Assistance") {
      return [
        "Submission ID",
        "Full Name",
        "Course and Year",
        "ID Number",
        "Phone Number",
        "Personal Email",
        "Organization Name",
        "Type of Request",
        "Request Date",
        "Request Time",
        "Location",
        "Request Description",
        "Files",
        "Links",
        "Submitted At",
      ];
    }

    return [];
  }

  async submitPitch(data: PitchSubmissionData): Promise<GoogleSheetsResponse> {
    try {
      const sheet = await this.getOrCreateSheet("Pitch Submissions");

      // Prepare row data
      const rowData = {
        "Submission ID": data.submissionId,
        "Full Name": data.fullName,
        "Course and Year": data.courseAndYear,
        "CIT ID": data.citId,
        "Phone Number": data.phoneNumber,
        "Personal Email": data.personalEmail,
        "Type of Pitch": data.typeOfPitch,
        "About Pitch": data.aboutPitch,
        "Pen Name": data.penName,
        Files: data.files ? data.files.join(", ") : "No files uploaded",
        Links: data.links ? data.links.join(", ") : "No links provided",
        "Submitted At": data.submittedAt,
      };

      // Add row to sheet
      const row = await sheet.addRow(rowData, { raw: true });

      return {
        success: true,
        rowId: row.rowIndex,
      };
    } catch (error) {
      console.error("Failed to submit pitch to Google Sheets:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? `Google Sheets error: ${error.message}`
            : "Unknown Google Sheets error occurred",
      };
    }
  }

  async submitRequestAssistance(
    data: RequestAssistanceData
  ): Promise<GoogleSheetsResponse> {
    try {
      const sheet = await this.getOrCreateSheet("Request Assistance");

      // Prepare row data
      const rowData = {
        "Submission ID": data.submissionId,
        "Full Name": data.fullName,
        "Course and Year": data.courseAndYear,
        "ID Number": data.idNumber,
        "Phone Number": data.phoneNumber,
        "Personal Email": data.personalEmail,
        "Organization Name": data.organizationName,
        "Type of Request": data.typeOfRequest,
        "Request Date": data.requestDate,
        "Request Time": data.requestTime,
        Location: data.location,
        "Request Description": data.requestDescription,
        Files: data.files ? data.files.join(", ") : "No files uploaded",
        Links: data.links ? data.links.join(", ") : "No links provided",
        "Submitted At": data.submittedAt,
      };

      // Add row to sheet
      const row = await sheet.addRow(rowData, { raw: true });

      return {
        success: true,
        rowId: row.rowIndex,
      };
    } catch (error) {
      console.error(
        "Failed to submit request assistance to Google Sheets:",
        error
      );
      return {
        success: false,
        error:
          error instanceof Error
            ? `Google Sheets error: ${error.message}`
            : "Unknown Google Sheets error occurred",
      };
    }
  }

  async validateConnection(): Promise<GoogleSheetsValidationResponse> {
    try {
      const doc = await this.initializeDoc();

      // Check if we can access the document
      const _title = doc.title;

      return {
        success: true,
      };
    } catch (error) {
      console.error("Google Sheets connection validation failed:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? `Google Sheets connection error: ${error.message}`
            : "Unknown Google Sheets connection error occurred",
      };
    }
  }
}

// Export singleton instance
export const googleSheetsService = new GoogleSheetsService();
