import { useState, useRef, useEffect } from "react";
import {
  FiBell,
  FiMoon,
  FiSun,
  FiUser,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { useProgress } from "../../context/ProgressContext";

export default function Navbar({ theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const { stats } = useProgress(); // 🎯 XP directly from context

  const menuRef = useRef();
  const notifRef = useRef();

  // 🔥 Fetch user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const user = {
    name: storedUser.name || "Guest User",
    email: storedUser.email || "guest@example.com",
    avatar: storedUser.avatar || null,
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const notifications = [
    { id: 1, text: "New course available: React Advanced", time: "2m ago" },
    { id: 2, text: "Your project has been approved", time: "1h ago" },
    { id: 3, text: "Interview scheduled for tomorrow", time: "3h ago" },
  ];

  return (
    <header className="h-18 shrink-0 flex items-center justify-between px-8 bg-[var(--glass)] backdrop-blur-sm border-b border-[var(--border)] relative shadow-sm">
      {/* LEFT */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-sm opacity-60">
          Welcome back, {user.name.split(" ")[0]}!
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="relative p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
          >
            <FiBell className="text-xl" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>

          {notificationOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-[var(--glass)]  border border-[var(--border)] shadow-2xl rounded-2xl p-4 animate-fadeIn z-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">Notifications</h3>
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                  {notifications.length} new
                </span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <p className="text-sm">{notif.text}</p>
                    <p className="text-xs opacity-50 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30 transition-all hover:scale-105 active:scale-95"
        >
          {theme === "dark" ? (
            <FiSun className="text-xl text-yellow-400" />
          ) : (
            <FiMoon className="text-xl text-blue-400" />
          )}
        </button>

        {/* Avatar Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 p-2 pr-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover"
                alt="user"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                {user.name.charAt(0)}
              </div>
            )}

            <div className="hidden md:block text-left">
              <p className="text-sm font-medium">{user.name.split(" ")[0]}</p>
            </div>
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-[var(--glass)] backdrop-blur-sm border border-[var(--border)] shadow-2xl rounded-2xl p-3 animate-fadeIn z-50">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 mb-3">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover"
                    alt="user"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                    {user.name.charAt(0)}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{user.name}</p>
                  <p className="text-xs opacity-60 truncate">{user.email}</p>

                  {/* XP Progress Bar */}
                  {stats && (
                    <div className="mt-2">
                      <div className="flex justify-between text-[10px] opacity-70 mb-1">
                        <span>XP</span>
                        <span>
                          {stats.currentXP || 0}/{stats.totalXP || 0}
                        </span>
                      </div>

                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              ((stats.currentXP || 0) / (stats.totalXP || 1)) *
                                100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="h-px bg-[var(--border)] my-2"></div>

              <DropdownItem icon={<FiUser />} label="My Profile" />
              <DropdownItem icon={<FiSettings />} label="Settings" />

              <div className="h-px bg-[var(--border)] my-2"></div>

              <DropdownItem
                icon={<FiLogOut />}
                label="Logout"
                onClick={logout}
                danger
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function DropdownItem({ icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all duration-200 ${
        danger ? "text-red-400 hover:bg-red-500/10" : "hover:bg-white/10"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
