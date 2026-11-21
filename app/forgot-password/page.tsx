"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage("");
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
    });
    setMessage(error ? error.message : "If an account exists for this address, a password reset email has been sent.");
    setBusy(false);
  }

  return <main className="auth-shell"><section className="auth-card">
    <Link href="/" className="auth-brand"><span className="brand-symbol">F</span><span>AI Finance<small>INTELLIGENCE / FINANCE WORKSPACE</small></span></Link>
    <div className="auth-kicker">ACCOUNT RECOVERY</div><h1>Reset your password</h1>
    <p className="auth-intro">Enter the email address associated with your account.</p>
    <form onSubmit={submit} className="auth-form"><label>Email address<input type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label><button className="auth-submit" disabled={busy}>{busy ? "Sending…" : "Send reset link"}</button></form>
    {message && <p className="auth-message" role="status">{message}</p>}
    <p className="auth-switch"><Link href="/login">Back to sign in</Link></p>
  </section></main>;
}
