import React from "react";
import { SectionTitle } from "./ModelPreview";
import {
  badgeLevels,
  getBadge,
  getNextBadge,
} from "../components/layout/BadgeLevels";
import { FiTrendingUp, FiAward } from "react-icons/fi";

export function ProfilePreview() {
  const xp = 1200;
  const totalXP = 1600;

  const percent = (xp / totalXP) * 100;
  const badge = getBadge(xp, totalXP);
  const nextBadge = getNextBadge(xp, totalXP);

  const base = badge?.percent || 0;
  const target = nextBadge?.percent || 100;
  const progress = nextBadge ? ((percent - base) / (target - base)) * 100 : 100;
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  const journeyBadges = [...badgeLevels];

  return (
    <section
      id="profile"
      className="relative z-20 py-2 bg-gradient-to-b from-black/30 to-black/20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          title="Your Progress & Profile"
          subtitle="Track your XP and see your badge journey unfold."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8">
          {/* LEFT — PROFILE */}
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-8 flex flex-col">
            <div>
              <div className="text-white text-xl font-semibold">
                User Profile
              </div>
              <div className="text-gray-300 text-sm mt-1 flex items-center gap-2">
                <FiTrendingUp className="text-blue-400" />
                {xp.toLocaleString()} XP
              </div>
            </div>
            {/* LEVEL TAG */}
            {/* LEVEL / RANK BADGE */}
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-4 ">
              {/* Award Icon */}

              {/* Rank + Level */}
              <div className="flex flex-col leading-tight text-center">
                <span className=" text-white text-xl font-semibold">
                  Beginner
                </span>
                <div className="text-gray-300 text-sm mt-1 flex items-center gap-2">
                  <FiAward className="w-4 h-4" style={{ color: badge.color }} />
                  Level {badge.level}{" "}
                </div>
                <span className="text-xs opacity-80 text-white flex gap-2"></span>
              </div>
            </div>

            <div className="relative flex justify-center my-4">
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-70"
                style={{
                  background: `radial-gradient(circle, ${badge.color}55, transparent)`,
                }}
              />
              <div
                className="relative p-[5px] rounded-full"
                style={{
                  background: `conic-gradient(${badge.color}, ${badge.color}44)`,
                }}
              >
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  Avatar
                </div>
              </div>
            </div>

            <div
              className="p-4 rounded-2xl text-center"
              style={{
                background: `linear-gradient(135deg, ${badge.color}35, ${badge.color}10)`,
                border: `1px solid ${badge.color}55`,
              }}
            >
              <div
                className="text-2xl font-bold"
                style={{ color: badge.color }}
              >
                {badge.label}
              </div>
              <div className="text-xs opacity-80">{badge.description}</div>
            </div>

            {nextBadge && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-300 mb-2">
                  <span>Next: {nextBadge.label}</span>
                  <span>{50}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${50}%`,
                      background: `linear-gradient(90deg, ${badge.color}, ${nextBadge.color})`,
                      boxShadow: `0 0 14px ${nextBadge.color}88`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — JOURNEY */}
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-8">
            <div className="text-white font-semibold text-lg mb-22 text-left">
              Badge Journey
            </div>

            {/* JOURNEY WRAPPER */}
            <div className="relative w-full">
              {/* PATH LINE */}
              <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-[2px] bg-white/20" />

              {/* DOTS ON PATH */}
              <div className="absolute left-5 right-5 top-1/2 -translate-y-1/2 flex justify-between px-4">
                {journeyBadges.map((b) => (
                  <div
                    key={`dot-${b.level}`}
                    className="w-3 h-3 rounded-full bg-white/60"
                  />
                ))}
              </div>

              {/* BADGES (OFFSET FROM PATH) */}
              <div className="relative flex justify-between px-4">
                {journeyBadges.map((b, idx) => {
                  const active = b.level <= badge.level;
                  const labelOnTop = idx % 2 === 0;

                  return (
                    <div
                      key={b.level}
                      className={`flex flex-col items-center ${
                        labelOnTop ? "-translate-y-16" : "translate-y-16"
                      }`}
                    >
                      {/* BADGE NODE */}
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center border text-lg
                ${active ? "shadow-lg" : "opacity-40 grayscale"}`}
                        style={{
                          background: active
                            ? `linear-gradient(135deg, ${b.color}, ${b.color}99)`
                            : "rgba(255,255,255,0.08)",
                          borderColor: active
                            ? `${b.color}88`
                            : "rgba(255,255,255,0.15)",
                          boxShadow: active ? `0 0 20px ${b.color}66` : "none",
                        }}
                      >
                        {b.icon}
                      </div>

                      {/* LABEL */}
                      <div className="mt-2 text-center">
                        <div
                          className={`text-sm font-semibold ${
                            active ? "text-white" : "text-gray-400"
                          }`}
                        >
                          {b.label}
                        </div>
                        <div className="text-xs text-gray-400">
                          {b.percent}% XP
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-20 bg-purple-600/20 border border-purple-500/30 rounded-xl p-3 text-sm text-gray-200 text-center">
              Progress from Bronze to Diamond as you gain XP.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
