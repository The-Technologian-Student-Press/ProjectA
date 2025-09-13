# Google Sheets Integration

This service provides backend integration with Google Sheets for storing form submissions from both pitch and request assistance forms.

## 🏗️ Architecture

The Google Sheets integration follows a service-oriented architecture:

```
Frontend Form → tRPC Router → Google Sheets Service → Google Sheets API
                     ↓
                Environment Variables (Server-side only)
```

## 📁 Project Structure

```
types/                    # Centralized type definitions
├── google-sheets.ts     # Google Sheets integration types
└── index.ts            # Type exports

services/                # Service layer
├── google-sheets.ts    # Google Sheets service implementation
└── README.md          # Service documentation

trpc/routers/           # API layer
├── pitch.ts           # Pitch submission router
├── request-assistance.ts # Request assistance router
└── utils.ts           # Utility router (connection testing)
```

## 🔧 Setup

### 1. Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Google Sheets Integration
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SHEET_ID=your_google_sheets_sheet_id_here
GOOGLE_SHEETS_OWNER_EMAIL=TheTechnologianWebsiteAssociate@gmail.com
```

### 2. Google Sheets Setup

1. **Create a new Google Sheets document**

   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new blank spreadsheet
   - Rename it to "Technologian Student Press Submissions"

2. **Set up the tabs (worksheets)**

   **Tab 1: "Pitch Submissions"**

   - Rename the first tab to "Pitch Submissions"
   - Add headers in row 1: Submission ID, Full Name, Course and Year, CIT ID, Phone Number, Personal Email, Type of Pitch, About Pitch, Pen Name, Files, Links, Submitted At

   **Tab 2: "Request Assistance"**

   - Add a new tab and rename it to "Request Assistance"
   - Add headers in row 1: Submission ID, Full Name, Course and Year, ID Number, Phone Number, Personal Email, Organization Name, Type of Request, Request Date, Request Time, Location, Request Description, Link URL, Submitted At

3. **Share the document**

   - Share with `TheTechnologianWebsiteAssociate@gmail.com` as the owner

4. **Get the Sheet ID**

   - From URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`
   - Copy the `SHEET_ID` part

5. **Generate Service Account credentials from Google Cloud Console**

### 3. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API
4. Go to "Credentials" → "Create Credentials" → "Service Account"
5. Create a service account with a descriptive name
6. Download the JSON key file
7. Extract the `client_email` and `private_key` from the JSON file
8. Share your Google Sheets document with the service account email

## 📊 Data Structure

**Single Google Sheets Document with Two Tabs:**

### Tab 1: "Pitch Submissions"

- **Columns**: Submission ID, Full Name, Course and Year, CIT ID, Phone Number, Personal Email, Type of Pitch, About Pitch, Pen Name, Files, Links, Submitted At

### Tab 2: "Request Assistance"

- **Columns**: Submission ID, Full Name, Course and Year, ID Number, Phone Number, Personal Email, Organization Name, Type of Request, Request Date, Request Time, Location, Request Description, Link URL, Submitted At

**Note**: Both tabs are within the same Google Sheets document, making it easier to manage and share as a single database.

## 🔒 Security Features

- **API Key Protection**: All credentials are server-side only
- **Error Resilience**: Form submissions continue even if Google Sheets fails
- **Input Validation**: All data is validated before submission
- **Type Safety**: Full TypeScript coverage

## 🚀 Usage

### Testing Connection

```bash
curl -X POST http://localhost:3000/api/trpc/utils.testGoogleSheets \
  -H "Content-Type: application/json"
```

### Submitting Pitch

```bash
curl -X POST http://localhost:3000/api/trpc/pitch.submit \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "courseAndYear": "BSIT 3",
    "citId": "12-3456-789",
    "phoneNumber": "09123456789",
    "personalEmail": "john@example.com",
    "typeOfPitch": "news",
    "aboutPitch": "Breaking news story",
    "penName": "John Writer"
  }'
```

### Submitting Request Assistance

```bash
curl -X POST http://localhost:3000/api/trpc/requestAssistance.submit \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Smith",
    "courseAndYear": "BSCS 2",
    "idNumber": "12-3456-789",
    "phoneNumber": "09123456789",
    "personalEmail": "jane@example.com",
    "organizationName": "Student Council",
    "typeOfRequest": "news-coverage",
    "requestDate": "2024-01-15",
    "requestTime": "10:00",
    "location": "Main Campus",
    "requestDescription": "Coverage for student event"
  }'
```

## 🛠️ Service Methods

### `submitPitch(data: PitchSubmissionData)`

Submits pitch form data to Google Sheets.

**Returns**: `{ success: boolean; rowId?: number; error?: string }`

### `submitRequestAssistance(data: RequestAssistanceData)`

Submits request assistance form data to Google Sheets.

**Returns**: `{ success: boolean; rowId?: number; error?: string }`

### `validateConnection()`

Tests the Google Sheets connection.

**Returns**: `{ success: boolean; error?: string }`

## 🔍 Error Handling

The service implements robust error handling:

1. **Connection Errors**: Logged but don't break form submission
2. **Validation Errors**: Prevented by Zod schemas
3. **API Errors**: Caught and logged with detailed messages
4. **Network Errors**: Retry logic can be added if needed

## 📝 Logging

All errors are logged to the console with detailed information:

- Connection failures
- API errors
- Validation errors
- Network issues

## 🔄 Data Flow

1. **Form Submission**: User submits form via frontend
2. **Validation**: tRPC validates input using Zod schemas
3. **Processing**: Form data is processed and formatted
4. **Google Sheets**: Data is sent to Google Sheets service
5. **Response**: Success/error response is returned to frontend
6. **Logging**: All operations are logged for debugging

## 🚨 Important Notes

- **One Row Per Submission**: Each form submission creates exactly one row
- **Owner Validation**: Only TheTechnologianWebsiteAssociate@gmail.com can access
- **API Key Security**: Never expose API keys in frontend code
- **Error Resilience**: Form submissions work even if Google Sheets is down
- **Data Integrity**: All data is validated before submission

## 🧪 Testing

Use the provided curl commands to test the integration:

1. Test connection: `utils.testGoogleSheets`
2. Test pitch submission: `pitch.submit`
3. Test request assistance: `requestAssistance.submit`

## 📈 Monitoring

Monitor the following:

- Google Sheets API quota usage
- Error logs in console
- Form submission success rates
- Data integrity in Google Sheets

## 🔧 Troubleshooting

### Common Issues

1. **API Key Invalid**: Check Google Cloud Console settings
2. **Sheet Not Found**: Verify Sheet ID and permissions
3. **Permission Denied**: Ensure owner email is correct
4. **Rate Limiting**: Check API quota usage

### Debug Steps

1. Test connection with `utils.testGoogleSheets`
2. Check environment variables
3. Verify Google Sheets permissions
4. Check console logs for detailed errors
