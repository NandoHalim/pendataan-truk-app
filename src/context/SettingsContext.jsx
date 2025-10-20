import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SettingsContext = createContext(null);

const DEFAULTS = {
  locale: "id-ID",
  theme: "light", // "light" | "dark"
  dateFormat: "dd/MM/yyyy",
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("app_settings");
      return saved ? JSON.parse(saved) : DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("app_settings", JSON.stringify(settings));
    } catch {}
  }, [settings]);

  const updateSettings = (patch) =>
    setSettings((prev) => ({ ...prev, ...patch }));

  const value = useMemo(
    () => ({ settings, updateSettings }),
    [settings]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
