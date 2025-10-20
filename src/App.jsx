import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout.jsx";

// Pages
import Dashboard from "./pages/Dashboard.jsx";
import Trucks from "./pages/Trucks.jsx";
import Inspections from "./pages/Inspections.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";

import { useAuth } from "./context/AuthContext.jsx";

export default function App() {
  const { isAuthenticated } = useAuth();

  // Jika nanti butuh proteksi halaman, tinggal aktifkan guard ini:
  // if (!isAuthenticated) return <Navigate to="/settings" replace />;

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trucks" element={<Trucks />} />
        <Route path="/inspections" element={<Inspections />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppLayout>
  );
}
