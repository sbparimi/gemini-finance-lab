import {prompts} from "@/lib/data";
import Link from "next/link";
import {notFound} from "next/navigation";
import CopyPromptButton from "./CopyPromptButton";

export function generateStaticParams(){return prompts.map(p=>({slug:p.slug}))}

export default async function PromptPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const p=prompts.find(x=>x.slug===slug);
 if(!p)notFound();
 return <main className="container">
  <Link className="link" href="/explore">← Back to finance prompt library</Link>
  <div className="eyebrow" style={{marginTop:25}}>Unit {p.unit} · {p.category} · {p.industry}</div>
  <h1 className="page-title">{p.title}</h1>
  <p className="lead">{p.desc}</p>
  <div className="meta" style={{marginTop:14}}><span className="pill">{p.level}</span><span>Designed for: {p.role}</span><span>{p.tags.join(" · ")}</span></div>
  <div className="twocol" style={{marginTop:28,alignItems:"start"}}>
   <section>
    <div className="section-head" style={{marginTop:0}}><div><h2>Professional prompt</h2><p>Complete, copy-ready instruction set with finance controls</p></div></div>
    <div className="promptbox">{p.prompt}</div>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:14,alignItems:"center"}}><CopyPromptButton text={p.prompt}/><Link className="btn" href="/studio">Open Prompt Studio</Link></div>
    <p className="footer-note" style={{marginTop:12}}>Use this as a starting control specification. Adapt it to your organisation's chart of accounts, policies, approval matrix, data dictionary and reporting definitions before operational use.</p>
   </section>
   <aside className="card">
    <h3>Required source inputs</h3><p className="footer-note">Do not run this prompt until the required inputs and definitions are available.</p>
    <ul>{p.requiredInputs.map((x,i)=><li key={i} style={{fontSize:13,lineHeight:1.55,marginBottom:9}}>{x}</li>)}</ul>
    <h3 style={{marginTop:24}}>Expected deliverables</h3>
    <ul>{p.deliverables.map((x,i)=><li key={i} style={{fontSize:13,lineHeight:1.55,marginBottom:9}}>{x}</li>)}</ul>
   </aside>
  </div>
  <div className="grid" style={{marginTop:22}}>
   <section className="card"><h3>Independent validation checklist</h3><ul>{p.validation.map((x,i)=><li key={i} style={{fontSize:13,lineHeight:1.6,marginBottom:8}}>{x}</li>)}</ul></section>
   <section className="card"><h3>Professional limitation</h3><p>{p.limitations}</p><div className="notice">AI output is not evidence of correctness. Recalculate material amounts in Google Sheets, reconcile to source systems and obtain the required preparer/reviewer approval. Never paste confidential customer, employee, account or payment data into an unapproved AI service.</div></section>
  </div>
 </main>
}