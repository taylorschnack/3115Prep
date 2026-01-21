# IRS Form 3115 Prep Application - Product Specification

## Overview

A web application designed to help tax professionals (CPAs and accountants) efficiently prepare IRS Form 3115 (Application for Change in Accounting Method) for their clients. The app provides guided workflows, automated calculations, compliance validation, and IRS-ready PDF generation.

---

## Target Users

**Primary:** Tax professionals (CPAs, enrolled agents, tax preparers)
- Preparing Form 3115 for multiple clients
- Need efficiency and accuracy
- Require audit-ready documentation

---

## Core Features

### 1. Client & Case Management
- Create and manage client profiles
- Track multiple 3115 filings per client
- Store historical filings for reference
- Dashboard showing pending, in-progress, and completed forms

### 2. Guided Form Workflow
- Step-by-step wizard covering all form sections:
  - Part I: Information About the Filer
  - Part II: Information About the Change
  - Part III: Information About the Requested Change (Method Being Changed)
  - Part IV: Section 481(a) Adjustment
  - Schedule A-E (as applicable)
- DCN (Designated Change Number) lookup and selection tool
- Automatic vs. non-automatic change procedure guidance
- Contextual help explaining each field's requirements

### 3. Designated Change Number (DCN) Database
- Searchable database of all current DCNs from Rev. Proc. 2023-34 (and updates)
- Filter by:
  - Accounting method category (depreciation, inventory, revenue recognition, etc.)
  - Automatic vs. non-automatic
  - Section 481(a) adjustment requirement
- Auto-populate related form fields based on DCN selection

### 4. Section 481(a) Adjustment Calculator
- Input historical and corrected accounting data
- Compute the cumulative adjustment amount
- Determine spread period (1-year vs. 4-year)
- Generate supporting schedules and worksheets

### 5. Validation & Compliance Checks
- Required field validation
- Cross-field consistency checks
- DCN-specific requirement verification
- Filing deadline alerts (with year of change logic)
- Warning for common errors and omissions

### 6. PDF Generation & Export
- Generate IRS-compliant Form 3115 PDF
- Include all applicable schedules
- Attach supporting documentation
- Print-ready formatting matching official IRS form

### 7. Data Persistence
- Auto-save progress
- Export/import case data (JSON format)
- Secure cloud storage for authenticated users

---

## Technical Architecture

### Frontend
- **Framework:** React 18+ with TypeScript
- **UI Library:** Tailwind CSS + shadcn/ui components
- **Form Handling:** React Hook Form with Zod validation
- **State Management:** Zustand or React Context
- **PDF Generation:** react-pdf or pdf-lib

### Backend
- **Framework:** Next.js API routes (or separate Node.js/Express if preferred)
- **Database:** PostgreSQL (via Supabase or similar)
- **Authentication:** NextAuth.js or Clerk
- **File Storage:** S3-compatible storage for attachments

### Deployment
- **Hosting:** Vercel or AWS
- **CI/CD:** GitHub Actions

---

## Data Model (Core Entities)

```
User
├── id, email, name, firm_name
└── created_at, updated_at

Client
├── id, user_id, name, ein, address, tax_year_end
└── created_at, updated_at

Filing (Form 3115 instance)
├── id, client_id, tax_year_of_change, status
├── dcn, change_type (automatic/non-automatic)
├── form_data (JSON - all form fields)
├── section_481a_adjustment
└── created_at, updated_at, submitted_at

DCN_Reference (static reference data)
├── dcn_number, description, category
├── is_automatic, requires_481a, spread_period
└── effective_date, rev_proc_reference
```

---

## User Flows

### Flow 1: New Filing
1. User logs in → Dashboard
2. Selects client (or creates new)
3. Clicks "New Form 3115"
4. Enters year of change
5. Uses DCN lookup to select applicable change
6. System loads appropriate form sections
7. Completes guided workflow
8. Reviews validation results
9. Generates PDF
10. Downloads/saves filing

### Flow 2: Continue Draft
1. User logs in → Dashboard
2. Views "In Progress" filings
3. Selects filing to continue
4. Resumes from last saved step

---

## Non-Functional Requirements

- **Performance:** Page load < 2 seconds, PDF generation < 5 seconds
- **Security:** HTTPS, encrypted data at rest, session management
- **Accessibility:** WCAG 2.1 AA compliance
- **Browser Support:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile:** Responsive design (tablet-friendly, mobile view for review)

---

## Out of Scope (v1)

- E-filing directly to IRS
- Integration with tax software (ProConnect, Lacerte, etc.)
- Multi-user collaboration on same filing
- Bulk import from spreadsheets
- State-level equivalents of Form 3115

---

# Development Milestones

## Milestone 1: Foundation & Core Form Structure
**Goal:** Establish the application foundation and implement the basic form data entry workflow.

### Deliverables
1. **Project Setup**
   - Initialize Next.js project with TypeScript
   - Configure Tailwind CSS and shadcn/ui
   - Set up ESLint, Prettier, and project structure
   - Create basic layout (header, sidebar, main content area)

2. **Authentication**
   - User registration and login
   - Protected routes
   - Basic user profile

3. **Client Management**
   - CRUD operations for clients
   - Client list view with search/filter
   - Client detail page

4. **Form 3115 Data Entry (Parts I-II)**
   - Create new filing workflow
   - Part I: Filer information form
   - Part II: Change information form
   - Form state management and auto-save
   - Basic field validation

5. **Database Schema**
   - Set up PostgreSQL database
   - Implement User, Client, Filing models
   - API routes for CRUD operations

### Success Criteria
- User can register, log in, and manage clients
- User can start a new Form 3115 and complete Parts I-II
- Data persists across sessions

---

## Milestone 2: DCN Database & Complete Form Workflow
**Goal:** Implement the DCN lookup system and complete all form sections with intelligent guidance.

### Deliverables
1. **DCN Reference Database**
   - Seed database with all DCNs from current Rev. Proc.
   - Searchable/filterable DCN lookup interface
   - DCN detail view with requirements summary

2. **Smart Form Routing**
   - Based on DCN selection, show/hide applicable sections
   - Auto-populate fields from DCN data
   - Conditional logic for automatic vs. non-automatic procedures

3. **Complete Form Sections**
   - Part III: Method being changed (with sub-sections)
   - Part IV: Section 481(a) adjustment information
   - Schedule A: Changes in overall method
   - Schedule B: Changes to inventory methods (if applicable)
   - Schedule C: Changes to depreciation/amortization (if applicable)
   - Schedule D: Changes for long-term contracts
   - Schedule E: Changes for mark-to-market

4. **Section 481(a) Calculator**
   - Input interface for historical vs. corrected figures
   - Automatic computation of adjustment
   - Spread period determination
   - Supporting worksheet generation

5. **Enhanced Validation**
   - DCN-specific validation rules
   - Cross-field dependency checks
   - Completion percentage indicator

### Success Criteria
- User can search and select from complete DCN database
- Form dynamically adapts based on DCN selection
- Section 481(a) adjustment calculates correctly
- All form sections accessible and functional

---

## Milestone 3: PDF Generation, Polish & Launch
**Goal:** Generate IRS-compliant PDFs, implement final UX improvements, and prepare for production launch.

### Deliverables
1. **PDF Generation**
   - Map form data to official IRS Form 3115 layout
   - Generate all applicable schedules
   - Handle multi-page forms correctly
   - Include signature lines and dates
   - PDF preview before download

2. **Filing Management Dashboard**
   - Status tracking (Draft, Ready for Review, Complete)
   - Filing history with quick actions
   - Duplicate filing for similar changes
   - Archive/delete functionality

3. **UX Improvements**
   - Progress indicator for form completion
   - Contextual help tooltips (IRS instructions excerpts)
   - Inline error messages with fix suggestions
   - Print-friendly review summary

4. **Export & Backup**
   - Export filing data as JSON
   - Import previous filing data
   - Bulk export for firm records

5. **Production Readiness**
   - Security audit and fixes
   - Performance optimization
   - Error logging and monitoring (Sentry)
   - User documentation / help section
   - Terms of service and privacy policy

6. **Testing & QA**
   - Unit tests for calculations
   - Integration tests for form workflows
   - End-to-end tests for critical paths
   - Cross-browser testing

### Success Criteria
- Generated PDF matches IRS Form 3115 specifications
- Complete workflow from client creation to PDF download
- Application performs well under load
- Ready for beta user testing

---

## Future Enhancements (Post-v1)

- E-filing integration
- Tax software integrations (import client data)
- Team collaboration features
- Annual Rev. Proc. update automation
- Audit trail and change history
- White-label option for firms

---

## Timeline Estimate

| Milestone | Scope |
|-----------|-------|
| Milestone 1 | Foundation & Core Form |
| Milestone 2 | DCN Database & Full Form |
| Milestone 3 | PDF Generation & Launch |

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| IRS form changes mid-development | Design for configurability; separate form layout from logic |
| Complex DCN rules difficult to encode | Start with most common DCNs; add others iteratively |
| PDF generation quality issues | Test early with IRS specifications; use proven libraries |
| User adoption | Include contextual help; make UI intuitive for tax pros |

---

## Appendix: Form 3115 Reference

**Purpose:** Request IRS consent to change an accounting method
**Authority:** IRC Section 446(e)
**Current Guidance:** Rev. Proc. 2023-34 (automatic changes), Rev. Proc. 2015-13 (general procedures)
**Filing:** Attach to timely filed tax return (including extensions) for year of change; copy to IRS Ogden office for automatic changes
