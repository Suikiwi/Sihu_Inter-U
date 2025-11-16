import React, { useEffect, useState } from "react";
import type { Publication } from "../../Components/publications/Types";
import PublicationFormModal from "./PublicationFormModal";
import { useNavigate } from "react-router-dom";
import { getUserIdFromAccessToken } from "../../services/auth";
import { CrearReporteVisual } from "../reportes/CrearReporteVisual";

const PublicationsFeed: React.FC = () => {
  const [publicaciones, setPublicaciones] = useState<Publication[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | undefined>(undefined);
  const navigate = useNavigate();
  const userId = getUserIdFromAccessToken();

  useEffect(() => {
    // Datos ficticios para demo visual
    setPublicaciones([
      {
        id_publicacion: 1,
        titulo: "Busco ayuda en React",
        descripcion: "Necesito apoyo para un proyecto universitario.",
        habilidades_buscadas: ["React", "UX"],
        habilidades_ofrecidas: [],
        fecha_creacion: new Date().toISOString(),
        estado: true,
        estudiante: 9,
        autor_alias: "Estudiante A",
      },
      {
        id_publicacion: 2,
        titulo: "Intercambio conocimientos en Python",
        descripcion: "Ofrezco mentoría en Python a cambio de UX.",
        habilidades_buscadas: ["UX"],
        habilidades_ofrecidas: ["Python"],
        fecha_creacion: new Date().toISOString(),
        estado: true,
        estudiante: 10,
        autor_alias: "Estudiante B",
      },
    ]);
  }, []);

  const iniciarChat = (idPublicacion: number) => {
    // Simular navegación a chat ficticio con el id de la publicación
    navigate(`/chat/${idPublicacion}`);
  };

  const handleDelete = (id: number) => {
    setPublicaciones((prev) => prev.filter((p) => p.id_publicacion !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6">
      {publicaciones.length === 0 ? (
        <p className="text-slate-400">No hay publicaciones aún.</p>
      ) : (
        publicaciones.map((p) => (
          <div
            key={p.id_publicacion}
            className="bg-slate-800 p-4 rounded-lg border border-slate-700 w-full max-w-md mx-auto"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-purple-100 font-semibold text-lg">{p.titulo}</h4>
            </div>

            <p className="text-slate-300 text-sm">{p.descripcion}</p>
            <p className="text-slate-400 text-xs mt-2">
              Habilidades buscadas: {p.habilidades_buscadas?.join(", ")}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              <button
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                onClick={() => iniciarChat(p.id_publicacion)}
              >
                Iniciar chat
              </button>

              <CrearReporteVisual context={{ publicacionId: p.id_publicacion }} />

              {userId === p.estudiante && (
                <>
                  <button
                    onClick={() => {
                      setEditId(p.id_publicacion);
                      setShowModal(true);
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id_publicacion)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}

      {showModal && (
        <PublicationFormModal
          idEdit={editId}
          onClose={() => setShowModal(false)}
          onSaved={() => {}}
        />
      )}
    </div>
  );
};

export default PublicationsFeed;
