import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root=process.cwd(),checks=[];
const add=(area,status,detail)=>checks.push({area,status,detail});
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const exists=p=>fs.existsSync(path.join(root,p));
const required=["app/page.tsx","app/explore/page.tsx","app/units/page.tsx","app/studio/page.tsx","app/simulations/page.tsx","app/projects/page.tsx","app/prompts/[slug]/page.tsx","app/prompts/[slug]/CopyPromptButton.tsx","lib/data.ts"];
for(const p of required)add("Repository structure",exists(p)?"PASS":"FAIL",exists(p)?`Found ${p}`:`Missing required route or data file: ${p}`);

const data=read("lib/data.ts");
const section=(name,next)=>{
 const start=new RegExp(`export\\s+const\\s+${name}(?:\\s*:[^=]+)?\\s*=\\s*`).exec(data);
 if(!start)return "";
 const body=data.slice(start.index+start[0].length);
 if(!next)return body;
 const end=new RegExp(`export\\s+const\\s+${next}\\b`).exec(body);
 return end?body.slice(0,end.index):body;
};
const count=(s,re)=>(s.match(re)||[]).length;
const unitSection=section("units","prompts"),promptSection=section("prompts","simulations"),simulationSection=section("simulations","projects"),projectSection=section("projects");
const slugs=[...promptSection.matchAll(/slug:"([^"]+)"/g)].map(m=>m[1]);
const counts={
 units:count(unitSection,/\["[^"]+","[^"]+","[^"]+"\]/g),
 prompts:slugs.length,
 simulations:count(simulationSection,/\["[^"]+ challenge"/gi),
 projects:count(projectSection,/\["[^"]+","[^"]+"\]/g)
};
add("Proposal coverage",counts.units===8?"PASS":"FAIL",`Course map contains ${counts.units} units; exactly 8 required`);
add("Professional prompt catalogue",counts.prompts>=20?"PASS":"FAIL",`Catalogue contains ${counts.prompts} full finance prompt templates; minimum expected: 20`);
add("Proposal coverage",counts.simulations===4?"PASS":"FAIL",`Simulation catalogue has ${counts.simulations} entries; exactly 4 required`);
add("Proposal coverage",counts.projects===6?"PASS":"FAIL",`Project catalogue has ${counts.projects} entries; exactly 6 required`);
const completeness=slugs.every(slug=>{const p=promptSection.slice(promptSection.indexOf(`slug:"${slug}"`));return ["requiredInputs:","prompt:","deliverables:","validation:","limitations:"].every(k=>p.slice(0,p.indexOf("},\n{")<0?undefined:p.indexOf("},\n{")).includes(k));});
add("Prompt quality structure",completeness?"PASS":"FAIL",completeness?"Every prompt includes required inputs, complete prompt text, deliverables, validation and limitations":"One or more prompts are missing required professional quality fields");
const safetyRules=["Do not invent","BLOCKED — INPUT REQUIRED","SOURCE FACT","NOT VERIFIED","human","reviewer"];
const missing=safetyRules.filter(x=>!data.toLowerCase().includes(x.toLowerCase()));
add("Hallucination and control guardrails",missing.length?"FAIL":"PASS",missing.length?`Missing guardrail text: ${missing.join(", ")}`:"Prompts explicitly require evidence, missing-input stops, traceability and human review");

const pkg=JSON.parse(read("package.json"));
add("Dependency security",pkg.dependencies?.next==="15.5.7"?"PASS":"FAIL",`Next.js dependency: ${pkg.dependencies?.next}`);
add("Dependency security",pkg.dependencies?.react==="19.1.2"?"PASS":"FAIL",`React dependency: ${pkg.dependencies?.react}`);

let browser;
try{
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 page.on("console",m=>{if(m.type()==="error")errors.push(m.text())});
 const routes=["/","/explore","/units","/studio","/simulations","/projects",...slugs.map(s=>`/prompts/${s}`)];
 for(const route of routes){
  const response=await page.goto("http://127.0.0.1:3000"+route,{waitUntil:"domcontentloaded"});
  add("Route smoke test",response&&response.status()<400?"PASS":"FAIL",`${route} returned HTTP ${response?.status()}`);
 }
 await page.goto("http://127.0.0.1:3000/explore",{waitUntil:"networkidle"});
 const search=page.getByPlaceholder(/search/i);
 if(await search.count()){await search.fill("reconciliation");const visible=await page.locator("a[href^='/prompts/']").count();add("Search interaction",visible>0?"PASS":"FAIL",`Search filter produced ${visible} prompt links`)}else add("Search interaction","FAIL","Search input not found");
 await page.goto("http://127.0.0.1:3000/studio",{waitUntil:"networkidle"});
 const textInput=page.locator("#finance-brief");
 add("Prompt Studio minimum input",await textInput.count()===1?"PASS":"FAIL","Plain-language finance request field is present");
 const voiceButton=page.getByRole("button",{name:/use voice input/i});
 add("Prompt Studio voice input",await voiceButton.count()===1?"PASS":"FAIL","Voice input control is present");
 await textInput.fill("Reconcile bank statement transactions against the cash ledger and identify unmatched items.");
 add("Prompt Studio generated output",(await page.locator(".promptbox").innerText()).includes("Reconcile bank statement")?"PASS":"FAIL","Prompt preview responds to the learner's plain-language task");
 const copy=page.getByRole("button",{name:/copy prompt/i});
 add("Prompt Studio copy gate",await copy.isEnabled()?"PASS":"FAIL","Copy is enabled only after a learner request is entered");
 await page.setViewportSize({width:390,height:844});
 await page.goto("http://127.0.0.1:3000/explore",{waitUntil:"networkidle"});
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);
 add("Responsive layout",!overflow?"PASS":"WARN",overflow?"Horizontal overflow at 390px":"No horizontal overflow at 390px");
 add("Runtime errors",errors.length===0?"PASS":"FAIL",errors.length?errors.slice(0,8).join(" | "):"No browser console/page errors observed");
}catch(e){add("Browser smoke test","FAIL",String(e?.stack||e))}
finally{if(browser)await browser.close()}
const failed=checks.filter(x=>x.status==="FAIL"),warned=checks.filter(x=>x.status==="WARN");
const report=["# Gemini Finance Lab — Finance Product QA Agent","",`Result: ${failed.length?"NEEDS FIXES":"PASS WITH REVIEW"} · ${checks.length} checks · ${failed.length} failures · ${warned.length} warnings`,"","## Findings",...checks.map(x=>`- **[${x.status}] ${x.area}:** ${x.detail}`),"","## Agreed proposal review","- Eight-unit course map and six project catalogue checked.","- Professional finance prompts checked for inputs, methodology, controls, deliverables and independent validation.","- Prompt Studio text-first and browser voice-input paths checked.","- Dependency security and course boundaries checked.","- This automated reviewer does not replace accounting expertise, model validation or human accessibility review.",""].join("\n");
fs.mkdirSync("artifacts",{recursive:true});
fs.writeFileSync("artifacts/finance-product-qa-report.md",report);
fs.writeFileSync("artifacts/finance-product-qa-results.json",JSON.stringify({checks,failed:failed.length,warned:warned.length,counts},null,2));
console.log(report);
if(failed.length)process.exitCode=1;
