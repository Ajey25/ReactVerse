// src/components/Dashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FiRefreshCw,
  FiBook,
  FiZap,
  FiUsers,
  FiTrendingUp,
  FiAward,
  FiTarget,
  FiBarChart2,
  FiClock,
} from "react-icons/fi";
import { useProgress } from "../context/ProgressContext";

const progressMessages = [
  {
    min: 0,
    max: 9,
    title: "🚀 Fresh Start!",
    text: "Every legend begins at zero. Let's roll.",
  },
  {
    min: 10,
    max: 19,
    title: "🔥 Warming Up!",
    text: "You're moving. Even 1% is better than 0%.",
  },
  {
    min: 20,
    max: 29,
    title: "✨ Nice Momentum!",
    text: "You're getting the hang of it.",
  },
  {
    min: 30,
    max: 39,
    title: "💡 Lights On!",
    text: "You're learning things most people never start.",
  },
  {
    min: 40,
    max: 49,
    title: "⚡ Halfway Approaching!",
    text: "You're doing solid work.",
  },
  {
    min: 50,
    max: 59,
    title: "💪 Halfway Done!",
    text: "50% isn't luck — it's effort. Respect.",
  },
  {
    min: 60,
    max: 69,
    title: "🚀 Power Level Rising!",
    text: "You've crossed the tough part.",
  },
  {
    min: 70,
    max: 79,
    title: "🔥 Crushing It!",
    text: "You're in the elite zone.",
  },
  {
    min: 80,
    max: 89,
    title: "🎉 Almost There!",
    text: "You're doing amazing! Just a bit more.",
  },
  {
    min: 90,
    max: 99,
    title: "🏆 Final Stretch!",
    text: "One last push and you're basically a React master.",
  },
  {
    min: 100,
    max: 100,
    title: "👑 Completed!",
    text: "You did it. Full respect — finish line crossed.",
  },
];

const StatCard = React.memo(
  ({ title, value, total, icon, color = "blue", unit = "" }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 rounded-xl bg-[var(--glass)] border border-[var(--border)]"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-[var(--text)]/60">{title}</span>
        <div
          className={`p-2 rounded-lg bg-gradient-to-br ${getGradient(
            color
          )} text-white`}
        >
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold">
        {value}
        {unit}
      </div>
      <div className="text-sm text-[var(--text)]/50">of {total} total</div>
      <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${getGradient(color)}`}
          style={{ width: `${Math.round((value / (total || 1)) * 100)}%` }}
        />
      </div>
    </motion.div>
  )
);

const ProgressRing = ({
  percent,
  size = 120,
  stroke = 8,
  color = "purple",
}) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--border)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(color)}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{Math.round(percent)}%</span>
      </div>
    </div>
  );
};

const getGradient = (color) => {
  const gradients = {
    blue: "from-blue-500 to-cyan-400",
    green: "from-green-500 to-emerald-400",
    orange: "from-orange-500 to-amber-400",
    purple: "from-purple-500 to-pink-400",
    red: "from-red-500 to-orange-400",
  };
  return gradients[color] || gradients.blue;
};

const getColor = (color) => {
  const colors = {
    blue: "#3b82f6",
    green: "#10b981",
    orange: "#f59e0b",
    purple: "#8b5cf6",
    red: "#ef4444",
  };
  return colors[color] || colors.blue;
};

export default function Dashboard() {
  const { stats, loading, refreshProgress } = useProgress();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiBook className="text-5xl mx-auto mb-3 text-gray-400" />
          <h2 className="text-xl font-bold mb-1">No Progress Data</h2>
          <p className="text-gray-500">Start learning to see your progress</p>
        </div>
      </div>
    );
  }

  const {
    completedLessons = 0,
    totalLessons = 0,
    currentXP = 0,
    totalXP = 0,
    overallPercent = 0,
    lessonPercent = 0,
    aptitudePercent = 0,
    interviewPercent = 0,
    streakDays = 0,
    longestStreak = 0,
    aptitudeXP = 0,
    totalAptitudeXP = 0,
    interviewXP = 0,
    totalInterviewXP = 0,
  } = stats;

  const xpProgress = totalXP ? Math.round((currentXP / totalXP) * 100) : 0;
  const message =
    progressMessages.find(
      (m) => overallPercent >= m.min && overallPercent <= m.max
    ) || progressMessages[0];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400">
            Learning Dashboard
          </h1>
          <p className="text-sm text-[var(--text)]/60">
            Track your progress across all modules
          </p>
        </div>
        <button
          onClick={refreshProgress}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--glass)] border border-[var(--border)] hover:bg-[var(--border)] transition-colors"
        >
          <FiRefreshCw className={loading ? "animate-spin" : ""} />
          <span className="font-medium">Refresh</span>
        </button>
      </div>

      {/* Main Progress Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Overall Progress Ring */}
        <div className="lg:col-span-1 bg-[var(--glass)] border border-[var(--border)] rounded-2xl p-6 flex flex-col items-center">
          <ProgressRing percent={overallPercent} color="purple" />
          <h3 className="mt-4 text-lg font-semibold">Overall Progress</h3>
          <p className="text-sm text-center text-[var(--text)]/60 mt-2">
            {message.text}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 w-full">
            <div className="text-center">
              <div className="text-sm text-[var(--text)]/60">Lessons</div>
              <div className="font-bold text-blue-500">{lessonPercent}%</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-[var(--text)]/60">Aptitude</div>
              <div className="font-bold text-green-500">{aptitudePercent}%</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-[var(--text)]/60">Interview</div>
              <div className="font-bold text-orange-500">
                {interviewPercent}%
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard
            title="Lessons Completed"
            value={completedLessons}
            total={totalLessons}
            icon={<FiBook />}
            color="blue"
          />
          <StatCard
            title="Total XP"
            value={currentXP}
            total={totalXP}
            icon={<FiZap />}
            color="green"
            unit=" XP"
          />
          <StatCard
            title="Aptitude XP"
            value={aptitudeXP}
            total={totalAptitudeXP}
            icon={<FiUsers />}
            color="orange"
            unit=" XP"
          />
          <StatCard
            title="Interview XP"
            value={interviewXP}
            total={totalInterviewXP}
            icon={<FiTrendingUp />}
            color="red"
            unit=" XP"
          />
        </div>
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Streak & Motivation */}
        <div className="bg-[var(--glass)] border border-[var(--border)] rounded-2xl p-5">
          <h3 className="text-lg font-semibold mb-4">Streak & Motivation</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-orange-500/10 to-rose-500/10">
              <div>
                <div className="text-sm text-[var(--text)]/60">
                  Current Streak
                </div>
                <div className="text-2xl font-bold">{streakDays} days</div>
              </div>
              <FiAward className="text-3xl text-orange-500" />
            </div>
            <div className="text-sm">
              <div className="flex justify-between mb-1">
                <span>Longest Streak</span>
                <span className="font-semibold">{longestStreak} days</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-rose-500"
                  style={{
                    width: `${Math.min(
                      (streakDays / (longestStreak || 1)) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-600/10 to-cyan-400/10">
              <div className="font-semibold text-sm mb-1">{message.title}</div>
              <div className="text-xs text-[var(--text)]/60">
                {message.text}
              </div>
            </div>
          </div>
        </div>

        {/* XP Breakdown */}
        <div className="bg-[var(--glass)] border border-[var(--border)] rounded-2xl p-5">
          <h3 className="text-lg font-semibold mb-4">XP Breakdown</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text)]/60">Lesson XP</span>
                <span className="font-semibold">
                  {stats.lessonXP || 0} / {stats.totalLessonXP || 0}
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  style={{ width: `${lessonPercent}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text)]/60">Aptitude XP</span>
                <span className="font-semibold">
                  {aptitudeXP} / {totalAptitudeXP}
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                  style={{ width: `${aptitudePercent}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text)]/60">Interview XP</span>
                <span className="font-semibold">
                  {interviewXP} / {totalInterviewXP}
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400"
                  style={{ width: `${interviewPercent}%` }}
                />
              </div>
            </div>
            <div className="pt-4 border-t border-[var(--border)]">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text)]/60">
                  Overall XP Progress
                </span>
                <span className="font-semibold">{xpProgress}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-400"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
