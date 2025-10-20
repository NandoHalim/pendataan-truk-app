import { createContext, useContext, useMemo, useState } from "react";

// Sederhana dulu: mock auth & role. Nanti bisa dihubungkan ke Supabase Auth.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, email, role }
  const [role, setRole] = useState("admin"); // "admin" | "user"
  const isAuthenticated = Boolean(user);

  const login = (mockEmail = "demo@example.com") => {
    setUser({ id: "demo-id", email: mockEmail, role });
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, role, setRole, isAuthenticated, login, logout }),
    [user, role, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
