import { useEffect, useState } from "react";
import {
  FiAward,
  FiChevronLeft,
  FiChevronRight,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [userRank, setUserRank] = useState(null);

  const fetchLeaderboard = async (page = 1) => {
    try {
      setLoading(true);

      const url = user?._id
        ? `${import.meta.env.VITE_BASE_URL}/api/leaderboard?page=${page}&limit=10&userId=${user._id}`
        : `${import.meta.env.VITE_BASE_URL}/api/leaderboard?page=${page}&limit=10`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setLeaders(data.leaderboard || []);
        setPagination(data.pagination);
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
    <div
      className="min-h-screen py-6 sm:py-8 px-3 sm:px-4"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-2 sm:px-4">
            <div className="flex items-center gap-3">
              <FiAward
                className="text-2xl sm:text-3xl"
                style={{ color: "var(--text)" }}
              />
              <h1
                className="text-2xl sm:text-4xl font-bold"
                style={{ color: "var(--text)" }}
              >
                Leaderboard
              </h1>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm opacity-70 hover:opacity-100 transition self-start sm:self-auto"
            >
              ← Back
            </button>
          </div>

          <p className="text-xs sm:text-sm opacity-60 ml-2 sm:ml-4 mt-1">
            Top performers ranked by XP
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
          {userRank !== null && (
            <div
              className="p-3 sm:p-4 rounded-lg border"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <FiTrendingUp className="text-sm opacity-60" />
                <p className="text-xs opacity-60">Your Rank</p>
              </div>
              <p className="text-xl sm:text-2xl font-bold">#{userRank}</p>
            </div>
          )}

          <div
            className="p-3 sm:p-4 rounded-lg border"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <FiUsers className="text-sm opacity-60" />
              <p className="text-xs opacity-60">Total Players</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold">
              {pagination.totalUsers}
            </p>
          </div>
        </div>

        {/* TABLE */}
        <div
          className="rounded-lg border overflow-hidden"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--border)",
          }}
        >
          {/* HEADER */}
          <div
            className="grid grid-cols-[50px_1fr_80px] sm:grid-cols-[80px_1fr_120px] gap-3 px-3 sm:px-6 py-3 text-xs sm:text-sm font-semibold"
            style={{
              borderBottom: "2px solid var(--border)",
            }}
          >
            <span>Rank</span>
            <span>Player</span>
            <span className="text-right">XP</span>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="p-10 text-center">
              <div className="inline-block animate-spin rounded-full h-7 w-7 border-2 border-purple-500 border-t-transparent mb-3"></div>
              <p className="text-sm opacity-60">Loading...</p>
            </div>
          )}

          {/* EMPTY */}
          {!loading && leaders.length === 0 && (
            <div className="p-10 text-center opacity-60">
              <FiAward className="mx-auto text-3xl mb-3" />
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
                    grid grid-cols-[50px_1fr_80px] sm:grid-cols-[80px_1fr_120px]
                    gap-3
                    px-3 sm:px-6 py-3
                    transition-colors
                    ${isMe ? "font-semibold" : ""}
                  `}
                  style={{
                    background: isMe
                      ? "rgba(139, 92, 246, 0.1)"
                      : index % 2 === 0
                        ? "transparent"
                        : "rgba(0,0,0,0.02)",
                    borderBottom:
                      index < leaders.length - 1
                        ? "1px solid var(--border)"
                        : "none",
                  }}
                >
                  {/* RANK */}
                  <div className="flex items-center">
                    {u.rank === 1 && <span className="text-lg">🥇</span>}
                    {u.rank === 2 && <span className="text-lg">🥈</span>}
                    {u.rank === 3 && <span className="text-lg">🥉</span>}
                    {u.rank > 3 && (
                      <span className="text-xs sm:text-sm opacity-70">
                        #{u.rank}
                      </span>
                    )}
                  </div>

                  {/* PLAYER */}
                  <div className="flex items-center gap-3 min-w-0">
                    {u.avatar ? (
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold"
                        style={{
                          background:
                            "linear-gradient(135deg, #6366f1, #9333ea)",
                          color: "white",
                        }}
                      >
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm sm:text-base truncate">
                          {u.name}
                        </p>
                        {isMe && (
                          <span
                            className="px-2 py-0.5 rounded text-xs"
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
                        <p className="text-xs opacity-50 truncate">
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
                      className={`text-sm sm:text-base font-semibold ${
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
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg border"
              style={{
                background: pagination.hasPrevPage
                  ? "var(--card-bg)"
                  : "transparent",
                borderColor: "var(--border)",
                opacity: pagination.hasPrevPage ? 1 : 0.5,
              }}
            >
              <FiChevronLeft />
            </button>

            {Array.from(
              { length: Math.min(5, pagination.totalPages) },
              (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className="w-10 h-10 rounded-lg text-sm font-medium border"
                    style={{
                      background:
                        pageNum === pagination.currentPage
                          ? "linear-gradient(135deg, #6366f1, #9333ea)"
                          : "var(--card-bg)",
                      color:
                        pageNum === pagination.currentPage
                          ? "white"
                          : "var(--text)",
                      borderColor: "var(--border)",
                    }}
                  >
                    {pageNum}
                  </button>
                );
              },
            )}

            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg border"
              style={{
                background: pagination.hasNextPage
                  ? "var(--card-bg)"
                  : "transparent",
                borderColor: "var(--border)",
                opacity: pagination.hasNextPage ? 1 : 0.5,
              }}
            >
              <FiChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
