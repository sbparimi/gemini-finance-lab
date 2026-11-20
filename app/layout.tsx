import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
export const metadata: Metadata = { title: "Gemini Finance Lab", description: "Practise better finance workflows with Google Sheets and Gemini." };
const nav=[["Explore","/explore"],["Course units","/units"],["Prompt Studio","/studio"],["Simulations","/simulations"],["Projects","/projects"]];
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body><header className="topbar"><Link className="brand" href="/"><span className="brand-mark">G</span><span>Gemini Finance Lab<small>LEARN · PRACTISE · VERIFY</small></span></Link><nav>{nav.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</nav><span className="account">Practice workspace</span></header>{children}<footer><span>Gemini Finance Lab</span><span>Gemini assists. Google Sheets calculates. Humans verify.</span><span>Educational simulation · Synthetic data</span></footer></body></html> }
