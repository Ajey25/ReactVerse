import { Link } from "react-router-dom";
import {
  FiBook,
  FiLayers,
  FiCode,
  FiArrowRight,
  FiStar,
  FiZap,
  FiTrendingUp,
} from "react-icons/fi";
import { motion, progress } from "framer-motion";
import { useProgress } from "../context/ProgressContext.jsx";

export default function Interview() {
  const { stats, loading } = useProgress();
  console.log("Interview Stats:", stats);

  const interviewPercent = stats?.totalInterviewXP
    ? Math.round((stats.interviewXP / stats.totalInterviewXP) * 100)
    : 0;
  const aptitudePercent = stats?.totalAptitudeXP
    ? Math.round((stats.aptitudeXP / stats.totalAptitudeXP) * 100)
    : 0;
  if (loading) return <div>Loading...</div>;

  const cards = [
    {
      id: "interview",
      title: "Interview Questions",
      desc: "Master the most asked questions across all React rounds.",
      icon: <FiBook />,
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      bgGlow: "bg-violet-500/20",
      count: "50+ Questions",
      difficulty: "All Levels",
      progress: interviewPercent,
    },
    {
      id: "aptitude",
      title: "Aptitude & Logic",
      desc: "MCQs, logic puzzles, tricky debugging questions.",
      icon: <FiLayers />,
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      bgGlow: "bg-cyan-500/20",
      count: "35+ Challenges",
      difficulty: "Intermediate",
      progress: aptitudePercent || 0,
    },
    {
      id: "coding",
      title: "Coding Rounds",
      desc: "Build components, mini projects & solve code challenges.",
      icon: <FiCode />,
      gradient: "from-emerald-500 via-green-500 to-teal-500",
      bgGlow: "bg-emerald-500/20",
      count: "25+ Projects",
      difficulty: "Advanced",
      progress: stats?.codingProgress || 0,
    },
  ];

  return (
    <div className=" bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex items-center gap-3 mb-4">
          <FiStar className="text-yellow-400 text-3xl" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Interview Preparation
          </h1>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            <Link to={`/interview/${card.id}`} className="group relative block">
              <div className="relative overflow-hidden rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-slate-700 transition-all duration-300 h-full">
                {/* Gradient Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Pattern Overlay */}
                {card.pattern === "dots" && (
                  <div className="absolute inset-0 opacity-5">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                  </div>
                )}
                {card.pattern === "grid" && (
                  <div className="absolute inset-0 opacity-5">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                  </div>
                )}
                {card.pattern === "lines" && (
                  <div className="absolute inset-0 opacity-5">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, white, white 1px, transparent 1px, transparent 10px)",
                      }}
                    />
                  </div>
                )}

                <div className="relative p-8">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${card.gradient} ${card.bgGlow} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {card.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
                    {card.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {card.desc}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-6 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <FiZap className="text-yellow-400" />
                      <span>{card.count}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <FiTrendingUp className="text-green-400" />
                      <span>{card.difficulty}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {card.progress !== undefined && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <span>Your Progress</span>
                        <span className="font-semibold">{card.progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${card.gradient} transition-all duration-500`}
                          style={{ width: `${card.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                    <span>Start Preparing</span>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
