import React, { useEffect, useState } from "react";

const estadoLabel = (e: number) =>
  e === 0 ? "Pendiente" : e === 1 ? "Aprobado" : e === 2 ? "Rechazado" : e === 3 ? "Eliminado" : "Desconocido";

const ModerarReportesVisual: React.FC = () => {
  const [reportes, setReportes] = useState<
    Array<{ id: number; motivo: string; estado: number; fecha: string; chat: number | null; publicacion: number | null }>
  >([]);

  useEffect(() => {
    const handler = (ev: Event) => {
      const custom = ev as CustomEvent;
      setReportes((prev) => [custom.detail, ...prev]);
    };
    window.addEventListener("reporte-creado", handler);
    return () => window.removeEventListener("reporte-creado", handler);
  }, []);

  const actualizar = (id: number, estado: number) => {
    setReportes((prev) => prev.map((r) => (r.id === id ? { ...r, estado } : r)));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-purple-100 mb-4">Moderar reportes (visual)</h2>
      {reportes.length === 0 ? (
        <p className="text-slate-400">No hay reportes pendientes.</p>
      ) : (
        <ul className="space-y-3">
          {reportes.map((r) => (
            <li key={r.id} className="p-4 bg-slate-800/60 border border-slate-700 rounded-xl">
              <div className="flex justify-between">
                <div>
                  <div className="text-white font-medium">Motivo: {r.motivo}</div>
                  <div className="text-slate-400 text-sm">Creado: {new Date(r.fecha).toLocaleString()}</div>
                  <div className="text-slate-400 text-sm">
                    Contexto: {r.chat ? `Chat #${r.chat}` : r.publicacion ? `Publicación #${r.publicacion}` : "—"}
                  </div>
                </div>
                <div className="text-slate-300 text-sm">Estado: {estadoLabel(r.estado)}</div>
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => actualizar(r.id, 1)} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Aprobar</button>
                <button onClick={() => actualizar(r.id, 2)} className="px-3 py-1 bg-yellow-600 text-white rounded text-sm">Rechazar</button>
                <button onClick={() => actualizar(r.id, 3)} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ModerarReportesVisual;
