"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useMemo,useState} from "react";
import {financeWorkspaces} from "@/lib/taxonomy";

type Props={email?:string|null;displayName?:string|null};
const primary=[["Overview","/workspace","⌂"],["Discover prompts","/explore","⌕"],["Prompt Studio","/studio","✳"]];
const learning=[["Learning paths","/units","▤"],["Simulations","/simulations","◉"],["Applied projects","/projects","▦"]];
export default function WorkspaceSidebar({email,displayName}:Props){
 const path=usePathname(); const [query,setQuery]=useState(""); const [expanded,setExpanded]=useState<string[]>([]);
 const initials=(displayName||email||"AI").trim().split(/[ @._-]+/).filter(Boolean).slice(0,2).map(x=>x[0]?.toUpperCase()).join("")||"AI";
 const filtered=useMemo(()=>financeWorkspaces.map(w=>({...w,topics:w.topics.filter(t=>(w.title+" "+t).toLowerCase().includes(query.toLowerCase()))})).filter(w=>w.topics.length>0||w.title.toLowerCase().includes(query.toLowerCase())),[query]);
 const toggle=(slug:string)=>setExpanded(v=>v.includes(slug)?v.filter(x=>x!==slug):[...v,slug]);
 const active=(href:string)=>path===href||(href!=="/workspace"&&path.startsWith(href));
 return <aside className="app-sidebar">
  <Link href="/workspace" className="app-sidebar-brand"><span className="app-brand-mark">F</span><span><b>AI Finance</b><small>PROFESSIONAL WORKSPACE</small></span></Link>
  <div className="sidebar-scroll">
   <div className="sidebar-group-label">YOUR WORKSPACE</div>
   {primary.map(([label,href,icon])=><Link key={href} href={href} className={"app-nav-link "+(active(href)?"is-active":"")}><span className="app-nav-icon">{icon}</span>{label}{href==="/studio"&&<span className="nav-shortcut">NEW</span>}</Link>)}
   <div className="sidebar-group-label sidebar-group-spaced">LEARN & APPLY</div>
   {learning.map(([label,href,icon])=><Link key={href} href={href} className={"app-nav-link "+(active(href)?"is-active":"")}><span className="app-nav-icon">{icon}</span>{label}</Link>)}
   <div className="sidebar-library-head"><div className="sidebar-group-label">FINANCE LIBRARY</div><span>12 AREAS</span></div>
   <label className="sidebar-topic-search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a topic…" aria-label="Search finance topics"/>{query&&<button type="button" onClick={()=>setQuery("")} aria-label="Clear topic search">×</button>}</label>
   <div className="sidebar-categories">{filtered.map(w=><div className="sidebar-category" key={w.slug}>
    <button type="button" className={"sidebar-category-toggle "+(expanded.includes(w.slug)?"expanded":"")} onClick={()=>toggle(w.slug)} aria-expanded={expanded.includes(w.slug)}><span className={"category-dot dot-"+w.accent}/><span className="category-name">{w.title}</span><span className="category-count">{w.topics.length}</span><span className="category-chevron">⌄</span></button>
    {(expanded.includes(w.slug)||query.length>0)&&<div className="sidebar-subtopics">{w.topics.map(topic=><Link key={topic} href={"/explore?search="+encodeURIComponent(topic)} className="sidebar-topic-link" title={topic}>{topic}</Link>)}</div>}
   </div>)}</div>
  </div>
  <div className="app-sidebar-bottom">
   <Link href="/plans" className="sidebar-upgrade"><span>ACCESS & BILLING</span><b>Manage your plan</b><small>View available access options ↗</small></Link>
   <Link href="/settings" className={"app-nav-link "+(active("/settings")?"is-active":"")}><span className="app-nav-icon">⚙</span>Settings</Link>
   <Link href="/profile" className={"sidebar-profile "+(active("/profile")?"is-active":"")}><span className="profile-avatar">{initials}</span><span className="profile-identity"><b>{displayName||"Your profile"}</b><small>{email||"Account details"}</small></span><span className="profile-menu-mark">···</span></Link>
  </div>
 </aside>
}
