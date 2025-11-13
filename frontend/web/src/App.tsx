import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import PasswordResetRequest from "./Components/PasswordResetRequest";
import PasswordResetConfirm from "./Components/PasswordResetConfirm";
import ActivateAccount from "./Components/ActivateAccount";
import PublicationsPage from "./Pages/PublicationsPage";
import ChatPage from "./Pages/ChatPage";
import HistorialChat from "./Components/HistorialChat";
import { Layout } from "./Components/Layout";
import "./Css/global.css";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = !!localStorage.getItem("accessToken");
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔁 Redirección raíz al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Páginas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/reset-password"
          element={
            <Layout showHeader={false} showFooter={false} centerContent>
              <PasswordResetRequest />
            </Layout>
          }
        />
        <Route path="/reset-password-confirm/:uid/:token" element={<PasswordResetConfirm />} />
        <Route
          path="/activate/:uid/:token"
          element={
            <Layout showHeader={false} showFooter={false} centerContent>
              <ActivateAccount />
            </Layout>
          }
        />

        {/* Páginas protegidas */}
        <Route
          path="/profile"
          element={
            <RequireAuth>
                <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/publications"
          element={
            <RequireAuth>
              <PublicationsPage /> {/* aquí sí se agrega el Sidebar dentro de la página */}
            </RequireAuth>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <RequireAuth>
              <Layout>
                <ChatPage />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/historial-chat"
          element={
            <RequireAuth>
              <Layout>
                <HistorialChat />
              </Layout>
            </RequireAuth>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
