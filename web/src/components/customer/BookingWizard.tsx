import React, { useState, useMemo, useEffect } from "react";
import { 
  Barber, 
  ServiceItem, 
  Booking, 
  PaymentMethod, 
  MemberSubscription 
} from "@/types/barbershop";
import { 
  BRANCHES, 
  AVAILABLE_TIME_SLOTS, 
  formatRupiah 
} from "@/lib/mockData";
import { 
  Check, 
  Scissors, 
  User, 
  Calendar, 
  Clock, 
  CreditCard, 
  Sparkles, 
  Star, 
  ChevronRight, 
  ChevronLeft, 
  MapPin, 
  QrCode, 
  Banknote, 
  ShieldCheck, 
  Phone, 
  FileText 
} from "lucide-react";

interface BookingWizardProps {
  barbers: Barber[];
  services: ServiceItem[];
  bookings: Booking[];
  subscriptions: MemberSubscription[];
  onAddBooking: (booking: Booking) => void;
  onBookingSuccess: (booking: Booking) => void;
  isDark: boolean;
  preselectedServiceId?: string;
}

export function BookingWizard({
  barbers,
  services,
  bookings,
  subscriptions,
  onAddBooking,
  onBookingSuccess,
  isDark,
  preselectedServiceId,
}: BookingWizardProps) {
  // Step state (1 to 5)
  const [currentStep, setCurrentStep] = useState(1);

  // Form selections
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0].name);
  const [selectedMainServiceId, setSelectedMainServiceId] = useState<string>(
    preselectedServiceId || services.find((s) => s.category !== "addon")?.id || services[0]?.id || ""
  );
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [selectedBarberId, setSelectedBarberId] = useState<string>("any");
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-12");

  useEffect(() => {
    setSelectedDate(new Date().toISOString().split("T")[0]);
  }, []);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Filter services by category
  const mainServices = useMemo(
    () => services.filter((s) => s.category !== "addon"),
    [services]
  );
  const addonServices = useMemo(
    () => services.filter((s) => s.category === "addon"),
    [services]
  );

  const selectedMainService = useMemo(
    () => services.find((s) => s.id === selectedMainServiceId),
    [services, selectedMainServiceId]
  );

  const selectedAddons = useMemo(
    () => addonServices.filter((s) => selectedAddonIds.includes(s.id)),
    [addonServices, selectedAddonIds]
  );

  // Calculate Real-time Total Price
  const rawTotalPrice = useMemo(() => {
    let sum = selectedMainService ? selectedMainService.price : 0;
    selectedAddons.forEach((addon) => {
      sum += addon.price;
    });
    return sum;
  }, [selectedMainService, selectedAddons]);

  // Check if Customer Phone has Active Membership
  const activeMembership = useMemo(() => {
    if (!customerPhone.trim()) return null;
    const cleanPhone = customerPhone.replace(/\D/g, "");
    return subscriptions.find(
      (sub) =>
        sub.status === "active" &&
        sub.customerPhone.replace(/\D/g, "").includes(cleanPhone)
    );
  }, [subscriptions, customerPhone]);

  // Final Price depending on Membership Quota
  const finalTotalPrice = useMemo(() => {
    if (paymentMethod === "membership_quota") {
      // If using quota, main haircut is covered, customer only pays addons if any
      let addonSum = 0;
      selectedAddons.forEach((a) => (addonSum += a.price));
      return addonSum;
    }
    return rawTotalPrice;
  }, [paymentMethod, rawTotalPrice, selectedAddons]);

  // Check occupied time slots for chosen Barber & Date
  const occupiedSlots = useMemo(() => {
    return bookings
      .filter(
        (b) =>
          b.date === selectedDate &&
          b.status !== "cancelled" &&
          (selectedBarberId === "any" || b.barberId === selectedBarberId)
      )
      .map((b) => b.timeSlot);
  }, [bookings, selectedDate, selectedBarberId]);

  // Toggle Addon
  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  // Step 1 Validation
  const canGoToStep2 = Boolean(selectedMainServiceId);
  // Step 2 Validation (Barber)
  const canGoToStep3 = Boolean(selectedBarberId);
  // Step 3 Validation (Date & Time)
  const canGoToStep4 = Boolean(selectedDate && selectedTimeSlot);
  // Step 4 Validation (Customer details)
  const canGoToStep5 = Boolean(customerName.trim().length >= 3 && customerPhone.trim().length >= 8);

  const handleNextStep = () => {
    setValidationError(null);
    if (currentStep === 1 && !canGoToStep2) {
      setValidationError("Silakan pilih layanan utama terlebih dahulu.");
      return;
    }
    if (currentStep === 2 && !canGoToStep3) {
      setValidationError("Silakan pilih kapster favorit atau opsi siapa saja.");
      return;
    }
    if (currentStep === 3 && !canGoToStep4) {
      setValidationError("Silakan pilih slot jam yang tersedia.");
      return;
    }
    if (currentStep === 4 && !canGoToStep5) {
      setValidationError("Mohon lengkapi Nama Lengkap dan Nomor WhatsApp yang valid.");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrevStep = () => {
    setValidationError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Submit Booking
  const handleConfirmBooking = () => {
    setIsSubmitting(true);
    setValidationError(null);

    // Pick barber name
    let assignedBarberId = selectedBarberId;
    let assignedBarberName = "Siapa Saja yang Tersedia";
    if (selectedBarberId === "any") {
      const availableBarbers = barbers.filter((b) => b.status === "available");
      const chosen = availableBarbers[0] || barbers[0];
      assignedBarberId = chosen.id;
      assignedBarberName = chosen.name;
    } else {
      const barber = barbers.find((b) => b.id === selectedBarberId);
      if (barber) {
        assignedBarberName = barber.name;
      }
    }

    const uniqueCode = `GENT-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      bookingCode: uniqueCode,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerNotes: customerNotes.trim(),
      branch: selectedBranch,
      barberId: assignedBarberId,
      barberName: assignedBarberName,
      serviceId: selectedMainServiceId,
      serviceName: selectedMainService?.name || "Gentleman Cut",
      addonIds: selectedAddonIds,
      addonNames: selectedAddons.map((a) => a.name),
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      totalPrice: finalTotalPrice,
      paymentMethod,
      paymentStatus: paymentMethod === "qris" ? "paid" : "unpaid",
      status: "scheduled",
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
    };

    setTimeout(() => {
      onAddBooking(newBooking);
      setIsSubmitting(false);
      onBookingSuccess(newBooking);
      // Reset form
      setCurrentStep(1);
      setSelectedTimeSlot("");
      setCustomerNotes("");
    }, 600);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Wizard Header Progress */}
      <div
        className={`p-6 rounded-3xl border shadow-xl ${
          isDark
            ? "bg-slate-900/80 border-slate-800 text-slate-100"
            : "bg-white border-amber-200 text-stone-900"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 font-mono">
              ONLINE RESERVATION ENGINE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif mt-0.5">
              Pesan Kursi Grooming Anda
            </h2>
            <p className={`text-xs ${isDark ? "text-slate-400" : "text-stone-500"}`}>
              Langkah {currentStep} dari 5: {
                currentStep === 1 ? "Pilih Layanan & Cabang" :
                currentStep === 2 ? "Pilih Kapster Specialist" :
                currentStep === 3 ? "Tentukan Tanggal & Jam" :
                currentStep === 4 ? "Data Diri Pelanggan" : "Metode Pembayaran & Konfirmasi"
              }
            </p>
          </div>

          {/* Quick Price Indicator in Header */}
          <div className="flex items-center gap-3">
            <div className={`text-right px-4 py-2 rounded-2xl border ${
              isDark ? "bg-slate-950 border-slate-800" : "bg-amber-50 border-amber-200"
            }`}>
              <span className="text-[10px] text-slate-400 block font-mono">ESTIMASI TOTAL</span>
              <span className="text-base sm:text-lg font-extrabold font-mono text-amber-500">
                {formatRupiah(rawTotalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Step Progress Pills */}
        <div className="grid grid-cols-5 gap-2">
          {[
            { num: 1, label: "Layanan" },
            { num: 2, label: "Barber" },
            { num: 3, label: "Jadwal" },
            { num: 4, label: "Data Diri" },
            { num: 5, label: "Check Out" },
          ].map((step) => {
            const isActive = currentStep === step.num;
            const isCompleted = currentStep > step.num;

            return (
              <div
                key={step.num}
                onClick={() => {
                  if (step.num < currentStep) setCurrentStep(step.num);
                }}
                className={`flex flex-col items-center py-2 px-1 rounded-xl text-center cursor-pointer transition ${
                  isActive
                    ? isDark
                      ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-900/20"
                      : "bg-amber-600 text-white font-bold shadow-md shadow-amber-900/20"
                    : isCompleted
                    ? isDark
                      ? "bg-slate-800/80 text-amber-400 border border-slate-700"
                      : "bg-amber-100 text-amber-800 border border-amber-200"
                    : isDark
                    ? "bg-slate-950/60 text-slate-500 border border-slate-800/60"
                    : "bg-stone-100 text-stone-400 border border-stone-200"
                }`}
              >
                <div className="flex items-center gap-1">
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <span className="text-xs">{step.num}</span>
                  )}
                  <span className="hidden sm:inline text-xs">{step.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Error Message if any */}
      {validationError && (
        <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-2xl text-xs text-red-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* STEP 1: PILIH CABANG & LAYANAN (DENGAN MULTI-SELECT ADD-ONS) */}
      {currentStep === 1 && (
        <div className="space-y-6">
          {/* Cabang Selector */}
          <div
            className={`p-5 rounded-3xl border ${
              isDark
                ? "bg-slate-900/60 border-slate-800 text-slate-200"
                : "bg-white border-amber-200 text-stone-900"
            }`}
          >
            <label className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5 font-mono mb-3">
              <MapPin className="w-4 h-4" />
              1. Pilih Lokasi Cabang
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BRANCHES.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setSelectedBranch(b.name)}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    selectedBranch === b.name
                      ? isDark
                        ? "bg-amber-500/10 border-amber-500 text-amber-300 shadow-md"
                        : "bg-amber-50 border-amber-500 text-amber-900 shadow-md"
                      : isDark
                      ? "bg-slate-950 border-slate-800/80 hover:border-slate-700"
                      : "bg-stone-50 border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{b.name}</span>
                    {selectedBranch === b.name && <Check className="w-4 h-4 text-amber-500" />}
                  </div>
                  <p className="text-xs opacity-70 mt-1">{b.address}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Main Services */}
          <div
            className={`p-5 rounded-3xl border ${
              isDark
                ? "bg-slate-900/60 border-slate-800 text-slate-200"
                : "bg-white border-amber-200 text-stone-900"
            }`}
          >
            <label className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5 font-mono mb-3">
              <Scissors className="w-4 h-4" />
              2. Pilih Layanan Utama
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mainServices.map((service) => {
                const isSelected = selectedMainServiceId === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => setSelectedMainServiceId(service.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition relative flex flex-col justify-between ${
                      isSelected
                        ? isDark
                          ? "bg-amber-500/10 border-amber-500 text-white shadow-lg"
                          : "bg-amber-50 border-amber-500 text-stone-900 shadow-lg"
                        : isDark
                        ? "bg-slate-950 border-slate-800/80 hover:border-slate-700 text-slate-300"
                        : "bg-stone-50 border-stone-200 hover:border-stone-300 text-stone-800"
                    }`}
                  >
                    {service.popular && (
                      <span className="absolute top-3 right-3 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                        Favorit
                      </span>
                    )}
                    <div>
                      <h4 className="font-bold text-base">{service.name}</h4>
                      <p className="text-xs opacity-80 mt-1 line-clamp-2">{service.description}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-dashed border-slate-700/50 flex items-center justify-between">
                      <span className="text-xs opacity-70 flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {service.durationMinutes} menit
                      </span>
                      <span className="font-extrabold font-mono text-base text-amber-500">
                        {formatRupiah(service.price)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add-ons Multi-Select */}
          <div
            className={`p-5 rounded-3xl border ${
              isDark
                ? "bg-slate-900/60 border-slate-800 text-slate-200"
                : "bg-white border-amber-200 text-stone-900"
            }`}
          >
            <label className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5 font-mono mb-3">
              <Sparkles className="w-4 h-4" />
              3. Tambahan Treatment / Add-ons (Bisa pilih lebih dari 1)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {addonServices.map((addon) => {
                const isChecked = selectedAddonIds.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                      isChecked
                        ? isDark
                          ? "bg-amber-500/10 border-amber-500 text-white shadow-md"
                          : "bg-amber-50 border-amber-500 text-stone-900 shadow-md"
                        : isDark
                        ? "bg-slate-950 border-slate-800/80 hover:border-slate-700 text-slate-400"
                        : "bg-stone-50 border-stone-200 hover:border-stone-300 text-stone-700"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-xs">{addon.name}</span>
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isChecked
                            ? "bg-amber-500 border-amber-500 text-slate-950"
                            : "border-slate-600"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-xs text-amber-500 mt-3">
                      +{formatRupiah(addon.price)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: PILIH BARBER SPECIALIST */}
      {currentStep === 2 && (
        <div className="space-y-4">
          {/* Option: Any Available */}
          <div
            onClick={() => setSelectedBarberId("any")}
            className={`p-5 rounded-3xl border cursor-pointer transition flex items-center justify-between ${
              selectedBarberId === "any"
                ? isDark
                  ? "bg-amber-500/10 border-amber-500 text-white shadow-lg"
                  : "bg-amber-50 border-amber-500 text-stone-900 shadow-lg"
                : isDark
                ? "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                : "bg-white border-amber-200 text-stone-800 hover:border-stone-300"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-lg border border-amber-500/30">
                ⚡
              </div>
              <div>
                <h4 className="font-bold text-base">Siapa Saja yang Tersedia (Rekomendasi Cepat)</h4>
                <p className="text-xs opacity-70">
                  Sistem akan mengalokasikan kapster terbaik yang sedang stand-by pada jam pilihan Anda.
                </p>
              </div>
            </div>
            {selectedBarberId === "any" && <Check className="w-5 h-5 text-amber-500" />}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {barbers.map((barber) => {
              const isSelected = selectedBarberId === barber.id;
              return (
                <div
                  key={barber.id}
                  onClick={() => setSelectedBarberId(barber.id)}
                  className={`p-4 rounded-3xl border cursor-pointer transition flex items-center justify-between ${
                    isSelected
                      ? isDark
                        ? "bg-amber-500/10 border-amber-500 text-white shadow-lg"
                        : "bg-amber-50 border-amber-500 text-stone-900 shadow-lg"
                      : isDark
                      ? "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                      : "bg-white border-amber-200 text-stone-800 hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={barber.avatar}
                      alt={barber.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500/30 shadow-md"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm">{barber.name}</h4>
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            barber.status === "available"
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                              : "bg-blue-950 text-blue-400 border border-blue-800"
                          }`}
                        >
                          {barber.status === "available" ? "Standby" : "In-Chair"}
                        </span>
                      </div>
                      <p className="text-xs text-amber-400/90 mt-0.5">{barber.specialty}</p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-200">{barber.rating.toFixed(1)}</span>
                        <span>({barber.reviewCount} ulasan)</span>
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-5 h-5 text-amber-500 shrink-0 ml-2" />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 3: TANGGAL & SLOT JAM */}
      {currentStep === 3 && (
        <div
          className={`p-6 rounded-3xl border space-y-6 ${
            isDark
              ? "bg-slate-900/60 border-slate-800 text-slate-200"
              : "bg-white border-amber-200 text-stone-900"
          }`}
        >
          {/* Date Picker */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5 font-mono mb-2">
              <Calendar className="w-4 h-4" />
              Pilih Tanggal Kunjungan
            </label>
            <input
              type="date"
              value={selectedDate}
              min={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={`px-4 py-2.5 rounded-xl border text-sm font-mono font-medium focus:outline-none focus:border-amber-500 ${
                isDark
                  ? "bg-slate-950 border-slate-800 text-slate-100"
                  : "bg-stone-50 border-stone-200 text-stone-900"
              }`}
            />
          </div>

          {/* Time Slot Picker */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5 font-mono mb-3">
              <Clock className="w-4 h-4" />
              Pilih Slot Waktu (Hanya slot kosong yang dapat dipilih)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
              {AVAILABLE_TIME_SLOTS.map((slot) => {
                const isBooked = occupiedSlots.includes(slot);
                const isSelected = selectedTimeSlot === slot;

                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={isBooked}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-3 px-2 rounded-xl text-xs font-mono font-bold transition flex flex-col items-center justify-center gap-1 border ${
                      isSelected
                        ? isDark
                          ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg"
                          : "bg-amber-600 text-white border-amber-600 shadow-lg"
                        : isBooked
                        ? isDark
                          ? "bg-slate-950/40 border-slate-900 text-slate-700 cursor-not-allowed opacity-40 line-through"
                          : "bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed opacity-40 line-through"
                        : isDark
                        ? "bg-slate-950 border-slate-800/80 hover:border-amber-500/50 text-slate-200"
                        : "bg-stone-50 border-stone-200 hover:border-amber-500/50 text-stone-800"
                    }`}
                  >
                    <span>{slot} WIB</span>
                    <span className="text-[9px] font-normal tracking-tight">
                      {isBooked ? "Penuh" : "Tersedia"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: DATA DIRI PELANGGAN */}
      {currentStep === 4 && (
        <div
          className={`p-6 rounded-3xl border space-y-4 ${
            isDark
              ? "bg-slate-900/60 border-slate-800 text-slate-200"
              : "bg-white border-amber-200 text-stone-900"
          }`}
        >
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5 font-mono">
              <User className="w-4 h-4" />
              Nama Lengkap Pelanggan *
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Contoh: Farhan Pratama"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:border-amber-500 ${
                isDark
                  ? "bg-slate-950 border-slate-800 text-slate-100"
                  : "bg-stone-50 border-stone-200 text-stone-900"
              }`}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5 font-mono">
              <Phone className="w-4 h-4" />
              Nomor WhatsApp (Aktif untuk notifikasi tiket) *
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="081234567890"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm font-mono transition focus:outline-none focus:border-amber-500 ${
                isDark
                  ? "bg-slate-950 border-slate-800 text-slate-100"
                  : "bg-stone-50 border-stone-200 text-stone-900"
              }`}
            />
            {activeMembership && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-400 flex items-center gap-2 mt-2">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  Member Terdeteksi: <strong>{activeMembership.planName}</strong> (Sisa Kuota:{" "}
                  <strong>{activeMembership.quotaRemaining} sesi</strong>). Anda dapat memilih metode &quot;Potong Kuota Member&quot; di tahap berikutnya!
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5 font-mono">
              <FileText className="w-4 h-4" />
              Catatan Gaya Rambut / Request Khusus (Opsional)
            </label>
            <textarea
              rows={3}
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              placeholder="Contoh: Samping low fade, bagian atas dirapikan sedikit jangan terlalu pendek."
              className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:border-amber-500 ${
                isDark
                  ? "bg-slate-950 border-slate-800 text-slate-100"
                  : "bg-stone-50 border-stone-200 text-stone-900"
              }`}
            />
          </div>
        </div>
      )}

      {/* STEP 5: METODE BAYAR & REVIEW TIKET */}
      {currentStep === 5 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Method Selector */}
          <div
            className={`lg:col-span-2 p-6 rounded-3xl border space-y-4 ${
              isDark
                ? "bg-slate-900/60 border-slate-800 text-slate-200"
                : "bg-white border-amber-200 text-stone-900"
            }`}
          >
            <label className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5 font-mono mb-2">
              <CreditCard className="w-4 h-4" />
              Pilih Metode Pembayaran
            </label>

            {/* Option 1: Bayar di Tempat (Cash) */}
            <div
              onClick={() => setPaymentMethod("cash")}
              className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                paymentMethod === "cash"
                  ? isDark
                    ? "bg-amber-500/10 border-amber-500 text-white"
                    : "bg-amber-50 border-amber-500 text-stone-900"
                  : isDark
                  ? "bg-slate-950 border-slate-800/80 hover:border-slate-700"
                  : "bg-stone-50 border-stone-200 hover:border-stone-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-500">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Bayar di Tempat (Cash / Debit saat tiba)</h4>
                  <p className="text-xs opacity-70">Bayar langsung di meja kasir setelah sesi potong selesai.</p>
                </div>
              </div>
              {paymentMethod === "cash" && <Check className="w-5 h-5 text-amber-500" />}
            </div>

            {/* Option 2: Mock QRIS */}
            <div
              onClick={() => setPaymentMethod("qris")}
              className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                paymentMethod === "qris"
                  ? isDark
                    ? "bg-amber-500/10 border-amber-500 text-white"
                    : "bg-amber-50 border-amber-500 text-stone-900"
                  : isDark
                  ? "bg-slate-950 border-slate-800/80 hover:border-slate-700"
                  : "bg-stone-50 border-stone-200 hover:border-stone-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">QRIS Instant Mock Pay</h4>
                  <p className="text-xs opacity-70">Scan QRIS instan via BCA, GoPay, OVO, Dana.</p>
                </div>
              </div>
              {paymentMethod === "qris" && <Check className="w-5 h-5 text-amber-500" />}
            </div>

            {/* QRIS visual mockup if selected */}
            {paymentMethod === "qris" && (
              <div className="p-4 rounded-2xl bg-white text-slate-950 text-center space-y-2 border border-slate-300 max-w-xs mx-auto">
                <span className="text-[10px] font-bold font-mono tracking-widest text-slate-600 block">
                  QRIS STANDAR PEMBAYARAN NASIONAL
                </span>
                <div className="w-32 h-32 mx-auto bg-stone-100 border-2 border-stone-900 rounded-xl flex items-center justify-center p-2">
                  <div className="text-center font-mono text-[10px]">
                    <QrCode className="w-20 h-20 mx-auto text-slate-900" />
                    <span>SCAN UNTUK BAYAR</span>
                  </div>
                </div>
                <p className="font-bold font-mono text-sm text-emerald-700">
                  {formatRupiah(finalTotalPrice)}
                </p>
                <span className="text-[10px] text-slate-500 block">
                  Status otomatis tersimpan sebagai LUNAS
                </span>
              </div>
            )}

            {/* Option 3: Potong Kuota Membership */}
            <div
              onClick={() => {
                if (activeMembership) {
                  setPaymentMethod("membership_quota");
                }
              }}
              className={`p-4 rounded-2xl border transition flex items-center justify-between ${
                !activeMembership
                  ? isDark
                    ? "bg-slate-950/40 border-slate-900 text-slate-600 opacity-60 cursor-not-allowed"
                    : "bg-stone-100 border-stone-200 text-stone-400 opacity-60 cursor-not-allowed"
                  : paymentMethod === "membership_quota"
                  ? isDark
                    ? "bg-amber-500/10 border-amber-500 text-white cursor-pointer"
                    : "bg-amber-50 border-amber-500 text-stone-900 cursor-pointer"
                  : isDark
                  ? "bg-slate-950 border-slate-800/80 hover:border-slate-700 cursor-pointer"
                  : "bg-stone-50 border-stone-200 hover:border-stone-300 cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Potong Kuota Grooming Pass Membership</h4>
                  <p className="text-xs opacity-70">
                    {activeMembership
                      ? `Terverifikasi untuk ${activeMembership.customerName} (${activeMembership.planName})`
                      : "Nomor WhatsApp belum terdaftar di langganan aktif."}
                  </p>
                </div>
              </div>
              {paymentMethod === "membership_quota" && <Check className="w-5 h-5 text-amber-500" />}
            </div>
          </div>

          {/* Booking Summary Sidebar Card */}
          <div
            className={`p-6 rounded-3xl border flex flex-col justify-between ${
              isDark
                ? "bg-slate-900/90 border-slate-800 text-slate-100"
                : "bg-amber-50/70 border-amber-200 text-stone-900"
            }`}
          >
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 font-mono">
                RINGKASAN RESERVASI
              </span>
              <h3 className="text-lg font-bold font-serif mt-1">Review Tiket</h3>

              <div className="mt-4 space-y-2.5 text-xs">
                <div className="flex justify-between border-b pb-2 border-slate-800/50">
                  <span className="text-slate-400">Cabang</span>
                  <span className="font-semibold">{selectedBranch}</span>
                </div>
                <div className="flex justify-between border-b pb-2 border-slate-800/50">
                  <span className="text-slate-400">Layanan</span>
                  <span className="font-semibold">{selectedMainService?.name}</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="flex justify-between border-b pb-2 border-slate-800/50">
                    <span className="text-slate-400">Add-ons ({selectedAddons.length})</span>
                    <span className="font-semibold text-right">
                      {selectedAddons.map((a) => a.name).join(", ")}
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-b pb-2 border-slate-800/50">
                  <span className="text-slate-400">Barber</span>
                  <span className="font-semibold text-amber-400">
                    {selectedBarberId === "any"
                      ? "Siapa Saja yang Tersedia"
                      : barbers.find((b) => b.id === selectedBarberId)?.name}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2 border-slate-800/50">
                  <span className="text-slate-400">Jadwal</span>
                  <span className="font-semibold font-mono">
                    {selectedDate} ({selectedTimeSlot} WIB)
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2 border-slate-800/50">
                  <span className="text-slate-400">Pelanggan</span>
                  <span className="font-semibold">{customerName}</span>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t border-dashed border-amber-500/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-400 font-mono">TOTAL PEMBAYARAN</span>
                <span className="text-xl font-extrabold font-mono text-amber-500">
                  {finalTotalPrice === 0 ? "Gratis (Member)" : formatRupiah(finalTotalPrice)}
                </span>
              </div>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmBooking}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-xl shadow-amber-900/30 transition flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Konfirmasi &amp; Amankan Kursi</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons (Back & Next) */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800/60">
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={handlePrevStep}
          className={`px-5 py-2.5 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed ${
            isDark
              ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
              : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        {currentStep < 5 && (
          <button
            type="button"
            onClick={handleNextStep}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-900/20 transition flex items-center gap-1.5"
          >
            <span>Lanjut ke Langkah {currentStep + 1}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
