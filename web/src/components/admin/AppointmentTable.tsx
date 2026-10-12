import React, { useState, useMemo } from "react";
import { Booking, Barber, BookingStatus } from "@/types/barbershop";
import { formatRupiah } from "@/lib/mockData";
import { 
  Search, 
  Filter, 
  Trash2, 
  Clock, 
  Phone, 
  CheckCircle, 
  MoreVertical, 
  Calendar, 
  Scissors, 
  User, 
  AlertTriangle 
} from "lucide-react";

interface AppointmentTableProps {
  bookings: Booking[];
  barbers: Barber[];
  onUpdateStatus: (bookingId: string, status: BookingStatus) => void;
  onDeleteBooking: (bookingId: string) => void;
  isDark: boolean;
}

export function AppointmentTable({
  bookings,
  barbers,
  onUpdateStatus,
  onDeleteBooking,
  isDark,
}: AppointmentTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [barberFilter, setBarberFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filtering
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchSearch =
        b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.customerPhone.includes(searchTerm) ||
        b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase());

      const matchBarber = barberFilter === "all" || b.barberId === barberFilter;
      const matchStatus = statusFilter === "all" || b.status === statusFilter;

      return matchSearch && matchBarber && matchStatus;
    });
  }, [bookings, searchTerm, barberFilter, statusFilter]);

  const renderStatusBadge = (status: BookingStatus) => {
    const badgeStyles: Record<BookingStatus, { label: string; cls: string }> = {
      scheduled: {
        label: "Menunggu / Scheduled",
        cls: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      },
      in_chair: {
        label: "Sedang Dikerjakan",
        cls: "bg-blue-500/15 text-blue-400 border-blue-500/40 animate-pulse font-semibold",
      },
      completed: {
        label: "Selesai",
        cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      },
      cancelled: {
        label: "Dibatalkan",
        cls: "bg-red-500/15 text-red-400 border-red-500/30",
      },
      no_show: {
        label: "No-Show",
        cls: "bg-slate-700/30 text-slate-400 border-slate-700",
      },
    };

    const s = badgeStyles[status] || badgeStyles.scheduled;

    return (
      <span
        className={`text-[10px] uppercase font-mono font-bold px-2.5 py-1 rounded-lg border ${s.cls}`}
      >
        {s.label}
      </span>
    );
  };

  return (
    <div
      className={`p-6 rounded-3xl border space-y-6 ${
        isDark
          ? "bg-slate-900/70 border-slate-800 text-slate-100"
          : "bg-white border-amber-200 text-stone-900 shadow-sm"
      }`}
    >
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold font-serif flex items-center gap-2">
            <Scissors className="w-5 h-5 text-amber-500" />
            Tabel Antrean &amp; Kasir (POS Operations)
          </h3>
          <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-stone-500"}`}>
            Kelola status booking secara langsung, filter jadwal kapster, dan hapus reservasi.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Live Search */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama / WhatsApp..."
              className={`w-full pl-8 pr-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-amber-500 ${
                isDark
                  ? "bg-slate-950 border-slate-800 text-slate-100"
                  : "bg-stone-50 border-stone-200 text-stone-900"
              }`}
            />
          </div>

          {/* Barber Filter */}
          <select
            value={barberFilter}
            onChange={(e) => setBarberFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-amber-500 ${
              isDark
                ? "bg-slate-950 border-slate-800 text-slate-200"
                : "bg-stone-50 border-stone-200 text-stone-800"
            }`}
          >
            <option value="all">Semua Kapster</option>
            {barbers.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-amber-500 ${
              isDark
                ? "bg-slate-950 border-slate-800 text-slate-200"
                : "bg-stone-50 border-stone-200 text-stone-800"
            }`}
          >
            <option value="all">Semua Status</option>
            <option value="scheduled">Menunggu / Scheduled</option>
            <option value="in_chair">Sedang Dikerjakan</option>
            <option value="completed">Selesai</option>
            <option value="cancelled">Dibatalkan</option>
            <option value="no_show">No-Show</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800/80">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr
              className={`border-b ${
                isDark ? "bg-slate-950/90 border-slate-800 text-slate-400" : "bg-stone-100 border-stone-200 text-stone-600"
              }`}
            >
              <th className="py-3.5 px-4 font-mono">KODE &amp; WAKTU</th>
              <th className="py-3.5 px-4">PELANGGAN</th>
              <th className="py-3.5 px-4">KAPSTER</th>
              <th className="py-3.5 px-4">LAYANAN &amp; ADD-ONS</th>
              <th className="py-3.5 px-4 font-mono text-right">TOTAL</th>
              <th className="py-3.5 px-4">STATUS SESI</th>
              <th className="py-3.5 px-4 text-center">AKSI CEPAT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-slate-500">
                  Tidak ada reservasi yang sesuai dengan kriteria filter.
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
                <tr
                  key={b.id}
                  className={`transition ${
                    isDark ? "hover:bg-slate-800/40" : "hover:bg-amber-50/40"
                  }`}
                >
                  {/* Kode & Waktu */}
                  <td className="py-3 px-4 font-mono">
                    <span className="font-bold text-amber-500 block">{b.bookingCode}</span>
                    <span className="text-[11px] text-slate-400">
                      {b.date} • {b.timeSlot}
                    </span>
                  </td>

                  {/* Pelanggan */}
                  <td className="py-3 px-4">
                    <span className="font-semibold block text-slate-200">{b.customerName}</span>
                    <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-slate-500" />
                      {b.customerPhone}
                    </span>
                    {b.customerNotes && (
                      <p className="text-[10px] text-amber-400/80 italic mt-0.5 max-w-xs truncate">
                        &quot;{b.customerNotes}&quot;
                      </p>
                    )}
                  </td>

                  {/* Kapster */}
                  <td className="py-3 px-4 font-semibold text-slate-300">
                    {b.barberName}
                  </td>

                  {/* Layanan */}
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-200 block">{b.serviceName}</span>
                    {b.addonNames.length > 0 && (
                      <span className="text-[10px] text-amber-400 block mt-0.5">
                        +{b.addonNames.join(", ")}
                      </span>
                    )}
                  </td>

                  {/* Total */}
                  <td className="py-3 px-4 text-right font-mono font-bold">
                    <span className="text-emerald-400">
                      {b.totalPrice === 0 ? "Member" : formatRupiah(b.totalPrice)}
                    </span>
                    <span className="text-[10px] block uppercase text-slate-400 font-normal">
                      {b.paymentMethod}
                    </span>
                  </td>

                  {/* Status Badges */}
                  <td className="py-3 px-4">
                    {renderStatusBadge(b.status)}
                  </td>

                  {/* Quick Actions Dropdown */}
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <select
                        value={b.status}
                        onChange={(e) => onUpdateStatus(b.id, e.target.value as BookingStatus)}
                        className={`text-[11px] font-medium py-1 px-2 rounded-lg border focus:outline-none ${
                          isDark
                            ? "bg-slate-950 border-slate-700 text-slate-200"
                            : "bg-white border-stone-300 text-stone-800"
                        }`}
                      >
                        <option value="scheduled">Menunggu</option>
                        <option value="in_chair">In-Chair</option>
                        <option value="completed">Selesai</option>
                        <option value="cancelled">Batalkan</option>
                        <option value="no_show">No-Show</option>
                      </select>

                      <button
                        onClick={() => onDeleteBooking(b.id)}
                        title="Hapus Booking"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/40 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
