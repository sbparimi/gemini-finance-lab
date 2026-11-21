"use client";
import {useEffect,useMemo,useState} from "react";
import Link from "next/link";
import {prompts} from "@/lib/data";

export default function Explore(){
 const [q,setQ]=useState("");
 const [cat,setCat]=useState("All");
 const [industry,setIndustry]=useState("All");
 const [topic,setTopic]=useState("All");
 const [lens,setLens]=useState("All");
 useEffect(()=>{const params=new URLSearchParams(window.location.search);const search=params.get("search");if(search)setQ(search);},[]);
 const cats=["All",...Array.from(new Set(prompts.map(p=>p.category))).sort()];
 const industries=["All",...Array.from(new Set(prompts.flatMap(p=>p.industry.split(" · ").map(x=>x.trim())))).sort()];
 const topics=["All",...Array.from(new Set(prompts.map(p=>p.topic))).sort()];
 const lenses=["All",...Array.from(new Set(prompts.flatMap(p=>p.advisoryLens))).sort()];
 const rolePaths=[
  {role:"FP&A / Finance Business Partner",topic:"Corporate finance, FP&A & performance",desc:"Driver-based planning, forecast cycles, variance bridges, profitability and executive commentary.",icon:"↗"},
  {role:"Bank ALM / Liquidity Risk",topic:"Banking, treasury & liquidity",desc:"NII and EVE sensitivity, liquidity ladders, deposit behaviour, funding and ALCO packs.",icon:"◈"},
  {role:"Regulatory Reporting",topic:"Risk, audit & regulatory controls",desc:"COREP, FINREP or US reporting workflows, data lineage, reconciliations and validation evidence.",icon:"▤"},
  {role:"Finance Transformation",topic:"Finance transformation & data",desc:"R2R, P2P, O2C, operating models, process diagnostics, benefits cases and roadmap design.",icon:"⌘"},
  {role:"Transaction Services / FDD",topic:"Transaction services & due diligence",desc:"Quality of earnings, working capital, net debt, cash conversion and evidence-backed red flags.",icon:"◫"},
  {role:"Finance Strategy / CFO Advisory",topic:"Finance consulting & strategy",desc:"MECE issue trees, value drivers, strategic options, quantified opportunities and board-ready decisions.",icon:"⌁"},
  {role:"Order-to-Cash / Collections Lead",topic:"Order-to-Cash, AR & collections",desc:"DSO, cash conversion, enterprise collections, dispute root causes, credit controls, remittance matching and AI-assisted outreach.",icon:"↻"},
  {role:"Finance Automation Lead",topic:"Finance automation & AI operations",desc:"Map finance workflows, prioritise automation by value and risk, design reconciliations, close workflows and human-in-the-loop controls.",icon:"⚙"},
  {role:"FinOps for AI Practitioner",topic:"FinOps for cloud & AI",desc:"FOCUS data, cloud allocation, token and inference costs, GPU utilisation, AI unit economics, showback and value realisation.",icon:"◎"}
 ];
 const results=useMemo(()=>prompts.filter(p=>(cat==="All"||p.category===cat)&&(industry==="All"||p.industry.split(" · ").includes(industry))&&(topic==="All"||p.topic===topic)&&(lens==="All"||p.advisoryLens.includes(lens))&&[p.title,p.desc,p.category,p.topic,p.advisoryLens.join(" "),p.industry,p.role,...p.tags,...p.requiredInputs].join(" ").toLowerCase().includes(q.toLowerCase())),[q,cat,industry,topic,lens]);
 const activeCount=[q.trim()!=="" ,cat!=="All",industry!=="All",topic!=="All",lens!=="All"].filter(Boolean).length;
 const clearFilters=()=>{setQ("");setCat("All");setIndustry("All");setTopic("All");setLens("All");};
 return <main className="container explore-page">
  <section className="explore-intro">
   <div className="eyebrow">FINANCE INTELLIGENCE / PROMPT LIBRARY</div>
   <h1 className="page-title">Find the right prompt for the work.</h1>
   <p className="lead">Explore practical finance workflows by role, industry, discipline and advisory approach. Each prompt includes source requirements, a defined method, deliverables and validation checks.</p>
  </section>
  <section className="explore-filter-panel" aria-label="Search and filter finance prompts">
   <div className="filter-panel-top">
    <div><span className="filter-kicker">PROMPT DISCOVERY</span><h2>What are you working on?</h2><p>Search the library or narrow it down with filters.</p></div>
    <div className="result-counter"><strong>{results.length}</strong><span>of {prompts.length} prompts</span></div>
   </div>
   <div className="explore-search-wrap"><span aria-hidden="true">⌕</span><input aria-label="Search finance prompts" placeholder="Search by task, keyword, role or finance concept…" value={q} onChange={e=>setQ(e.target.value)}/>{q&&<button type="button" onClick={()=>setQ("")} aria-label="Clear search">×</button>}</div>
   <div className="explore-filter-grid">
    <label><span>Workflow</span><select value={cat} onChange={e=>setCat(e.target.value)}>{cats.map(c=><option key={c} value={c}>{c==="All"?"All workflows":c}</option>)}</select></label>
    <label><span>Industry</span><select value={industry} onChange={e=>setIndustry(e.target.value)}>{industries.map(c=><option key={c} value={c}>{c==="All"?"All industries":c}</option>)}</select></label>
    <label><span>Finance topic</span><select value={topic} onChange={e=>setTopic(e.target.value)}>{topics.map(c=><option key={c} value={c}>{c==="All"?"All finance topics":c}</option>)}</select></label>
    <label><span>Advisory approach</span><select value={lens} onChange={e=>setLens(e.target.value)}>{lenses.map(c=><option key={c} value={c}>{c==="All"?"All approaches":c}</option>)}</select></label>
   </div>
   <div className="filter-panel-bottom"><span>{activeCount===0?"Showing the complete prompt library":activeCount+" active filter"+(activeCount===1?"":"s")}</span>{activeCount>0&&<button type="button" onClick={clearFilters}>Clear all filters <span aria-hidden="true">↗</span></button>}</div>
  </section>
  <section className="role-pathways" aria-label="Browse prompts by finance role">
   <div className="role-pathways-head"><div><div className="eyebrow dark">JOB-ALIGNED FINANCE WORK</div><h2>Explore by your role</h2></div><p>Curated pathways mapped to recurring responsibilities across finance teams and advisory roles.</p></div>
   <div className="role-pathways-grid">{rolePaths.map(r=><button type="button" key={r.role} className={topic===r.topic?"role-path-card selected":"role-path-card"} onClick={()=>setTopic(topic===r.topic?"All":r.topic)}><span className="role-path-icon" aria-hidden="true">{r.icon}</span><strong>{r.role}</strong><span>{r.desc}</span><em>{topic===r.topic?"Selected · clear":"Explore role prompts ↗"}</em></button>)}</div>
  </section>
  <section className="explore-results" aria-label="Finance prompt results">
   <div className="results-heading"><div><div className="eyebrow dark">THE LIBRARY</div><h2>Professional prompts</h2></div><span>{results.length} results</span></div>
   {results.length>0?<div className="grid">{results.map(p=><Link className="card" href={"/prompts/"+p.slug} key={p.slug}>
    <div className="meta"><span className="pill">{p.category}</span><span>{p.level}</span></div>
    <h3>{p.title}</h3><p>{p.desc}</p>
    <div className="meta" style={{marginTop:10}}><b>{p.topic}</b></div>
    <div className="meta" style={{marginTop:6}}>Approach: {p.advisoryLens.join(" · ")}</div>
    <div className="meta" style={{marginTop:12}}><span>{p.industry}</span></div>
    <div className="meta" style={{marginTop:8}}>Designed for: {p.role}</div>
    <div className="meta" style={{marginTop:8}}>Unit {p.unit} · {p.tags.join(" · ")}</div>
   </Link>)}</div>:<div className="explore-empty"><span aria-hidden="true">⌕</span><h3>No matching prompts</h3><p>Try a broader keyword or remove one or more filters to see more of the library.</p><button type="button" onClick={clearFilters}>Reset search and filters</button></div>}
  </section>
  <div className="notice" style={{marginTop:30}}>These are professional starting templates, not pre-approved procedures. Replace example context with your organisation's approved policies, chart of accounts, data definitions, tolerances and control owners. Never enter confidential financial or personal data into an unapproved AI service.</div>
 </main>
}
