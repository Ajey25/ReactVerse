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
import { motion } from "framer-motion";
import { useProgress } from "../context/ProgressContext.jsx";
import Commet from "react-loading-indicators/Commet";

export default function Interview() {
  const { stats, loading } = useProgress();

  const interviewPercent = stats?.totalInterviewXP
    ? Math.round((stats.interviewXP / stats.totalInterviewXP) * 100)
    : 0;

  const aptitudePercent = stats?.totalAptitudeXP
    ? Math.round((stats.aptitudeXP / stats.totalAptitudeXP) * 100)
    : 0;

  const codingPercent = stats?.totalCodingXP
    ? Math.round((stats.codingXP / stats.totalCodingXP) * 100)
    : 0;

  if (loading)
    return (
      <div
        className="w-full h-screen flex items-center justify-center"
        style={{ background: "var(--bg)" }}
      >
        <Commet color="blue" size="medium" />
      </div>
    );

  const cards = [
    {
      id: "interview",
      title: "Interview Questions",
      desc: "Master the most asked questions across all React rounds.",
      icon: <FiBook />,
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      count: "50 Questions per level",
      difficulty: "Theory Questions",
      progress: interviewPercent,
    },
    {
      id: "aptitude",
      title: "Aptitude & Logic",
      desc: "MCQs, logic puzzles, tricky debugging questions.",
      icon: <FiLayers />,
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      count: "35 questions per level",
      difficulty: "React Aptitude",
      progress: aptitudePercent,
    },
    {
      id: "coding",
      title: "Coding Rounds",
      desc: "Build components, mini projects & solve code challenges.",
      icon: <FiCode />,
      gradient: "from-emerald-500 via-green-500 to-teal-500",
      count: "1 project per level",
      difficulty: "Practical Coding",
      progress: codingPercent,
    },
  ];

  return (
    <div
      className=" p-8 transition-all"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex items-center gap-3 mb-4">
          <FiStar className="text-yellow-400 text-3xl" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Interview Preparation
          </h1>
        </div>
      </div>

      {/* CARDS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
            }}
          >
            <Link to={`/interview/${card.id}`} className="group block relative">
              <div
                className="relative rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 h-full"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                }}
              >
                {/* Hover Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-all`}
                />

                {/* CONTENT */}
                <div className="relative p-8">
                  {/* ICON */}
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl mb-6 text-white bg-gradient-to-br ${card.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    {card.icon}
                  </div>

                  {/* TITLE */}
                  <h3 className="text-2xl font-bold mb-2 transition-all group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent text-[var(--text-bold)]">
                    {card.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-sm mb-3" style={{ color: "var(--text)" }}>
                    {card.desc}
                  </p>

                  {/* META */}
                  <div className="text-xs mb-4">
                    <div
                      className="flex items-center gap-2 mb-2"
                      style={{ color: "var(--text)" }}
                    >
                      <FiZap className="text-yellow-400" />
                      {card.count}
                    </div>
                    <div
                      className="flex items-center gap-2"
                      style={{ color: "var(--text)" }}
                    >
                      <FiTrendingUp className="text-green-400" />
                      {card.difficulty}
                    </div>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="mb-4">
                    <div
                      className="flex items-center justify-between text-xs mb-1"
                      style={{ color: "var(--text)" }}
                    >
                      <span>Your Progress</span>
                      <span className="font-semibold">{card.progress}%</span>
                    </div>

                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ background: "var(--answer-bg)" }}
                    >
                      <div
                        className={`h-full bg-gradient-to-r ${card.gradient}`}
                        style={{
                          width: `${card.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-2 text-sm font-medium mt-4 transition-colors"
                    style={{ color: "var(--text-bold)" }}
                  >
                    Start Preparing
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Shimmer */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
