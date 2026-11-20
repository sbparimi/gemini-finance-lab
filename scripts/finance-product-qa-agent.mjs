import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const checks = [];
const add = (area, status, detail) => checks.push({area,status,detail});
const read = p => fs.readFileSync(path.join(root,p),"utf8");
const exists = p => fs.existsSync(path.join(root,p));
const required = ["app/page.tsx","app/explore/page.tsx","app/units/page.tsx","app/studio/page.tsx","app/simulations/page.tsx","app/projects/page.tsx","app/prompts/[slug]/page.tsx","lib/data.ts"];
for (const p of required) add("Repository structure",exists(p)?"PASS":"FAIL",exists(p)?`Found ${p}`:`Missing required route or data file: ${p}`);
const data=read("lib/data.ts");
const counts={units:(data.match(/\],\[/g)||[]).length+1,prompts:(data.match(/slug:"/g)||[]).length,simulations:(data.match(/\[".*challenge"/g)||[]).length,projects:(data.match(/\[".*","Build|\[".*","Create|\[".*","Coordinate|\[".*","Connect|\[".*","Integrate/g)||[]).length};
add("Proposal coverage",counts.units>=8?"PASS":"FAIL",`Course map source has at least eight unit entries (estimated entries: ${counts.units})`);
add("Proposal coverage",counts.prompts>=6?"PASS":"FAIL",`Prompt catalogue has ${counts.prompts} starter prompts; minimum expected: 6`);
add("Proposal coverage",counts.simulations>=4?"PASS":"FAIL",`Simulation catalogue has ${counts.simulations} entries; minimum expected: 4`);
add("Proposal coverage",counts.projects>=6?"PASS":"FAIL",`Project catalogue has ${counts.projects} entries; minimum expected: 6`);
const all=required.filter(exists).map(read).join("\n");
for (const [label,regex] of [["Synthetic-data disclaimer",/synthetic/i],["Human verification control",/human.{0,30}verif|reviewer|sign-off|sign.off/i],["Gemini account eligibility caveat",/eligible|account.{0,30}plan/i]]) add("Finance safety",regex.test(all)?"PASS":"WARN",regex.test(all)?`${label} present`:`${label} not clearly found in route/data sources`);
const forbidden=[["Apps Script",/Apps Script/i],["Gemini API dependency",/Gemini API/i],["Microsoft Copilot",/Microsoft Copilot/i],["ChatGPT course workflow",/ChatGPT/i]];
for(const [label,regex] of forbidden) add("Course scope",regex.test(all)?"WARN":"PASS",regex.test(all)?`Review scope mention: ${label} appears in app source`:`${label} absent from app source`);
let browser;
try {
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 page.on("console",m=>{if(m.type()==="error")errors.push(m.text())});
 await page.goto("http://127.0.0.1:3000",{waitUntil:"networkidle"});
 add("Browser smoke test",(await page.title()).includes("Gemini Finance Lab")?"PASS":"FAIL",`Home page title: ${await page.title()}`);
 for(const route of ["/","/explore","/units","/studio","/simulations","/projects","/prompts/bank-reconciliation","/prompts/invoice-processing","/prompts/month-end-close","/prompts/budget-variance","/prompts/financial-kpis","/prompts/clean-finance-data"]){
   const response=await page.goto("http://127.0.0.1:3000"+route,{waitUntil:"domcontentloaded"});
   add("Route smoke test",response&&response.status()<400?"PASS":"FAIL",`${route} returned HTTP ${response?.status()}`);
 }
 await page.goto("http://127.0.0.1:3000/explore",{waitUntil:"networkidle"});
 const search=page.getByPlaceholder(/search/i);
 if(await search.count()){await search.fill("reconciliation");const visible=await page.locator("a[href^='/prompts/']").count();add("Search interaction",visible>0?"PASS":"FAIL",`Search filter produced ${visible} prompt links`)}else add("Search interaction","FAIL","Search input not found");
 await page.goto("http://127.0.0.1:3000/studio",{waitUntil:"networkidle"});
 const editable=await page.locator("input,textarea").count();
 add("Prompt Studio",editable>=5?"PASS":"FAIL",`Found ${editable} editable prompt fields; expected at least 5`);
 await page.setViewportSize({width:390,height:844});
 await page.goto("http://127.0.0.1:3000",{waitUntil:"networkidle"});
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);
 add("Responsive layout",!overflow?"PASS":"WARN",overflow?"Horizontal page overflow at 390px viewport":"No horizontal page overflow at 390px viewport");
 add("Runtime errors",errors.length===0?"PASS":"FAIL",errors.length?errors.slice(0,8).join(" | "):"No browser console/page errors observed");
} catch(e){add("Browser smoke test","FAIL",String(e?.stack||e));}
finally{if(browser)await browser.close();}
const failed=checks.filter(x=>x.status==="FAIL");
const warned=checks.filter(x=>x.status==="WARN");
const report=["# Gemini Finance Lab — Finance Product QA Agent","",`Result: ${failed.length?"NEEDS FIXES":"PASS WITH REVIEW"} · ${checks.length} checks · ${failed.length} failures · ${warned.length} warnings`,"","## Findings",...checks.map(x=>`- **[${x.status}] ${x.area}:** ${x.detail}`),"","## Agreed proposal review","- Google Sheets + Google Gemini course boundary checked through source inspection.","- Business-problem discovery, eight-unit map, prompt studio, simulations and six projects checked.","- Synthetic-data and human-verification controls checked.","- This automated agent does not replace expert accounting review, visual judgement or a human accessibility audit.",""].join("\n");
fs.mkdirSync("artifacts",{recursive:true});fs.writeFileSync("artifacts/finance-product-qa-report.md",report);fs.writeFileSync("artifacts/finance-product-qa-results.json",JSON.stringify({checks,failed:failed.length,warned:warned.length},null,2));
console.log(report);
if(failed.length)process.exitCode=1;
