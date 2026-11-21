"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
  const supabase = createClient();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage("");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setMessage(error.message);
    else { router.replace("/workspace"); router.refresh(); }
    setBusy(false);
  }

  return <main className="auth-shell"><section className="auth-card">
    <Link href="/" className="auth-brand"><span className="brand-symbol">F</span><span>AI Finance<small>INTELLIGENCE / FINANCE WORKSPACE</small></span></Link>
    <div className="auth-kicker">ACCOUNT RECOVERY</div><h1>Choose a new password</h1>
    <form onSubmit={submit} className="auth-form"><label>New password<input type="password" autoComplete="new-password" minLength={8} value={password} onChange={e=>setPassword(e.target.value)} required /></label><button className="auth-submit" disabled={busy}>{busy ? "Updating…" : "Update password"}</button></form>
    {message && <p className="auth-message" role="alert">{message}</p>}
  </section></main>;
}
