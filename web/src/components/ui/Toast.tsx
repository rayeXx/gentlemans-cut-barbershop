import React from "react";
import { ToastMessage } from "@/types/barbershop";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const bgColors = {
          success: "bg-emerald-950/95 border-emerald-500/60 text-emerald-100",
          error: "bg-red-950/95 border-red-500/60 text-red-100",
          warning: "bg-amber-950/95 border-amber-500/60 text-amber-100",
          info: "bg-slate-900/95 border-cyan-500/60 text-slate-100",
        };

        const iconMap = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
          warning: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />,
          info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />,
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-2 ${bgColors[toast.type]}`}
          >
            {iconMap[toast.type]}
            <div className="flex-1 text-sm">
              <p className="font-semibold">{toast.title}</p>
              <p className="text-xs opacity-90 mt-0.5">{toast.message}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-xs opacity-60 hover:opacity-100 transition p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
