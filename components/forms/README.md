# Forms Directory Structure

This directory contains all form-related components organized by purpose:

## 📁 Directory Structure

```
forms/
├── general/           # Shared/reusable form components
│   ├── standard-form-field.tsx      # Enhanced input field with icons & tooltips
│   ├── standard-select-field.tsx    # Enhanced select field with icons & tooltips
│   ├── rich-text-editor-field.tsx   # Rich text editor wrapper
│   └── file-upload-section.tsx      # File upload component
├── pitch/             # Pitch submission forms
│   ├── pitch-form.tsx               # Main pitch form wrapper
│   ├── personal-info-step.tsx       # Student personal information
│   └── pitch-details-step.tsx       # Pitch content and details
└── request/           # Request assistance forms
    ├── request-assistance-form.tsx  # Main request form wrapper
    ├── requester-info-step.tsx      # Requester information
    └── request-details-step.tsx     # Request details and scheduling
```

## 🎯 Key Features

### StandardFormField & StandardSelectField Components

- **Enhanced UI**: Icons, consistent styling, proper spacing
- **Help Tooltips**: Hover question marks with contextual guidance
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Responsive**: Works on all screen sizes
- **Unified Design**: Input fields and select dropdowns share the same visual language

### FileUploadSection Component

Enhanced with full design pattern compliance and multiple links support:

- **Consistent Icons**: Paperclip for file upload, Link for external URLs
- **Tooltip Integration**: Contextual help for both file and link sections
- **Standardized Input**: URL input matches StandardFormField height and styling (h-12)
- **Enhanced Dropzone**: Animated upload area with primary color theming
- **Multiple Links Support**: Users can add multiple external links with individual management
- **Professional Info Panel**: Gradient background with supporting material guidance
- **Unified Typography**: font-semibold labels matching other form components
- **Add/Remove Interface**: Clear "Add" button and individual link removal controls
- **Keyboard Support**: Enter key adds links for improved UX

### Layout Optimizations

- **Smart Alignment**: Full Name and CIT ID are separate (no side-by-side) to prevent alignment issues
- **2-Column Layouts**: Optimized field grouping where appropriate
- **Visual Hierarchy**: Clear section separation and logical flow

### UX Improvements

- **Info Hovers**: Question mark tooltips provide context for each field
- **Better Descriptions**: Clear guidance on what information is needed
- **Enhanced Interactions**: Smooth transitions and hover effects

## 🔧 Usage Examples

### Using StandardFormField

```tsx
<StandardFormField
  name="fullName"
  label="Full Name"
  icon={User}
  placeholder="Enter your full name"
  helpText="Enter your complete legal name as it appears on official documents"
  required
/>
```

### Import Paths

```tsx
// Main forms
import { PitchForm } from "@/components/forms/pitch/pitch-form";
import { RequestAssistanceForm } from "@/components/forms/request/request-assistance-form";

// Shared components
import { StandardFormField } from "@/components/forms/general/standard-form-field";
import { RichTextEditorField } from "@/components/forms/general/rich-text-editor-field";
```

## 🎨 Design Consistency

All forms now share:

- Consistent field styling and behavior
- Unified color schemes and spacing
- Standardized button interactions
- Matching progress indicators
- Professional tooltip system

This organization makes the codebase more maintainable while providing a better user experience.

## 🔧 Grid Alignment Architecture

### Issue Fixed: Icon Misalignment in Grid Layouts

**Problem**: When form fields with different heights (due to descriptions) were placed side-by-side in CSS Grid, the default `align-items: stretch` behavior caused icon misalignment in shorter fields.

**Solution**: Added `items-start` to all grid containers to ensure proper top alignment:

```tsx
// ❌ Before: Icons misaligned when adjacent field has description
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

// ✅ After: Icons properly aligned regardless of field height differences
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
```

**Applied to all grid containers in:**

- `pitch/personal-info-step.tsx`
- `pitch/pitch-details-step.tsx`
- `request/requester-info-step.tsx`
- `request/request-details-step.tsx`

This ensures consistent icon positioning even when fields have varying content heights.

### Additional Fixes: Icon and Sizing Consistency

**Icon Positioning**: StandardSelectField now includes proper icon positioning to match StandardFormField:

- Both components use `pl-10` when icons are present
- Icons are absolutely positioned at `left-3 top-1/2`
- `pointer-events-none` prevents icon interference with select functionality

**Height Standardization**: All form elements now have consistent `h-12` height:

- StandardFormField: `h-12` on Input
- StandardSelectField: `!h-12` on SelectTrigger (important override for shadcn defaults)
- RichTextEditorField: Updated with icon and tooltip support
- Date picker: `h-12` on Button
- All use `border-2` and `focus:border-primary` for consistent styling

**Critical Fix**: Shadcn's SelectTrigger has built-in `data-[size=default]:h-9` that was overriding our `h-12`. Using `!h-12` with Tailwind's important modifier ensures our height takes precedence.

### Success Page Animation Fix

**Issue Fixed**: Bobbing CheckCircle icon on success pages was being cut off due to `overflow-hidden` on CardHeader.

**Solution**: Changed CardHeader to `overflow-visible pb-8` to allow the bouncing animation to display properly while maintaining proper spacing.
