import React, { useState } from "react";
import { Booking } from "@/types/barbershop";
import { formatRupiah } from "@/lib/mockData";
import { Search, X, Calendar, Clock, User, Scissors, CheckCircle, AlertCircle } from "lucide-react";

interface CheckBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  isDark: boolean;
  onOpenTicket: (booking: Booking) => void;
}

export function CheckBookingModal({
  isOpen,
  onClose,
  bookings,
  isDark,
  onOpenTicket,
}: CheckBookingModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Booking[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      setSearchResults([]);
      return;
    }

    const matches = bookings.filter(
      (b) =>
        b.bookingCode.toLowerCase().includes(query) ||
        b.customerPhone.includes(query) ||
        b.customerName.toLowerCase().includes(query)
    );
    setSearchResults(matches);
  };

  const getStatusBadge = (status: Booking["status"]) => {
    const map = {
      scheduled: { text: "Menunggu / Scheduled", bg: "bg-amber-950/80 text-amber-400 border-amber-800" },
      in_chair: { text: "Sedang Dikerjakan", bg: "bg-blue-950/80 text-blue-400 border-blue-800" },
      completed: { text: "Selesai", bg: "bg-emerald-950/80 text-emerald-400 border-emerald-800" },
      cancelled: { text: "Dibatalkan", bg: "bg-red-950/80 text-red-400 border-red-800" },
      no_show: { text: "No-Show", bg: "bg-slate-800 text-slate-400 border-slate-700" },
    };
    const s = map[status];
    return (
      <span className={`text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded border ${s.bg}`}>
        {s.text}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 sm:p-8 relative ${
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
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-serif">Lacak Tiket &amp; Status Reservasi</h3>
          <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-stone-500"}`}>
            Masukkan Kode Booking (misal: <code>GENT-8411</code>) atau nomor WhatsApp Anda.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Kode booking / No. WhatsApp"
            className={`flex-1 px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-amber-500 ${
              isDark
                ? "bg-slate-950 border-slate-800 text-slate-100"
                : "bg-stone-50 border-stone-200 text-stone-900"
            }`}
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition"
          >
            Cari Tiket
          </button>
        </form>

        {hasSearched && (
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {searchResults.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-950/60 text-slate-400 text-xs text-center border border-slate-800">
                Tidak ada data reservasi yang cocok dengan pencarian Anda.
              </div>
            ) : (
              searchResults.map((book) => (
                <div
                  key={book.id}
                  className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                    isDark ? "bg-slate-950 border-slate-800" : "bg-amber-50/60 border-amber-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-amber-400 text-sm">
                      {book.bookingCode}
                    </span>
                    {getStatusBadge(book.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Pelanggan</span>
                      <span className="font-semibold">{book.customerName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Kapster</span>
                      <span className="font-semibold">{book.barberName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Jadwal</span>
                      <span className="font-semibold font-mono">
                        {book.date} • {book.timeSlot}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Total</span>
                      <span className="font-semibold font-mono text-emerald-400">
                        {book.totalPrice === 0 ? "Member Quota" : formatRupiah(book.totalPrice)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onOpenTicket(book);
                      onClose();
                    }}
                    className="mt-3 w-full py-1.5 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 transition"
                  >
                    Buka Detail Tiket &amp; WhatsApp
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
