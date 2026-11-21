import {chromium} from "playwright";
import fs from "node:fs";
import AxeBuilder from "@axe-core/playwright";
fs.mkdirSync("artifacts",{recursive:true});
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const page=await context.newPage();
const findings=[];
const check=(name,ok,detail)=>findings.push({name,status:ok?"PASS":"FAIL",detail});
const errors=[];
page.on("pageerror",e=>errors.push(e.message));
page.on("console",m=>{if(m.type()==="error")errors.push(m.text())});
try{
 for(const route of ["/","/workspace","/explore","/studio","/units","/simulations","/projects","/plans"]){
  const response=await page.goto("http://127.0.0.1:3000"+route,{waitUntil:"networkidle"});
  check("Route "+route,!!response&&response.status()===200,`HTTP ${response?.status()}`);
 }
 const homeResponse=await page.goto("http://127.0.0.1:3000/",{waitUntil:"networkidle"});
 const responseHeaders=homeResponse?.headers()||{};
 check("Security response headers",responseHeaders["x-content-type-options"]==="nosniff"&&responseHeaders["x-frame-options"]==="DENY"&&responseHeaders["referrer-policy"]==="strict-origin-when-cross-origin"&&responseHeaders["strict-transport-security"]?.includes("max-age="),"Verify browser-facing headers on the actual HTTP response");
 const header=await page.locator(".saas-header").evaluate(el=>({height:getComputedStyle(el).height,bg:getComputedStyle(el).backgroundColor}));
 check("Design system loaded",header.height==="76px"&&header.bg!=="rgba(0, 0, 0, 0)",JSON.stringify(header));
 check("Brand visible",(await page.locator(".saas-brand").first().innerText()).includes("AI"));
 check("Primary CTA visible",await page.getByRole("link",{name:/Explore prompt library/i}).isVisible());
 const homeA11y=await new AxeBuilder({page}).analyze();
 const homeIssues=homeA11y.violations.flatMap(v=>v.nodes.map(n=>({rule:v.id,target:n.target,summary:n.failureSummary?.slice(0,700)}))).slice(0,60);
 check("Homepage WCAG automated scan",homeA11y.violations.length===0,JSON.stringify(homeIssues)||"No axe violations");
 await page.screenshot({path:"artifacts/ux-home-desktop.png",fullPage:true});
 await page.goto("http://127.0.0.1:3000/workspace",{waitUntil:"networkidle"});
 check("Workspace shell",await page.locator(".workspace-sidebar").isVisible()&&await page.locator(".workspace-welcome").isVisible(),"Sidebar, welcome panel and finance task grid render");
 check("Free quota disclosure",(await page.locator(".sidebar-plan").innerText()).includes("5 prompts / day"),"Five free prompts/day visible as plan definition, not a live quota");
 const workspaceA11y=await new AxeBuilder({page}).analyze();
 const workspaceIssues=workspaceA11y.violations.flatMap(v=>v.nodes.map(n=>({rule:v.id,target:n.target,summary:n.failureSummary?.slice(0,700)}))).slice(0,60);
 check("Workspace WCAG automated scan",workspaceA11y.violations.length===0,JSON.stringify(workspaceIssues)||"No axe violations");
 await page.screenshot({path:"artifacts/ux-workspace-desktop.png",fullPage:true});
 await page.setViewportSize({width:390,height:844});
 for(const route of ["/","/workspace","/explore","/studio","/plans"]){
  await page.goto("http://127.0.0.1:3000"+route,{waitUntil:"networkidle"});
  const metrics=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:window.innerWidth}));
  check("Mobile layout "+route,metrics.width<=metrics.viewport,`document width ${metrics.width}px; viewport ${metrics.viewport}px`);
 }
 await page.screenshot({path:"artifacts/ux-workspace-mobile.png",fullPage:true});
 await page.goto("http://127.0.0.1:3000/studio",{waitUntil:"networkidle"});
 check("Text-first input",await page.locator("#finance-brief").isVisible(),"Plain-language task field visible");
 check("Voice input",await page.getByRole("button",{name:/use voice input/i}).isVisible(),"Voice action visible");
 check("Copy disabled before input",await page.getByRole("button",{name:/copy prompt/i}).isDisabled(),"Prevents empty prompt copying");
 check("Keyboard focus visible",await page.locator("#finance-brief").evaluate(el=>{el.focus();return getComputedStyle(el).outlineStyle!=="none"||getComputedStyle(el).boxShadow!=="none";}),"Focus treatment present on primary input");
 check("No browser errors",errors.length===0,errors.slice(0,6).join(" | ")||"No page or console errors");
}finally{await browser.close()}
fs.mkdirSync("artifacts",{recursive:true});
fs.writeFileSync("artifacts/ux-review.json",JSON.stringify(findings,null,2));
console.log(findings.map(x=>`[${x.status}] ${x.name}: ${x.detail}`).join("\n"));
if(findings.some(x=>x.status==="FAIL"))process.exit(1);
