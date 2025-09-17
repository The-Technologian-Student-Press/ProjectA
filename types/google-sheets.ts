/**
 * Google Sheets Integration Types
 *
 * This file contains all TypeScript interfaces and types
 * related to Google Sheets integration for form submissions.
 */

export interface GoogleSheetsConfig {
  serviceAccountEmail: string;
  privateKey: string;
  sheetId: string;
  ownerEmail: string;
}

export interface PitchSubmissionData {
  fullName: string;
  courseAndYear: string;
  citId: string;
  phoneNumber: string;
  personalEmail: string;
  typeOfPitch: string;
  aboutPitch: string;
  penName: string;
  files?: string[];
  links?: string[];
  submissionId: string;
  submittedAt: string;
}

export interface RequestAssistanceData {
  fullName: string;
  courseAndYear: string;
  idNumber: string;
  phoneNumber: string;
  personalEmail: string;
  organizationName: string;
  typeOfRequest: string;
  requestDate: string;
  requestTime: string;
  location: string;
  requestDescription: string;
  linkUrl?: string;
  files?: string[];
  links?: string[];
  submissionId: string;
  submittedAt: string;
}

export interface GoogleSheetsResponse {
  success: boolean;
  rowId?: number;
  error?: string;
}

export interface GoogleSheetsValidationResponse {
  success: boolean;
  error?: string;
}
