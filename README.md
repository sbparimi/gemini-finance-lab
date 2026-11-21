# AI Finance Studio

A modern finance prompt workspace for banking, accounting, treasury, FP&A and audit professionals.

## Product principle
**Gemini assists. Google Sheets calculates. Humans verify.**

## Current feature-branch milestone
- Responsive SaaS landing experience and application workspace dashboard.
- Searchable professional finance prompt library with 22 copy-ready templates.
- Workflow, industry and finance-role discovery filters.
- Eight-unit course map.
- Prompt detail pages showing role, required inputs, full prompt, deliverables, validation checklist and professional limitations.
- Text-first Prompt Studio with optional browser voice input; learner can dictate a short task and receive a structured prompt.
- Four finance simulation entry points and six project overviews.
- Separate automated UX/accessibility and finance-domain review gates; production release remains blocked until all checks pass.

## Prompt quality standard
Every professional template must:
- State the role, business objective and operating context.
- Specify the source data and definitions required before execution.
- Provide a task-specific analysis method and matching/calculation rules.
- Prohibit invented facts, values, policies, regulatory rules and causal explanations.
- Preserve source lineage and separate facts, calculations, assumptions and open questions.
- Stop with **BLOCKED — INPUT REQUIRED** when material inputs or definitions are missing.
- Return exceptions, control totals, spreadsheet implementation guidance and reviewer hand-off.
- Include independent validation checks and clearly stated limitations.

Prompt templates cover bank reconciliation, accounts payable, month-end close, FP&A, cash forecasting, financial reporting, receivables, journal review, banking credit/liquidity monitoring, intercompany, fixed assets, accruals, regulatory data quality, audit sampling, FX, working capital, management reporting, finance data quality and financial modelling.

## Technology and execution boundary
- Next.js App Router, React and TypeScript.
- Google Sheets is the deterministic calculation/workbook environment.
- Gemini is used by the learner in their own eligible Google account.
- No Gemini API integration, database, authentication or external AI execution in this milestone. Prompt construction happens locally in the browser.
- Gemini feature availability varies by Google account and plan.

## Run locally
```bash
npm install
npm run dev
npm run lint
npm run build
```

## Data and safety
Northstar Trading BV is fictional. Never paste real customer, employee, supplier, bank, account or other confidential financial data into an unapproved AI service. AI-generated financial outputs are not guaranteed error-free and are not evidence of correctness. Recalculate material amounts in Google Sheets, reconcile to authoritative source systems, apply the organisation's approved policies and obtain required preparer/reviewer sign-off.

## Planned next milestones
1. Guided simulations with deterministic answer keys and synthetic datasets.
2. Downloadable practice datasets and completed reference solutions for each course project.
3. Student accounts, saved prompts and progress tracking (only after explicit authorization for the required backend connection).
4. Accessibility audit and expanded automated regression coverage.
