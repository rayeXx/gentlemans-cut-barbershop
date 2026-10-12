import React from "react";
import { 
  Scissors, 
  Calendar, 
  Sparkles, 
  Search, 
  LayoutDashboard, 
  ListOrdered, 
  Layers, 
  Users, 
  LogOut,
  Home
} from "lucide-react";

interface MobileBottomNavProps {
  currentRole: "customer" | "admin";
  activeCustomerTab: "booking" | "services" | "membership";
  setActiveCustomerTab: (tab: "booking" | "services" | "membership") => void;
  activeAdminTab: "overview" | "queue" | "services" | "members";
  setActiveAdminTab: (tab: "overview" | "queue" | "services" | "members") => void;
  onOpenCheckBooking: () => void;
  onGoToLanding: () => void;
  onLogout: () => void;
  isDark: boolean;
}

export function MobileBottomNav({
  currentRole,
  activeCustomerTab,
  setActiveCustomerTab,
  activeAdminTab,
  setActiveAdminTab,
  onOpenCheckBooking,
  onGoToLanding,
  onLogout,
  isDark,
}: MobileBottomNavProps) {
  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-lg px-2 py-1.5 flex items-center justify-around transition-colors duration-200 ${
        isDark
          ? "bg-slate-950/95 border-slate-800 text-slate-300"
          : "bg-white/95 border-stone-200/90 text-stone-600 shadow-lg shadow-stone-900/5"
      }`}
    >
      {currentRole === "customer" ? (
        <>
          {/* Landing / Home */}
          <button
            onClick={onGoToLanding}
            className="flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition hover:text-amber-600"
          >
            <Home className="w-4 h-4 mb-0.5" />
            <span>Beranda</span>
          </button>

          {/* Booking */}
          <button
            onClick={() => setActiveCustomerTab("booking")}
            className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition ${
              activeCustomerTab === "booking"
                ? "text-amber-600 dark:text-amber-400 font-bold"
                : "hover:text-amber-600"
            }`}
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span>Booking</span>
            {activeCustomerTab === "booking" && (
              <span className="w-1 h-1 rounded-full bg-amber-600 dark:bg-amber-400 mt-0.5" />
            )}
          </button>

          {/* Services */}
          <button
            onClick={() => setActiveCustomerTab("services")}
            className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition ${
              activeCustomerTab === "services"
                ? "text-amber-600 dark:text-amber-400 font-bold"
                : "hover:text-amber-600"
            }`}
          >
            <Scissors className="w-4 h-4 mb-0.5" />
            <span>Layanan</span>
            {activeCustomerTab === "services" && (
              <span className="w-1 h-1 rounded-full bg-amber-600 dark:bg-amber-400 mt-0.5" />
            )}
          </button>

          {/* Membership */}
          <button
            onClick={() => setActiveCustomerTab("membership")}
            className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition ${
              activeCustomerTab === "membership"
                ? "text-amber-600 dark:text-amber-400 font-bold"
                : "hover:text-amber-600"
            }`}
          >
            <Sparkles className="w-4 h-4 mb-0.5" />
            <span>VIP Pass</span>
            {activeCustomerTab === "membership" && (
              <span className="w-1 h-1 rounded-full bg-amber-600 dark:bg-amber-400 mt-0.5" />
            )}
          </button>

          {/* Cek Tiket */}
          <button
            onClick={onOpenCheckBooking}
            className="flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition hover:text-amber-600"
          >
            <Search className="w-4 h-4 mb-0.5" />
            <span>Cek Tiket</span>
          </button>
        </>
      ) : (
        <>
          {/* Admin Overview */}
          <button
            onClick={() => setActiveAdminTab("overview")}
            className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition ${
              activeAdminTab === "overview"
                ? "text-amber-600 dark:text-amber-400 font-bold"
                : "hover:text-amber-600"
            }`}
          >
            <LayoutDashboard className="w-4 h-4 mb-0.5" />
            <span>Ringkasan</span>
            {activeAdminTab === "overview" && (
              <span className="w-1 h-1 rounded-full bg-amber-600 dark:bg-amber-400 mt-0.5" />
            )}
          </button>

          {/* Queue POS */}
          <button
            onClick={() => setActiveAdminTab("queue")}
            className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition ${
              activeAdminTab === "queue"
                ? "text-amber-600 dark:text-amber-400 font-bold"
                : "hover:text-amber-600"
            }`}
          >
            <ListOrdered className="w-4 h-4 mb-0.5" />
            <span>Kasir POS</span>
            {activeAdminTab === "queue" && (
              <span className="w-1 h-1 rounded-full bg-amber-600 dark:bg-amber-400 mt-0.5" />
            )}
          </button>

          {/* Services CRUD */}
          <button
            onClick={() => setActiveAdminTab("services")}
            className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition ${
              activeAdminTab === "services"
                ? "text-amber-600 dark:text-amber-400 font-bold"
                : "hover:text-amber-600"
            }`}
          >
            <Layers className="w-4 h-4 mb-0.5" />
            <span>Layanan</span>
            {activeAdminTab === "services" && (
              <span className="w-1 h-1 rounded-full bg-amber-600 dark:bg-amber-400 mt-0.5" />
            )}
          </button>

          {/* Member Subscriptions */}
          <button
            onClick={() => setActiveAdminTab("members")}
            className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition ${
              activeAdminTab === "members"
                ? "text-amber-600 dark:text-amber-400 font-bold"
                : "hover:text-amber-600"
            }`}
          >
            <Users className="w-4 h-4 mb-0.5" />
            <span>Anggota</span>
            {activeAdminTab === "members" && (
              <span className="w-1 h-1 rounded-full bg-amber-600 dark:bg-amber-400 mt-0.5" />
            )}
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium text-red-500 hover:text-red-400 transition"
          >
            <LogOut className="w-4 h-4 mb-0.5" />
            <span>Keluar</span>
          </button>
        </>
      )}
    </div>
  );
}
