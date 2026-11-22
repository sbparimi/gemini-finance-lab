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
        <button className="auth-google" type="button" onClick={googleSignIn} disabled={busy} aria-label="Continue with Google">
          <svg className="google-logo" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.9c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.38 37.97 46.98 31.9 46.98 24.55z"/>
            <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.15 1.45-4.9 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <span>Continue with Google</span>
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
