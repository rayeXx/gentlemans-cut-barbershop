import React, { useMemo, useState, useEffect } from "react";
import { Booking, Barber, MemberSubscription } from "@/types/barbershop";
import { formatRupiah, AVAILABLE_TIME_SLOTS } from "@/lib/mockData";
import { 
  CalendarDays, 
  TrendingUp, 
  Users, 
  Scissors, 
  Clock, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  Activity, 
  PlusCircle, 
  AlertCircle 
} from "lucide-react";

interface AdminDashboardProps {
  bookings: Booking[];
  barbers: Barber[];
  subscriptions: MemberSubscription[];
  onOpenQuickWalkIn: () => void;
  onUpdateStatus: (bookingId: string, status: Booking["status"]) => void;
  isDark: boolean;
}

export function AdminDashboard({
  bookings,
  barbers,
  subscriptions,
  onOpenQuickWalkIn,
  onUpdateStatus,
  isDark,
}: AdminDashboardProps) {
  const [todayStr, setTodayStr] = useState("2026-10-12");

  useEffect(() => {
    setTodayStr(new Date().toISOString().split("T")[0]);
  }, []);

  // Metrics calculation
  const todayBookings = useMemo(
    () => bookings.filter((b) => b.date === todayStr && b.status !== "cancelled"),
    [bookings, todayStr]
  );

  const totalRevenue = useMemo(() => {
    return bookings
      .filter((b) => b.paymentStatus === "paid" || b.status === "completed")
      .reduce((acc, curr) => acc + curr.totalPrice, 0);
  }, [bookings]);

  const inChairCount = useMemo(
    () => bookings.filter((b) => b.status === "in_chair").length,
    [bookings]
  );

  const activeMembershipsCount = useMemo(
    () => subscriptions.filter((s) => s.status === "active").length,
    [subscriptions]
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome & Quick Walk-In Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 font-mono">
            KASIR &amp; EXECUTIVE OVERVIEW
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif mt-0.5">
            Dashboard Operasional Barbershop
          </h2>
          <p className={`text-xs ${isDark ? "text-slate-400" : "text-stone-500"}`}>
            Monitoring antrean kapster, performa kasir (POS), dan pendapatan secara real-time.
          </p>
        </div>

        <button
          onClick={onOpenQuickWalkIn}
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-900/20 transition flex items-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Tambah Walk-In (Kasir POS)</span>
        </button>
      </div>

      {/* 4 Interactive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Booking Hari Ini */}
        <div
          className={`p-5 rounded-3xl border transition ${
            isDark
              ? "bg-slate-900/70 border-slate-800 text-slate-100"
              : "bg-white border-amber-200 text-stone-900 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Booking Hari Ini</span>
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <CalendarDays className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-amber-500">
              {todayBookings.length}
            </span>
            <span className="text-xs text-slate-400 font-mono">sesi reservasi</span>
          </div>
          <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1 font-mono">
            <TrendingUp className="w-3 h-3" />
            <span>+14% vs kemarin</span>
          </p>
        </div>

        {/* Metric 2: Total Pendapatan (Revenue) */}
        <div
          className={`p-5 rounded-3xl border transition ${
            isDark
              ? "bg-slate-900/70 border-slate-800 text-slate-100"
              : "bg-white border-amber-200 text-stone-900 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Total Revenue (Gross)</span>
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
              {formatRupiah(totalRevenue)}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-mono">
            Termasuk QRIS, Cash &amp; Subscriptions
          </p>
        </div>

        {/* Metric 3: In-Chair Sedang Berjalan */}
        <div
          className={`p-5 rounded-3xl border transition ${
            isDark
              ? "bg-slate-900/70 border-slate-800 text-slate-100"
              : "bg-white border-amber-200 text-stone-900 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Sesi Berjalan (In-Chair)</span>
            <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Scissors className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-blue-400">
              {inChairCount}
            </span>
            <span className="text-xs text-slate-400 font-mono">kursi terisi</span>
          </div>
          <p className="text-[11px] text-blue-400 mt-2 flex items-center gap-1 font-mono">
            <Activity className="w-3 h-3 animate-pulse" />
            <span>Sedang dipotong saat ini</span>
          </p>
        </div>

        {/* Metric 4: Active Memberships */}
        <div
          className={`p-5 rounded-3xl border transition ${
            isDark
              ? "bg-slate-900/70 border-slate-800 text-slate-100"
              : "bg-white border-amber-200 text-stone-900 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Grooming Pass Member</span>
            <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-purple-400">
              {activeMembershipsCount}
            </span>
            <span className="text-xs text-slate-400 font-mono">pelanggan VIP</span>
          </div>
          <p className="text-[11px] text-purple-400 mt-2 font-mono">
            Recurring monthly subscriber
          </p>
        </div>
      </div>

      {/* Kalender / Timeline Antrean Harian: Visualisasi Jadwal Kapster per Jam */}
      <div
        className={`p-6 rounded-3xl border ${
          isDark
            ? "bg-slate-900/70 border-slate-800 text-slate-100"
            : "bg-white border-amber-200 text-stone-900 shadow-sm"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-lg font-bold font-serif flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              Timeline &amp; Slot Antrean Kapster Hari Ini
            </h3>
            <p className={`text-xs ${isDark ? "text-slate-400" : "text-stone-500"}`}>
              Pantau beban kerja masing-masing kapster dan ketersediaan kursi secara visual.
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Sedang Potong
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Terjadwal
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Selesai
            </span>
          </div>
        </div>

        {/* Timeline Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[700px] space-y-3">
            {barbers.map((barber) => {
              const barberBookings = bookings.filter(
                (b) => b.barberId === barber.id && b.status !== "cancelled"
              );

              return (
                <div
                  key={barber.id}
                  className={`p-3.5 rounded-2xl border flex items-center gap-4 ${
                    isDark ? "bg-slate-950/70 border-slate-800/80" : "bg-stone-50 border-stone-200"
                  }`}
                >
                  {/* Barber Header */}
                  <div className="w-44 shrink-0 flex items-center gap-2.5">
                    <img
                      src={barber.avatar}
                      alt={barber.name}
                      className="w-10 h-10 rounded-xl object-cover border border-amber-500/40"
                    />
                    <div>
                      <h4 className="font-bold text-xs leading-tight">{barber.name}</h4>
                      <span className="text-[10px] text-amber-500 block">{barber.specialty}</span>
                    </div>
                  </div>

                  {/* Timeline Slots */}
                  <div className="flex-1 grid grid-cols-6 sm:grid-cols-8 gap-1.5">
                    {AVAILABLE_TIME_SLOTS.slice(0, 8).map((slot) => {
                      const slotBooking = barberBookings.find((b) => b.timeSlot === slot);

                      if (!slotBooking) {
                        return (
                          <div
                            key={slot}
                            className={`py-2 px-1 rounded-lg border text-center text-[10px] font-mono ${
                              isDark
                                ? "bg-slate-900/40 border-slate-800 text-slate-600"
                                : "bg-white border-stone-200 text-stone-400"
                            }`}
                          >
                            <span>{slot}</span>
                            <span className="block text-[8px] opacity-60">Kosong</span>
                          </div>
                        );
                      }

                      const statusColors = {
                        scheduled: "bg-amber-500/20 text-amber-300 border-amber-500/50",
                        in_chair: "bg-blue-500/20 text-blue-300 border-blue-500/60 font-bold animate-pulse",
                        completed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/50",
                        cancelled: "bg-red-500/10 text-red-400 border-red-500/30",
                        no_show: "bg-slate-800 text-slate-400 border-slate-700",
                      };

                      return (
                        <div
                          key={slot}
                          title={`${slotBooking.customerName} - ${slotBooking.serviceName}`}
                          className={`py-2 px-1 rounded-lg border text-center text-[10px] font-mono cursor-pointer transition ${statusColors[slotBooking.status]}`}
                        >
                          <span>{slot}</span>
                          <span className="block text-[8px] truncate font-sans font-semibold">
                            {slotBooking.customerName.split(" ")[0]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
