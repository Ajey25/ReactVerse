// src/components/Dashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import { getBadge } from "../components/layout/BadgeLevels";
import {
  FiRefreshCw,
  FiBook,
  FiCode,
  FiUsers,
  FiTrendingUp,
  FiAward,
  FiTarget,
} from "react-icons/fi";
import { useProgress } from "../context/ProgressContext";
import Commet from "react-loading-indicators/Commet";

const StatCard = ({ title, value, total, icon, color, percent, unit = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="group p-5 rounded-2xl bg-[var(--card-bg)] backdrop-blur-xl 
               border border-[var(--card-border)] shadow-[var(--shadow-soft)] 
               transition-all"
  >
    <div className="flex items-start justify-between mb-4">
      <div
        className={`p-3 rounded-xl bg-gradient-to-br ${colors[color].gradient} shadow-lg 
                    group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <div className="text-right">
        <div className="text-sm font-medium text-[var(--text)]/70">{title}</div>
        <div className="text-xs text-[var(--text)]/40 mt-1">Progress</div>
      </div>
    </div>

    <div className="space-y-3">
      <div className="flex items-end gap-2">
        <div className="text-2xl md:text-3xl font-bold text-[var(--text-bold)]">
          {value}
          <span className="text-sm font-normal text-[var(--text)]/50 ml-1">
            {unit}
          </span>
        </div>
        <div className="text-xs text-[var(--text)]/50 mb-1">/ {total}</div>
        <div className={`ml-auto text-lg font-bold ${colors[color].text}`}>
          {percent}%
        </div>
      </div>

      <div className="h-2 bg-[var(--glass)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${colors[color].gradient}`}
        />
      </div>
    </div>
  </motion.div>
);

const LevelPill = ({ level, xp, total, color }) => {
  const fixedTotals = { 1: 20, 2: 30, 3: 50 };
  const effectiveTotal = total || fixedTotals[level] || 0;
  const percent = effectiveTotal ? Math.round((xp / effectiveTotal) * 100) : 0;

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl bg-[var(--card-bg)] 
                    border border-[var(--card-border)] shadow-[var(--shadow-soft)]"
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center 
                    bg-gradient-to-br ${colors[color].gradient} font-bold text-white`}
      >
        {level}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-[var(--text)]">
          Level {level}
        </div>
        <div className="text-xs text-[var(--text)]/60">
          {xp} / {effectiveTotal} XP
        </div>
      </div>
      <div className="text-sm font-bold text-[var(--text)]">{percent}%</div>
    </div>
  );
};

const ProgressDonut = ({ percent, size = 160, label, xp, totalXP }) => {
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--card-border)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#donut-gradient)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1500 ease-out"
        />
        <defs>
          <linearGradient id="donut-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold text-[var(--text-bold)]">
          {percent}%
        </div>
        <div className="text-xs text-[var(--text)]/60 mt-1">{label}</div>
        <div className="text-sm text-[var(--text)]/70 mt-2">
          {xp} / {totalXP} XP
        </div>
      </div>
    </div>
  );
};

const colors = {
  blue: { gradient: "from-blue-500 to-cyan-500", text: "text-blue-500" },
  green: { gradient: "from-emerald-500 to-teal-500", text: "text-emerald-500" },
  orange: { gradient: "from-amber-500 to-orange-500", text: "text-amber-500" },
  red: { gradient: "from-rose-500 to-pink-500", text: "text-rose-500" },
};

const StatsSection = ({ title, stats, color, icon }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 mb-2">
      <div
        className={`p-2 rounded-lg bg-gradient-to-br ${colors[color].gradient}`}
      >
        {icon}
      </div>
      <h4 className="font-semibold text-[var(--text-bold)]">{title}</h4>
    </div>

    <div className="space-y-2">
      {Object.entries(stats).map(([level, data]) => (
        <LevelPill
          key={level}
          level={level}
          xp={data.xp || 0}
          total={data.total || data.totalXP || 0}
          color={color}
        />
      ))}
    </div>
  </div>
);

export default function Dashboard() {
  const { stats, loading, refreshProgress } = useProgress();

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[var(--bg)]">
        <Commet color="blue" size="medium" />
      </div>
    );

  if (!stats)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <div
          className="text-center p-8 rounded-2xl bg-[var(--card-bg)] 
                        border border-[var(--card-border)] shadow-[var(--shadow-medium)]"
        >
          <FiBook className="text-5xl mx-auto mb-4 text-[var(--text)]/60" />
          <h2 className="text-xl font-bold text-[var(--text-bold)] mb-2">
            Start Learning
          </h2>
          <p className="text-[var(--text)]/60">
            Begin your journey to see progress
          </p>
        </div>
      </div>
    );

  const {
    currentXP,
    totalXP,
    overallPercent,
    lessonPercent,
    aptitudePercent,
    interviewPercent,
    codingPercent,
    completedLessons,
    totalLessons,
    aptitudeXP,
    totalAptitudeXP,
    interviewXP,
    totalInterviewXP,
    codingXP,
    totalCodingXP,
    streakDays,
    longestStreak,
    aptitudeLevels,
    interviewLevels,
    codingLevels,
  } = stats;
  const badge = getBadge(currentXP, totalXP);

  return (
    <div className="min-h-screen p-4" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center 
                        justify-between gap-4"
        >
          <div>
            <h1
              className="text-3xl md:text-4xl font-bold 
                           bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
                           bg-clip-text text-transparent"
            >
              Learning Dashboard
            </h1>
            <p className="text-[var(--text)]/60 mt-2">
              Track your mastery across all modules
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={refreshProgress}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl 
                       transition-all font-medium
                       bg-[var(--glass)]
                       border border-[var(--border)]
                       backdrop-blur-md
                       hover:bg-[var(--glass)]
                       hover:border-purple-500/40
                       shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)]
                       text-[var(--text)]"
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} />
            <span>Refresh Stats</span>
          </motion.button>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress Donut */}
          <div
            className="lg:col-span-1 p-8 rounded-3xl relative overflow-hidden backdrop-blur-xl
             flex flex-col items-center justify-center shadow-xl transition-all"
            style={{
              background: `linear-gradient(135deg, ${badge.color}22, ${badge.color}08)`,
              border: `1px solid ${badge.color}44`,
            }}
          >
            {/* SOFT GLOW - Minimal */}
            <div
              className="absolute -left-16 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full opacity-[0.10] blur-3xl"
              style={{
                background: `radial-gradient(circle, ${badge.color}55 0%, transparent 70%)`,
              }}
            />

            {/* TIER TAG WITH ICON */}
            <div className="absolute -top-0 flex items-center gap-2">
              <div
                className="px-4 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md flex items-center gap-2"
                style={{
                  background: `${badge.color}CC`,
                  color: "white",
                }}
              >
                <span className="text-base">{badge.icon}</span>
                <span>{badge.label} Tier</span>
              </div>
            </div>

            {/* Donut */}
            <ProgressDonut
              percent={overallPercent}
              label="Overall Progress"
              xp={currentXP}
              totalXP={totalXP}
            />

            {/* Status Box */}
            <div
              className="mt-8 p-4 rounded-xl w-full text-center backdrop-blur-md border shadow-inner"
              style={{
                background: `${badge.color}15`,
                borderColor: `${badge.color}55`,
              }}
            >
              <div
                className="text-sm font-medium"
                style={{ color: badge.color }}
              >
                {overallPercent < 30
                  ? "🚀 Just Getting Started"
                  : overallPercent < 60
                  ? "⚡ Building Momentum"
                  : overallPercent < 90
                  ? "💪 Crushing It"
                  : "🏆 Elite Performer"}
              </div>
              <div className="text-xs opacity-70 text-[var(--text)]">
                Keep pushing forward!
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard
              title="Lessons"
              value={completedLessons}
              total={totalLessons}
              percent={lessonPercent}
              icon={<FiBook size={22} className="text-white" />}
              color="blue"
            />
            <StatCard
              title="Coding"
              value={codingXP}
              total={totalCodingXP}
              percent={codingPercent}
              icon={<FiCode size={22} className="text-white" />}
              color="green"
              unit="XP"
            />
            <StatCard
              title="Aptitude"
              value={aptitudeXP}
              total={totalAptitudeXP}
              percent={aptitudePercent}
              icon={<FiUsers size={22} className="text-white" />}
              color="orange"
              unit="XP"
            />
            <StatCard
              title="Interview"
              value={interviewXP}
              total={totalInterviewXP}
              percent={interviewPercent}
              icon={<FiTrendingUp size={22} className="text-white" />}
              color="red"
              unit="XP"
            />
          </div>
        </div>

        {/* Level Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            className="lg:col-span-2 p-6 rounded-2xl
                       bg-[var(--card-bg)]
                       border border-[var(--border)]
                       shadow-[var(--shadow-medium)]
                       backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <FiTarget size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-bold)]">
                Level Progress
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aptitudeLevels && (
                <StatsSection
                  title="Aptitude"
                  stats={aptitudeLevels}
                  color="orange"
                  icon={<FiUsers size={18} />}
                />
              )}
              {interviewLevels && (
                <StatsSection
                  title="Interview"
                  stats={interviewLevels}
                  color="red"
                  icon={<FiTrendingUp size={18} />}
                />
              )}
              {codingLevels && (
                <StatsSection
                  title="Coding"
                  stats={codingLevels}
                  color="green"
                  icon={<FiCode size={18} />}
                />
              )}
            </div>
          </div>

          {/* Streak */}
          <div
            className="p-6 rounded-2xl
                       bg-[var(--card-bg)]
                       border border-[var(--border)]
                       shadow-[var(--shadow-medium)]
                       backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
                <FiAward size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-bold)]">
                Streak & Consistency
              </h3>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <div
                  className="text-4xl font-bold 
                             bg-gradient-to-r from-amber-500 to-orange-500 
                             bg-clip-text text-transparent"
                >
                  {streakDays}
                </div>
                <div className="text-sm text-[var(--text)]/60 mt-1">
                  Current Streak Days
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text)]/60">Longest Streak</span>
                  <span className="font-semibold text-[var(--text-bold)]">
                    {longestStreak} days
                  </span>
                </div>

                <div className="h-2 bg-[var(--glass)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(streakDays / (longestStreak || 1)) * 100}%`,
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                  />
                </div>
              </div>

              <div
                className="p-4 rounded-xl 
                           bg-[var(--glass)]
                           border border-[var(--border)]
                           shadow-[var(--shadow-soft)]"
              >
                <div className="text-sm font-semibold text-[var(--text)] mb-1">
                  {streakDays > 0
                    ? "🔥 Keep the streak alive!"
                    : "Start your streak today!"}
                </div>
                <div className="text-xs text-[var(--text)]/70">
                  {streakDays > 0
                    ? `${streakDays} day${streakDays > 1 ? "s" : ""} strong!`
                    : "Complete a lesson to start your streak!"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
