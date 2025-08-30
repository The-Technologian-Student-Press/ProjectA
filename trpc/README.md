# tRPC Organization

This directory contains the tRPC API setup organized by features and pages.

## Structure

```
trpc/
├── init.ts                    # tRPC initialization and context
├── routers/
│   ├── _app.ts               # Main app router (combines all routers)
│   ├── pitch.ts              # Pitch-related operations
│   └── utils.ts              # General utility operations
├── schemas/
│   └── pitch.ts              # Shared validation schemas
└── README.md                 # This file
```

## Router Organization

### Main App Router (`_app.ts`)

- Combines all feature-specific routers
- Provides a clean namespace structure
- Example: `trpc.pitch.submit`, `trpc.utils.hello`

### Feature Routers

- **`pitch.ts`**: All pitch-related operations

  - `submit`: Submit a new pitch
  - `validateCitId`: Validate CIT ID format

- **`utils.ts`**: General utility operations
  - `hello`: Simple hello world query

## Schema Organization

### Shared Schemas (`schemas/pitch.ts`)

- Reusable validation schemas
- Prevents code duplication
- Ensures consistency between client and server

## Usage Examples

### Client-side (React)

```typescript
// Submit a pitch
const submitMutation = trpc.pitch.submit.useMutation();

// Validate CIT ID
const validateQuery = trpc.pitch.validateCitId.useQuery({
  citId: "22-1437-172",
});

// Hello world
const helloQuery = trpc.utils.hello.useQuery({ text: "world" });
```

### Server-side (API Routes)

```typescript
// The API route is automatically handled by Next.js App Router
// at app/api/trpc/[trpc]/route.ts
```

## Adding New Features

1. **Create a new router** in `routers/` (e.g., `assistance.ts`)
2. **Add shared schemas** in `schemas/` if needed
3. **Import and add** to the main app router in `_app.ts`
4. **Use in components** with the new namespace (e.g., `trpc.assistance.request`)

## Benefits

- **Modular**: Each feature has its own router
- **Scalable**: Easy to add new features without cluttering
- **Maintainable**: Clear separation of concerns
- **Type-safe**: Full TypeScript support across client and server
- **Reusable**: Shared schemas prevent duplication
