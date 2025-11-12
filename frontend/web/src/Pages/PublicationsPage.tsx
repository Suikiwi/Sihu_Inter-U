import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export type Publication = {
  id_publicacion: number;
  titulo: string;
  descripcion: string;
  habilidades_buscadas: string[];
  habilidades_ofrecidas: string[];
  fecha_creacion: string;
  estado: boolean;
  estudiante: number;
  autor_alias?: string | null;
};

type PublicationsFeedProps = {
  source?: "global" | "mias";
};

const PublicationsFeed: React.FC<PublicationsFeedProps> = ({ source = "global" }) => {
  const [items, setItems] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [texto, setTexto] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublicaciones = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("accessToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

        const url =
          source === "mias"
            ? "http://127.0.0.1:8000/api/publicaciones/mias/"
            : "http://127.0.0.1:8000/api/publicaciones/";

        const { data } = await axios.get<Publication[]>(url, { headers });
        setItems(data);
      } catch (err: any) {
        setError(
          source === "mias"
            ? "No se pudieron cargar tus publicaciones."
            : "No se pudieron cargar las publicaciones."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPublicaciones();
  }, [source]);

  const iniciarChat = async (idPublicacion: number) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/chats/",
        { publicacion: idPublicacion },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/chat/${data.id_chat}`);
    } catch {
      alert("No se pudo iniciar el chat. Verifica que no seas el autor.");
    }
  };

  const crearReporte = async (idPublicacion: number) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/reportes/",
        { publicacion: idPublicacion, motivo: "Contenido inapropiado" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Reporte enviado correctamente.");
    } catch {
      alert("No se pudo enviar el reporte.");
    }
  };

  const filtradas =
    texto.trim().length === 0
      ? items
      : items.filter(
          (p) =>
            p.titulo.toLowerCase().includes(texto.toLowerCase()) ||
            (p.descripcion || "").toLowerCase().includes(texto.toLowerCase()) ||
            p.habilidades_buscadas.some((h) => h.toLowerCase().includes(texto.toLowerCase()))
        );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-purple-100">
          {source === "mias" ? "Mis publicaciones" : "Publicaciones globales"}
        </h1>

        <div className="flex gap-3">
          {source === "global" && (
            <button
              onClick={() => navigate("/publications/mias")}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg"
              title="Ir a mis publicaciones"
            >
              <i className="ri-user-line mr-2" />
              Mis publicaciones
            </button>
          )}

          <input
            placeholder="Buscar..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="px-3 py-2 rounded bg-slate-800/50 border border-slate-600/50 text-white text-sm"
          />
        </div>
      </div>

      {loading && <p className="text-slate-300">Cargando...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && filtradas.length === 0 && (
        <div className="px-4 py-3 rounded border border-slate-600 bg-slate-800/50 text-slate-300">
          {source === "mias" ? "No tienes publicaciones aún." : "No se encontraron publicaciones."}
        </div>
      )}

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtradas.map((pub) => (
          <li
            key={pub.id_publicacion}
            className="rounded-xl p-4 bg-slate-800/50 border border-slate-700 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{pub.titulo}</h3>
                <p className="text-slate-300 text-sm mt-1">{pub.descripcion}</p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {pub.habilidades_buscadas.map((h, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-purple-600/30 text-purple-200 rounded-full text-xs"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => iniciarChat(pub.id_publicacion)}
                  className="mt-4 w-full px-4 py-2 bg-linear-to-r from-purple-600 to-primary text-white rounded-lg font-medium hover:from-primary hover:to-purple-600 transition-all"
                >
                  Iniciar Chat
                </button>

                <button
                  onClick={() => crearReporte(pub.id_publicacion)}
                  className="mt-2 w-full px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all"
                >
                  Crear reporte
                </button>
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-400">
                  {pub.autor_alias ?? `Usuario ${pub.estudiante}`}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(pub.fecha_creacion).toLocaleDateString()}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PublicationsFeed;
