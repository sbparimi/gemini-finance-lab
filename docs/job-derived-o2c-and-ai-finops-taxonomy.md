# Job-derived finance prompt domains: Order-to-Cash and FinOps for AI

Date added: 21 November 2026

## Source basis

This taxonomy is derived from two job descriptions supplied by the product owner:
1. A hybrid Order-to-Cash & Collections / Finance Automation leadership role.
2. A FinOps for AI Practitioner Consultant role.

These are source-derived responsibility clusters, not claims about the entire finance labour market. No employer identity is inferred. Additional implementation detail in the prompt playbooks is a structured product interpretation.

## Domain 1 — Order-to-Cash, AR and Collections

### Responsibilities extracted
- Own collections strategy and AR balance; manage DSO and cash conversion cycle; run weekly cash reviews with Finance leadership.
- Resolve billing questions, disputes and overdue balances with Sales, Account Management and business partners.
- Escalate enterprise, MSA and VMS accounts.
- Identify late-cash root causes: billing errors, contract/account setup mismatch, portal approval delays and operational/product process gaps.
- Own invoice setup QA, cash application, month-end AR reconciliations and reserves support.
- Lead and coach offshore collections analysts; shift routine work to exception handling as automation expands.
- Maintain credit approval, credit checks and customer credit options.
- Build AI workflows for collections prioritisation/outreach, remittance matching, dispute triage, VMS portal tracking and invoice pre-send checks.

### Job-ready prompt modules
1. Weekly AR and cash control tower: AR opening-to-closing bridge, overdue/disputed exposure, DSO trend, cash collected vs target, top customer exposures and decisions required.
2. Collections prioritisation: evidence-based queue using due date, ageing, dispute status, contract/PO evidence, portal state, promise-to-pay history and customer escalation tier.
3. Dispute and late-cash root-cause diagnostics: classify billing defects, master-data mismatch, missing PO, VMS approval delay, service acceptance, rate mismatch, invoice delivery and customer-side process blockers.
4. Invoice pre-send QA: validate MSA/SOW, PO, customer master, legal entity, rates, milestones, tax setup and portal-specific requirements before invoice release.
5. Cash application and remittance matching: exact-reference-first matching, approved tolerances, duplicate detection, partial payment handling, unapplied cash and exception queue.
6. Credit approval decision support: policy criteria, lawful and current evidence, proposed mitigants and authorised approval route; never automated approval.
7. Collections team operating model: portfolio allocation, analyst capacity, offshore team coaching, service levels, quality sampling and exception-led work.
8. AI agent/workflow controls: prioritisation, outreach drafting, remittance suggestions, dispute triage, VMS tracking and invoice QA with human approvals, confidence thresholds, audit logs and rollback.

### Core KPIs and control definitions
The product must request approved organisational definitions before calculating:
- DSO: confirm numerator/denominator, period, average AR convention, credit sales basis and treatment of taxes/credit notes.
- Cash conversion cycle: confirm inventory days + receivable days - payable days where relevant; service businesses may use another operating cash-cycle definition.
- AR ageing: contractual due date and payment terms; distinguish disputed, not-yet-due, unapplied cash and overdue balances.
- Collection effectiveness: cash collected vs target, roll rates, promise-to-pay kept rate and dispute resolution cycle, only where source data supports the measure.
- Credit exposure: approved credit limit, utilised exposure, open orders and policy-defined exceptions.

### Safety boundaries
- Never force-match receipts to invoices or silently clear unapplied cash.
- Never auto-approve credit, change terms, issue credit notes, write off debt or send customer communications without authorised controls.
- Do not infer legal enforceability or make legal threats.
- Validate DSO and cash conversion definitions with Finance.
- Protect customer, bank and personal data; minimise and mask identifiers.
- Keep a traceable audit record of source, recommendation, reviewer decision and override.

## Domain 2 — Finance Automation

The supplied role description includes workflow discovery, prioritisation by time saved and risk reduced, a managed automation backlog, bank and balance-sheet reconciliations, journal-entry preparation, accruals, close tracking, variance analysis, P2P, invoice intake/coding/approvals/vendor onboarding/payment runs, cash reporting, bank/payout reconciliations, lender reporting, integrations between ERP/billing/payment/bank/BI systems, dashboards, audit trails, training and production ownership.

Prompt capabilities should include process inventory and value/risk/effort prioritisation; current/future-state maps; control design, exception handling and segregation-of-duties review; data contracts and integration mapping; human-in-the-loop checkpoints, audit trail and evidence retention; production readiness, monitoring, incident handling, runbooks and adoption measures.

## Domain 3 — FinOps for Cloud and AI

### Responsibilities and knowledge extracted
- Assess cloud, AI and data cost management maturity and identify gaps, risks and opportunities.
- Design FinOps operating models, governance, reporting and decision frameworks.
- Analyse consumption and cost drivers; connect technical usage to business value.
- AI cost management: model usage, tokens, inference, GPU/accelerator costs, experimentation controls, showback/chargeback and AI unit economics.
- Define KPIs, tagging standards, allocation models, budgets, forecasts and anomaly processes.
- Support optimisation across cloud, AI, data workloads, vendors and usage patterns.
- Develop dashboards, executive reporting, workshops, reusable playbooks and adoption roadmaps.
- Understand AWS, Azure and Google Cloud billing; FOCUS normalisation; native billing exports; cloud cost tools.
- Understand RAG/CAG, vector databases, caching, prompt engineering, model routing and cost/performance/scalability/value trade-offs.
- Preferred: FinOps Foundation certifications, FOCUS, AI/GenAI cost management, showback/chargeback, unit cost, BI dashboards, rightsizing, commitments, scheduling, model efficiency, Bedrock/Vertex/Azure OpenAI, Databricks, Snowflake and Kubernetes workloads.

### Job-ready prompt modules
1. FinOps maturity assessment: visibility, allocation, forecasting, optimisation, governance, accountability and value realisation.
2. FOCUS normalisation and billing data quality: source-to-standard mapping, version control, unsupported fields, lineage and invoice reconciliation.
3. Cloud cost allocation: direct/shared/unallocated spend, tag coverage, ownership, showback/chargeback and allocation reconciliation.
4. AI tokenomics and inference economics: cost per request/task/successful outcome, token mix, model tier, retries, cache use and latency/quality trade-offs.
5. GPU and accelerator optimisation: provisioned vs consumed capacity, utilisation, idle time, scheduling and hosting choices.
6. AI architecture cost assessment: RAG/CAG, vector search, caching, routing and prompt/model efficiency evaluated with controlled cost, latency and quality comparisons.
7. Forecasting and anomaly management: budgets, seasonality, commitments, deployment events, invoice delays and actionable anomaly thresholds.
8. Value-realisation roadmap: baseline, opportunity, estimated range, confidence, owner, effort, risk, measurement and verified realised benefit.

### Safety and precision boundaries
- Specify FOCUS version and preserve raw provider billing records and native fields.
- Reconcile normalised spend to provider invoices and state cost basis (gross/net, credits, discounts, taxes, amortised commitments).
- Do not invent model pricing, token rates, GPU utilisation, allocation keys, savings or business value.
- Cost per successful outcome requires reliable joins between cost telemetry, usage and outcome measures.
- Optimisation must test cost alongside model quality, latency, reliability, privacy and security.
- Separate theoretical savings, approved opportunity, implemented change and measured realised savings.
- Do not claim compliance with a FinOps framework or certification from prompt output.

## Cross-domain prompt construction method
Each prompt should specify role and decision context; required source data, system, period, entity, currency and definitions; method and calculation/matching logic before results; evidence traceability and distinction between source facts, calculations, assumptions and questions; missing-data and exception behaviour; deliverable formats; independent validation and human approval gates; operational ownership, auditability and production monitoring where automation is involved.

## Implemented playbooks in AI Finance Studio
- order-to-cash-collections-control-tower
- finops-cloud-ai-unit-economics-and-value

Both use the shared prompt control block and provide role context, source-input requirements, task-specific method, deliverables, validation checks and limitations.
