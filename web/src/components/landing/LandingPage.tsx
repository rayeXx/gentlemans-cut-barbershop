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
  Moon,
  ChevronRight,
  PhoneCall
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
        isDark ? "bg-slate-950 text-slate-100" : "bg-[#FDFBF7] text-stone-900"
      }`}
    >
      {/* Sleek Mobile & Desktop Header */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md px-4 sm:px-6 py-3 transition-colors ${
          isDark
            ? "bg-slate-950/90 border-slate-800/80"
            : "bg-[#FDFBF7]/90 border-amber-900/10"
        }`}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl border flex items-center justify-center shadow-sm shrink-0 ${
                isDark
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                  : "bg-amber-100/80 border-amber-300 text-amber-800"
              }`}
            >
              <Scissors className="w-4 h-4 transform -rotate-45" />
            </div>
            <div className="leading-tight">
              <span className="font-extrabold text-sm sm:text-base tracking-tight font-serif block">
                The Gentleman&apos;s Cut
              </span>
              <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono tracking-wider font-semibold">
                BARBERSHOP • JAKARTA
              </span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onThemeToggle}
              className={`p-2 rounded-xl border transition ${
                isDark
                  ? "bg-slate-900 border-slate-800 text-amber-400"
                  : "bg-white border-stone-200 text-stone-700 shadow-sm"
              }`}
              title="Ganti Tema"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onGoToLogin}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-sm transition active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Masuk</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section (Optimized for Mobile) */}
      <section className="relative px-4 sm:px-6 pt-6 pb-10 sm:py-16 max-w-4xl mx-auto w-full text-center space-y-5">
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold border border-amber-600/20 bg-amber-500/10 text-amber-800 dark:text-amber-400">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span>Lounge &amp; Barbershop Mewah</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Seni Cukur Pria Berkelas.
          </h1>
          <p className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-amber-600 dark:text-amber-400">
            Reservasi Mudah, Tanpa Antre.
          </p>
        </div>

        {/* Subtitle */}
        <p className={`text-xs sm:text-sm max-w-md mx-auto leading-relaxed ${
          isDark ? "text-slate-400" : "text-stone-600"
        }`}>
          Pesan kursi kapster specialist favorit Anda dalam hitungan detik. Cepat, presisi, dan higienis.
        </p>

        {/* Primary Action Buttons (Mobile-First Stack) */}
        <div className="pt-2 flex flex-col gap-2.5 max-w-xs mx-auto">
          <button
            onClick={onExploreAsGuest}
            className="w-full py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-lg shadow-amber-600/20 transition flex items-center justify-center gap-2 active:scale-98"
          >
            <Calendar className="w-4 h-4" />
            <span>Pesan Kursi Sekarang</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={onGoToLogin}
            className={`w-full py-2.5 px-4 rounded-2xl font-semibold text-xs border transition flex items-center justify-center gap-2 ${
              isDark
                ? "bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800"
                : "bg-white border-amber-200/90 text-stone-800 hover:bg-amber-50/60 shadow-sm"
            }`}
          >
            <LogIn className="w-3.5 h-3.5 text-amber-600" />
            <span>Masuk Akun / Google</span>
          </button>
        </div>

        {/* 4 Clean Metric Cards Grid */}
        <div className="pt-4 grid grid-cols-2 gap-2.5 max-w-sm sm:max-w-md mx-auto">
          <div className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 ${
            isDark ? "bg-slate-900/80 border-slate-800" : "bg-white border-amber-900/10 shadow-sm"
          }`}>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
              <Star className="w-4 h-4 fill-amber-500" />
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm block">4.9 / 5.0</span>
              <span className="text-[10px] text-stone-500 dark:text-slate-400">500+ Ulasan</span>
            </div>
          </div>

          <div className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 ${
            isDark ? "bg-slate-900/80 border-slate-800" : "bg-white border-amber-900/10 shadow-sm"
          }`}>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm block">Real-Time</span>
              <span className="text-[10px] text-stone-500 dark:text-slate-400">Slot Terkunci</span>
            </div>
          </div>

          <div className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 ${
            isDark ? "bg-slate-900/80 border-slate-800" : "bg-white border-amber-900/10 shadow-sm"
          }`}>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm block">VIP Pass</span>
              <span className="text-[10px] text-stone-500 dark:text-slate-400">Hemat Bulanan</span>
            </div>
          </div>

          <div className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 ${
            isDark ? "bg-slate-900/80 border-slate-800" : "bg-white border-amber-900/10 shadow-sm"
          }`}>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm block">Kasir POS</span>
              <span className="text-[10px] text-stone-500 dark:text-slate-400">Kelola Jadwal</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className={`py-8 px-4 sm:px-6 border-t ${
        isDark ? "bg-slate-900/30 border-slate-800/80" : "bg-stone-100/50 border-amber-900/10"
      }`}>
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif">Menu Favorit</h2>
              <p className="text-[11px] text-stone-500 dark:text-slate-400">Pilihan paket potong &amp; grooming</p>
            </div>
            <button
              onClick={onExploreAsGuest}
              className="text-xs font-semibold text-amber-600 hover:text-amber-500 flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {popularServices.map((srv) => (
              <div
                key={srv.id}
                onClick={onExploreAsGuest}
                className={`p-4 rounded-2xl border cursor-pointer transition hover:border-amber-500 flex items-center justify-between gap-3 ${
                  isDark ? "bg-slate-900/80 border-slate-800" : "bg-white border-stone-200/80 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${
                    isDark ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-700"
                  }`}>
                    <Scissors className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm">{srv.name}</h3>
                    <p className="text-[11px] text-stone-500 dark:text-slate-400 line-clamp-1">{srv.description}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-xs sm:text-sm text-amber-600 dark:text-amber-400 block">
                    {formatRupiah(srv.price)}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">{srv.durationMinutes} m</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Barbers Showcase */}
      <section className="py-8 px-4 sm:px-6 max-w-4xl mx-auto w-full space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold font-serif">5 Master Kapster</h2>
          <p className="text-[11px] text-stone-500 dark:text-slate-400">Spesialis teknik fade, scissor cut, dan royal shave</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {barbers.map((b) => (
            <div
              key={b.id}
              className={`p-3 rounded-2xl border text-center ${
                isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-stone-200/80 shadow-sm"
              }`}
            >
              <img
                src={b.avatar}
                alt={b.name}
                className="w-12 h-12 rounded-xl object-cover border border-amber-500/30 mx-auto mb-2"
              />
              <h4 className="font-bold text-xs truncate">{b.name}</h4>
              <p className="text-[10px] text-amber-600 dark:text-amber-400 truncate mt-0.5">{b.specialty}</p>
              <div className="mt-2 pt-1.5 border-t border-stone-200/50 dark:border-slate-800 flex items-center justify-center gap-1 text-[10px]">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span className="font-bold">{b.rating.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile Floating Bottom Bar for Quick Booking */}
      <div className="sticky bottom-0 z-30 p-3 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-stone-200 dark:border-slate-800 sm:hidden flex items-center gap-2">
        <button
          onClick={onExploreAsGuest}
          className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs bg-amber-600 text-white shadow-md flex items-center justify-center gap-1.5"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Pesan Kursi Sekarang</span>
        </button>
        <button
          onClick={onGoToLogin}
          className="py-2.5 px-3.5 rounded-xl font-semibold text-xs border border-stone-300 dark:border-slate-700 text-stone-700 dark:text-slate-200"
        >
          Masuk
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200 dark:border-slate-800 py-6 px-4 text-center text-[11px] text-stone-500 dark:text-slate-500">
        <p className="font-mono">
          © 2026 The Gentleman&apos;s Cut Barbershop • Senopati &amp; Pondok Indah
        </p>
      </footer>
    </div>
  );
}
