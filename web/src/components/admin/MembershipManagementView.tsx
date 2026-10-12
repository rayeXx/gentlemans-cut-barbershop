import React, { useState } from "react";
import { MemberSubscription, MembershipPlan } from "@/types/barbershop";
import { INITIAL_MEMBERSHIP_PLANS } from "@/lib/mockData";
import { Sparkles, User, Phone, Calendar, Plus, RefreshCw, Trash2, CheckCircle2 } from "lucide-react";

interface MembershipManagementViewProps {
  subscriptions: MemberSubscription[];
  onAddSubscription: (sub: MemberSubscription) => void;
  onUpdateSubscriptionQuota: (id: string, newQuota: number | "unlimited") => void;
  onDeleteSubscription: (id: string) => void;
  isDark: boolean;
}

export function MembershipManagementView({
  subscriptions,
  onAddSubscription,
  onUpdateSubscriptionQuota,
  onDeleteSubscription,
  isDark,
}: MembershipManagementViewProps) {
  const [plans] = useState<MembershipPlan[]>(INITIAL_MEMBERSHIP_PLANS);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("plan-essential");

  const filteredSubs = subscriptions.filter(
    (s) =>
      s.customerName.toLowerCase().includes(search.toLowerCase()) ||
      s.customerPhone.includes(search) ||
      s.planName.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const plan = plans.find((p) => p.id === selectedPlanId);
    if (!plan) return;

    const today = new Date();
    const expiry = new Date();
    expiry.setDate(today.getDate() + 30);

    const newSub: MemberSubscription = {
      id: `sub-${Date.now()}`,
      customerName: name.trim(),
      customerPhone: phone.trim(),
      planId: plan.id,
      planName: plan.name,
      quotaRemaining: plan.haircutQuota === "unlimited" ? "unlimited" : plan.haircutQuota,
      quotaTotal: plan.haircutQuota === "unlimited" ? "unlimited" : plan.haircutQuota,
      startDate: today.toISOString().split("T")[0],
      expiryDate: expiry.toISOString().split("T")[0],
      status: "active",
    };

    onAddSubscription(newSub);
    setIsAddOpen(false);
    setName("");
    setPhone("");
  };

  return (
    <div
      className={`p-6 rounded-3xl border space-y-6 ${
        isDark
          ? "bg-slate-900/70 border-slate-800 text-slate-100"
          : "bg-white border-amber-200 text-stone-900 shadow-sm"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold font-serif flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Manajemen Anggota Grooming Pass (VIP Membership)
          </h3>
          <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-stone-500"}`}>
            Monitoring kuota sisa potong rambut pelanggan, aktivasi manual, dan perpanjangan langganan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama / WhatsApp member..."
            className={`px-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-amber-500 ${
              isDark
                ? "bg-slate-950 border-slate-800 text-slate-100"
                : "bg-stone-50 border-stone-200 text-stone-900"
            }`}
          />
          <button
            onClick={() => setIsAddOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ Member Baru</span>
          </button>
        </div>
      </div>

      {/* Add Member Form */}
      {isAddOpen && (
        <form
          onSubmit={handleAdd}
          className={`p-5 rounded-2xl border space-y-3 animate-in fade-in duration-200 ${
            isDark ? "bg-slate-950 border-amber-500/40" : "bg-amber-50/70 border-amber-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-amber-500">+ Registrasi Member Manual (Kasir POS)</h4>
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="text-slate-400 hover:text-white text-xs"
            >
              ✕ Batal
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              required
              placeholder="Nama Pelanggan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`px-3 py-2 rounded-xl border text-xs ${
                isDark ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-stone-200"
              }`}
            />
            <input
              type="tel"
              required
              placeholder="Nomor WhatsApp (08xxx)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`px-3 py-2 rounded-xl border text-xs font-mono ${
                isDark ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-stone-200"
              }`}
            />
            <select
              value={selectedPlanId}
              onChange={(e) => setSelectedPlanId(e.target.value)}
              className={`px-3 py-2 rounded-xl border text-xs ${
                isDark ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-stone-200"
              }`}
            >
              <option value="plan-essential">Gentleman Essential (2x Kuota)</option>
              <option value="plan-vip">Royal VIP Club (Unlimited)</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
          >
            Aktifkan Membership
          </button>
        </form>
      )}

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredSubs.map((sub) => (
          <div
            key={sub.id}
            className={`p-5 rounded-2xl border flex flex-col justify-between transition ${
              isDark ? "bg-slate-950/70 border-slate-800" : "bg-stone-50 border-stone-200"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {sub.planName}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  {sub.status.toUpperCase()}
                </span>
              </div>

              <h4 className="font-bold text-sm text-slate-200">{sub.customerName}</h4>
              <p className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-500" />
                {sub.customerPhone}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400 font-mono">Sisa Kuota:</span>
                <span className="text-base font-extrabold font-mono text-emerald-400">
                  {sub.quotaRemaining === "unlimited"
                    ? "UNLIMITED"
                    : `${sub.quotaRemaining} / ${sub.quotaTotal}`}
                </span>
              </div>

              {/* Adjust Quota Actions */}
              {sub.quotaRemaining !== "unlimited" && (
                <div className="flex items-center gap-1.5 mb-3">
                  <button
                    onClick={() => {
                      const cur = typeof sub.quotaRemaining === "number" ? sub.quotaRemaining : 0;
                      if (cur > 0) onUpdateSubscriptionQuota(sub.id, cur - 1);
                    }}
                    title="Gunakan 1 Kuota"
                    className="flex-1 py-1 rounded-lg border border-slate-700 text-[10px] text-slate-300 hover:bg-slate-800 transition"
                  >
                    -1 Kuota (Pakai)
                  </button>
                  <button
                    onClick={() => {
                      const cur = typeof sub.quotaRemaining === "number" ? sub.quotaRemaining : 0;
                      onUpdateSubscriptionQuota(sub.id, cur + 1);
                    }}
                    title="Tambah 1 Kuota"
                    className="flex-1 py-1 rounded-lg border border-slate-700 text-[10px] text-amber-400 hover:bg-slate-800 transition"
                  >
                    +1 Kuota (Isi)
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Exp: {sub.expiryDate}</span>
                <button
                  onClick={() => onDeleteSubscription(sub.id)}
                  className="text-red-400 hover:text-red-300 p-1"
                  title="Hapus Member"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
