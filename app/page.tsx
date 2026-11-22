import Link from "next/link";
import {financeWorkspaces,professionalMethods} from "@/lib/taxonomy";

const journeys=[
 {n:"01",label:"INVESTIGATE",title:"Find what changed",body:"Structure a question around movements, exceptions, root causes and supporting evidence.",example:"Receivables · cash flow · reconciliations",href:"/explore?search=investigation"},
 {n:"02",label:"PLAN",title:"Make the numbers useful",body:"Build a clear analysis plan for budgets, forecasts, scenarios and performance conversations.",example:"FP&A · forecasting · variance analysis",href:"/explore?search=forecast"},
 {n:"03",label:"CONTROL",title:"Make the work reviewable",body:"Organise controls, assumptions, validation steps, ownership and unresolved questions.",example:"Close · audit · risk · governance",href:"/explore?search=controls"}
];
const capabilities=[
 {symbol:"⌕",title:"Find the right starting point",body:"Search finance topics and professional playbooks by the work you need to complete.",href:"/explore",action:"Explore the finance library"},
 {symbol:"✳",title:"Shape a better instruction",body:"Turn a plain-language task into a structured prompt with context, inputs and review criteria.",href:"/studio",action:"Open Prompt Studio"},
 {symbol:"◫",title:"Build practical capability",body:"Practise with guided simulations and applied finance projects using controlled examples.",href:"/simulations",action:"Explore practice"}
];
const principles=[
 {title:"Know what is known",body:"Keep supplied facts, assumptions, estimates and model-generated interpretations distinct."},
 {title:"See what is missing",body:"Surface gaps, ambiguity and required inputs instead of silently filling them in."},
 {title:"Keep people accountable",body:"Make review points and decision ownership explicit. AI assists; authorised people decide."}
];
export default function Home(){
 return <main className="fx-home">
  <a className="fx-skip" href="#main-content">Skip to content</a>
  <section className="fx-hero" id="main-content">
   <div className="fx-hero-grid" aria-hidden="true"><i/><i/><i/><i/></div>
   <div className="fx-hero-inner">
    <div className="fx-hero-copy">
     <div className="fx-eyebrow"><span/> FINANCE WORK, BETTER ENGINEERED</div>
     <h1>Finance deserves more than <em>another AI answer.</em></h1>
     <p className="fx-lead">A workspace to frame the problem, choose a professional approach and produce work that people can inspect, challenge and use.</p>
     <div className="fx-hero-actions"><Link href="/studio" className="fx-primary">Start with a finance task <span>↗</span></Link><Link href="/explore" className="fx-secondary">Browse finance workflows <span>→</span></Link></div>
     <div className="fx-hero-assurance"><span><i/> Human review stays in control</span><span><i/> Evidence and assumptions stay visible</span></div>
    </div>
    <div className="fx-command" aria-label="Illustration of a structured finance workflow">
     <div className="fx-command-head"><div><span className="fx-live-dot"/> WORKSPACE / TASK DESIGN</div><span>ILLUSTRATIVE VIEW</span></div>
     <div className="fx-command-body">
      <div className="fx-command-label">YOUR FINANCE TASK</div>
      <div className="fx-command-prompt"><span>⌕</span><b>Why did operating cash flow change this quarter?</b><span className="fx-prompt-arrow">↗</span></div>
      <div className="fx-command-meta"><span>INTENT</span><b>Investigate a movement</b><span>FUNCTION</span><b>Treasury / FP&amp;A</b></div>
      <div className="fx-command-label fx-mt">A REVIEWABLE WORKFLOW</div>
      <div className="fx-flow">
       <div><span>01</span><b>Frame</b><small>Period · scope · decision</small></div><i>→</i>
       <div className="fx-flow-active"><span>02</span><b>Analyse</b><small>Drivers · method · evidence</small></div><i>→</i>
       <div><span>03</span><b>Validate</b><small>Checks · gaps · reviewer</small></div>
      </div>
      <div className="fx-command-foot"><div><span>OUTPUT</span><b>Findings and action plan</b></div><div><span>CONTROL</span><b>Human review required</b></div></div>
     </div>
     <div className="fx-command-note"><span>✓</span><div><b>Traceable by design</b><small>Facts · assumptions · open questions</small></div></div>
    </div>
   </div>
   <div className="fx-orbit fx-orbit-a"/><div className="fx-orbit fx-orbit-b"/>
  </section>
  <section className="fx-trust-strip" aria-label="Designed for finance disciplines"><span>BUILT AROUND THE WORK OF</span>{["ACCOUNTING","FP&A","BANKING","TREASURY","RISK & AUDIT","FINOPS"].map(x=><b key={x}>{x}</b>)}</section>
  <section className="fx-section fx-intro">
   <div className="fx-section-heading"><div><span className="fx-kicker">THE FINANCE WORKFLOW</span><h2>From open question<br/>to <em>defensible work.</em></h2></div><p>Good finance work is not just a polished paragraph. It is a chain of reasoning that starts with the right context and ends with a result that can be reviewed.</p></div>
   <div className="fx-journeys">{journeys.map(j=><Link href={j.href} className="fx-journey" key={j.n}><div className="fx-journey-top"><span>{j.n}</span><small>{j.label}</small><b>↗</b></div><h3>{j.title}</h3><p>{j.body}</p><div className="fx-example">{j.example}</div></Link>)}</div>
  </section>
  <section className="fx-dark-section">
   <div className="fx-section fx-system">
    <div className="fx-system-copy"><span className="fx-kicker fx-light">A BETTER WAY TO WORK WITH AI</span><h2>Not a black box.<br/><em>A working process.</em></h2><p>AI Finance is designed to make the structure around an answer visible: what was asked, which method is relevant, what information is needed and what still requires judgement.</p><Link href="/topics" className="fx-text-link">Explore the finance knowledge map ↗</Link></div>
    <div className="fx-principle-list">{principles.map((p,i)=><article key={p.title}><span>0{i+1}</span><div><h3>{p.title}</h3><p>{p.body}</p></div><b>↗</b></article>)}</div>
   </div>
  </section>
  <section className="fx-section fx-explore">
   <div className="fx-section-heading"><div><span className="fx-kicker">ONE WORKSPACE, MULTIPLE WAYS IN</span><h2>Start where your work <em>starts.</em></h2></div><p>Choose the entry point that fits your task today. Move between discovery, prompt design and practice without losing the finance context.</p></div>
   <div className="fx-capabilities">{capabilities.map(c=><article key={c.title}><div className="fx-cap-symbol">{c.symbol}</div><h3>{c.title}</h3><p>{c.body}</p><Link href={c.href}>{c.action} <span>↗</span></Link></article>)}</div>
  </section>
  <section className="fx-section fx-landscape">
   <div className="fx-section-heading"><div><span className="fx-kicker">FINANCE KNOWLEDGE, ORGANISED</span><h2>Navigate by <em>discipline.</em></h2></div><p>Explore a structured map of finance functions and topics. Start broad, then narrow down to the specific activity you need to perform.</p></div>
   <div className="fx-landscape-grid">{financeWorkspaces.slice(0,8).map((w,i)=><Link href={"/explore?search="+encodeURIComponent(w.topics[0])} key={w.slug}><span>0{i+1}</span><div><h3>{w.title}</h3><p>{w.intro}</p><small>{w.topics.slice(0,3).join(" · ")}</small></div><b>↗</b></Link>)}</div>
   <div className="fx-center"><Link href="/topics" className="fx-outline">Explore all finance workspaces <span>→</span></Link></div>
  </section>
  <section className="fx-section fx-methods">
   <div className="fx-methods-panel"><div><span className="fx-kicker fx-light">TRUST IS A PRODUCT FEATURE</span><h2>Confidence should come from <em>how the work is done.</em></h2><p>Professional methods help make assumptions, limitations and validation steps explicit. They do not replace source-system controls or qualified review.</p></div><div className="fx-methods-list">{professionalMethods.slice(0,4).map((m,i)=><div key={m.title}><span>0{i+1}</span><b>{m.title}</b><small>{m.use}</small></div>)}</div><Link href="/topics" className="fx-methods-link">Explore professional methods ↗</Link></div>
  </section>
  <section className="fx-final"><div><span className="fx-kicker fx-light">MAKE THE NEXT FINANCE TASK CLEARER</span><h2>Bring the work.<br/><em>Build it with intent.</em></h2><p>Start with a question. Leave with a structured approach you can review.</p></div><div><Link href="/studio" className="fx-primary">Open Prompt Studio ↗</Link><Link href="/signup" className="fx-final-secondary">Create your workspace</Link></div></section>
  <section className="fx-faq"><div><span className="fx-kicker">CLEAR EXPECTATIONS</span><h2>Designed for professional use.</h2></div><div className="fx-faq-list"><details><summary>Does AI Finance make financial decisions?</summary><p>No. It helps structure analysis and finance workflows. People remain responsible for validating results and making decisions.</p></details><details><summary>Can I use confidential financial information?</summary><p>Use only data approved for the service and your organisation's policies. Do not submit personal, customer, employee, bank or confidential financial data unless the service has been approved for that data.</p></details><details><summary>Are generated outputs guaranteed to be correct?</summary><p>No. AI-generated content can be incomplete or incorrect. Verify source data, calculations, assumptions and conclusions independently.</p></details></div></section>
  <p className="fx-disclaimer">AI Finance is a professional productivity and learning workspace. It is not a system of record and does not approve or execute financial transactions. Verify outputs against authoritative source data, organisational policies and applicable standards. Use synthetic or approved data only.</p>
 </main>
}
