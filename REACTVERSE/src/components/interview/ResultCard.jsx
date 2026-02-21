// ResultCard.jsx
import {
  Trophy,
  CheckCircle,
  XCircle,
  BarChart3,
  Target,
  RotateCcw,
  Zap,
} from "lucide-react";

export default function ResultCard({ result, levelId, onBack }) {
  const { summary } = result;
  const scorePercentage = Math.round((summary.correct / summary.total) * 100);

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] shadow-lg p-5">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-bold)]">
            Test Result
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            Aptitude · Level {levelId}
          </p>
        </div>

        <div className="p-2.5 rounded-lg bg-[var(--muted-bg)]">
          <Trophy size={22} className="text-yellow-500" />
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-5 grid-rows-2 gap-3 mb-6">
        {/* Overall Score */}
        <div className="row-start-1 row-end-3 col-start-1 col-end-3 border border-[var(--border)] rounded-xl p-5 flex flex-col justify-center text-center bg-[var(--muted-bg)]">
          <p className="text-xs text-[var(--text-muted)]">Overall Score</p>
          <p className="text-4xl font-bold text-[var(--text-bold)] my-1.5">
            {scorePercentage}%
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            {summary.correct} / {summary.total} correct
          </p>
        </div>

        <Stat
          className="row-start-1 col-start-3 col-end-4"
          icon={<CheckCircle size={18} className="text-green-500" />}
          label="Correct"
          value={summary.correct}
        />
        <Stat
          className="row-start-1 col-start-4 col-end-5"
          icon={<XCircle size={18} className="text-red-500" />}
          label="Wrong"
          value={summary.wrong}
        />
        <Stat
          className="row-start-1 col-start-5 col-end-6"
          icon={<BarChart3 size={18} className="text-blue-500" />}
          label="Total"
          value={summary.total}
        />
        <Stat
          className="row-start-2 col-start-3 col-end-4"
          icon={<Zap size={18} className="text-yellow-500" />}
          label="XP"
          value={summary.earnedXP}
        />
        <Stat
          className="row-start-2 col-start-4 col-end-5"
          icon={<Target size={18} className="text-purple-500" />}
          label="Best Score"
          value={`${Math.round((summary.bestScore / summary.total) * 100)}%`}
        />
        <Stat
          className="row-start-2 col-start-5 col-end-6"
          icon={<RotateCcw size={18} className="text-gray-400" />}
          label="Attempts"
          value={summary.attempts}
        />
      </div>

      {/* PERFORMANCE TIPS */}
      <div className="border-t border-[var(--border)] pt-4 mb-5">
        <h4 className="text-sm font-semibold text-[var(--text-bold)] mb-2">
          Performance Tips
        </h4>

        <ul className="space-y-1.5 text-sm text-[var(--text-muted)]">
          <li>
            • Accuracy: {scorePercentage}% —{" "}
            {scorePercentage >= 80
              ? "Good consistency."
              : "Reduce careless mistakes."}
          </li>
          <li>• Improve time management while keeping accuracy.</li>
          <li>• Review incorrect questions for improvement.</li>
        </ul>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-2.5 rounded-lg bg-[var(--primary)] text-[var(--on-primary)] font-semibold"
        >
          Back to Levels
        </button>

        <button
          onClick={() => window.location.reload()}
          className="flex-1 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-muted)] font-semibold hover:bg-[var(--muted-bg)]"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

/* ---------- STAT BOX ---------- */

function Stat({ icon, label, value, className }) {
  return (
    <div
      className={`${className} border border-[var(--border)] rounded-lg p-3 flex items-center gap-2.5 bg-[var(--muted-bg)]`}
    >
      {icon}
      <div>
        <p className="text-xs text-[var(--text-muted)]">{label}</p>
        <p className="text-base font-semibold text-[var(--text-bold)]">
          {value}
        </p>
      </div>
    </div>
  );
}
