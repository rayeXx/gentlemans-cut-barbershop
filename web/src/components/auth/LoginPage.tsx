import React, { useState } from "react";
import { AuthUser } from "@/types/barbershop";
import { GoogleIcon } from "@/components/GoogleIcon";
import { signInWithGoogle, isSupabaseConfigured } from "@/lib/supabase";
import { 
  Scissors, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  User, 
  ArrowLeft, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  X 
} from "lucide-react";

interface LoginPageProps {
  onLoginSuccess: (user: AuthUser) => void;
  onBackToLanding: () => void;
  isDark: boolean;
}

export function LoginPage({ onLoginSuccess, onBackToLanding, isDark }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Google Account Chooser Modal state
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  // Email / Password Submit Handler
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail) {
      setErrorMsg("Silakan masukkan email atau username Anda.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Automatic Role Detection:
      // If email/username contains 'admin', grant Admin role automatically!
      if (cleanEmail === "admin" || cleanEmail.includes("admin")) {
        const adminUser: AuthUser = {
          id: "usr-admin-1",
          name: "Manager & Kasir Barbershop",
          email: cleanEmail.includes("@") ? cleanEmail : "admin@gentlemanscut.com",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
          role: "admin",
          provider: "password",
        };
        onLoginSuccess(adminUser);
      } else {
        // Otherwise, grant Customer role automatically!
        const customerUser: AuthUser = {
          id: `usr-cust-${Date.now()}`,
          name: cleanEmail.split("@")[0].replace(/[._-]/g, " ").toUpperCase() || "Pelanggan Terdaftar",
          email: cleanEmail.includes("@") ? cleanEmail : `${cleanEmail}@gmail.com`,
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
          role: "customer",
          provider: "password",
        };
        onLoginSuccess(customerUser);
      }
    }, 500);
  };

  // Google Login Selected
  const handleSelectGoogleAccount = (type: "admin" | "customer") => {
    setIsGoogleModalOpen(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (type === "admin") {
        const adminUser: AuthUser = {
          id: "google-admin-1",
          name: "Admin Kasir (The Gentleman's Cut)",
          email: "admin.barbershop@gmail.com",
          avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
          role: "admin",
          provider: "google",
        };
        onLoginSuccess(adminUser);
      } else {
        const customerUser: AuthUser = {
          id: "google-cust-1",
          name: "Reza Pratama",
          email: "reza.pratama@gmail.com",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
          role: "customer",
          provider: "google",
        };
        onLoginSuccess(customerUser);
      }
    }, 500);
  };

  const handleGoogleClick = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      if (isSupabaseConfigured) {
        await signInWithGoogle();
      } else {
        setIsGoogleModalOpen(true);
        setIsLoading(false);
      }
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || "Gagal menghubungi Google OAuth");
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between p-4 sm:p-6 font-sans relative overflow-hidden transition-colors duration-200 ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-[#FDFBF7] text-stone-900"
      }`}
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Back Navigation */}
      <header className="max-w-md mx-auto w-full flex items-center justify-between z-10 py-2">
        <button
          onClick={onBackToLanding}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition ${
            isDark
              ? "bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white"
              : "bg-white border-amber-200 text-stone-700 hover:text-stone-900 shadow-sm"
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </button>

        <span className="text-[10px] font-mono uppercase text-amber-500 font-bold tracking-widest">
          PORTAL MASUK RESMI
        </span>
      </header>

      {/* Main Login Card */}
      <main className="max-w-md mx-auto w-full my-auto z-10">
        <div
          className={`p-6 sm:p-8 rounded-3xl border shadow-2xl backdrop-blur-xl relative space-y-6 ${
            isDark
              ? "bg-slate-900/85 border-slate-800 text-slate-100"
              : "bg-white border-amber-200 text-stone-900"
          }`}
        >
          {/* Logo & Intro */}
          <div className="text-center space-y-2">
            <div
              className={`w-14 h-14 mx-auto rounded-2xl border flex items-center justify-center shadow-lg ${
                isDark
                  ? "bg-amber-500/15 border-amber-500/30 text-amber-400"
                  : "bg-amber-100 border-amber-300 text-amber-800"
              }`}
            >
              <Scissors className="w-7 h-7 transform -rotate-45" />
            </div>
            <h1 className="text-2xl font-bold font-serif tracking-tight">
              The Gentleman&apos;s Cut
            </h1>
            <p className={`text-xs ${isDark ? "text-slate-400" : "text-stone-500"}`}>
              Masuk untuk booking kursi Anda atau mengelola kasir &amp; antrean barbershop.
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* GOOGLE SIGN IN BUTTON */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleClick}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-medium py-3 px-4 rounded-xl shadow-md transition-all duration-200 transform active:scale-98 group disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-stone-400 border-t-stone-800 rounded-full animate-spin" />
              ) : (
                <GoogleIcon className="w-5 h-5 group-hover:scale-105 transition-transform" />
              )}
              <span className="text-xs sm:text-sm font-semibold tracking-wide">
                {isLoading ? "Menghubungkan ke Google..." : "Lanjutkan dengan Google (Gmail)"}
              </span>
            </button>
            {isSupabaseConfigured && (
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono block text-center">
                ● Supabase &amp; Google Cloud Terhubung
              </span>
            )}

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-slate-800/60 w-full" />
              <span className={`px-3 text-[10px] uppercase font-mono tracking-widest shrink-0 ${
                isDark ? "bg-slate-900 text-slate-500" : "bg-white text-stone-400"
              }`}>
                atau dengan email &amp; password
              </span>
              <div className="border-t border-slate-800/60 w-full" />
            </div>

            {/* Email & Password Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                  Email / Username
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin atau nama@gmail.com"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-amber-500 transition ${
                    isDark
                      ? "bg-slate-950 border-slate-800 text-slate-100"
                      : "bg-stone-50 border-stone-200 text-stone-900"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                  Kata Sandi
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-amber-500 transition pr-10 ${
                      isDark
                        ? "bg-slate-950 border-slate-800 text-slate-100"
                        : "bg-stone-50 border-stone-200 text-stone-900"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-900/25 transition mt-2 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Masuk ke Akun</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick 1-Tap Demo Shortcuts (Automatic Detection) */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider block text-center">
              Pilihan Akun Demo Instan (Otomatis Role):
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail("admin");
                  setPassword("admin");
                  // Auto submit
                  setTimeout(() => {
                    const adminUser: AuthUser = {
                      id: "usr-admin-demo",
                      name: "Admin Kasir POS",
                      email: "admin@gentlemanscut.com",
                      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                      role: "admin",
                      provider: "password",
                    };
                    onLoginSuccess(adminUser);
                  }, 200);
                }}
                className={`p-2.5 rounded-xl border text-left transition ${
                  isDark
                    ? "bg-slate-950 hover:bg-slate-800 border-slate-800"
                    : "bg-amber-50 hover:bg-amber-100 border-amber-200"
                }`}
              >
                <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Akun Admin</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                  Role: Kasir POS
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail("reza.pratama@gmail.com");
                  setPassword("123456");
                  // Auto submit
                  setTimeout(() => {
                    const custUser: AuthUser = {
                      id: "usr-cust-demo",
                      name: "Reza Pratama",
                      email: "reza.pratama@gmail.com",
                      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                      role: "customer",
                      provider: "password",
                    };
                    onLoginSuccess(custUser);
                  }, 200);
                }}
                className={`p-2.5 rounded-xl border text-left transition ${
                  isDark
                    ? "bg-slate-950 hover:bg-slate-800 border-slate-800"
                    : "bg-stone-50 hover:bg-stone-100 border-stone-200"
                }`}
              >
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                  <User className="w-3.5 h-3.5" />
                  <span>Pelanggan</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                  Role: Member VIP
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Google Account Selector Dialog */}
      {isGoogleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-sm rounded-3xl border shadow-2xl p-6 relative ${
              isDark
                ? "bg-slate-900 border-slate-800 text-slate-100"
                : "bg-white border-amber-200 text-stone-900"
            }`}
          >
            <button
              onClick={() => setIsGoogleModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-5">
              <GoogleIcon className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-bold text-base">Masuk dengan Akun Google</h3>
              <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                Pilih akun Google Anda untuk melanjutkan ke The Gentleman&apos;s Cut:
              </p>
            </div>

            <div className="space-y-2.5">
              {/* Option 1: Admin Account */}
              <div
                onClick={() => handleSelectGoogleAccount("admin")}
                className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  isDark
                    ? "bg-slate-950 border-slate-800 hover:border-amber-500/50"
                    : "bg-stone-50 border-stone-200 hover:border-amber-500"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80"
                    alt="Admin"
                    className="w-10 h-10 rounded-full border border-amber-500"
                  />
                  <div>
                    <h4 className="font-bold text-xs">Admin Barbershop (Kasir POS)</h4>
                    <span className="text-[11px] text-slate-400 font-mono block">
                      admin.barbershop@gmail.com
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-mono uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                  ADMIN
                </span>
              </div>

              {/* Option 2: Customer Account */}
              <div
                onClick={() => handleSelectGoogleAccount("customer")}
                className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  isDark
                    ? "bg-slate-950 border-slate-800 hover:border-emerald-500/50"
                    : "bg-stone-50 border-stone-200 hover:border-emerald-500"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Customer"
                    className="w-10 h-10 rounded-full border border-emerald-500"
                  />
                  <div>
                    <h4 className="font-bold text-xs">Reza Pratama</h4>
                    <span className="text-[11px] text-slate-400 font-mono block">
                      reza.pratama@gmail.com
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                  PELANGGAN
                </span>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 text-center mt-4">
              Sistem otomatis mengarahkan ke dashboard yang sesuai (Admin atau Pelanggan).
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="max-w-md mx-auto w-full text-center text-[11px] text-slate-500 z-10 py-2">
        © 2026 The Gentleman&apos;s Cut Barbershop • Keamanan OAuth 2.0
      </footer>
    </div>
  );
}
