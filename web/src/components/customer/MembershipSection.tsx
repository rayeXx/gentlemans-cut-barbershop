import React, { useState } from "react";
import { MembershipPlan, MemberSubscription } from "@/types/barbershop";
import { INITIAL_MEMBERSHIP_PLANS, formatRupiah } from "@/lib/mockData";
import { Sparkles, Check, Crown, Zap, Search, ShieldCheck, X, Phone, User } from "lucide-react";

interface MembershipSectionProps {
  subscriptions: MemberSubscription[];
  onAddSubscription: (sub: MemberSubscription) => void;
  isDark: boolean;
}

export function MembershipSection({
  subscriptions,
  onAddSubscription,
  isDark,
}: MembershipSectionProps) {
  const [plans] = useState<MembershipPlan[]>(INITIAL_MEMBERSHIP_PLANS);
  const [searchPhone, setSearchPhone] = useState("");
  const [checkedMember, setCheckedMember] = useState<MemberSubscription | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Subscribe modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("plan-essential");
  const [subName, setSubName] = useState("");
  const [subPhone, setSubPhone] = useState("");

  const handleCheckQuota = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const cleanSearch = searchPhone.replace(/\D/g, "");
    if (!cleanSearch) {
      setCheckedMember(null);
      return;
    }
    const found = subscriptions.find((s) => s.customerPhone.replace(/\D/g, "").includes(cleanSearch));
    setCheckedMember(found || null);
  };

  const handleOpenSubscribe = (planId: string) => {
    setSelectedPlanId(planId);
    setIsModalOpen(true);
  };

  const handleConfirmSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subName.trim() || !subPhone.trim()) return;

    const plan = plans.find((p) => p.id === selectedPlanId);
    if (!plan) return;

    const today = new Date();
    const expiry = new Date();
    expiry.setDate(today.getDate() + 30);

    const newSub: MemberSubscription = {
      id: `sub-${Date.now()}`,
      customerName: subName.trim(),
      customerPhone: subPhone.trim(),
      planId: plan.id,
      planName: plan.name,
      quotaRemaining: plan.haircutQuota === "unlimited" ? "unlimited" : plan.haircutQuota,
      quotaTotal: plan.haircutQuota === "unlimited" ? "unlimited" : plan.haircutQuota,
      startDate: today.toISOString().split("T")[0],
      expiryDate: expiry.toISOString().split("T")[0],
      status: "active",
    };

    onAddSubscription(newSub);
    setIsModalOpen(false);
    setSubName("");
    setSubPhone("");
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 animate-in fade-in duration-300">
      {/* Intro Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 font-mono px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 inline-flex items-center gap-1.5">
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          GROOMING PASS MEMBERSHIP
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif">
          Langganan Bulanan Pria Elegan
        </h2>
        <p className={`text-sm ${isDark ? "text-slate-400" : "text-stone-600"}`}>
          Nikmati kemudahan potong rambut rutin dengan kuota bulanan, diskon produk, dan akses VIP tanpa antre panjang.
        </p>
      </div>

      {/* Plans Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => {
          const isVip = plan.id === "plan-vip";
          return (
            <div
              key={plan.id}
              className={`p-8 rounded-3xl border flex flex-col justify-between relative transition-all duration-300 hover:shadow-2xl ${
                isVip
                  ? isDark
                    ? "bg-gradient-to-b from-amber-500/15 via-slate-900 to-slate-950 border-amber-400 shadow-amber-950/40"
                    : "bg-gradient-to-b from-amber-100 via-white to-amber-50/40 border-amber-500 shadow-amber-900/15"
                  : isDark
                  ? "bg-slate-900/70 border-slate-800 text-slate-100"
                  : "bg-white border-stone-200 text-stone-900"
              }`}
            >
              {isVip && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[11px] font-extrabold uppercase px-4 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  REKOMENDASI TERBAIK
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold font-serif">{plan.name}</h3>
                  <div
                    className={`p-2.5 rounded-2xl border ${
                      isVip
                        ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                        : "bg-slate-800 text-slate-300 border-slate-700"
                    }`}
                  >
                    {isVip ? <Crown className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                  </div>
                </div>

                <p className={`text-xs ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="my-6 pb-6 border-b border-dashed border-slate-700/50">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-500">
                      {formatRupiah(plan.priceMonthly)}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">/ bulan</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 mt-2 block">
                    {plan.haircutQuota === "unlimited"
                      ? "⚡ Kuota Potong Rambut: UNLIMITED"
                      : `✂️ Kuota: 2x Potong Rambut per bulan`}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Benefit yang Didapat:
                  </span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <div className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className={isDark ? "text-slate-300" : "text-stone-700"}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleOpenSubscribe(plan.id)}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition shadow-lg flex items-center justify-center gap-2 ${
                  isVip
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-900/30"
                    : isDark
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700"
                    : "bg-stone-900 hover:bg-stone-800 text-white"
                }`}
              >
                <span>Berlangganan Sekarang</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Quota Tracking Tool for Existing Members */}
      <div
        className={`p-8 rounded-3xl border max-w-3xl mx-auto ${
          isDark
            ? "bg-slate-900/70 border-slate-800 text-slate-100"
            : "bg-white border-amber-200 text-stone-900"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/30">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-serif">Cek Sisa Kuota Membership Anda</h3>
            <p className={`text-xs ${isDark ? "text-slate-400" : "text-stone-500"}`}>
              Masukkan nomor WhatsApp Anda untuk melihat sisa jatah potong rambut bulan ini.
            </p>
          </div>
        </div>

        <form onSubmit={handleCheckQuota} className="flex gap-2">
          <input
            type="tel"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            placeholder="Contoh: 081234567890"
            className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-mono focus:outline-none focus:border-amber-500 ${
              isDark
                ? "bg-slate-950 border-slate-800 text-slate-100"
                : "bg-stone-50 border-stone-200 text-stone-900"
            }`}
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition"
          >
            Periksa Kuota
          </button>
        </form>

        {/* Search Results */}
        {hasSearched && (
          <div className="mt-5 pt-4 border-t border-slate-800">
            {checkedMember ? (
              <div
                className={`p-5 rounded-2xl border ${
                  isDark ? "bg-slate-950 border-slate-800" : "bg-amber-50 border-amber-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-amber-500">
                      MEMBER TERVERIFIKASI
                    </span>
                    <h4 className="text-base font-bold">{checkedMember.customerName}</h4>
                    <p className="text-xs text-slate-400 font-mono">
                      WhatsApp: {checkedMember.customerPhone} • Paket: {checkedMember.planName}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-mono">SISA KUOTA BULAN INI</span>
                    <span className="text-xl font-mono font-extrabold text-emerald-400">
                      {checkedMember.quotaRemaining === "unlimited"
                        ? "UNLIMITED"
                        : `${checkedMember.quotaRemaining} / ${checkedMember.quotaTotal} Kali`}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-dashed border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Aktif s/d: {checkedMember.expiryDate}</span>
                  <span className="text-emerald-400 font-semibold">Status: Aktif</span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950 text-slate-400 text-xs text-center border border-slate-800">
                Nomor WhatsApp ini belum memiliki paket membership aktif. Silakan pilih paket di atas untuk mulai berlangganan.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Subscribe Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 sm:p-8 relative ${
              isDark
                ? "bg-slate-900 border-slate-800 text-slate-100"
                : "bg-white border-amber-200 text-stone-900"
            }`}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif">Aktifkan Grooming Pass</h3>
              <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                Paket: <strong>{plans.find((p) => p.id === selectedPlanId)?.name}</strong> (
                {formatRupiah(plans.find((p) => p.id === selectedPlanId)?.priceMonthly || 0)}/bln)
              </p>
            </div>

            <form onSubmit={handleConfirmSubscribe} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Nama Lengkap</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={subName}
                    onChange={(e) => setSubName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-amber-500 ${
                      isDark
                        ? "bg-slate-950 border-slate-800 text-slate-100"
                        : "bg-stone-50 border-stone-200 text-stone-900"
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Nomor WhatsApp (Untuk aktivasi kuota)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={subPhone}
                    onChange={(e) => setSubPhone(e.target.value)}
                    placeholder="081234567890"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-mono focus:outline-none focus:border-amber-500 ${
                      isDark
                        ? "bg-slate-950 border-slate-800 text-slate-100"
                        : "bg-stone-50 border-stone-200 text-stone-900"
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-900/30 transition mt-2"
              >
                Konfirmasi &amp; Aktivasi Pass
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
