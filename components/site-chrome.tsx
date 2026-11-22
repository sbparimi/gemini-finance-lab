"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
export default function SiteChrome({children}:{children:React.ReactNode}){
 const path=usePathname();const appRoute=["/workspace","/profile","/settings"].some(p=>path===p||path.startsWith(p+"/"));
 if(appRoute)return <>{children}</>;
 const nav=[["Platform","/topics"],["Finance library","/explore"],["Prompt Studio","/studio"],["Learning","/units"]];
 return <><header className="saas-header"><Link href="/" className="saas-brand"><span className="brand-symbol">F</span><span>AI <span className="brand-light">Finance</span><small>INTELLIGENCE / FINANCE WORKSPACE</small></span></Link><nav>{nav.map(([n,h])=><Link href={h} key={h}>{n}</Link>)}</nav><div className="header-actions"><Link href="/login" className="header-auth-link">Sign in</Link><Link href="/signup" className="header-cta">Create account ↗</Link></div></header>{children}<footer className="saas-footer"><div className="saas-brand"><span className="brand-symbol">F</span><span>AI <span className="brand-light">Finance</span><small>INTELLIGENCE / FINANCE WORKSPACE</small></span></div><span>AI assists. Google Sheets calculates. Finance professionals verify.</span><span>Educational use · Synthetic data only</span></footer></>;
}
