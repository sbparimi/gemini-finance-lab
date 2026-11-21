"use client";
import {useMemo,useState} from "react";
import Link from "next/link";
import {prompts} from "@/lib/data";

export default function Explore(){
 const [q,setQ]=useState("");
 const [cat,setCat]=useState("All");
 const [industry,setIndustry]=useState("All");
 const cats=["All",...Array.from(new Set(prompts.map(p=>p.category))).sort()];
 const industries=["All",...Array.from(new Set(prompts.flatMap(p=>p.industry.split(" · ").map(x=>x.trim())))).sort()];
 const results=useMemo(()=>prompts.filter(p=>(cat==="All"||p.category===cat)&&(industry==="All"||p.industry.split(" · ").includes(industry))&&[p.title,p.desc,p.category,p.industry,p.role,...p.tags,...p.requiredInputs].join(" ").toLowerCase().includes(q.toLowerCase())),[q,cat,industry]);
 return <main className="container">
  <div className="eyebrow">Professional finance prompt library</div>
  <h1 className="page-title">Prompts built around real finance work.</h1>
  <p className="lead">Search by workflow, industry, finance role or control problem. Every template includes required source inputs, an explicit method, exception handling, deliverables and independent validation checks.</p>
  <div className="toolbar" style={{flexWrap:"wrap"}}>
   <input className="field" style={{flex:"2 1 280px"}} aria-label="Search finance prompts" placeholder="Search reconciliation, cash forecasting, audit, AP, FX…" value={q} onChange={e=>setQ(e.target.value)}/>
   <select className="field" aria-label="Filter by workflow" value={cat} onChange={e=>setCat(e.target.value)}>{cats.map(c=><option key={c} value={c}>{c==="All"?"All workflows":c}</option>)}</select>
   <select className="field" aria-label="Filter by industry" value={industry} onChange={e=>setIndustry(e.target.value)}>{industries.map(c=><option key={c} value={c}>{c==="All"?"All industries":c}</option>)}</select>
  </div>
  <p className="meta">{results.length} professional prompts · {prompts.length} total</p>
  <div className="grid">{results.map(p=><Link className="card" href={"/prompts/"+p.slug} key={p.slug}>
   <div className="meta"><span className="pill">{p.category}</span><span>{p.level}</span></div>
   <h3>{p.title}</h3><p>{p.desc}</p>
   <div className="meta" style={{marginTop:12}}><span>{p.industry}</span></div>
   <div className="meta" style={{marginTop:8}}>Designed for: {p.role}</div>
   <div className="meta" style={{marginTop:8}}>Unit {p.unit} · {p.tags.join(" · ")}</div>
  </Link>)}</div>
  {!results.length&&<div className="card" style={{marginTop:18}}>No prompts match these filters. Broaden the search or select All workflows and All industries.</div>}
  <div className="notice" style={{marginTop:28}}>These are professional starting templates, not pre-approved procedures. Replace example context with your organisation's approved policies, chart of accounts, data definitions, tolerances and control owners. Never enter confidential financial or personal data into an unapproved AI service.</div>
 </main>
}