# Claude Code Continuation Document

This document provides context for continuing development of the 3115Prep application.

## Project Overview

**Purpose**: Web application to help tax professionals prepare IRS Form 3115 (Application for Change in Accounting Method)

**Tech Stack**:
- Next.js 16 with TypeScript and App Router
- Tailwind CSS with shadcn/ui components
- Prisma ORM with SQLite database
- NextAuth.js v5 (beta) for authentication

**Repository**: https://github.com/taylorschnack/3115Prep.git

---

## Milestone Status

### Milestone 1: Foundation & Core Form Structure ✅ COMPLETE
- Project setup with Next.js, TypeScript, Tailwind
- Authentication system (login/register)
- Client management (CRUD)
- Form 3115 Parts I-II data entry
- Basic filing workflow

### Milestone 2: DCN Database & Smart Calculations ✅ COMPLETE

**Completed:**
- ✅ DCN seed data with 28 common DCNs (`prisma/seed.ts`) - Updated to Rev. Proc. 2025-23
- ✅ DCN lookup component with search/filter (`src/components/dcn-lookup.tsx`)
- ✅ DCN actions for database queries (`src/lib/actions/dcn.ts`)
- ✅ Part II updated to use DCN lookup with requirement badges
- ✅ Part III form - 8 questions (`src/components/filing-part-iii.tsx`)
- ✅ Part IV form with Section 481(a) calculator (`src/components/filing-part-iv.tsx`)
- ✅ Server actions for Parts III, IV, and all Schedules (`src/lib/actions/filings.ts`)
- ✅ Parts III and IV tabs wired up in filing page
- ✅ Smart form routing - Schedules show/hide based on DCN requirements
- ✅ Schedules A-E fully implemented with server actions
- ✅ Enhanced validation rules with inline error display (`src/lib/validation.ts`)
- ✅ FieldError and ValidationSummary UI components (`src/components/ui/field-error.tsx`)

### Milestone 3: PDF Generation & Polish 🚧 IN PROGRESS
- ✅ PDF generation using pdf-lib
- ✅ API route for secure file download
- ✅ Download button integration
- ⬜ Print-friendly form preview (optional, PDF download covers this)
- ⬜ Filing status tracking and completion workflow
- ⬜ Data export/import functionality


---

## Immediate Next Task

Milestone 2 is complete. The next milestone is **PDF Generation & Polish**:

1. **PDF Generation** - Generate Form 3115 PDF from filing data
   - Install pdf-lib or react-pdf
   - Create PDF template matching official Form 3115
   - Map filing data to PDF fields
   - Add export/download button to filing page

2. **Completion Workflow**
   - Calculate completion percentage based on filled fields
   - Add status transitions (draft → in_progress → ready → completed)
   - Add filing summary/review page

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Database models (User, Client, Filing, DcnReference) |
| `prisma/seed.ts` | DCN seed data (run with `npx prisma db seed`) |
| `src/lib/actions/filings.ts` | Server actions for filing CRUD and part updates |
| `src/lib/actions/dcn.ts` | Server actions for DCN lookups |
| `src/components/filing-part-*.tsx` | Form components for each part |
| `src/components/dcn-lookup.tsx` | DCN search dialog |
| `src/app/(app)/filings/[id]/page.tsx` | Main filing editor page |

---

## Running the Project

```bash
# Install dependencies
npm install

# Run database migrations
npx prisma migrate dev

# Seed DCN database (if not done)
npx prisma db seed

# Start dev server
npm run dev
```

---

## Notes

- The app uses SQLite for simplicity (file: `prisma/dev.db`)
- DCN data is based on Rev. Proc. 2025-23 with 28 common DCNs
- Section 481(a) calculator supports 1-year and 4-year spread periods
- Part IV shows different UI based on whether 481(a) adjustment is required for the selected DCN
- Validation is implemented with inline errors and summary boxes
- Schedules A-E are shown dynamically based on DCN requirements
