# CLAUDE.md — Hospital Landing Page (Server)

This file is read by Claude Code at the start of every session.
Follow every rule here without exception. These are not suggestions.

---

## Project Overview

This is the **backend** for a district hospital's public landing page.
It is a simple content API built with Node.js + Express + TypeScript,
backed by a local MongoDB instance.

The frontend (`hospital-client`) is a static informational site.
This server exists only to serve content data — announcements, doctors,
services, and contact info. There is no auth, no patient data, no
sensitive records of any kind.

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Backend    | Node.js + Express + TypeScript |
| Database   | MongoDB (local instance)       |
| Language   | TypeScript (strict mode)       |
| Deployment | Local machine (no cloud)       |

Server runs on `http://localhost:5000`.
MongoDB runs on `mongodb://localhost:27017`.

---

## Non-Negotiable Code Standards

### General

- Write code as if a **senior engineer will review it tomorrow**.
- Every file must have **one clear responsibility**. No bloated files.
- No commented-out code left in commits. If it is dead, delete it.
- No `console.log` left in production-path code. Use a logger utility.
- All magic numbers and strings must be **named constants**.
- **TypeScript strict mode is on.** No `any`. No `// @ts-ignore`
  without a written explanation on the same line.
- All function signatures have **explicit parameter and return types**.
- Shared types live in `src/types/`. Never inline a type used in more
  than one place.

### Naming

- **Variables & functions**: `camelCase`
- **Classes / Models**: `PascalCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Files**: match the primary export — `doctorController.ts`,
  `announcementRoutes.ts`, `Doctor.ts`
- Names must be **descriptive and unambiguous**. No `data`, `temp`, `x`.

### No Spaghetti — Ever

- Functions do **one thing**. If a function needs "and" to describe it, split it.
- Max function length: **40 lines** (soft), **60 lines** (hard).
- No deeply nested callbacks. Use `async/await` throughout.
- No inline logic that belongs in a service. Extract it.
- Circular dependencies are a bug. Fix the architecture.

---

## Folder Structure

```
src/
├── config/
│   └── db.ts                     # MongoDB connection
├── controllers/                  # Thin — validate input, call service, return response
│   ├── announcementController.ts
│   ├── doctorController.ts
│   ├── serviceController.ts
│   └── contactController.ts
├── middleware/
│   ├── errorMiddleware.ts         # Global error handler
│   └── rateLimitMiddleware.ts     # Basic rate limiting
├── models/                        # Mongoose schemas + TypeScript interfaces
│   ├── Announcement.ts
│   ├── Doctor.ts
│   ├── Service.ts
│   └── ContactMessage.ts
├── routes/                        # Route definitions only — no logic
│   ├── announcementRoutes.ts
│   ├── doctorRoutes.ts
│   ├── serviceRoutes.ts
│   └── contactRoutes.ts
├── services/                      # All business logic
│   ├── announcementService.ts
│   ├── doctorService.ts
│   ├── serviceService.ts
│   └── contactService.ts
├── types/
│   ├── express.d.ts               # Extend Express Request if needed
│   └── models.types.ts
└── utils/
    └── logger.ts
```

Do not invent new top-level directories without justification.
Do not put business logic in routes or controllers.

---

## Architecture Rules

- **Controllers are thin.** Validate input → call service → return response.
  Nothing more.
- **Services contain all business logic.** They never touch `req` or `res`.
- **Routes only define paths** and attach middleware + controllers. Zero logic.
- All errors flow through **`errorMiddleware.ts`**. No scattered
  `res.status(500)` calls anywhere else.
- Use `express-async-errors` — never let a rejected promise crash the server.
- Mongoose models use **explicit schema definitions**. No schemaless documents.
- **Never** put secrets or DB URIs in source code. Use `process.env` via `.env`.
- App must **fail fast** at startup if any required env variable is missing.

---

## API Response Shape

All responses use this envelope — no exceptions:

```json
{ "success": true, "data": { } }
{ "success": false, "error": "Human-readable message" }
```

---

## API Routes

All routes are **public** — no authentication on any endpoint.
This is a read-only content API. The only write endpoint is contact form submission.

```
GET    /api/announcements          → list all active announcements
GET    /api/announcements/:id      → single announcement

GET    /api/doctors                → list all doctors
GET    /api/doctors/:id            → single doctor

GET    /api/services               → list all hospital services
GET    /api/services/:id           → single service

POST   /api/contact                → submit contact form message
```

---

## Database Models

### Announcement

```typescript
{
  title: string;
  content: string;
  isActive: boolean;
  publishedAt: Date;
  createdAt: Date;
}
```

### Doctor

```typescript
{
  name: string
  specialization: string
  schedule: string          // e.g. "Mon, Wed, Fri — 8AM to 12PM"
  imageUrl?: string         // relative path to local asset
  bio?: string
  isActive: boolean
  createdAt: Date
}
```

### Service

```typescript
{
  name: string;
  description: string;
  category: string; // e.g. "Emergency", "Outpatient", "Diagnostic"
  isActive: boolean;
  createdAt: Date;
}
```

### ContactMessage

```typescript
{
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}
```

---

## CORS

Allow requests only from the frontend origin:

```typescript
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    methods: ["GET", "POST"],
  }),
);
```

Never use `origin: '*'` in this project.

---

## Rate Limiting

The `/api/contact` POST endpoint must be rate-limited to prevent spam:

- Max 5 requests per IP per 15 minutes
- Handled in `rateLimitMiddleware.ts` via `express-rate-limit`

---

## Error Handling

- Never silently swallow errors.
- All unhandled errors bubble to `errorMiddleware.ts` which formats
  and returns the standard error envelope.
- Log errors with context: route, input shape, error message.

---

## Environment & Config

```env
# .env.example
PORT=5000
MONGO_URI=mongodb://localhost:27017/hospital
CLIENT_ORIGIN=http://localhost:5173
```

App must fail fast at startup if `PORT`, `MONGO_URI`, or
`CLIENT_ORIGIN` are missing.

---

## Git Discipline

- Commits are atomic: one logical change per commit.
- Commit messages: `type(scope): short description`
  - Types: `feat`, `fix`, `refactor`, `style`, `chore`, `docs`
  - Examples:
    - `feat(doctors): add GET /api/doctors endpoint`
    - `fix(contact): add rate limiting to contact form`
    - `chore: add express-rate-limit package`
- Never commit directly to `main`. Use feature branches.
- No commit should break the server.

---

## What "Done" Means

A task is not done until:

- [ ] The endpoint works as specified
- [ ] TypeScript strict mode passes with zero errors
- [ ] No `any`, no `console.log`, no dead code
- [ ] Business logic is in the service, not the controller
- [ ] Error flows through `errorMiddleware.ts`
- [ ] `.env.example` updated if new variables were added
- [ ] The code reads like it was written by one careful person
