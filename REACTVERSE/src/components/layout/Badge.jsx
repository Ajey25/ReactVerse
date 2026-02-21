import React from "react";
import { badgeLevels, getBadge, getNextBadge } from "./BadgeLevels.jsx";

export default function Badge({ user, xp, totalXP }) {
  const safeXP = xp || 0;
  const safeTotalXP = totalXP || 1;
  const percent = (safeXP / safeTotalXP) * 100;

  const badge = getBadge(safeXP, safeTotalXP);
  const nextBadge = getNextBadge(safeXP, safeTotalXP);

  const base = badge?.percent || 0;
  const target = nextBadge?.percent || 100;

  const progress = nextBadge ? ((percent - base) / (target - base)) * 100 : 100;
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto p-3 text-center">
      {/* Avatar + XP Ring */}
      <div className="relative mb-6">
        <div
          className="absolute inset-0 rounded-full blur-lg opacity-60"
          style={{
            background: badge
              ? `radial-gradient(circle, ${badge.color}44, transparent)`
              : "radial-gradient(circle, #667eea44, transparent)",
          }}
        />

        <div
          className="relative rounded-full p-[4px]"
          style={{
            background: badge
              ? `conic-gradient(${badge.color}, ${badge.color}33)`
              : "conic-gradient(#667eea, #764ba233)",
          }}
        >
          <div className="w-30 h-30 rounded-full overflow-hidden border border-white/10 ">
            {user?.avatar ? (
              <img
                src={user?.avatar}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                alt="avatar"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* XP badge */}
          <div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-white text-xs font-bold shadow-lg"
            style={{
              background: badge
                ? `linear-gradient(135deg, ${badge.color}, ${badge.color}AA)`
                : "linear-gradient(135deg, #667eea, #764ba2)",
            }}
          >
            {safeXP} XP
          </div>
        </div>
      </div>

      {/* CURRENT BADGE */}
      {badge && (
        <div
          className="w-full p-2 py-1 rounded-lg mb-2 shadow-md flex flex-col items-center justify-center text-center"
          style={{
            background: `linear-gradient(135deg, ${badge.color}100, ${badge.color}50)`,
            border: `1px solid ${badge.color}75`,
          }}
        >
          <h3 className="text-xl font-bold" style={{ color: badge.color }}>
            {badge.label}
          </h3>
          <p className="text-xs opacity-70">{badge.description}</p>
        </div>
      )}

      {/* PROGRESSION LOGIC */}
      {nextBadge && (
        <div className="w-full space-y-1">
          {/* Next badge preview */}
          <div className="flex items-center justify-between p-2 py-1 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                style={{
                  background: nextBadge.gradient,
                  boxShadow: `0 3px 10px ${nextBadge.color}40`,
                }}
              >
                {nextBadge.icon}
              </div>
              <div>
                <div className="text-xs opacity-80">
                  Next Tier : {nextBadge.label}
                </div>
                <div
                  className="text-sm font-bold"
                  style={{ color: nextBadge.color }}
                >
                  {nextBadge.percent}% Tier
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs opacity-70 mb-1">
              <span>Progress</span>
              <span>{clampedProgress.toFixed(1)}%</span>
            </div>

            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${clampedProgress}%`,
                  background: `linear-gradient(90deg, ${badge?.color}, ${nextBadge.color})`,
                  boxShadow: `0 0 8px ${nextBadge.color}60`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {!nextBadge && (
        <div className="mt-2 text-md font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
          MAX LEVEL REACHED 🎉
        </div>
      )}
    </div>
  );
}
