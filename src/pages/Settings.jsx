import { useSettings } from "../context/SettingsContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Settings() {
  const { settings, updateSettings } = useSettings();
  const { isAuthenticated, login, logout, role, setRole } = useAuth();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Pengaturan</h2>

      <div className="space-y-2">
        <div className="text-sm">Tema: {settings.theme}</div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded border"
            onClick={() => updateSettings({ theme: "light" })}
          >
            Light
          </button>
          <button
            className="px-3 py-1 rounded border"
            onClick={() => updateSettings({ theme: "dark" })}
          >
            Dark
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm">
          Auth: {isAuthenticated ? "Logged In" : "Logged Out"} ({role})
        </div>
        <div className="flex gap-2">
          {!isAuthenticated ? (
            <button className="px-3 py-1 rounded border" onClick={() => login()}>
              Login (Mock)
            </button>
          ) : (
            <button className="px-3 py-1 rounded border" onClick={logout}>
              Logout
            </button>
          )}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-3 py-1 rounded border text-sm"
          >
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>
        </div>
      </div>
    </section>
  );
}
