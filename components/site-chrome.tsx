"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function SiteChrome({children}:{children:React.ReactNode}){
 const path=usePathname();
 const appRoute=["/workspace","/profile","/settings"].some(p=>path===p||path.startsWith(p+"/"));
 if(appRoute)return <>{children}</>;
 const nav=[["Platform","/topics"],["Workflows","/explore"],["Prompt Studio","/studio"],["Practice","/simulations"],["Learning","/units"]];
 return <>
  <header className="af-site-header fx-header">
   <Link href="/" className="af-brand" aria-label="AI Finance home"><span className="af-brand-mark">F</span><span>AI <em>Finance</em><small>INTELLIGENCE / FINANCE WORKSPACE</small></span></Link>
   <nav aria-label="Main navigation">{nav.map(([label,href])=><Link href={href} key={label} aria-current={path===href?"page":undefined}>{label}</Link>)}</nav>
   <div className="af-header-actions"><Link href="/login" className="af-signin">Sign in</Link><Link href="/studio" className="af-header-cta">Start a task <span>↗</span></Link></div>
  </header>
  {children}
  <footer className="af-footer fx-footer"><Link href="/" className="af-brand"><span className="af-brand-mark">F</span><span>AI <em>Finance</em><small>INTELLIGENCE / FINANCE WORKSPACE</small></span></Link><p>Structure the work. Keep the evidence. Review the result.</p><div><Link href="/topics">Platform</Link><Link href="/explore">Workflows</Link><Link href="/studio">Prompt Studio</Link><Link href="/simulations">Practice</Link><Link href="/login">Sign in</Link></div></footer>
 </>;
}
