import { useAuth } from "../context/AuthContext.jsx";

export default function useAuthRole() {
  const { role, user, isAuthenticated } = useAuth();
  const isAdmin = role === "admin";
  return { role, isAdmin, user, isAuthenticated };
}
