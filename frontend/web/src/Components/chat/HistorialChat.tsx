import React, { useEffect, useState } from "react";
import { obtenerMisChats } from "../../services/chats";
import { useNavigate } from "react-router-dom";

interface Chat {
  id_chat: number;
  estado_intercambio: boolean;
  participantes: string[];
  mensajes: any[];
  fecha_inicio: string;
  publicacion?: {
    id_publicacion: number;
    titulo: string;
  };
}

const HistorialChat: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await obtenerMisChats();
        console.log("Respuesta del backend:", data); // ✅ confirma que es un array
        setChats(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error al cargar chats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  const renderChatCard = (chat: Chat) => (
    <div
      key={chat.id_chat}
      className="bg-slate-800 p-4 rounded-lg border border-slate-700 shadow-md"
    >
      <h2 className="text-purple-100 font-semibold text-lg mb-2">
        {chat.publicacion?.titulo ?? "Sin título"}
      </h2>
      <p className="text-slate-300 text-sm mb-1">
        <strong>Estado:</strong> {chat.estado_intercambio ? "Activo" : "Inactivo"}
      </p>
      <p className="text-slate-300 text-sm mb-1">
        <strong>Participantes:</strong> {chat.participantes?.join(", ") ?? "Desconocidos"}
      </p>
      <p className="text-slate-400 text-xs mb-4">
        <strong>Último mensaje:</strong>{" "}
        {chat.mensajes?.length > 0 ? chat.mensajes[chat.mensajes.length - 1].contenido : "Sin mensajes"}
      </p>
      <button
        onClick={() => navigate(`/chat/${chat.id_chat}`)}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm"
      >
        Ir al chat
      </button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Historial de Chats</h1>

      {loading ? (
        <p className="text-slate-400 text-center">Cargando chats...</p>
      ) : chats.length === 0 ? (
        <p className="text-slate-400 text-center">No tienes chats iniciados ni recibidos.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chats.map(renderChatCard)}
        </div>
      )}
    </div>
  );
};

export default HistorialChat;
