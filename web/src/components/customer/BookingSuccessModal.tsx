import React from "react";
import { Booking } from "@/types/barbershop";
import { formatRupiah } from "@/lib/mockData";
import { CheckCircle2, Calendar, Clock, User, Scissors, MessageCircle, Share2, Printer, X } from "lucide-react";

interface BookingSuccessModalProps {
  booking: Booking | null;
  onClose: () => void;
  isDark: boolean;
}

export function BookingSuccessModal({ booking, onClose, isDark }: BookingSuccessModalProps) {
  if (!booking) return null;

  const handleSendWhatsApp = () => {
    const textMessage = encodeURIComponent(
      `Halo The Gentleman's Cut Barbershop! 💈\n\n` +
      `Saya ingin konfirmasi booking:\n` +
      `• Kode Booking: *${booking.bookingCode}*\n` +
      `• Nama: *${booking.customerName}*\n` +
      `• Cabang: *${booking.branch}*\n` +
      `• Kapster: *${booking.barberName}*\n` +
      `• Tanggal: *${booking.date}* (${booking.timeSlot} WIB)\n` +
      `• Layanan: *${booking.serviceName}*\n` +
      (booking.addonNames.length > 0 ? `• Add-ons: ${booking.addonNames.join(", ")}\n` : "") +
      `• Total: *${booking.totalPrice === 0 ? "Potong Kuota Member" : formatRupiah(booking.totalPrice)}*\n` +
      `• Metode: *${booking.paymentMethod.toUpperCase()}* (${booking.paymentStatus === "paid" ? "LUNAS" : "BAYAR DI TEMPAT"})\n\n` +
      `Mohon dicatat ya, terima kasih!`
    );
    window.open(`https://wa.me/?text=${textMessage}`, "_blank");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 sm:p-8 relative overflow-hidden ${
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

        {/* Header Celebration */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-3 shadow-lg">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full">
            BOOKING BERHASIL DIKONFIRMASI
          </span>
          <h2 className="text-2xl font-bold font-serif mt-2">Tiket Grooming Anda Siap!</h2>
          <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-stone-500"}`}>
            Tunjukkan kode booking ini saat tiba di barbershop.
          </p>
        </div>

        {/* Boarding Pass / Ticket Card */}
        <div
          className={`rounded-2xl border p-5 relative mb-6 ${
            isDark
              ? "bg-slate-950/80 border-slate-800 text-slate-200"
              : "bg-amber-50/80 border-amber-200 text-stone-900"
          }`}
        >
          {/* Booking Code Barcode-like visual */}
          <div className="flex items-center justify-between border-b pb-3 mb-3 border-dashed border-amber-500/30">
            <div>
              <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-bold">
                KODE BOOKING
              </span>
              <p className="text-xl font-mono font-extrabold text-amber-400 tracking-wider">
                {booking.bookingCode}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-mono">STATUS SESI</span>
              <span className="text-xs font-bold text-amber-400 font-mono">TERJADWAL</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Nama Pelanggan</span>
              <span className="font-semibold">{booking.customerName}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">WhatsApp</span>
              <span className="font-semibold font-mono">{booking.customerPhone}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Cabang</span>
              <span className="font-semibold">{booking.branch}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Barber Specialist</span>
              <span className="font-semibold text-amber-400">{booking.barberName}</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2 pt-1 border-t border-dashed border-slate-800">
              <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{booking.date}</span>
              <span className="text-slate-500">•</span>
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-bold">{booking.timeSlot} WIB</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 block text-[11px]">Layanan Dipilih</span>
              <span className="font-semibold">{booking.serviceName}</span>
              {booking.addonNames.length > 0 && (
                <p className="text-[11px] text-amber-400 mt-0.5">
                  + Add-on: {booking.addonNames.join(", ")}
                </p>
              )}
            </div>
          </div>

          {/* Total & Payment Method */}
          <div className="mt-4 pt-3 border-t border-dashed border-amber-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block font-mono">METODE PEMBAYARAN</span>
              <span className="text-xs font-bold uppercase text-amber-400">
                {booking.paymentMethod === "membership_quota" ? "Potong Kuota Member" : booking.paymentMethod}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-mono">TOTAL BIAYA</span>
              <span className="text-lg font-extrabold font-mono text-emerald-400">
                {booking.totalPrice === 0 ? "Gratis (Member)" : formatRupiah(booking.totalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: WhatsApp & Print */}
        <div className="space-y-2.5">
          <button
            onClick={handleSendWhatsApp}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30 transition flex items-center justify-center gap-2 group"
          >
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Kirim Notifikasi via WhatsApp</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handlePrint}
              className={`py-2.5 px-3 rounded-xl font-semibold text-xs border transition flex items-center justify-center gap-1.5 ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                  : "bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200"
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Tiket</span>
            </button>
            <button
              onClick={onClose}
              className={`py-2.5 px-3 rounded-xl font-semibold text-xs border transition flex items-center justify-center gap-1.5 ${
                isDark
                  ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                  : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
              }`}
            >
              <span>Selesai &amp; Tutup</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
