"use client";
import {useMemo,useState} from "react";
import Link from "next/link";
import {prompts} from "@/lib/data";

export default function Explore(){
 const [q,setQ]=useState("");
 const [cat,setCat]=useState("All");
 const [industry,setIndustry]=useState("All");
 const [topic,setTopic]=useState("All");
 const [lens,setLens]=useState("All");
 const cats=["All",...Array.from(new Set(prompts.map(p=>p.category))).sort()];
 const industries=["All",...Array.from(new Set(prompts.flatMap(p=>p.industry.split(" · ").map(x=>x.trim())))).sort()];
 const topics=["All",...Array.from(new Set(prompts.map(p=>p.topic))).sort()];
 const lenses=["All",...Array.from(new Set(prompts.flatMap(p=>p.advisoryLens))).sort()];
  const rolePaths=[
   {role:"FP&A / Finance Business Partner",topic:"Corporate finance, FP&A & performance",desc:"Driver-based planning, forecast cycles, variance bridges, profitability and executive commentary."},
   {role:"Bank ALM / Liquidity Risk",topic:"Banking, treasury & liquidity",desc:"NII and EVE sensitivity, liquidity ladders, deposit behaviour, funding and ALCO packs."},
   {role:"Regulatory Reporting",topic:"Risk, audit & regulatory controls",desc:"COREP, FINREP or US reporting workflows, data lineage, reconciliations and validation evidence."},
   {role:"Finance Transformation",topic:"Finance transformation & data",desc:"R2R, P2P, O2C, operating models, process diagnostics, benefits cases and roadmap design."},
   {role:"Transaction Services / FDD",topic:"Transaction services & due diligence",desc:"Quality of earnings, working capital, net debt, cash conversion and evidence-backed red flags."},
   {role:"Finance Strategy / CFO Advisory",topic:"Finance consulting & strategy",desc:"MECE issue trees, value drivers, strategic options, quantified opportunities and board-ready decisions."}
  ];

 const results=useMemo(()=>prompts.filter(p=>(cat==="All"||p.category===cat)&&(industry==="All"||p.industry.split(" · ").includes(industry))&&(topic==="All"||p.topic===topic)&&(lens==="All"||p.advisoryLens.includes(lens))&&[p.title,p.desc,p.category,p.topic,p.advisoryLens.join(" "),p.industry,p.role,...p.tags,...p.requiredInputs].join(" ").toLowerCase().includes(q.toLowerCase())),[q,cat,industry,topic,lens]);
 return <main className="container">
  <div className="eyebrow">Professional finance prompt library</div>
  <h1 className="page-title">Prompts built around real finance work.</h1>
  <p className="lead">Browse by finance discipline, industry, task or consulting approach. Use strategy, performance-improvement, transformation, risk and assurance lenses to structure the work with professional-grade precision. Every template includes required source inputs, an explicit method, exception handling, deliverables and independent validation checks.</p>
  <section className="role-pathways" aria-label="Browse prompts by finance role">
   <div className="role-pathways-head"><div><div className="eyebrow dark">JOB-ALIGNED FINANCE WORK</div><h2>Start from the role you do.</h2></div><p>Prompt collections mapped to recurring responsibilities found in US and European finance job descriptions.</p></div>
   <div className="role-pathways-grid">{rolePaths.map(r=><button type="button" key={r.role} className={topic===r.topic?"role-path-card selected":"role-path-card"} onClick={()=>setTopic(topic===r.topic?"All":r.topic)}><strong>{r.role}</strong><span>{r.desc}</span><em>{topic===r.topic?"Selected · clear":"Explore role prompts ↗"}</em></button>)}</div>
  </section>
  <div className="toolbar" style={{flexWrap:"wrap"}}>
   <input className="field" style={{flex:"2 1 280px"}} aria-label="Search finance prompts" placeholder="Search reconciliation, strategy, diligence, cash forecasting, audit, AP, FX…" value={q} onChange={e=>setQ(e.target.value)}/>
   <select className="field" aria-label="Filter by workflow" value={cat} onChange={e=>setCat(e.target.value)}>{cats.map(c=><option key={c} value={c}>{c==="All"?"All workflows":c}</option>)}</select>
   <select className="field" aria-label="Filter by industry" value={industry} onChange={e=>setIndustry(e.target.value)}>{industries.map(c=><option key={c} value={c}>{c==="All"?"All industries":c}</option>)}</select>
   <select className="field" aria-label="Filter by finance topic" value={topic} onChange={e=>setTopic(e.target.value)}>{topics.map(c=><option key={c} value={c}>{c==="All"?"All finance topics":c}</option>)}</select>
   <select className="field" aria-label="Filter by advisory approach" value={lens} onChange={e=>setLens(e.target.value)}>{lenses.map(c=><option key={c} value={c}>{c==="All"?"All advisory approaches":c}</option>)}</select>
  </div>
  <p className="meta">{results.length} professional prompts · {prompts.length} total</p>
  <div className="grid">{results.map(p=><Link className="card" href={"/prompts/"+p.slug} key={p.slug}>
   <div className="meta"><span className="pill">{p.category}</span><span>{p.level}</span></div>
   <h3>{p.title}</h3><p>{p.desc}</p>
   <div className="meta" style={{marginTop:10}}><b>{p.topic}</b></div>
   <div className="meta" style={{marginTop:6}}>Approach: {p.advisoryLens.join(" · ")}</div>
   <div className="meta" style={{marginTop:12}}><span>{p.industry}</span></div>
   <div className="meta" style={{marginTop:8}}>Designed for: {p.role}</div>
   <div className="meta" style={{marginTop:8}}>Unit {p.unit} · {p.tags.join(" · ")}</div>
  </Link>)}</div>
  {!results.length&&<div className="card" style={{marginTop:18}}>No prompts match these filters. Broaden the search or select All workflows and All industries.</div>}
  <div className="notice" style={{marginTop:28}}>These are professional starting templates, not pre-approved procedures. Replace example context with your organisation's approved policies, chart of accounts, data definitions, tolerances and control owners. Never enter confidential financial or personal data into an unapproved AI service.</div>
 </main>
}