import React, { useState } from "react";
import { ServiceItem, Barber } from "@/types/barbershop";
import { formatRupiah } from "@/lib/mockData";
import { Scissors, Clock, Sparkles, Star, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

interface ServiceCatalogProps {
  services: ServiceItem[];
  barbers: Barber[];
  onSelectServiceForBooking: (serviceId: string) => void;
  isDark: boolean;
}

export function ServiceCatalog({
  services,
  barbers,
  onSelectServiceForBooking,
  isDark,
}: ServiceCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Semua Layanan" },
    { id: "haircut", label: "Potong Rambut" },
    { id: "shave", label: "Cukur & Jenggot" },
    { id: "treatment", label: "Treatment Kulit Kepala" },
    { id: "package", label: "Paket Full Grooming" },
    { id: "addon", label: "Add-on & Styling" },
  ];

  const filteredServices = services.filter((s) => {
    if (selectedCategory === "all") return true;
    return s.category === selectedCategory;
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 animate-in fade-in duration-300">
      {/* Hero Intro */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 font-mono px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10">
          MENU &amp; HARGA RESMI 2026
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif">
          Layanan &amp; Treatment Spesialis
        </h2>
        <p className={`text-sm ${isDark ? "text-slate-400" : "text-stone-600"}`}>
          Setiap sesi dirancang khusus untuk kenyamanan Anda dengan alat steril, handuk hangat aromaterapi, dan sentuhan kapster berpengalaman.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                isActive
                  ? isDark
                    ? "bg-amber-500 border-amber-400 text-slate-950 font-bold shadow-md shadow-amber-900/20"
                    : "bg-amber-600 border-amber-600 text-white font-bold shadow-md shadow-amber-900/20"
                  : isDark
                  ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  : "bg-white border-stone-200 text-stone-600 hover:text-stone-900"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl relative ${
              service.popular
                ? isDark
                  ? "bg-gradient-to-b from-amber-500/10 to-slate-900/90 border-amber-500/50 shadow-amber-950/20"
                  : "bg-gradient-to-b from-amber-100/60 to-white border-amber-400 shadow-amber-900/10"
                : isDark
                ? "bg-slate-900/70 border-slate-800 text-slate-200"
                : "bg-white border-stone-200 text-stone-900"
            }`}
          >
            {service.popular && (
              <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 shadow">
                Paling Diminati
              </span>
            )}

            <div>
              <div
                className={`w-10 h-10 rounded-2xl border flex items-center justify-center mb-4 ${
                  isDark
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                    : "bg-amber-100 border-amber-300 text-amber-800"
                }`}
              >
                <Scissors className="w-5 h-5" />
              </div>

              <h3 className="text-lg font-bold font-serif">{service.name}</h3>
              <p className={`text-xs mt-2 leading-relaxed ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                {service.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-dashed border-slate-700/40">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  {service.durationMinutes} menit
                </span>
                <span className="text-lg font-extrabold font-mono text-amber-500">
                  {formatRupiah(service.price)}
                </span>
              </div>

              <button
                onClick={() => onSelectServiceForBooking(service.id)}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                  service.popular
                    ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-900/30"
                    : isDark
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                    : "bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200"
                }`}
              >
                <span>Pilih &amp; Jadwalkan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Specialist Barbers Showcase */}
      <div
        className={`p-8 rounded-3xl border ${
          isDark
            ? "bg-slate-900/40 border-slate-800 text-slate-200"
            : "bg-amber-50/50 border-amber-200 text-stone-900"
        }`}
      >
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 font-mono">
            TIM SPECIALIST RESMI
          </span>
          <h3 className="text-2xl font-bold font-serif mt-1">Master Kapster Kami</h3>
          <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-stone-600"}`}>
            Dipilih melalui standar sertifikasi internasional dengan ketelitian teknik potongan tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {barbers.map((barber) => (
            <div
              key={barber.id}
              className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-between transition ${
                isDark
                  ? "bg-slate-950/70 border-slate-800/80 hover:border-amber-500/40"
                  : "bg-white border-stone-200 hover:border-amber-400 shadow-sm"
              }`}
            >
              <div>
                <img
                  src={barber.avatar}
                  alt={barber.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/40 mx-auto shadow-md mb-3"
                />
                <h4 className="font-bold text-sm">{barber.name}</h4>
                <p className="text-[11px] text-amber-500 font-medium mt-0.5">{barber.specialty}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/50 w-full flex items-center justify-center gap-1 text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold">{barber.rating.toFixed(1)}</span>
                <span className="text-slate-500 text-[10px]">({barber.reviewCount})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
