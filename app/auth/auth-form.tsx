"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const isSignup = mode === "signup";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { full_name: name.trim() },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/workspace`,
          },
        });
        if (error) throw error;
        if (data.session) router.replace("/workspace");
        else setMessage("Registration received. Check your email to confirm your account before signing in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        router.replace("/workspace");
        router.refresh();
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Authentication could not be completed.");
    } finally {
      setBusy(false);
    }
  }

  async function googleSignIn() {
    setBusy(true);
    setMessage("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback?next=/workspace` },
      });
      if (error) throw error;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Google sign-in could not be started.");
      setBusy(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <Link href="/" className="auth-brand"><span className="brand-symbol">F</span><span>AI Finance<small>INTELLIGENCE / FINANCE WORKSPACE</small></span></Link>
        <div className="auth-kicker">{isSignup ? "CREATE YOUR WORKSPACE" : "WELCOME BACK"}</div>
        <h1>{isSignup ? "Create your account" : "Sign in to AI Finance"}</h1>
        <p className="auth-intro">{isSignup ? "Register to save your finance workspace and learning progress." : "Access your AI Finance workspace."}</p>
        <button className="auth-google" type="button" onClick={googleSignIn} disabled={busy}>
          <span aria-hidden="true">G</span> Continue with Google
        </button>
        <div className="auth-divider"><span>or use your email</span></div>
        <form onSubmit={submit} className="auth-form">
          {isSignup && <label>Full name<input autoComplete="name" value={name} onChange={e=>setName(e.target.value)} required maxLength={100} /></label>}
          <label>Email address<input type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label>
          <label>Password<input type="password" autoComplete={isSignup ? "new-password" : "current-password"} value={password} onChange={e=>setPassword(e.target.value)} required minLength={8} /></label>
          {!isSignup && <div className="auth-forgot"><Link href="/forgot-password">Forgot password?</Link></div>}
          <button className="auth-submit" type="submit" disabled={busy}>{busy ? "Please wait…" : isSignup ? "Create account" : "Sign in"}</button>
        </form>
        {message && <p className="auth-message" role="status">{message}</p>}
        <p className="auth-switch">{isSignup ? "Already registered?" : "New to AI Finance?"} <Link href={isSignup ? "/login" : "/signup"}>{isSignup ? "Sign in" : "Create an account"}</Link></p>
        <p className="auth-legal">By continuing, use only approved, non-confidential financial data in AI-assisted workflows.</p>
      </section>
    </main>
  );
}
