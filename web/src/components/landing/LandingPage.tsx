import React from "react";
import { ServiceItem, Barber } from "@/types/barbershop";
import { formatRupiah } from "@/lib/mockData";
import { 
  Scissors, 
  Sparkles, 
  Star, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Crown, 
  LogIn, 
  Calendar,
  Sun,
  Moon
} from "lucide-react";

interface LandingPageProps {
  onGoToLogin: () => void;
  onExploreAsGuest: () => void;
  services: ServiceItem[];
  barbers: Barber[];
  isDark: boolean;
  onThemeToggle: () => void;
}

export function LandingPage({
  onGoToLogin,
  onExploreAsGuest,
  services,
  barbers,
  isDark,
  onThemeToggle,
}: LandingPageProps) {
  const popularServices = services.slice(0, 4);

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-stone-50 text-stone-900"
      }`}
    >
      {/* Top Navbar */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between ${
          isDark
            ? "bg-slate-950/85 border-slate-800/80"
            : "bg-amber-50/90 border-amber-200/80"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-2xl border flex items-center justify-center shadow-md ${
              isDark
                ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                : "bg-amber-100 border-amber-300 text-amber-800"
            }`}
          >
            <Scissors className="w-5 h-5 transform -rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight font-serif">
                The Gentleman&apos;s Cut
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full border border-amber-500/30 text-amber-500 bg-amber-500/10">
                BARBERSHOP
              </span>
            </div>
            <p className="text-[10px] text-slate-500 hidden sm:block">
              Jakarta • Senopati &amp; Pondok Indah
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onThemeToggle}
            className={`p-2 rounded-xl border transition ${
              isDark
                ? "bg-slate-900 border-slate-800 text-amber-400 hover:border-slate-700"
                : "bg-white border-amber-200 text-amber-700 hover:border-amber-300 shadow-sm"
            }`}
            title="Ganti Tema"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onGoToLogin}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-900/20 transition transform active:scale-95"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Masuk / Login</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-20 px-4 sm:px-8 border-b border-amber-500/10">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border border-amber-500/30 bg-amber-500/10 text-amber-500">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Premium Grooming Experience • Mobile &amp; Web Ready</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight leading-tight">
            Seni Cukur Pria Berkelas. <br />
            <span className="text-amber-500">Reservasi Mudah, Tanpa Antre.</span>
          </h1>

          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
            isDark ? "text-slate-400" : "text-stone-600"
          }`}>
            Platform reservasi pintar &amp; kasir POS terintegrasi. Pilih kapster favorit, tentukan jam kunjungan, bayar via QRIS atau kuota Grooming Pass VIP, dan terima tiket via WhatsApp.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onGoToLogin}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-xl shadow-amber-900/25 transition flex items-center justify-center gap-2 transform active:scale-98"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk dengan Akun / Google</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreAsGuest}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-semibold text-sm border transition flex items-center justify-center gap-2 ${
                isDark
                  ? "bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700"
                  : "bg-white border-amber-200 text-stone-800 hover:bg-amber-50 shadow-sm"
              }`}
            >
              <span>Jelajahi Sebagai Tamu</span>
            </button>
          </div>

          {/* Quick Stats Banner */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className={`p-3 rounded-2xl border ${
              isDark ? "bg-slate-900/60 border-slate-800" : "bg-white/90 border-amber-200 shadow-sm"
            }`}>
              <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-lg font-mono">
                <Star className="w-4 h-4 fill-amber-500" />
                <span>4.9 / 5.0</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">500+ Ulasan Puas</p>
            </div>

            <div className={`p-3 rounded-2xl border ${
              isDark ? "bg-slate-900/60 border-slate-800" : "bg-white/90 border-amber-200 shadow-sm"
            }`}>
              <div className="flex items-center justify-center gap-1 text-emerald-400 font-bold text-lg font-mono">
                <Clock className="w-4 h-4" />
                <span>Real-Time</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Slot Otomatis Terkunci</p>
            </div>

            <div className={`p-3 rounded-2xl border ${
              isDark ? "bg-slate-900/60 border-slate-800" : "bg-white/90 border-amber-200 shadow-sm"
            }`}>
              <div className="flex items-center justify-center gap-1 text-purple-400 font-bold text-lg font-mono">
                <Crown className="w-4 h-4" />
                <span>Grooming Pass</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Langganan 2x / Unlimited</p>
            </div>

            <div className={`p-3 rounded-2xl border ${
              isDark ? "bg-slate-900/60 border-slate-800" : "bg-white/90 border-amber-200 shadow-sm"
            }`}>
              <div className="flex items-center justify-center gap-1 text-blue-400 font-bold text-lg font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>Kasir POS</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Role Admin Terintegrasi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-6xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 font-mono">
            MENU PERAWATAN
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif">Layanan Unggulan</h2>
          <p className={`text-xs max-w-lg mx-auto ${isDark ? "text-slate-400" : "text-stone-600"}`}>
            Potongan rambut presisi dengan sentuhan handuk hangat aromaterapi dan produk premium.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularServices.map((srv) => (
            <div
              key={srv.id}
              className={`p-5 rounded-3xl border flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                isDark
                  ? "bg-slate-900/70 border-slate-800 text-slate-100"
                  : "bg-white border-amber-200 text-stone-900 shadow-sm"
              }`}
            >
              <div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 w-fit mb-3">
                  <Scissors className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base font-serif">{srv.name}</h3>
                <p className={`text-xs mt-1.5 line-clamp-2 ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                  {srv.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">{srv.durationMinutes} mnt</span>
                <span className="font-mono font-bold text-sm text-amber-500">
                  {formatRupiah(srv.price)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Barbers Showcase */}
      <section className={`py-12 sm:py-16 px-4 sm:px-8 border-t border-amber-500/10 ${
        isDark ? "bg-slate-900/30" : "bg-amber-100/30"
      }`}>
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 font-mono">
              MASTER SPECIALISTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">5 Kapster Profesional</h2>
            <p className={`text-xs max-w-lg mx-auto ${isDark ? "text-slate-400" : "text-stone-600"}`}>
              Siap melayani gaya rambut klasik, modern fade, hingga royal hot shave.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {barbers.map((b) => (
              <div
                key={b.id}
                className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-between ${
                  isDark ? "bg-slate-950/80 border-slate-800" : "bg-white border-amber-200 shadow-sm"
                }`}
              >
                <div>
                  <img
                    src={b.avatar}
                    alt={b.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500/30 mx-auto mb-2"
                  />
                  <h4 className="font-bold text-xs">{b.name}</h4>
                  <p className="text-[10px] text-amber-500 mt-0.5 line-clamp-1">{b.specialty}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/40 w-full flex items-center justify-center gap-1 text-[11px]">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span className="font-bold">{b.rating.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA & Footer */}
      <footer className="mt-auto border-t border-slate-800 py-8 px-4 sm:px-8 text-center text-xs text-slate-500 space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={onGoToLogin} className="hover:text-amber-500 font-semibold transition">
            Login Admin &amp; Pelanggan
          </button>
          <span>•</span>
          <button onClick={onExploreAsGuest} className="hover:text-amber-500 font-semibold transition">
            Booking Online
          </button>
        </div>
        <p className="font-mono text-[11px]">
          © 2026 The Gentleman&apos;s Cut Barbershop. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
