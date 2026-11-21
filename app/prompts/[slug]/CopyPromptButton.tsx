"use client";
import {useState} from "react";
export default function CopyPromptButton({text}:{text:string}) {
 const [copied,setCopied]=useState(false);
 async function copy(){try{await navigator.clipboard.writeText(text);setCopied(true);window.setTimeout(()=>setCopied(false),1800);}catch{setCopied(false);}}
 return <button className="btn" type="button" onClick={copy} style={{cursor:"pointer"}}>{copied?"Copied":"Copy full prompt"}</button>;
}
