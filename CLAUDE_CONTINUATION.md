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

### Milestone 2: DCN Database & Smart Calculations 🔄 IN PROGRESS (75%)

**Completed:**
- ✅ DCN seed data with 22 common DCNs (`prisma/seed.ts`)
- ✅ DCN lookup component with search/filter (`src/components/dcn-lookup.tsx`)
- ✅ DCN actions for database queries (`src/lib/actions/dcn.ts`)
- ✅ Part II updated to use DCN lookup with requirement badges
- ✅ Part III form - 8 questions (`src/components/filing-part-iii.tsx`)
- ✅ Part IV form with Section 481(a) calculator (`src/components/filing-part-iv.tsx`)
- ✅ Server actions for Parts III and IV (`src/lib/actions/filings.ts`)

**In Progress:**
- 🔄 Wire up Parts III and IV tabs in filing page (partial - imports added, data parsing added, but tabs still disabled and components not rendered)

**Remaining:**
- ⬜ Enable Parts III and IV tabs in filing page
- ⬜ Add smart form routing based on DCN selection
- ⬜ Implement Schedules A-E (as applicable based on DCN)
- ⬜ Add enhanced validation rules

### Milestone 3: PDF Generation & Polish ⬜ NOT STARTED
- PDF generation using react-pdf
- Form validation with comprehensive error messages
- Print-friendly form preview
- Filing status tracking and completion workflow
- Data export/import functionality

---

## Immediate Next Task

**File to update**: `src/app/(app)/filings/[id]/page.tsx`

The filing page currently has:
1. Imports for FilingPartIII and FilingPartIV added
2. Data parsing for partIIIData, partIVData, dcnDetails added
3. BUT tabs are still disabled and placeholder content shown

**Changes needed:**
1. Enable the Part III and Part IV tabs (remove `disabled` prop)
2. Replace placeholder content with actual components:

```tsx
// Replace lines 83-84:
<TabsTrigger value="part-iii" disabled>Part III - Details</TabsTrigger>
<TabsTrigger value="part-iv" disabled>Part IV - 481(a)</TabsTrigger>

// With:
<TabsTrigger value="part-iii">Part III - Details</TabsTrigger>
<TabsTrigger value="part-iv">Part IV - 481(a)</TabsTrigger>

// Replace Part III TabsContent (lines 102-106):
<TabsContent value="part-iii">
  <FilingPartIII
    filingId={filing.id}
    initialData={partIIIData}
  />
</TabsContent>

// Replace Part IV TabsContent (lines 108-112):
<TabsContent value="part-iv">
  <FilingPartIV
    filingId={filing.id}
    initialData={partIVData}
    requires481a={requires481a}
    suggestedSpreadPeriod={suggestedSpreadPeriod}
  />
</TabsContent>
```

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
- DCN data is based on Rev. Proc. 2023-34
- Section 481(a) calculator supports 1-year and 4-year spread periods
- Part IV shows different UI based on whether 481(a) adjustment is required for the selected DCN
