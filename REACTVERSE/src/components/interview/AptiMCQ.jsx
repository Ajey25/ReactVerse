// AptiMCQ.jsx
export default function AptiMCQ({ q, selected, setSelected }) {
  return (
    <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-5">
      {/* Question */}
      <div className="mb-5">
        <p className="text-xs text-gray-400 mb-1">Question {q.questionNo}</p>

        <h2 className="text-base font-semibold leading-relaxed text-[var(--text-bold)]">
          {q.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          const isSelected = selected === opt;

          return (
            <button
              key={idx}
              onClick={() => setSelected(q.questionNo, opt)}
              className={`
                w-full flex items-center gap-3
                px-4 py-3
                rounded-lg border text-left
                transition-all duration-200
                ${
                  isSelected
                    ? "border-purple-600 bg-purple-600/15"
                    : "border-[var(--border)] hover:border-purple-500/60 hover:bg-white/5"
                }
              `}
            >
              {/* Option Circle */}
              <div
                className={`
                  w-4.5 h-4.5 rounded-full border-2
                  flex items-center justify-center shrink-0
                  ${isSelected ? "border-purple-600" : "border-gray-500"}
                `}
              >
                {isSelected && (
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                )}
              </div>

              {/* Option Text */}
              <span className="text-sm leading-snug">
                <span className="font-semibold mr-2">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {opt}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
