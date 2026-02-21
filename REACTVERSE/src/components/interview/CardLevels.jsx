import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiStar,
  FiTrendingUp,
  FiAward,
} from "react-icons/fi";
import { useProgress } from "../../context/ProgressContext";

export default function CardLevels() {
  const { cardId } = useParams();
  const [hoveredLevel, setHoveredLevel] = useState(null);

  const { stats } = useProgress();

  const levels = [
    {
      id: 1,
      label: "Level 1",
      desc: "Start with the basics",
      icon: <FiStar />,
      gradient: "from-emerald-500 via-green-500 to-teal-500",
    },
    {
      id: 2,
      label: "Level 2",
      desc: "Go deeper into concepts",
      icon: <FiTrendingUp />,
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
    },
    {
      id: 3,
      label: "Level 3",
      desc: "Master advanced topics",
      icon: <FiAward />,
      gradient: "from-orange-500 via-red-500 to-pink-500",
    },
  ];

  // PROGRESS LOGIC
  function getLevelProgress(levelId) {
    if (!stats) return { completed: 0, total: 0, xp: 0 };

    if (cardId === "interview") {
      const d = stats.interviewLevels?.[String(levelId)];
      return d
        ? {
            completed: d.completedPages,
            total: d.totalPages,
            xp: d.completedPages,
          }
        : {};
    }

    if (cardId === "aptitude") {
      const d = stats.aptitudeLevels?.[String(levelId)];
      return d ? { completed: d.xp, total: d.total, xp: d.xp } : {};
    }

    if (cardId === "coding") {
      const d = stats.codingLevels?.[String(levelId)];
      const codingTotals = { 1: 20, 2: 30, 3: 50 };
      return d
        ? { completed: d.xp, total: codingTotals[levelId], xp: d.xp }
        : {};
    }

    if (cardId === "lessons") {
      return {
        completed: stats.completedLessons,
        total: stats.totalLessons,
        xp: stats.completedLessons,
      };
    }

    return { completed: 0, total: 0, xp: 0 };
  }

  return (
    <div
      className="p-6"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/interview"
            className="flex items-center gap-2 text-sm group"
            style={{ color: "var(--text)" }}
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back
          </Link>

          <h1 className="text-4xl font-bold mt-3 bg-gradient-to-r from-blue-500 via-purple-400 to-pink-400 bg-clip-text text-transparent capitalize">
            {cardId.replace("-", " ")}
          </h1>

          <p className="text-[var(--text)]/70 text-lg">Choose your level</p>
        </motion.div>

        {/* LEVEL CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levels.map((level, index) => {
            const progress = getLevelProgress(level.id);
            const percent = progress.total
              ? Math.round((progress.completed / progress.total) * 100)
              : 0;
            const isCompleted = percent === 100;

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Link
                  to={`/interview/${cardId}/level/${level.id}`}
                  onMouseEnter={() => setHoveredLevel(level.id)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  className="group block relative"
                >
                  <div
                    className="relative rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 h-full group-hover:scale-[1.02]"
                    style={{
                      background: "var(--card-bg)",
                      border: "1px solid var(--card-border)",
                    }}
                  >
                    {/* HOVER GRADIENT GLOW */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${level.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                    />

                    {/* CONTENT */}
                    <div className="relative p-8">
                      {/* ICON */}
                      <div
                        className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl mb-6 text-white bg-gradient-to-br ${level.gradient} group-hover:scale-110 transition-transform`}
                      >
                        {level.icon}
                      </div>

                      {/* LABEL */}
                      <p className="text-sm text-[var(--text)]/60">
                        {level.label}
                      </p>

                      {/* TITLE */}
                      <h3 className="text-2xl font-bold mt-1 text-[var(--text-bold)]">
                        {level.label}
                      </h3>

                      <p className="text-sm mt-1 text-[var(--text)]/80">
                        {level.desc}
                      </p>

                      {/* XP */}
                      <p className="mt-3 text-sm font-semibold text-emerald-500">
                        {cardId === "interview"
                          ? `Pages Read: ${progress.completed}`
                          : `XP Earned: ${progress.xp}`}
                      </p>

                      {/* PROGRESS BAR — Coding has none */}
                      {cardId !== "coding" && (
                        <div className="mt-4">
                          <div
                            className="h-2 rounded-full overflow-hidden"
                            style={{ background: "var(--answer-bg)" }}
                          >
                            <div
                              className={`h-full bg-gradient-to-r ${level.gradient}`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <p className="text-xs mt-1 text-[var(--text)]/70">
                            {progress.completed}/{progress.total} • {percent}%
                          </p>
                        </div>
                      )}

                      {/* CODING STATUS */}
                      {cardId === "coding" && (
                        <p className="mt-2 text-sm font-semibold text-[var(--text)]/80">
                          {progress.xp === 0
                            ? "Not Attempted"
                            : progress.xp === progress.total
                            ? "Completed"
                            : "In Progress"}
                        </p>
                      )}

                      {/* START / RESTART BUTTON */}
                      <div
                        className="mt-6 flex items-center gap-2 text-sm font-medium"
                        style={{
                          color: isCompleted ? "#fb7185" : "var(--text-bold)",
                        }}
                      >
                        {isCompleted ? "Restart Level" : "Start Level"}
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* SHIMMER */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {/* Animated border when hovering */}
                    {hoveredLevel === level.id && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl border border-blue-400/40 pointer-events-none"
                        layoutId="hoverBorder"
                      />
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
