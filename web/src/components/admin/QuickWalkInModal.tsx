import React, { useState } from "react";
import { Booking, Barber, ServiceItem, PaymentMethod } from "@/types/barbershop";
import { formatRupiah, AVAILABLE_TIME_SLOTS, BRANCHES } from "@/lib/mockData";
import { X, Check, Scissors, User, Phone, CreditCard, Sparkles } from "lucide-react";

interface QuickWalkInModalProps {
  isOpen: boolean;
  onClose: () => void;
  barbers: Barber[];
  services: ServiceItem[];
  onAddBooking: (booking: Booking) => void;
  isDark: boolean;
}

export function QuickWalkInModal({
  isOpen,
  onClose,
  barbers,
  services,
  onAddBooking,
  isDark,
}: QuickWalkInModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedBarberId, setSelectedBarberId] = useState(barbers[0]?.id || "");
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || "");
  const [timeSlot, setTimeSlot] = useState(AVAILABLE_TIME_SLOTS[0] || "10:00");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [status, setStatus] = useState<Booking["status"]>("in_chair");

  if (!isOpen) return null;

  const currentService = services.find((s) => s.id === selectedServiceId);
  const currentBarber = barbers.find((b) => b.id === selectedBarberId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    const todayStr = new Date().toISOString().split("T")[0];
    const uniqueCode = `WALK-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: Booking = {
      id: `walkin-${Date.now()}`,
      bookingCode: uniqueCode,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim() || "08-WALKIN",
      customerNotes: "Walk-in customer via Kasir POS",
      branch: BRANCHES[0].name,
      barberId: selectedBarberId,
      barberName: currentBarber?.name || "Barber",
      serviceId: selectedServiceId,
      serviceName: currentService?.name || "Gentleman Cut",
      addonIds: [],
      addonNames: [],
      date: todayStr,
      timeSlot,
      totalPrice: currentService?.price || 60000,
      paymentMethod,
      paymentStatus: paymentMethod === "cash" ? "paid" : "unpaid",
      status,
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
    };

    onAddBooking(newBooking);
    onClose();
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
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
            <Scissors className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-serif">Input Antrean Walk-In (Kasir POS)</h3>
          <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-stone-500"}`}>
            Catat pelanggan langsung tanpa reservasi online untuk langsung menempati kursi.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Nama Pelanggan *</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nama walk-in..."
                className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-amber-500 ${
                  isDark ? "bg-slate-950 border-slate-800 text-slate-100" : "bg-white border-stone-200"
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">No. WhatsApp (Opsional)</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="081234567890"
                className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-amber-500 ${
                  isDark ? "bg-slate-950 border-slate-800 text-slate-100" : "bg-white border-stone-200"
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Pilih Layanan</label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-amber-500 ${
                  isDark ? "bg-slate-950 border-slate-800 text-slate-100" : "bg-white border-stone-200"
                }`}
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} - {formatRupiah(s.price)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Pilih Kapster</label>
              <select
                value={selectedBarberId}
                onChange={(e) => setSelectedBarberId(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-amber-500 ${
                  isDark ? "bg-slate-950 border-slate-800 text-slate-100" : "bg-white border-stone-200"
                }`}
              >
                {barbers.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.status === "available" ? "Standby" : "In-Chair"})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Slot Jam</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-amber-500 ${
                  isDark ? "bg-slate-950 border-slate-800 text-slate-100" : "bg-white border-stone-200"
                }`}
              >
                {AVAILABLE_TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot} WIB
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Metode Pembayaran</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-amber-500 ${
                  isDark ? "bg-slate-950 border-slate-800 text-slate-100" : "bg-white border-stone-200"
                }`}
              >
                <option value="cash">Tunai / Cash Kasir</option>
                <option value="qris">QRIS Instant</option>
                <option value="membership_quota">Potong Kuota Member</option>
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">Total Biaya:</span>
            <span className="text-lg font-bold font-mono text-emerald-400">
              {formatRupiah(currentService?.price || 0)}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 transition shadow-lg"
          >
            Mulai Sesi Potong (In-Chair)
          </button>
        </form>
      </div>
    </div>
  );
}
