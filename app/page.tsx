import Link from "next/link";
import {prompts,units,simulations,projects} from "@/lib/data";

const workflows=[
 ["01","Banking & treasury","Reconciliation, liquidity, cash positioning and exception investigation","/explore?industry=Banking"],
 ["02","Accounting operations","AP, AR, journals, month-end close and financial reporting","/explore?industry=Accounting"],
 ["03","FP&A","Budgeting, forecasting, variance bridges and management commentary","/explore?industry=Corporate%20finance"],
 ["04","Audit & controls","Evidence registers, control testing, audit sampling and data quality","/explore"]
];
const features=[
 ["⌕","Role-aware prompt discovery","Find prompts by finance function, industry, task and seniority."],
 ["✳","Prompt Studio","Turn a short text or voice request into a structured professional instruction."],
 ["▤","Finance workflow playbooks","Follow repeatable steps, source-data requirements and control checks."],
 ["◉","Verification by design","Keep assumptions, exceptions, calculations and reviewer actions visible."]
];
export default function Home(){return <main className="saas-home">
 <section className="hero-shell">
  <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
  <div className="hero-content">
   <div className="eyebrow"><span className="live-dot"/> FINANCE WORKFLOW INTELLIGENCE</div>
   <h1>Do better finance work.<br/><span>With prompts built for professionals.</span></h1>
   <p className="hero-copy">A practical workspace for banking, accounting, treasury, FP&A and audit teams. Design better AI instructions, structure your analysis and verify every result against the source.</p>
   <div className="hero-actions"><Link className="btn btn-primary" href="/explore">Explore prompt library <span>↗</span></Link><Link className="btn btn-glass" href="/studio">Open Prompt Studio</Link></div>
   <div className="hero-proof"><span><b>{prompts.length}+</b> professional templates</span><i/><span><b>8</b> learning pathways</span><i/><span><b>100%</b> synthetic practice data</span></div>
  </div>
  <div className="hero-product" aria-label="AI Finance Studio workspace preview">
   <div className="mock-window">
    <div className="mock-top"><div className="mock-dots"><i/><i/><i/></div><span>ai-finance-studio / workspace</span><span className="mock-status">● READY</span></div>
    <div className="mock-body">
     <div className="mock-sidebar"><div className="mock-logo">F</div><div className="mock-side-active">⌕</div><div>▤</div><div>✳</div><div>◷</div></div>
     <div className="mock-main"><div className="mock-greeting">WORKSPACE OVERVIEW</div><h2>What are we working on?</h2><div className="mock-search"><span>⌕</span> Reconcile bank transactions against the cash ledger… <b>↵</b></div>
      <div className="mock-section-label">SUGGESTED WORKFLOWS</div>
      <div className="mock-cards"><div><span className="mock-card-icon">↔</span><b>Bank reconciliation</b><small>Match · Investigate · Verify</small></div><div><span className="mock-card-icon purple">▥</span><b>Cash forecasting</b><small>Project · Stress test · Review</small></div></div>
      <div className="mock-output"><div><span className="mock-green"/> STRUCTURED PROMPT</div><p>Define source inputs, matching rules, exception logic and control totals…</p><div className="mock-tags"><span>Source traceability</span><span>Human review</span><span>Google Sheets</span></div></div>
     </div>
    </div>
   </div>
   <div className="floating-note"><span>✓</span><div><b>Controls included</b><small>Evidence · Exceptions · Validation</small></div></div>
  </div>
 </section>
 <section className="metric-strip"><div><b>{prompts.length}</b><span>Professional prompts</span></div><div><b>{units.length}</b><span>Course units</span></div><div><b>{simulations.length}</b><span>Practice simulations</span></div><div><b>{projects.length}</b><span>Applied projects</span></div></section>
 <section className="section-wrap">
  <div className="section-intro"><div><div className="eyebrow dark">BUILT AROUND YOUR WORK</div><h2>Finance is not one workflow.<br/>Your prompts shouldn't be either.</h2></div><p>Go beyond generic AI prompts. Start with the finance function, the control objective and the evidence a real professional needs.</p></div>
  <div className="workflow-grid">{workflows.map(([n,t,d,href])=><Link className="workflow-card" href={href} key={n}><span className="workflow-no">{n}</span><h3>{t}</h3><p>{d}</p><span className="card-arrow">Explore workflows ↗</span></Link>)}</div>
 </section>
 <section className="studio-band"><div><div className="eyebrow">FROM IDEA TO WORKING INSTRUCTION</div><h2>Start with a sentence.<br/>Build a better prompt.</h2><p>Describe the finance task in plain language or dictate it. Prompt Studio structures the request with context, source inputs, constraints and verification requirements.</p><Link className="btn btn-primary" href="/studio">Build a prompt <span>↗</span></Link></div><div className="studio-steps"><div><span>01</span><b>Describe the task</b><small>Type a sentence or use voice input</small></div><div><span>02</span><b>Structure the instruction</b><small>Add context, data and control rules</small></div><div><span>03</span><b>Use and verify</b><small>Run in your own Gemini session; validate in Sheets</small></div></div></section>
 <section className="section-wrap">
  <div className="section-intro"><div><div className="eyebrow dark">A BETTER WAY TO WORK WITH AI</div><h2>Designed for professional<br/>finance workflows.</h2></div><p>Useful structure, not magic buttons. Keep the analyst in control from source data through final review.</p></div>
  <div className="feature-grid">{features.map(([ic,t,d])=><div className="feature-card" key={t}><span>{ic}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
 </section>
 <section className="pricing-preview"><div><div className="eyebrow">SIMPLE, PRACTICAL ACCESS</div><h2>Professional prompts.<br/>Without enterprise pricing.</h2><p>Get five prompt generations every day at no cost. Upgrade to Premium for $5.99 per month when you need the full professional workspace.</p></div><div className="price-mini"><div className="price-mini-label">PREMIUM MONTHLY</div><div className="price-mini-value">$5.99<span>/ month</span></div><p>Expanded professional prompt workspace</p><Link className="btn btn-primary" href="/plans">Compare plans <span>↗</span></Link><small>Subscription checkout is not enabled yet.</small></div></section>
 <section className="principle-strip"><span>THE OPERATING PRINCIPLE</span><b>Gemini assists.</b><b>Google Sheets calculates.</b><b>Humans verify.</b></section>
 <div className="bottom-note">Educational workspace using synthetic examples. Do not enter confidential customer, employee, bank or company data into an unapproved AI service. AI outputs require independent verification.</div>
</main>}