import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const existing = localStorage.getItem("user");

      if (existing && existing !== "undefined") {
        setUser(JSON.parse(existing));
      } else {
        localStorage.removeItem("user"); // clean invalid junk
      }
    } catch (err) {
      console.error("Invalid user JSON, clearing storage:", err);
      localStorage.removeItem("user");
    }

    setLoading(false);
  }, []);

  // Wrap in useCallback to maintain stable reference
  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  // Wrap in useCallback to maintain stable reference
  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
