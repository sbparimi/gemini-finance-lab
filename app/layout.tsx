import type {Metadata} from "next";
import "./globals.css";
import "./marketing.css";
import SiteChrome from "@/components/site-chrome";
export const metadata:Metadata={title:"AI Finance | Professional Finance Workspace",description:"Structure finance analysis with practical playbooks, Prompt Studio and reviewable workflows for accounting, banking, FP&A, treasury, risk and FinOps."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><SiteChrome>{children}</SiteChrome></body></html>}
