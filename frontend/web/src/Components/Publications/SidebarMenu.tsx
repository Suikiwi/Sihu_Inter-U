import React from "react";
import { useNavigate } from "react-router-dom";
import { User, MessagesSquare, Bell } from "lucide-react";

const SidebarMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-[72px] left-4 z-30 flex flex-col items-center gap-6 bg-slate-800/80 p-4 rounded-xl shadow-lg">
      <button
        title="Perfil"
        onClick={() => navigate("/profile")}
        className="hover:scale-110 transition-transform"
      >
        <User className="text-purple-300 w-6 h-6" />
      </button>

      <button
        title="Historial de chat"
        onClick={() => navigate("/historial-chat")}
        className="hover:scale-110 transition-transform"
      >
        <MessagesSquare className="text-purple-300 w-6 h-6" />
      </button>

      <button
        title="Notificaciones"
        onClick={() => navigate("/notificaciones")}
        className="hover:scale-110 transition-transform"
      >
        <Bell className="text-purple-300 w-6 h-6" />
      </button>
    </div>
  );
};

export default SidebarMenu;
