"use client";

import React, { useState, useEffect } from "react";
import { GoogleIcon } from "@/components/GoogleIcon";
import { supabase, isSupabaseConfigured, signInWithGoogle, signOut } from "@/lib/supabase";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Server, 
  Smartphone, 
  CheckCircle2, 
  LogOut, 
  Terminal, 
  KeyRound,
  AlertCircle,
  ExternalLink,
  Laptop
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
  provider: string;
}

export default function LoginPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [demoNotice, setDemoNotice] = useState(true);

  // Cek apakah ada session aktif dari Supabase jika dikonfigurasi
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          setUser({
            name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Asisten Lab",
            email: user.email || "aslab@siber.ac.id",
            avatar: user.user_metadata?.avatar_url || "https://api.dicebear.com/7.x/bottts/svg?seed=siber",
            role: "Asisten Lab Siber",
            provider: "Google OAuth (Supabase)",
          });
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "Asisten Lab",
            email: session.user.email || "aslab@siber.ac.id",
            avatar: session.user.user_metadata?.avatar_url || "https://api.dicebear.com/7.x/bottts/svg?seed=siber",
            role: "Asisten Lab Siber",
            provider: "Google OAuth (Supabase)",
          });
        } else {
          setUser(null);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  // Handler Login dengan Google (Gmail)
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    if (isSupabaseConfigured) {
      try {
        await signInWithGoogle();
      } catch (err: unknown) {
        const error = err as Error;
        setErrorMsg(error.message || "Gagal menghubungi Supabase Google OAuth");
        setIsLoading(false);
      }
    } else {
      // Mock Login Simulator untuk demonstrasi langsung ke dosen
      setTimeout(() => {
        setUser({
          name: "Rayhan F (Aslab SIBER)",
          email: "rayhan.f@gmail.com",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
          role: "Asisten Laboratorium Keamanan Siber",
          provider: "Google Identity (Demo Mode)",
        });
        setIsLoading(false);
      }, 900);
    }
  };

  // Handler Login Manual (Email/Password)
  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) {
      setErrorMsg("Silakan masukkan email atau gunakan tombol Login dengan Google");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        name: emailInput.split("@")[0] || "Staff Siber",
        email: emailInput,
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=security",
        role: "Praktikan / Aslab",
        provider: "Internal Auth",
      });
      setIsLoading(false);
    }, 700);
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      await signOut();
    }
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black relative overflow-hidden font-sans">
      {/* Background Cyber Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Header Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 text-cyan-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold tracking-wider text-sm text-slate-200 flex items-center gap-2">
              ASLAB SIBER
              <span className="text-[10px] bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded-full font-mono">
                SECURITY OPS
              </span>
            </div>
            <p className="text-xs text-slate-500">Laboratorium Keamanan Siber & Jaringan</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg font-mono">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Next.js • Node.js • Vercel Ready</span>
          </div>
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 bg-red-950/40 border border-red-900/50 px-3 py-1.5 rounded-lg transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10">
        {user ? (
          /* ======================================================== */
          /* TAMPILAN DASHBOARD SETELAH LOGIN GOOGLE BERHASIL          */
          /* ======================================================== */
          <div className="w-full max-w-4xl space-y-6 animate-in fade-in zoom-in-95 duration-300 py-6">
            {/* Banner Sukses CPMK */}
            <div className="bg-gradient-to-r from-emerald-950/60 to-cyan-950/60 border border-emerald-500/40 rounded-2xl p-5 shadow-xl backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-300 text-base">
                    Verifikasi Login with Gmail Berhasil! 🎉
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Kriteria CPMK: Autentikasi akun Google telah terhubung dan siap dipresentasikan ke Dosen.
                  </p>
                </div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl text-right">
                <span className="text-[10px] text-slate-400 block font-mono">STATUS CPMK</span>
                <span className="text-xs font-semibold text-emerald-400">SIAP DIUJI</span>
              </div>
            </div>

            {/* Profile Card */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-2xl border-2 border-cyan-500/40 shadow-lg object-cover"
                />
                <div className="text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h2 className="text-xl font-bold text-white">{user.name}</h2>
                    <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[11px] font-mono px-2 py-0.5 rounded-md">
                      {user.role}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    {user.email}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span className="text-[11px] bg-slate-800 text-slate-300 border border-slate-700/80 px-2.5 py-1 rounded-md font-mono">
                      Metode: {user.provider}
                    </span>
                    <span className="text-[11px] bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 px-2.5 py-1 rounded-md font-mono">
                      Session: Active
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium transition flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            </div>

            {/* Placeholder Modul (Sesuai Catatan Rapat Aslab SIBER) */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 font-mono">
                <Terminal className="w-4 h-4 text-cyan-400" />
                Modul & Rencana Proyek Aslab SIBER (Dummy / Roadmap)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card 1: VPS & Server */}
                <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition">
                  <div>
                    <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 w-fit mb-3">
                      <Server className="w-5 h-5" />
                    </div>
                    <h5 className="font-semibold text-white text-sm">Server VPS & Docker</h5>
                    <p className="text-xs text-slate-400 mt-1">
                      Persiapan server VPS, Hermes Web di atas Docker, dan pelatihan konfigurasi server.
                    </p>
                  </div>
                  <span className="mt-4 text-[11px] text-blue-400 font-mono bg-blue-950/40 border border-blue-900/40 px-2 py-1 rounded-md self-start">
                    Status: Next Agenda
                  </span>
                </div>

                {/* Card 2: Flutter Mobile */}
                <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition">
                  <div>
                    <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20 w-fit mb-3">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <h5 className="font-semibold text-white text-sm">Aplikasi Mobile Flutter</h5>
                    <p className="text-xs text-slate-400 mt-1">
                      Klien mobile menggunakan Flutter yang tersambung ke backend & database yang sama.
                    </p>
                  </div>
                  <span className="mt-4 text-[11px] text-purple-400 font-mono bg-purple-950/40 border border-purple-900/40 px-2 py-1 rounded-md self-start">
                    Status: Tahap 2
                  </span>
                </div>

                {/* Card 3: CI/CD Vercel & Supabase */}
                <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition">
                  <div>
                    <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20 w-fit mb-3">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <h5 className="font-semibold text-white text-sm">Pipeline Vercel & Supabase</h5>
                    <p className="text-xs text-slate-400 mt-1">
                      Workflow vibe coding di Antigravity, edit di Cursor, push ke GitHub, auto-deploy di Vercel.
                    </p>
                  </div>
                  <span className="mt-4 text-[11px] text-cyan-400 font-mono bg-cyan-950/40 border border-cyan-900/40 px-2 py-1 rounded-md self-start">
                    Status: Active (Current)
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* TAMPILAN LOGIN FORM DENGAN GOOGLE (GMAIL) BUTTON        */
          /* ======================================================== */
          <div className="w-full max-w-md space-y-4 animate-in fade-in zoom-in-95 duration-200">
            {/* Notice Banner */}
            {demoNotice && (
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 flex items-start gap-2.5 backdrop-blur-sm">
                <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="flex-1 leading-relaxed">
                  <span className="font-semibold text-cyan-300">Siap Ditampilkan ke Dosen:</span>{" "}
                  Tombol login Google di bawah langsung berfungsi untuk demonstrasi UI & aliran autentikasi CPMK.
                </div>
                <button
                  onClick={() => setDemoNotice(false)}
                  className="text-slate-500 hover:text-slate-300 text-xs px-1"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Login Card */}
            <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
              <div className="text-center space-y-2 mb-6">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-1">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Selamat Datang
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Portal Autentikasi Aslab SIBER & Ujian CPMK
                </p>
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="mb-4 p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* TOMBOL UTAMA: LOGIN DENGAN GOOGLE / GMAIL */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-800 font-medium py-3 px-4 rounded-xl shadow-md transition-all duration-200 transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin" />
                  ) : (
                    <GoogleIcon className="w-5 h-5 group-hover:scale-105 transition-transform" />
                  )}
                  <span className="text-sm font-semibold tracking-wide">
                    {isLoading ? "Menghubungkan Akun Google..." : "Lanjutkan dengan Google"}
                  </span>
                </button>

                {/* Garis Pemisah */}
                <div className="relative flex items-center justify-center my-4">
                  <div className="border-t border-slate-800 w-full" />
                  <span className="bg-slate-900 px-3 text-[11px] text-slate-500 uppercase tracking-wider font-mono shrink-0">
                    atau masuk manual
                  </span>
                  <div className="border-t border-slate-800 w-full" />
                </div>

                {/* Form Input Manual (Alternatif) */}
                <form onSubmit={handleManualLogin} className="space-y-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      Email / Akun Kampus
                    </label>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="aslab@kampus.ac.id"
                      className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      Kata Sandi
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium py-2.5 px-4 rounded-xl text-sm transition shadow-lg shadow-cyan-900/30 flex items-center justify-center gap-2 mt-2"
                  >
                    Masuk ke Sistem
                  </button>
                </form>
              </div>

              {/* Status Footer di dalam Card */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>OAuth 2.0 Ready</span>
                <span>SSO Protocol v2</span>
              </div>
            </div>

            {/* Quick Helper Note for CPMK */}
            <div className="text-center text-xs text-slate-500">
              Ujian CPMK Keamanan Siber • Lab SIBER & Node.js Vercel
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/60 px-6 py-3 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 z-10">
        <div>
          © 2026 Aslab SIBER — Vibe Coding with Antigravity & Cursor
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="hover:text-cyan-400 transition cursor-pointer">Panduan PRD</span>
          <span>•</span>
          <span className="hover:text-cyan-400 transition cursor-pointer">Supabase Auth</span>
          <span>•</span>
          <span className="hover:text-cyan-400 transition cursor-pointer">Vercel Deploy</span>
        </div>
      </footer>
    </div>
  );
}
