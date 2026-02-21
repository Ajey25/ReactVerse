import { useEffect, useState } from "react";
import {
  FiAward,
  FiChevronLeft,
  FiChevronRight,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [userRank, setUserRank] = useState(null);
  const { user } = useAuth();

  const fetchLeaderboard = async (page = 1) => {
    try {
      setLoading(true);
      const url = user?._id
        ? `${
            import.meta.env.VITE_BASE_URL
          }/api/leaderboard?page=${page}&limit=10&userId=${user._id}`
        : `${
            import.meta.env.VITE_BASE_URL
          }/api/leaderboard?page=${page}&limit=10`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setLeaders(data.leaderboard || []);
        setPagination(data.pagination || pagination);
        setUserRank(data.userRank || null);
      }
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchLeaderboard(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "var(--bg)" }}>
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center justify-between px-4">
            {/* Left: Icon + Title */}
            <div className="flex items-center gap-3">
              <FiAward className="text-3xl" style={{ color: "var(--text)" }} />
              <h1
                className="text-3xl sm:text-4xl font-bold"
                style={{ color: "var(--text)" }}
              >
                Leaderboard
              </h1>
            </div>

            {/* Right: Back Button */}
            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm opacity-70 hover:opacity-100 transition"
            >
              ← Back to Dashboard
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-sm opacity-60 ml-4 mt-1">
            Top performers ranked by XP
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {userRank !== null && (
            <div
              className="p-4 rounded-lg border"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <FiTrendingUp className="text-sm opacity-60" />
                <p className="text-xs opacity-60">Your Rank</p>
              </div>
              <p className="text-2xl font-bold">#{userRank}</p>
            </div>
          )}
          <div
            className="p-4 rounded-lg border"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <FiUsers className="text-sm opacity-60" />
              <p className="text-xs opacity-60">Total Players</p>
            </div>
            <p className="text-2xl font-bold">{pagination.totalUsers}</p>
          </div>
        </div>

        {/* LEADERBOARD TABLE */}
        <div
          className="rounded-lg border overflow-hidden"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--border)",
          }}
        >
          {/* TABLE HEADER */}
          <div
            className="grid grid-cols-[60px_1fr_100px] sm:grid-cols-[80px_1fr_120px] gap-4 px-4 sm:px-6 py-3 text-sm font-semibold"
            style={{
              background: "var(--card-bg)",
              borderBottom: "2px solid var(--border)",
            }}
          >
            <span>Rank</span>
            <span>Player</span>
            <span className="text-right">XP</span>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent mb-3"></div>
              <p className="text-sm opacity-60">Loading...</p>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && leaders.length === 0 && (
            <div className="p-12 text-center opacity-60">
              <FiAward className="mx-auto text-4xl mb-3" />
              <p>No players yet</p>
            </div>
          )}

          {/* LIST */}
          {!loading &&
            leaders.map((u, index) => {
              const isMe = user?._id === u._id;
              const isTop3 = u.rank <= 3;

              return (
                <div
                  key={u._id}
                  className={`
                    grid grid-cols-[60px_1fr_100px] sm:grid-cols-[80px_1fr_120px] gap-4
                    px-4 sm:px-6 py-3.5
                    transition-colors
                    ${isMe ? "font-semibold" : ""}
                  `}
                  style={{
                    background: isMe
                      ? "rgba(139, 92, 246, 0.1)"
                      : index % 2 === 0
                        ? "transparent"
                        : "rgba(0, 0, 0, 0.02)",
                    borderBottom:
                      index < leaders.length - 1
                        ? "1px solid var(--border)"
                        : "none",
                  }}
                >
                  {/* RANK */}
                  <div className="flex items-center">
                    {u.rank === 1 && <span className="text-xl">🥇</span>}
                    {u.rank === 2 && <span className="text-xl">🥈</span>}
                    {u.rank === 3 && <span className="text-xl">🥉</span>}
                    {u.rank > 3 && (
                      <span className="text-sm font-medium opacity-70">
                        #{u.rank}
                      </span>
                    )}
                  </div>

                  {/* PLAYER INFO */}
                  <div className="flex items-center gap-3 min-w-0">
                    {u.avatar ? (
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, #6366f1, #9333ea)",
                          color: "white",
                        }}
                      >
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm sm:text-base truncate">
                          {u.name}
                        </p>
                        {isMe && (
                          <span
                            className="px-2 py-0.5 rounded text-xs font-medium"
                            style={{
                              background: "rgba(139, 92, 246, 0.2)",
                              color: "#a78bfa",
                            }}
                          >
                            You
                          </span>
                        )}
                      </div>
                      {(u.college || u.country) && (
                        <p className="text-xs opacity-50 truncate mt-0.5">
                          {u.college || ""}
                          {u.college && u.country && " · "}
                          {u.country || ""}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* XP */}
                  <div className="flex items-center justify-end">
                    <span
                      className={`text-sm sm:text-base font-medium ${
                        isTop3 ? "text-purple-400" : ""
                      }`}
                    >
                      {u.xp.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>

        {/* PAGINATION */}
        {!loading && pagination.totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${
                  pagination.hasPrevPage
                    ? "hover:opacity-80 cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }
              `}
              style={{
                background: pagination.hasPrevPage
                  ? "var(--card-bg)"
                  : "transparent",
                border: "1px solid var(--border)",
              }}
            >
              <FiChevronLeft className="inline" />
            </button>

            <div className="flex items-center gap-1">
              {Array.from(
                { length: Math.min(5, pagination.totalPages) },
                (_, i) => {
                  let pageNum;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (
                    pagination.currentPage >=
                    pagination.totalPages - 2
                  ) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = pagination.currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`
                        w-9 h-9 rounded-lg text-sm font-medium transition-all
                        ${
                          pageNum === pagination.currentPage
                            ? ""
                            : "hover:opacity-80"
                        }
                      `}
                      style={{
                        background:
                          pageNum === pagination.currentPage
                            ? "linear-gradient(135deg, #6366f1, #9333ea)"
                            : "var(--card-bg)",
                        color:
                          pageNum === pagination.currentPage
                            ? "white"
                            : "var(--text)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                },
              )}
            </div>

            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${
                  pagination.hasNextPage
                    ? "hover:opacity-80 cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }
              `}
              style={{
                background: pagination.hasNextPage
                  ? "var(--card-bg)"
                  : "transparent",
                border: "1px solid var(--border)",
              }}
            >
              <FiChevronRight className="inline" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
