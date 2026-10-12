import React from "react";
import { AuthUser } from "@/types/barbershop";
import { 
  Scissors, 
  Sun, 
  Moon, 
  ShieldCheck, 
  UserCheck, 
  CalendarCheck, 
  Sparkles, 
  LogOut, 
  LogIn, 
  User, 
  Home 
} from "lucide-react";

interface NavbarProps {
  authUser: AuthUser | null;
  currentRole: "customer" | "admin";
  isAdminLoggedIn: boolean;
  onRoleToggle: (role: "customer" | "admin") => void;
  onLogout: () => void;
  onGoToLanding: () => void;
  onGoToLogin: () => void;
  theme: "light" | "dark";
  onThemeToggle: () => void;
  onOpenCheckBooking: () => void;
  activeCustomerTab: "booking" | "services" | "membership";
  setActiveCustomerTab: (tab: "booking" | "services" | "membership") => void;
}

export function Navbar({
  authUser,
  currentRole,
  isAdminLoggedIn,
  onRoleToggle,
  onLogout,
  onGoToLanding,
  onGoToLogin,
  theme,
  onThemeToggle,
  onOpenCheckBooking,
  activeCustomerTab,
  setActiveCustomerTab,
}: NavbarProps) {
  const isDark = theme === "dark";

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-200 ${
        isDark
          ? "bg-slate-950/85 border-slate-800/80 text-slate-100"
          : "bg-amber-50/90 border-amber-200/80 text-stone-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Name */}
          <div 
            onClick={onGoToLanding}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div
              className={`p-2.5 rounded-2xl border flex items-center justify-center shadow-md transition group-hover:scale-105 ${
                isDark
                  ? "bg-gradient-to-br from-amber-500/20 to-amber-700/10 border-amber-500/40 text-amber-400"
                  : "bg-amber-100 border-amber-300 text-amber-800 shadow-amber-900/5"
              }`}
            >
              <Scissors className="w-6 h-6 transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-base sm:text-xl font-serif">
                  The Gentleman&apos;s Cut
                </span>
                <span
                  className={`hidden sm:inline-block text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border ${
                    isDark
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      : "bg-amber-200/70 text-amber-900 border-amber-300"
                  }`}
                >
                  Est. 2026
                </span>
              </div>
              <p className={`text-[11px] sm:text-xs ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                Barbershop &amp; Online Booking
              </p>
            </div>
          </div>

          {/* Navigation Links (Customer View Only) */}
          {currentRole === "customer" && (
            <nav className="hidden md:flex items-center gap-1 bg-slate-900/10 dark:bg-slate-900/40 p-1.5 rounded-xl border border-amber-500/10">
              <button
                onClick={onGoToLanding}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
                  isDark ? "text-slate-300 hover:text-white" : "text-stone-700 hover:text-stone-900"
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Beranda</span>
              </button>
              <button
                onClick={() => setActiveCustomerTab("booking")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeCustomerTab === "booking"
                    ? isDark
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "bg-amber-600 text-white shadow"
                    : isDark
                    ? "text-slate-300 hover:text-white"
                    : "text-stone-700 hover:text-stone-900"
                }`}
              >
                Booking Online
              </button>
              <button
                onClick={() => setActiveCustomerTab("services")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeCustomerTab === "services"
                    ? isDark
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "bg-amber-600 text-white shadow"
                    : isDark
                    ? "text-slate-300 hover:text-white"
                    : "text-stone-700 hover:text-stone-900"
                }`}
              >
                Katalog Layanan
              </button>
              <button
                onClick={() => setActiveCustomerTab("membership")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  activeCustomerTab === "membership"
                    ? isDark
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "bg-amber-600 text-white shadow"
                    : isDark
                    ? "text-slate-300 hover:text-white"
                    : "text-stone-700 hover:text-stone-900"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Grooming Pass
              </button>
            </nav>
          )}

          {/* Right Action Controls: User Profile / Role Switcher / Theme */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cek Tiket Booking Shortcut (Customer) */}
            {currentRole === "customer" && (
              <button
                onClick={onOpenCheckBooking}
                className={`hidden lg:flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl border transition ${
                  isDark
                    ? "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-amber-500/40 hover:text-amber-300"
                    : "bg-white border-amber-200 text-stone-700 hover:border-amber-400 hover:text-amber-800 shadow-sm"
                }`}
              >
                <CalendarCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>Cek Tiket</span>
              </button>
            )}

            {/* Theme Toggle (Cerah Modern vs Dark Luxury) */}
            <button
              onClick={onThemeToggle}
              title={isDark ? "Ganti ke Tema Cerah" : "Ganti ke Tema Gelap Mewah"}
              className={`p-2 rounded-xl border transition ${
                isDark
                  ? "bg-slate-900 border-slate-800 text-amber-400 hover:border-slate-700"
                  : "bg-white border-amber-200 text-amber-700 hover:border-amber-300 shadow-sm"
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Profile or Login Trigger */}
            {authUser ? (
              <div
                className={`p-1.5 rounded-2xl border flex items-center gap-2 ${
                  isDark ? "bg-slate-900 border-slate-800" : "bg-white border-amber-200 shadow-sm"
                }`}
              >
                <img
                  src={authUser.avatar}
                  alt={authUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-amber-500"
                />
                <div className="hidden sm:block text-left pr-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold leading-tight truncate max-w-[100px]">
                      {authUser.name.split(" ")[0]}
                    </span>
                    <span
                      className={`text-[8px] font-mono uppercase px-1 py-0.2 rounded font-bold ${
                        authUser.role === "admin"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {authUser.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  title="Logout / Keluar Akun"
                  className="p-1 rounded-lg text-slate-400 hover:text-red-400 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onGoToLogin}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}

            {/* Role Switcher Pill (Customer vs Admin) */}
            <div
              className={`hidden sm:flex p-1 rounded-2xl border items-center gap-1 ${
                isDark
                  ? "bg-slate-900/90 border-slate-800"
                  : "bg-white/90 border-amber-200 shadow-sm"
              }`}
            >
              <button
                onClick={() => onRoleToggle("customer")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-semibold transition ${
                  currentRole === "customer"
                    ? isDark
                      ? "bg-slate-800 text-amber-400 shadow-sm border border-slate-700"
                      : "bg-amber-100 text-amber-900 shadow-sm border border-amber-300"
                    : isDark
                    ? "text-slate-400 hover:text-slate-200"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                <UserCheck className="w-3 h-3" />
                <span>Pelanggan</span>
              </button>

              <button
                onClick={() => onRoleToggle("admin")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-semibold transition ${
                  currentRole === "admin"
                    ? isDark
                      ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                      : "bg-amber-600 text-white font-bold shadow-sm"
                    : isDark
                    ? "text-slate-400 hover:text-slate-200"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
