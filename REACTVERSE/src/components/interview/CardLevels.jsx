// --- SAME IMPORTS ---
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

  // 🟢 FUNCTION: Map progress data based on the category
  function getLevelProgress(levelId) {
    if (!stats) return { completed: 0, total: 0 };

    // INTERVIEW
    if (cardId === "interview") {
      const levelData = stats.interviewLevels?.[String(levelId)];

      if (!levelData) return { completed: 0, total: 0 };

      return {
        completed: levelData.completedPages,
        total: levelData.totalPages,
      };
    }

    // APTITUDE
    if (cardId === "aptitude") {
      const levelData = stats.aptitudeLevels?.[String(levelId)];

      if (!levelData) return { completed: 0, total: 0 };

      return {
        completed: levelData.xp,
        total: levelData.total,
      };
    }

    // LESSONS
    if (cardId === "lessons") {
      return {
        completed: stats.completedLessons,
        total: stats.totalLessons,
      };
    }

    return { completed: 0, total: 0 };
  }

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/interview"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Interview Prep</span>
          </Link>

          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent capitalize">
            {cardId.replace("-", " ")}
          </h1>
          <p className="text-slate-400 text-lg">
            Choose your level and start learning
          </p>
        </motion.div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levels.map((level, index) => {
            const progress = getLevelProgress(level.id);

            const percent =
              progress.total > 0
                ? Math.round((progress.completed / progress.total) * 100)
                : 0;

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                <Link
                  to={`/interview/${cardId}/level/${level.id}`}
                  className="group relative block"
                  onMouseEnter={() => setHoveredLevel(level.id)}
                  onMouseLeave={() => setHoveredLevel(null)}
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl bg-slate-900/50 
                    backdrop-blur-sm border border-slate-800 transition-all duration-300 
                    h-full group-hover:scale-[1.02] group-hover:border-slate-700`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${level.gradient}
                      opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />

                    <div className="relative p-8">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${level.gradient}
                        flex items-center justify-center text-2xl mb-6
                        group-hover:scale-110 transition-transform duration-300`}
                      >
                        {level.icon}
                      </div>

                      <p className="text-sm text-slate-500 mb-1">
                        {level.label}
                      </p>
                      <h3 className="text-2xl font-bold mb-2">{level.label}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {level.desc}
                      </p>

                      {/* Progress Bar */}
                      <div className="mt-6">
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all"
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        <p className="text-slate-400 text-xs mt-2">
                          {cardId === "interview"
                            ? `${progress.completed}/${progress.total} pages • ${percent}%`
                            : `${progress.completed}/${progress.total} • ${percent}%`}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-300 group-hover:text-white">
                        <span>Start Level</span>
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    <div
                      className="absolute inset-0 -translate-x-full 
                      group-hover:translate-x-full transition-transform duration-1000 
                      bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    />

                    {hoveredLevel === level.id && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none"
                        layoutId="borderAnim"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
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
