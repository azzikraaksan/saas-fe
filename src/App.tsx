import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import DashboardAdmin from "./pages/DashboardAdmin";
import Register from "./pages/Register";

export default function App() {
  return (
        <main>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          </Routes>
        </main>
  );
}
