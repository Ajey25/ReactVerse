// src/context/ProgressContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true); // Start as true
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // 🔥 Fetch user progress (XP, lessons, streak, etc.)
  const fetchProgress = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (!user?._id || !token) {
        setLoading(false);
        return;
      }

      const res = await fetch(`${BASE_URL}/api/progress/stats/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) {
        setStats(data);
      }
    } catch (err) {
      console.error("Progress fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🎯 Fetch progress on mount
  useEffect(() => {
    fetchProgress();
  }, []);

  // 🌟 Called after login + after lesson completion
  const refreshProgress = () => {
    fetchProgress();
  };

  return (
    <ProgressContext.Provider
      value={{
        stats,
        loading,
        refreshProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
