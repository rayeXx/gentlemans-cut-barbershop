import React, { useState } from "react";
import { Lock, User, ShieldCheck, KeyRound, AlertCircle, X, Sparkles } from "lucide-react";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  isDark: boolean;
}

export function AdminLoginModal({ isOpen, onClose, onLoginSuccess, isDark }: AdminLoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === "admin" && password.trim() === "admin") {
      setError(null);
      onLoginSuccess();
    } else {
      setError("Username atau password salah! Gunakan username: 'admin' dan password: 'admin'");
    }
  };

  const handleAutofill = () => {
    setUsername("admin");
    setPassword("admin");
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 sm:p-8 relative ${
          isDark
            ? "bg-slate-900 border-slate-800 text-slate-100"
            : "bg-white border-amber-200 text-stone-900"
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-xl transition ${
            isDark ? "hover:bg-slate-800 text-slate-400" : "hover:bg-stone-100 text-stone-400"
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div
            className={`w-14 h-14 mx-auto rounded-2xl border flex items-center justify-center mb-3 shadow-lg ${
              isDark
                ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                : "bg-amber-100 border-amber-300 text-amber-800"
            }`}
          >
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif">Akses Admin &amp; Kasir (POS)</h2>
          <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-stone-500"}`}>
            Masukkan kredensial pengelola barbershop untuk membuka dashboard dan kasir.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className={`text-xs font-semibold ${isDark ? "text-slate-300" : "text-stone-700"}`}>
              Username Admin
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition focus:outline-none ${
                  isDark
                    ? "bg-slate-950 border-slate-800 focus:border-amber-500 text-slate-100"
                    : "bg-stone-50 border-stone-200 focus:border-amber-500 text-stone-900"
                }`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={`text-xs font-semibold ${isDark ? "text-slate-300" : "text-stone-700"}`}>
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition focus:outline-none ${
                  isDark
                    ? "bg-slate-950 border-slate-800 focus:border-amber-500 text-slate-100"
                    : "bg-stone-50 border-stone-200 focus:border-amber-500 text-stone-900"
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-900/20 transition flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>Masuk ke Dashboard Admin</span>
          </button>
        </form>

        {/* Quick Demo Autofill Hint */}
        <div
          className={`mt-6 pt-4 border-t text-center space-y-2 ${
            isDark ? "border-slate-800" : "border-stone-200"
          }`}
        >
          <p className={`text-[11px] ${isDark ? "text-slate-400" : "text-stone-500"}`}>
            Kredensial Demo: <code className="font-mono font-bold text-amber-500">admin</code> /{" "}
            <code className="font-mono font-bold text-amber-500">admin</code>
          </p>
          <button
            type="button"
            onClick={handleAutofill}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${
              isDark
                ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700"
                : "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Isi Otomatis Kredensial Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
