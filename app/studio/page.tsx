"use client";
import {useEffect,useMemo,useState} from "react";

type SpeechResult = { transcript: string };
type SpeechEvent = { results: ArrayLike<ArrayLike<SpeechResult>> };
type SpeechErrorEvent = { error?: string };
type SpeechRecognitionLike = {
  lang: string; interimResults: boolean; continuous: boolean;
  onresult: ((event: SpeechEvent) => void) | null;
  onerror: ((event: SpeechErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void; stop: () => void;
};
declare global { interface Window { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike } }

export default function Studio(){
  const [brief,setBrief]=useState("");
  const [topic,setTopic]=useState("Corporate finance, FP&A & performance");
  const [lens,setLens]=useState("Strategy & decision support");
  const [context,setContext]=useState("Northstar Trading BV is a fictional wholesale business. Use only the information supplied by the learner.");
  const [inputs,setInputs]=useState("");
  const [rules,setRules]=useState("Do not invent missing data. Separate facts from assumptions. Flag exceptions for human review. Never approve transactions or change balances automatically.");
  const [output,setOutput]=useState("Recommend the Google Sheets workbook structure, formulas or functions, validation checks, exception handling and a step-by-step build plan.");
  const [showOptions,setShowOptions]=useState(false);
  const [voiceStatus,setVoiceStatus]=useState("You can type a short request or dictate it.");
  const [listening,setListening]=useState(false);
  useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    const incomingTopic=params.get("topic");
    const incomingLens=params.get("lens");
    const incomingBrief=params.get("brief");
    if(incomingTopic)setTopic(incomingTopic);
    if(incomingLens)setLens(incomingLens);
    if(incomingBrief)setBrief(incomingBrief);
  },[]);
  const prompt=useMemo(()=>[
    "Act as a senior finance and business advisory analyst. Apply rigorous, evidence-led professional-services standards without claiming affiliation with or reproducing any firm's proprietary methodology.",
    "FINANCE TOPIC\n"+topic,
    "ADVISORY APPROACH\n"+lens,
    "METHOD DISCIPLINE\nUse a clear problem statement, define scope and decision required, structure the analysis into mutually exclusive and collectively exhaustive workstreams where appropriate, state hypotheses and evidence needed, quantify value/risk only from supplied data, distinguish facts from assumptions, and close with implications, options, risks, owners and next steps. Use issue trees, driver trees, scenario analysis, benchmarking or diligence tests only when relevant and when inputs support them.",
    "LEARNER REQUEST\n"+brief.trim(),
    context.trim()?"BUSINESS CONTEXT\n"+context.trim():"",
    inputs.trim()?"AVAILABLE INPUT DATA\n"+inputs.trim():"INPUT DATA\nThe learner has not supplied source data or column definitions. Ask for the missing information; do not assume it.",
    "RULES AND CONTROLS\n"+rules.trim(),
    "REQUIRED RESPONSE\n"+output.trim(),
    "Explain the proposed approach before giving implementation steps. Identify assumptions and missing information. Do not fabricate transactions, balances, benchmarks, market data, peer comparisons, strategy conclusions or results. Include a validation checklist and identify every decision requiring human approval. For regulatory, accounting, tax or audit work, require the user to provide the applicable jurisdiction, standard, policy and effective date before making a compliance conclusion."
  ].filter(Boolean).join("\n\n"),[brief,context,inputs,rules,output]);
  function startVoice(){
    const Constructor=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!Constructor){setVoiceStatus("Voice input is not supported in this browser. Use the text field.");return;}
    const recognition=new Constructor();
    recognition.lang="en-NL"; recognition.interimResults=false; recognition.continuous=false;
    recognition.onresult=(event)=>{const transcript=Array.from(event.results).map(r=>r[0]?.transcript||"").join(" ").trim();if(transcript)setBrief(current=>current?current+" "+transcript:transcript);setVoiceStatus("Voice input added. Review the text before copying.");};
    recognition.onerror=(event)=>{setVoiceStatus(event.error==="not-allowed"?"Microphone permission was denied. Enable microphone access in the browser or type your request.":"Voice input could not be completed. Try again or type your request.");setListening(false);};
    recognition.onend=()=>setListening(false);
    setVoiceStatus("Listening. Speak your finance task.");
    setListening(true);
    try{recognition.start();}catch{setListening(false);setVoiceStatus("Voice input could not start. Try again or type your request.");}
  }
  return <main className="container">
    <div className="eyebrow">Prompt Studio</div>
    <h1 className="page-title">Start with a simple request.</h1>
    <p className="lead">Describe the finance task in your own words. A short sentence is enough to start. Choose a finance topic and advisory approach, then type or dictate the task. The generator adds a structured, evidence-led method and control checks.</p>
    <div className="twocol" style={{marginTop:28}}>
      <section className="card">
        <h2>Your finance request</h2>
        <label className="meta" htmlFor="finance-topic">Finance topic</label>
        <select id="finance-topic" className="field" style={{width:"100%",margin:"8px 0 14px"}} value={topic} onChange={e=>setTopic(e.target.value)}>
          <option>Banking, treasury & liquidity</option><option>Accounting & controllership</option><option>Corporate finance, FP&A & performance</option><option>Risk, audit & regulatory controls</option><option>Finance transformation & data</option><option>Finance consulting & strategy</option><option>Transaction services & due diligence</option><option>Order-to-Cash, AR & collections</option><option>Finance automation & AI operations</option><option>FinOps for cloud & AI</option>
        </select>
        <label className="meta" htmlFor="advisory-lens">Professional advisory approach</label>
        <select id="advisory-lens" className="field" style={{width:"100%",margin:"8px 0 14px"}} value={lens} onChange={e=>setLens(e.target.value)}>
          <option>Strategy & decision support</option><option>Performance improvement</option><option>Finance transformation</option><option>Process diagnostic</option><option>Risk & scenario analysis</option><option>Controls & assurance</option><option>Transaction diligence</option><option>Executive reporting</option><option>Operational excellence</option><option>Evidence-led analysis</option><option>Working capital optimisation</option><option>Technology cost optimisation</option><option>Unit economics</option>
        </select>
        <label className="meta" htmlFor="finance-brief">What do you want to accomplish? <span style={{color:"#b54747"}}>Required</span></label>
        <textarea id="finance-brief" className="field" style={{width:"100%",minHeight:150,margin:"8px 0 10px"}} placeholder="Example: I need to reconcile this month's bank statement against the general ledger and identify unmatched transactions." value={brief} onChange={e=>setBrief(e.target.value)}/>
        <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
          <button type="button" className="btn" style={{cursor:"pointer",background:listening?"#dce8ff":"#17243d",color:listening?"#17243d":"white"}} onClick={listening?undefined:startVoice} disabled={listening}>{listening?"Listening…":"Use voice input"}</button>
          <span className="meta" aria-live="polite">{voiceStatus}</span>
        </div>
        <p className="footer-note" style={{marginTop:10}}>Voice input uses your browser's speech recognition when supported. Microphone access is requested only when you select the voice button. You can always edit the transcript.</p>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:24}}>
          <h3 style={{margin:0}}>Optional details</h3>
          <button type="button" className="link" style={{border:0,background:"transparent",cursor:"pointer"}} onClick={()=>setShowOptions(v=>!v)}>{showOptions?"Hide details":"Add context and controls"}</button>
        </div>
        {showOptions&&<div style={{marginTop:16}}>
          <label className="meta" htmlFor="business-context">Business context</label><textarea id="business-context" className="field" style={{width:"100%",height:78,margin:"7px 0 14px"}} value={context} onChange={e=>setContext(e.target.value)}/>
          <label className="meta" htmlFor="source-data">Available data or column names</label><textarea id="source-data" className="field" style={{width:"100%",height:78,margin:"7px 0 14px"}} placeholder="Paste column names or describe the files you have." value={inputs} onChange={e=>setInputs(e.target.value)}/>
          <label className="meta" htmlFor="rules">Rules and constraints</label><textarea id="rules" className="field" style={{width:"100%",height:78,margin:"7px 0 14px"}} value={rules} onChange={e=>setRules(e.target.value)}/>
          <label className="meta" htmlFor="expected-output">What should the result include?</label><textarea id="expected-output" className="field" style={{width:"100%",height:78,margin:"7px 0 0"}} value={output} onChange={e=>setOutput(e.target.value)}/>
        </div>}
      </section>
      <section>
        <div className="promptbox" aria-live="polite">{brief.trim()?prompt:"Your structured finance prompt will appear here after you enter a request."}</div>
        <button className="btn" style={{marginTop:12,cursor:"pointer",opacity:brief.trim()?1:.5}} disabled={!brief.trim()} onClick={()=>navigator.clipboard.writeText(prompt)}>Copy prompt</button>
        <div className="notice" style={{marginTop:16}}>This Studio structures your request locally in the browser. It does not send your text to Gemini or any AI service. Paste the prompt into your own eligible Gemini session, then verify all calculations and outputs in Google Sheets. Do not enter confidential or personal financial data.</div>
      </section>
    </div>
  </main>
}
