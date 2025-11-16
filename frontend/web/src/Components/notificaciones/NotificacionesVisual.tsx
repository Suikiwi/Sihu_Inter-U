import React from "react";

const NotificacionesVisual: React.FC = () => {
  const notificaciones = [
    { id: 1, tipo: "nuevo_chat", mensaje: "Has iniciado un nuevo chat con Estudiante Fernando Gonzales", fecha: new Date().toLocaleString() },
    { id: 2, tipo: "nuevo_mensaje", mensaje: "Estudiante Daniela Castro te envió un mensaje", fecha: new Date().toLocaleString() },
    { id: 3, tipo: "calificacion_chat", mensaje: "Tu chat fue calificado con 5 estrellas", fecha: new Date().toLocaleString() },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
      <h2 className="text-2xl font-bold text-purple-100 mb-4">Notificaciones</h2>
      <ul className="space-y-3">
        {notificaciones.map((n) => (
          <li key={n.id} className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
            <div className="text-slate-300">{n.mensaje}</div>
            <div className="text-slate-500 text-xs mt-1">{n.fecha}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificacionesVisual;
