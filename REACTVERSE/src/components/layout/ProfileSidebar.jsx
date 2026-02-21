import { FiLogOut, FiUser, FiAward, FiEdit2, FiX } from "react-icons/fi";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";

export default function ProfileSidebar({
  open,
  onClose,
  user,
  xp,
  totalXP,
  logout,
}) {
  if (!open) return null;
  const navigate = useNavigate();

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="fixed left-0 right-0 bottom-0 top-16 bg-black/40 z-40"
      />

      {/* SIDEBAR */}
      <aside
        className="
          fixed top-0 right-0 z-50
          h-screen w-full sm:w-75
          animate-slideInRight
        "
        style={{
          background: "var(--card-bg)",
          borderLeft: "1px solid var(--border)",
          boxShadow: "-30px 0 80px rgba(0,0,0,0.45)",
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          aria-label="Close sidebar"
          className="
            absolute top-1 right-3
            p-2 rounded-lg
            hover:bg-[var(--hover-bg)]
            transition
          "
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* USER INFO */}
        <div
          className="py-2 px-4 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="user"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                {user.name.charAt(0)}
              </div>
            )}

            <div className="min-w-0">
              <p className="font-bold truncate">{user.name}</p>
              <p className="text-sm opacity-60 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* BADGE */}
        <div className="px-4 py-2">
          <Badge user={user} xp={xp} totalXP={totalXP} />
        </div>

        {/* ACTIONS */}
        <div className="border-t" style={{ borderColor: "var(--border)" }}>
          <button
            onClick={() => {
              onClose();
              navigate("/profile");
            }}
            className="w-full px-6 py-3 flex items-center gap-3 hover:bg-[var(--hover-bg)] transition"
          >
            <FiUser />
            Profile
          </button>

          <button
            onClick={() => {
              onClose();
              navigate("/profile/edit");
            }}
            className="w-full px-6 py-3 flex items-center gap-3 hover:bg-[var(--hover-bg)] transition"
          >
            <FiEdit2 />
            Edit Profile
          </button>

          <button
            onClick={() => {
              onClose();
              navigate("/profile/leaderboard");
            }}
            className="w-full px-6 py-3 flex items-center gap-3 hover:bg-[var(--hover-bg)] transition"
          >
            {" "}
            <FiAward />
            Leaderboard
          </button>

          <button
            onClick={logout}
            className="w-full px-6 py-3 flex items-center gap-3 text-red-400 hover:bg-red-500/10 transition border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>

      {/* ANIMATION */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
