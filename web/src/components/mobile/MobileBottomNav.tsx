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
          : "bg-white/95 border-amber-200 text-stone-600 shadow-lg shadow-black/5"
      }`}
    >
      {currentRole === "customer" ? (
        <>
          {/* Landing / Home */}
          <button
            onClick={onGoToLanding}
            className="flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition hover:text-amber-500"
          >
            <Home className="w-4 h-4 mb-0.5" />
            <span>Beranda</span>
          </button>

          {/* Booking */}
          <button
            onClick={() => setActiveCustomerTab("booking")}
            className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition ${
              activeCustomerTab === "booking"
                ? "text-amber-500 font-bold"
                : "hover:text-amber-500"
            }`}
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span>Booking</span>
          </button>

          {/* Services */}
          <button
            onClick={() => setActiveCustomerTab("services")}
            className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition ${
              activeCustomerTab === "services"
                ? "text-amber-500 font-bold"
                : "hover:text-amber-500"
            }`}
          >
            <Scissors className="w-4 h-4 mb-0.5" />
            <span>Layanan</span>
          </button>

          {/* Membership */}
          <button
            onClick={() => setActiveCustomerTab("membership")}
            className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition ${
              activeCustomerTab === "membership"
                ? "text-amber-500 font-bold"
                : "hover:text-amber-500"
            }`}
          >
            <Sparkles className="w-4 h-4 mb-0.5" />
            <span>VIP Pass</span>
          </button>

          {/* Cek Tiket */}
          <button
            onClick={onOpenCheckBooking}
            className="flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition hover:text-amber-500"
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
                ? "text-amber-500 font-bold"
                : "hover:text-amber-500"
            }`}
          >
            <LayoutDashboard className="w-4 h-4 mb-0.5" />
            <span>Ringkasan</span>
          </button>

          {/* Queue POS */}
          <button
            onClick={() => setActiveAdminTab("queue")}
            className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition ${
              activeAdminTab === "queue"
                ? "text-amber-500 font-bold"
                : "hover:text-amber-500"
            }`}
          >
            <ListOrdered className="w-4 h-4 mb-0.5" />
            <span>Kasir POS</span>
          </button>

          {/* Services CRUD */}
          <button
            onClick={() => setActiveAdminTab("services")}
            className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition ${
              activeAdminTab === "services"
                ? "text-amber-500 font-bold"
                : "hover:text-amber-500"
            }`}
          >
            <Layers className="w-4 h-4 mb-0.5" />
            <span>Layanan</span>
          </button>

          {/* Member Subscriptions */}
          <button
            onClick={() => setActiveAdminTab("members")}
            className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition ${
              activeAdminTab === "members"
                ? "text-amber-500 font-bold"
                : "hover:text-amber-500"
            }`}
          >
            <Users className="w-4 h-4 mb-0.5" />
            <span>Anggota</span>
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium text-red-400 hover:text-red-300 transition"
          >
            <LogOut className="w-4 h-4 mb-0.5" />
            <span>Keluar</span>
          </button>
        </>
      )}
    </div>
  );
}
