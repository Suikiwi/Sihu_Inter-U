import React, { useState } from "react";

export const CrearReporteVisual: React.FC<{ context?: { chatId?: number; publicacionId?: number } }> = ({ context }) => {
  const [open, setOpen] = useState(false);
  const [motivo, setMotivo] = useState("");

  const crear = () => {
    if (!motivo.trim()) return;
    const nuevo = {
      id: Math.floor(Math.random() * 100000),
      motivo,
      estado: 0,
      fecha: new Date().toISOString(),
      chat: context?.chatId ?? null,
      publicacion: context?.publicacionId ?? null,
    };
    window.dispatchEvent(new CustomEvent("reporte-creado", { detail: nuevo }));
    setOpen(false);
    setMotivo("");
  };

  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
      >
        Crear reporte
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-slate-800/80 border border-slate-700 rounded-xl p-5">
            <h3 className="text-purple-200 font-bold mb-3">Nuevo reporte</h3>
            <textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded text-white text-sm"
              rows={4}
              placeholder="Describe el motivo del reporte..."
            />
            <div className="mt-4 flex gap-2">
              <button onClick={crear} className="px-3 py-2 bg-yellow-600 text-white rounded text-sm">Enviar</button>
              <button onClick={() => setOpen(false)} className="px-3 py-2 border border-slate-600 rounded text-slate-300 text-sm">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
