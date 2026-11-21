# Finance role research and prompt taxonomy

Research date: 21 November 2026

## Scope and method

This taxonomy is derived from publicly available job descriptions and role profiles in the United States and Europe. It identifies recurring responsibilities and skills, then translates them into reusable prompt playbooks. Job descriptions are employer- and jurisdiction-specific; this is a sample, not a statistically representative labour-market survey. The product must not imply that every employer requires every listed skill.

The prompt library uses generic professional-services techniques (issue trees, hypothesis-led analysis, driver trees, evidence registers, scenario analysis, control matrices and executive synthesis). These are not proprietary methodologies or endorsements of McKinsey, PwC, EY or Deloitte.

## Role families and research-derived work

| Finance role family | Recurring responsibilities in reviewed postings | Prompt capability |
|---|---|---|
| FP&A and finance business partnering | Strategic forecasting, financial modelling, management/board reporting, business partnership, scenario modelling, risk/control awareness, transformation and process improvement | Driver-based forecast, actual-budget-forecast bridge, price-volume-mix where data supports it, assumption log, scenario sensitivity, management commentary and action register |
| Bank ALM and liquidity risk | Balance-sheet management, ALCO support, LCR/NSFR, liquidity forecasting, funding strategy, IRRBB, NII/EVE, behavioural assumptions, stress and contingency funding | Balance-sheet segmentation, repricing and cash-flow ladder, approved-model NII/EVE sensitivities, liquidity scenarios, limit monitoring and ALCO decision pack |
| Regulatory reporting and reporting controls | COREP/FINREP or US Call Reports depending on jurisdiction, IFRS/bank product accounting, capital/liquidity reporting, reconciliations, regulatory change, data quality, SQL/Excel and control evidence | Jurisdiction-specific reporting scope, field-level lineage, source-to-ledger-to-report reconciliations, validation rule catalogue, exception register and preparer/reviewer evidence |
| Finance transformation | R2R, P2P, O2C, Treasury, FP&A, operating model, shared services, process efficiency, close optimisation, reporting, automation, business cases and roadmaps | Current-state diagnostic, root-cause analysis, target operating model, initiative portfolio, benefits case, control impact and phased roadmap |
| Transaction services / financial due diligence | Quality of earnings, EBITDA adjustments, revenue/margin quality, working capital, net debt, cash conversion, deal perimeter, source evidence and red flags | Diligence request list, reported-to-adjusted EBITDA bridge, working-capital seasonality, net-debt schedule, adjustment evidence register and buyer follow-up questions |
| Finance strategy / CFO advisory | Strategic financial analysis, performance drivers, transformation, senior stakeholder advice, options, investment decisions and executive communication | MECE issue tree, hypothesis/evidence matrix, value-driver tree, quantified opportunity register, risk-adjusted prioritisation and executive recommendation |
| Audit and finance controls | Audit planning, financial analysis, large datasets, data validation, trend/anomaly analysis, management reporting and control assessment | Risk-control matrix, population completeness, exception testing, evidence traceability, findings severity and remediation tracker |

## Job-description source set

### United States

1. **Citi — C16 USCC FP&A, New York.** The posting describes strategic financial forecasting, board and executive reporting, finance transformation, process improvement, banking/treasury knowledge, financial modelling, risk/control orientation and stakeholder management.
   - https://jobs.citi.com/job/new-york/c16-uscc-fp-and-a/287/102267255360

2. **TD Bank — Senior Finance Analyst, US Commercial Banking FP&A.** The role includes financial analysis and finance business partnering, investigation of accounting/audit/reporting issues, variance analysis, due diligence, implementation of initiatives and process enhancement.
   - https://td.wd3.myworkdayjobs.com/en-US/TD_Bank_Careers/job/Senior-Finance-Analyst--US---Commercial-Banking-FP-A_R_1492363

3. **SMBC — Analyst, Financial Planning and Analysis, New York.** The description calls out FP&A, enterprise risk and scenario modelling, quantitative analysis, Excel modelling, data/technology enablement, governance/control, reusable models and partnership across Front Office, Risk, Treasury, Controllers and Technology.
   - https://careers.smbcgroup.com/smbc/job/New-York-Analyst%2C-Financial-Planning-and-Analysis-NY-10172/1439703000/

4. **U.S. Bank — Audit & Financial Planning Analyst.** The role references financial analysis, board committee and management reporting, audit planning, large datasets, data validation, trend analysis and reporting tools.
   - https://usbank.wd1.myworkdayjobs.com/en-US/US_Bank_Careers/job/Audit---Financial-Planning-Analyst---Professional-Practices_2026-0016754

### Europe

5. **ABN AMRO — Analyst Regulatory Reporting.** The description covers balance-sheet, liquidity and capital management; ALCO and liquidity crisis-team support; LCR/NSFR/FINREP/COREP; funding strategy; IRRBB; regulatory interpretation into data/process requirements; control frameworks and audit interaction.
   - https://www.banken.nl/vacatures/41681/abn-amro/analyst-regulatory-reporting

6. **BNP Paribas — Liquidity Analyst, Madrid.** The role covers internal/external liquidity and balance-sheet reporting, actual and forecast analysis, regulatory change, methodological studies, controls, system adaptations and process digitalisation; BI/SQL tools are mentioned.
   - https://group.bnpparibas/en/careers/job-offer/liquidity-analyst-3

7. **Alvarez & Marsal — Finance Transformation / Private Equity Performance Improvement.** The posting covers finance transformation strategy, operating model, cost reduction, process improvement, R2R, O2C, P2P, Treasury, FP&A, business cases, roadmaps and executive presentations.
   - https://careers.alvarezandmarsal.com/jobs/18359232-director-private-equity-performance-improvement-finance-transformation-open-to-all-us-locations

8. **European Finance Observatory — Regulatory Reporting Analyst and ALM Analyst role profiles.** These profiles describe COREP/FINREP, IFRS, Basel, LCR/NSFR, bank product accounting, data validation, SQL, ALM, IRRBB, NII/EVE, behavioural assumptions and ALCO packs. Treat this as a secondary role-profile source rather than an employer job posting.
   - https://www.europeanfinanceobservatory.com/roles/regulatory-reporting-analyst/
   - https://www.europeanfinanceobservatory.com/roles/alm-analyst/

## Prompt quality standard

Every job-ready prompt should include:

1. Role and decision context: who is using the output and what decision/work product is required.
2. Input contract: required source files, fields, period, entity, currency, accounting basis, jurisdiction, policy and data definitions.
3. Method: explicit sequence, calculation logic, matching/segmentation rules and hypothesis tests.
4. Evidence discipline: source references, lineage, facts vs calculations vs assumptions vs questions.
5. Exception handling: missing/ambiguous data blocks the affected conclusion; no forced matches or fabricated zeroes.
6. Deliverables: usable tables, registers, workbook structure, executive summary and action list.
7. Validation: tie-outs, recalculation, sensitivity/boundary tests, control evidence and independent reviewer checks.
8. Decision boundary: AI prepares analysis; authorised professionals retain approval and decision rights.

## Jurisdiction and framework guardrails

- Do not combine IFRS and US GAAP treatment or assume one applies. Ask the user to specify the accounting framework and reporting entity.
- Do not treat EU COREP/FINREP, LCR/NSFR and US Call Reports as interchangeable. Require jurisdiction, regulator, reporting template/version, reference date and institution-approved interpretation.
- Do not invent regulatory ratios, capital weights, liquidity assumptions, discount curves, market data, peer benchmarks or transaction adjustments.
- For ALM/IRRBB, use approved model outputs and institution-approved assumptions. A prompt is not a regulatory calculator or model validation.
- For financial due diligence, management adjustments are claims to corroborate, not automatically accepted facts.
- For finance transformation, distinguish capacity release, cost avoidance and cash savings; do not double-count benefits.
- Use synthetic examples only when explicitly labelled and kept separate from source results.

## Current implementation in AI Finance Studio

The prompt library includes finance strategy/value creation, financial due diligence/quality of earnings, finance operating model transformation, FP&A driver-based forecasting, bank ALM/IRRBB/liquidity, and regulatory reporting data lineage/control playbooks, in addition to the original finance operations prompts.

The Explore page provides role-based entry points for FP&A, ALM/liquidity risk, regulatory reporting, finance transformation, transaction services and CFO advisory. Prompt detail pages place copy/customise actions above the prompt in a responsive gradient action surface.
