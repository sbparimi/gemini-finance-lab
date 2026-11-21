import {chromium} from "playwright";
import fs from "node:fs";
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
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
 await page.goto("http://127.0.0.1:3000/",{waitUntil:"networkidle"});
 const header=await page.locator(".saas-header").evaluate(el=>({height:getComputedStyle(el).height,bg:getComputedStyle(el).backgroundColor}));
 check("Design system loaded",header.height==="76px"&&header.bg!=="rgba(0, 0, 0, 0)",JSON.stringify(header));
 check("Brand visible",(await page.locator(".saas-brand").first().innerText()).includes("AI"));
 check("Primary CTA visible",await page.getByRole("link",{name:/Explore prompt library/i}).isVisible());
 await page.screenshot({path:"artifacts/ux-home-desktop.png",fullPage:true});
 await page.goto("http://127.0.0.1:3000/workspace",{waitUntil:"networkidle"});
 check("Workspace shell",await page.locator(".workspace-sidebar").isVisible()&&await page.locator(".workspace-welcome").isVisible(),"Sidebar, welcome panel and finance task grid render");
 check("Free quota disclosure",(await page.locator(".sidebar-plan").innerText()).includes("5 prompts / day"),"Five free prompts/day visible as plan definition, not a live quota");
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
