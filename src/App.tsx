import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import AuthPage from "./pages/AuthPage";
// import VehiclesList from "./pages/VehiclesList";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
// import SideBar from "./components/SideBar";
// import { RxHamburgerMenu } from "react-icons/rx";

export default function App() {
  return (
        <main>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
  );
}
