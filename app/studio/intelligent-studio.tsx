"use client";
import { useState } from "react";
import { financeWorkspaces } from "@/lib/taxonomy";

type Result = {
  status: string; primaryTopic: string; primaryWorkspace: { title: string };
  relatedTopics: string[]; topicRationale: string; businessObjective: string;
  professionalRole: string; methodology: string[]; requiredInputs: string[];
  missingInformation: string[]; confidence: number; prompt: string;
  validationChecks: string[];
  evaluation: { score: number; verdict: string; criticalFailures: string[]; findings: string[]; improvements: string[] };
  model: string; evaluationNotice: string;
};
export default function IntelligentStudio() {
  const [brief,setBrief]=useState("");
  const [context,setContext]=useState("");
  const [availableData,setAvailableData]=useState("");
  const [constraints,setConstraints]=useState("Do not invent missing data. Separate facts from assumptions. Flag exceptions for human review. Never approve transactions, post journals, change balances or contact customers automatically.");
  const [requestedOutput,setRequestedOutput]=useState("Provide a practical analysis, implementation steps, expected deliverables and a validation checklist.");
  const [details,setDetails]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [result,setResult]=useState<Result|null>(null);
  const [voiceStatus,setVoiceStatus]=useState("Text input is always available.");
  async function generate() {
    setLoading(true); setError(""); setResult(null);
    try {
      const response=await fetch("/api/finance/generate",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({brief,context,availableData,constraints,requestedOutput})});
      const data=await response.json();
      if(!response.ok) throw new Error(data.error||"Generation failed.");
      setResult(data as Result);
    } catch(e) { setError(e instanceof Error?e.message:"Generation failed."); }
    finally { setLoading(false); }
  }
  function dictate() {
    const w=window as Window & {SpeechRecognition?:new()=>any;webkitSpeechRecognition?:new()=>any};
    const C=w.SpeechRecognition||w.webkitSpeechRecognition;
    if(!C){setVoiceStatus("Speech recognition is not supported in this browser.");return;}
    const r=new C();r.lang="en-NL";r.interimResults=false;r.continuous=false;
    r.onresult=(e:any)=>{const t=Array.from(e.results as ArrayLike<ArrayLike<{transcript:string}>>).map(x=>x[0]?.transcript||"").join(" ");setBrief(v=>v?v+" "+t:t);setVoiceStatus("Transcript added. Review it before generating.");};
    r.onerror=()=>setVoiceStatus("Voice input failed. Type your request instead.");
    r.onend=()=>setVoiceStatus("Voice input ended.");
    setVoiceStatus("Listening…");r.start();
  }
  return <main className="container">
    <div className="eyebrow">AI-powered finance intelligence</div>
    <h1 className="page-title">Describe the work. Get a structured prompt.</h1>
    <p className="lead">Semantic topic classification, professional prompt generation and a separate quality review. Start with your actual task; the engine maps it to the approved finance taxonomy.</p>
    <div className="twocol" style={{marginTop:28}}>
      <section className="card">
        <h2>Your finance request</h2>
        <label className="meta" htmlFor="finance-brief">Describe the problem or outcome <span style={{color:"#b54747"}}>Required · minimum 12 characters</span></label>
        <textarea id="finance-brief" className="field" style={{width:"100%",minHeight:170,margin:"8px 0 10px"}} placeholder="Example: Our enterprise DSO increased by 12 days this quarter. Identify the drivers, distinguish billing and dispute issues from customer payment behaviour, and prepare a weekly action plan." value={brief} onChange={e=>setBrief(e.target.value)} />
        <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
          <button type="button" className="btn" onClick={dictate}>Use voice input</button><span className="meta" aria-live="polite">{voiceStatus}</span>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:24}}>
          <h3 style={{margin:0}}>Additional context</h3>
          <button type="button" className="link" style={{border:0,background:"transparent",cursor:"pointer"}} onClick={()=>setDetails(v=>!v)}>{details?"Hide details":"Add context and constraints"}</button>
        </div>
        {details&&<div style={{marginTop:16}}>
          <label className="meta" htmlFor="context">Business / industry context</label><textarea id="context" className="field" style={{width:"100%",minHeight:72,margin:"7px 0 14px"}} value={context} onChange={e=>setContext(e.target.value)} placeholder="Industry, role, business model, jurisdiction (if relevant)…"/>
          <label className="meta" htmlFor="available-data">Available data and source systems</label><textarea id="available-data" className="field" style={{width:"100%",minHeight:72,margin:"7px 0 14px"}} value={availableData} onChange={e=>setAvailableData(e.target.value)} placeholder="Describe available reports, columns, definitions and time periods. Do not paste confidential data."/>
          <label className="meta" htmlFor="constraints">Rules and constraints</label><textarea id="constraints" className="field" style={{width:"100%",minHeight:72,margin:"7px 0 14px"}} value={constraints} onChange={e=>setConstraints(e.target.value)}/>
          <label className="meta" htmlFor="expected-output">Expected deliverable</label><textarea id="expected-output" className="field" style={{width:"100%",minHeight:72,margin:"7px 0 0"}} value={requestedOutput} onChange={e=>setRequestedOutput(e.target.value)}/>
        </div>}
        <button className="btn" style={{marginTop:22,cursor:"pointer",opacity:brief.trim().length>=12&&!loading?1:.5}} disabled={brief.trim().length<12||loading} onClick={generate}>{loading?"Classifying · generating · reviewing…":"Generate and evaluate prompt ↗"}</button>
        <p className="footer-note" style={{marginTop:12}}>Your request is sent to the configured server-side Gemini API for processing. Do not submit personal, customer, employee, bank or confidential financial data unless the service has been approved for that data.</p>
        {error&&<div className="notice" role="alert" style={{marginTop:14}}>{error}</div>}
      </section>
      <section>
        {!result&&!loading&&<div className="promptbox">Your recommended finance topic, related subjects, generated prompt and quality review will appear here.</div>}
        {loading&&<div className="promptbox" aria-live="polite">Understanding the request…<br/><br/>1. Classifying against approved finance workspaces<br/>2. Generating a task-specific professional prompt<br/>3. Running an independent quality review</div>}
        {result&&<div className="card" aria-live="polite">
          <div className="meta">RECOMMENDED PRIMARY TOPIC</div><h2 style={{marginTop:6}}>{result.primaryTopic}</h2><p className="meta">{result.primaryWorkspace.title} · {result.professionalRole}</p>
          <p>{result.topicRationale}</p>
          {result.relatedTopics.length>0&&<><div className="meta" style={{marginTop:16}}>RELATED TOPICS</div><div style={{display:"flex",gap:7,flexWrap:"wrap",marginTop:8}}>{result.relatedTopics.map(t=><span className="tag" key={t}>{t}</span>)}</div></>}
          <div className="notice" style={{marginTop:16}}>Quality review: {result.evaluation.verdict.toUpperCase()} · {result.evaluation.score}/100 · model {result.model}. {result.evaluationNotice}</div>
          {result.missingInformation.length>0&&<><h3>Information still required</h3><ul>{result.missingInformation.map(x=><li key={x}>{x}</li>)}</ul></>}
          {result.evaluation.criticalFailures.length>0&&<><h3>Critical findings</h3><ul>{result.evaluation.criticalFailures.map(x=><li key={x}>{x}</li>)}</ul></>}
          {result.evaluation.improvements.length>0&&<><h3>Recommended improvements</h3><ul>{result.evaluation.improvements.map(x=><li key={x}>{x}</li>)}</ul></>}
          <div className="meta" style={{marginTop:20}}>GENERATED PROFESSIONAL PROMPT</div><div className="promptbox" style={{whiteSpace:"pre-wrap",marginTop:8}}>{result.prompt}</div>
          <button className="btn" style={{marginTop:12}} onClick={()=>navigator.clipboard.writeText(result.prompt)}>Copy prompt</button>
          <h3>Required inputs</h3><ul>{result.requiredInputs.map(x=><li key={x}>{x}</li>)}</ul>
          <h3>Validation checks</h3><ul>{result.validationChecks.map(x=><li key={x}>{x}</li>)}</ul>
          <p className="footer-note">Confidence {Math.round(result.confidence*100)}% is a model estimate, not a calibrated probability. Automated review is not professional certification. Verify all financial outputs independently.</p>
        </div>}
      </section>
    </div>
    <section style={{marginTop:36}}><div className="meta">SUPPORTED FINANCE WORKSPACES</div><div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:10}}>{financeWorkspaces.map(w=><span className="tag" key={w.slug}>{w.title}</span>)}</div></section>
  </main>;
}
