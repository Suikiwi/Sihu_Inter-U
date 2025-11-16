import React from "react";
import { useNavigate } from "react-router-dom";

const HistorialPanel: React.FC = () => {
  const navigate = useNavigate();
  const historialMock = [
    { id_chat: 101, titulo: "Intercambio React", estado_intercambio: false },
    { id_chat: 102, titulo: "Intercambio UX", estado_intercambio: true },
    { id_chat: 103, titulo: "Práctica Python", estado_intercambio: false },
  ];

  return (
    <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
      <h3 className="text-purple-200 font-bold mb-3">Historial de chats</h3>
      <ul className="space-y-2">
        {historialMock.map((c) => (
          <li key={c.id_chat} className="flex items-center justify-between text-slate-300">
            <div>
              <div className="font-medium">{c.titulo}</div>
              <div className="text-xs">{c.estado_intercambio ? "✅ Finalizado" : "⏳ En curso"}</div>
            </div>
            <button
              className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-xs"
              onClick={() => navigate(`/chat/${c.id_chat}`)}
            >
              Abrir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistorialPanel;
