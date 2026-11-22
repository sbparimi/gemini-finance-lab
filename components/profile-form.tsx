"use client";
import {useState} from "react";
import {createClient} from "@/lib/supabase/client";
export default function ProfileForm({initialName,email}:{initialName:string;email:string}){
 const [name,setName]=useState(initialName); const [busy,setBusy]=useState(false); const [message,setMessage]=useState("");
 async function save(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setMessage("");const supabase=createClient();const {error}=await supabase.auth.updateUser({data:{full_name:name.trim(),name:name.trim()}});setBusy(false);setMessage(error?error.message:"Profile updated.");}
 return <form className="profile-edit-form" onSubmit={save}><label>Display name<input value={name} onChange={e=>setName(e.target.value)} maxLength={80} required/></label><label>Email address<input value={email} readOnly disabled/></label><button className="btn btn-primary" type="submit" disabled={busy}>{busy?"Saving…":"Save profile"}</button>{message&&<p className="settings-feedback" role="status">{message}</p>}</form>
}
