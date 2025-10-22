import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout.jsx";

// Pages
import Dashboard from "./pages/Dashboard.jsx";
import Trucks from "./pages/Trucks.jsx";
import Inspections from "./pages/Inspections.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";

import { useAuth } from "./context/AuthContext.jsx";
import PWAInstallPrompt from "./components/shared/PWAInstallPrompt.jsx";
import { usePWA } from "./hooks/usePWA.js";

export default function App() {
  const { isAuthenticated } = useAuth();
  const { isOffline } = usePWA();

  // Jika nanti butuh proteksi halaman, tinggal aktifkan guard ini:
  // if (!isAuthenticated) return <Navigate to="/settings" replace />;

  return (
    <>
      <AppLayout>
        {/* Offline Indicator */}
        {isOffline && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
            <p className="font-bold">Mode Offline</p>
            <p>Beberapa fitur mungkin terbatas tanpa koneksi internet.</p>
          </div>
        )}
        
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

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </>
  );
}