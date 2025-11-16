import React, { useState } from "react";

const EstadoIntercambioVisual: React.FC = () => {
  const [estado, setEstado] = useState<"pendiente" | "realizado" | "calificado">("pendiente");
  const [puntaje, setPuntaje] = useState<number | null>(null);

  return (
    <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl mt-4">
      <h3 className="text-purple-200 font-bold mb-3">Estado del intercambio</h3>
      {estado === "pendiente" && (
        <button
          onClick={() => setEstado("realizado")}
          className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
        >
          Marcar como realizado
        </button>
      )}

      {estado === "realizado" && (
        <div className="space-y-3">
          <p className="text-slate-300 text-sm">Califica este intercambio:</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => { setPuntaje(n); setEstado("calificado"); }}
                className={`px-3 py-1 rounded text-sm ${puntaje === n ? "bg-blue-700 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                {Array.from({ length: n }).map(() => "⭐")}
              </button>
            ))}
          </div>
        </div>
      )}

      {estado === "calificado" && (
        <div className="text-green-400 text-sm">
          ✅ Intercambio calificado con {puntaje} estrellas
        </div>
      )}
    </div>
  );
};

export default EstadoIntercambioVisual;
