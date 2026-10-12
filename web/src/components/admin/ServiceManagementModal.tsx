import React, { useState } from "react";
import { ServiceItem } from "@/types/barbershop";
import { formatRupiah } from "@/lib/mockData";
import { Plus, Edit2, Trash2, X, Check, Scissors, AlertCircle } from "lucide-react";

interface ServiceManagementModalProps {
  services: ServiceItem[];
  onAddService: (newService: ServiceItem) => void;
  onUpdateService: (updated: ServiceItem) => void;
  onDeleteService: (serviceId: string) => void;
  isDark: boolean;
}

export function ServiceManagementModal({
  services,
  onAddService,
  onUpdateService,
  onDeleteService,
  isDark,
}: ServiceManagementModalProps) {
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(50000);
  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [category, setCategory] = useState<ServiceItem["category"]>("haircut");

  const handleStartCreate = () => {
    setIsCreatingNew(true);
    setEditingService(null);
    setName("");
    setDescription("");
    setPrice(60000);
    setDurationMinutes(30);
    setCategory("haircut");
  };

  const handleStartEdit = (srv: ServiceItem) => {
    setEditingService(srv);
    setIsCreatingNew(false);
    setName(srv.name);
    setDescription(srv.description);
    setPrice(srv.price);
    setDurationMinutes(srv.durationMinutes);
    setCategory(srv.category);
  };

  const handleCancelForm = () => {
    setIsCreatingNew(false);
    setEditingService(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (isCreatingNew) {
      const newSrv: ServiceItem = {
        id: `srv-${Date.now()}`,
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        durationMinutes: Number(durationMinutes),
        category,
      };
      onAddService(newSrv);
    } else if (editingService) {
      const updated: ServiceItem = {
        ...editingService,
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        durationMinutes: Number(durationMinutes),
        category,
      };
      onUpdateService(updated);
    }

    handleCancelForm();
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
            <Scissors className="w-5 h-5 text-amber-500" />
            Katalog Layanan &amp; Paket (CRUD Master Data)
          </h3>
          <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-stone-500"}`}>
            Tambah layanan baru, perbarui tarif cukur, atau hapus paket yang sudah tidak aktif.
          </p>
        </div>

        {!isCreatingNew && !editingService && (
          <button
            onClick={handleStartCreate}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Layanan Baru</span>
          </button>
        )}
      </div>

      {/* Form (Create / Edit) */}
      {(isCreatingNew || editingService) && (
        <form
          onSubmit={handleSave}
          className={`p-5 rounded-2xl border space-y-4 animate-in fade-in duration-200 ${
            isDark ? "bg-slate-950 border-amber-500/40" : "bg-amber-50/70 border-amber-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-amber-500">
              {isCreatingNew ? "+ Form Tambah Layanan Baru" : `✏️ Edit Layanan: ${editingService?.name}`}
            </h4>
            <button
              type="button"
              onClick={handleCancelForm}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Nama Layanan *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Beard Sculpting VIP"
                className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-amber-500 ${
                  isDark ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-stone-200"
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ServiceItem["category"])}
                className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-amber-500 ${
                  isDark ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-stone-200"
                }`}
              >
                <option value="haircut">Potong Rambut (Haircut)</option>
                <option value="shave">Cukur Jenggot (Shave)</option>
                <option value="treatment">Treatment / Creambath</option>
                <option value="package">Paket Lengkap</option>
                <option value="addon">Add-on / Tambahan</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Tarif / Harga (IDR)</label>
              <input
                type="number"
                step="5000"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-amber-500 ${
                  isDark ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-stone-200"
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Durasi (Menit)</label>
              <input
                type="number"
                step="5"
                required
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-amber-500 ${
                  isDark ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-stone-200"
                }`}
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold">Deskripsi Layanan</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Rincian prosedur layanan dan fasilitas..."
                className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-amber-500 ${
                  isDark ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-stone-200"
                }`}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleCancelForm}
              className="px-4 py-2 rounded-xl text-xs border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      )}

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {services.map((srv) => (
          <div
            key={srv.id}
            className={`p-4 rounded-2xl border flex flex-col justify-between transition ${
              isDark ? "bg-slate-950/70 border-slate-800" : "bg-stone-50 border-stone-200"
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-sm text-slate-200">{srv.name}</h4>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700 shrink-0">
                  {srv.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{srv.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-mono font-bold text-sm text-amber-500 block">
                  {formatRupiah(srv.price)}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {srv.durationMinutes} menit
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleStartEdit(srv)}
                  className="p-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-amber-400 hover:border-amber-500 transition"
                  title="Edit Layanan"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteService(srv.id)}
                  className="p-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-red-400 hover:border-red-500 transition"
                  title="Hapus Layanan"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
