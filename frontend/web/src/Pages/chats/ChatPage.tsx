import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HistorialPanel from "../../Components/chat/HistorialPanel";
import EstadoIntercambioVisual from "../../Components/chat/EstadoIntercambioVisual";
import { CrearReporteVisual } from "../../Components/reportes/CrearReporteVisual";

interface Mensaje {
  id?: number;
  user: string;
  message: string;
  fecha?: string;
}

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { user: "Estudiante A", message: "Hola, ¿quieres colaborar en React?" },
    { user: "Yo", message: "Sí, me interesa mucho." },
    { user: "Estudiante A", message: "Perfecto, te envío detalles." },
  ]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  const enviarMensaje = () => {
    if (nuevoMensaje.trim() !== "") {
      setMensajes((prev) => [...prev, { user: "Yo", message: nuevoMensaje }]);
      setNuevoMensaje("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold text-purple-100">Chat #{id}</h1>

      {/* Lista de mensajes ficticios */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 h-[60vh] overflow-y-auto space-y-3">
        {mensajes.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.user === "Yo" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-3 py-2 rounded-lg text-sm ${
                m.user === "Yo"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-700 text-slate-200"
              }`}
            >
              <span className="block font-semibold">{m.user}</span>
              <span>{m.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input para enviar mensaje */}
      <div className="flex gap-2">
        <input
          type="text"
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          className="flex-1 px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          placeholder="Escribe un mensaje..."
        />
        <button
          onClick={enviarMensaje}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Enviar
        </button>
      </div>

      {/* Paneles visuales adicionales */}
      <HistorialPanel />
      <EstadoIntercambioVisual />
      <CrearReporteVisual context={{ chatId: Number(id) }} />
    </div>
  );
};

export default ChatPage;
