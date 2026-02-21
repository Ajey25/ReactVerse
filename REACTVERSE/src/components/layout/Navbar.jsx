import { useState, useRef, useEffect } from "react";
import { FiMoon, FiSun, FiTrendingUp } from "react-icons/fi";
import { useProgress } from "../../context/ProgressContext";
import { useLocation } from "react-router-dom";
import { getBadge } from "./BadgeLevels.jsx";
import logo from "../../assets/react.svg";
import ProfileSidebar from "./ProfileSidebar";

export default function Navbar({ theme, setTheme, isMobile, toggleSidebar }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const { stats } = useProgress();
  const location = useLocation();
  const profileRef = useRef(null);

  /* ---------------- Page Title Logic ---------------- */
  const pageTitles = {
    "/dashboard": "Dashboard",
    "/projects": "Projects",
    "/interview": "Interview",
    "/components": "Components",
    "/lessons": "Lessons",
  };

  const pathname = location.pathname;
  let currentPage = "";

  if (pathname.startsWith("/lesson")) currentPage = "Lessons";
  else if (pathname.startsWith("/interview")) currentPage = "Interview";
  else currentPage = pageTitles[pathname] || "";

  /* ---------------- User ---------------- */
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const user = {
    name: storedUser.name || "Guest User",
    email: storedUser.email || "guest@example.com",
    avatar: storedUser.avatar || null,
  };

  /* ---------------- XP & Badge ---------------- */
  const xp = stats?.xp ?? stats?.currentXP ?? 0;
  const totalXP = stats?.totalXP || 1;
  const badge = getBadge(xp, totalXP);

  const currentLevel = badge?.level || 1;
  const currentRank = badge?.rank || "Beginner";
  const currentColor = badge?.color || "#ea580c";

  /* ---------------- Outside Click Close ---------------- */
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---------------- Logout ---------------- */
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav
      className="relative sticky top-0 z-50 h-16 w-full bg-[var(--glass)] backdrop-blur-xl border-b shadow-xl"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="w-full px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          {/* LEFT (Mobile) */}
          {isMobile ? (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-xl hover:bg-[var(--hover-bg)] transition"
              aria-label="Open menu"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-8 h-8 filter brightness-0 invert"
                />
              </div>
            </button>
          ) : (
            <div />
          )}

          {/* CENTER TITLE */}
          {currentPage && (
            <div className="absolute left-1/3">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {currentPage}
              </h1>
            </div>
          )}

          {/* RIGHT */}
          <div className="flex items-center gap-2 ml-auto">
            {/* XP */}
            <div className="hidden md:flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-400/20">
              <FiTrendingUp className="text-blue-400" />
              <span className="font-semibold">
                {xp.toLocaleString()}
                <span className="ml-1 text-xs opacity-70">XP</span>
              </span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl hover:bg-[var(--hover-bg)] transition hover:scale-110"
            >
              {theme === "dark" ? (
                <FiSun className="w-6 h-6 text-yellow-400" />
              ) : (
                <FiMoon className="w-6 h-6 text-blue-400" />
              )}
            </button>

            {/* PROFILE */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((s) => !s)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--hover-bg)] transition"
              >
                <div
                  className="p-[3px] rounded-full"
                  style={{
                    background: `conic-gradient(${currentColor}, ${currentColor}44)`,
                  }}
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="user"
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="hidden sm:flex flex-col leading-tight">
                  <span className="font-bold" style={{ color: currentColor }}>
                    {currentRank}
                  </span>
                  <span className="text-xs opacity-60">
                    Level {currentLevel}
                  </span>
                </div>
              </button>

              {/* SIDEBAR */}
              <ProfileSidebar
                open={profileOpen}
                onClose={() => setProfileOpen(false)}
                user={user}
                xp={xp}
                totalXP={totalXP}
                badge={badge}
                isMobile={isMobile}
                logout={logout}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
