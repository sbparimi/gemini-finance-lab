import type {Metadata} from "next";
import "./globals.css";
import SiteChrome from "@/components/site-chrome";
export const metadata:Metadata={title:"AI Finance Studio | Professional Finance Prompt Workspace",description:"AI-assisted finance workflows and professional prompts for banking, accounting, treasury, FP&A and audit."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><SiteChrome>{children}</SiteChrome></body></html>}
