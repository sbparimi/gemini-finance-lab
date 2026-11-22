"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function SiteChrome({children}:{children:React.ReactNode}){
 const path=usePathname();
 const appRoute=["/workspace","/profile","/settings"].some(p=>path===p||path.startsWith(p+"/"));
 if(appRoute)return <>{children}</>;
 const nav=[["Platform","/topics"],["Use cases","/explore"],["Finance library","/explore"],["Resources","/units"]];
 return <>
  <header className="af-site-header">
   <Link href="/" className="af-brand" aria-label="AI Finance home"><span className="af-brand-mark">F</span><span>AI <em>Finance</em><small>PROFESSIONAL WORKSPACE</small></span></Link>
   <nav aria-label="Main navigation">{nav.map(([label,href],i)=><Link href={href} key={label+i}>{label}</Link>)}</nav>
   <div className="af-header-actions"><Link href="/login" className="af-signin">Sign in</Link><Link href="/signup" className="af-header-cta">Get started <span>↗</span></Link></div>
  </header>
  {children}
  <footer className="af-footer"><Link href="/" className="af-brand"><span className="af-brand-mark">F</span><span>AI <em>Finance</em><small>PROFESSIONAL WORKSPACE</small></span></Link><p>Structure the work. Keep the evidence. Review the result.</p><div><Link href="/topics">Platform</Link><Link href="/explore">Finance library</Link><Link href="/studio">Prompt Studio</Link><Link href="/login">Sign in</Link></div></footer>
 </>;
}
