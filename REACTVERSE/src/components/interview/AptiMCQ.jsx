import { motion } from "framer-motion";

export default function AptiMCQ({ q, index, selected, setSelected }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-[var(--card-bg)] border border-[var(--card-border)]
      rounded-2xl p-4 transition-all duration-300 hover:shadow-xl
      hover:border-[var(--card-border-hover)]"
    >
      {/* QUESTION NUMBER & TEXT */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-8 h-8 rounded-lg bg-purple-500/10 
          border border-purple-500/20 flex items-center 
          justify-center text-purple-400 text-sm font-bold"
        >
          {q.questionNo}
        </div>
        <h2 className="text-lg font-semibold text-[var(--text-bold)]">
          {q.question}
        </h2>
      </div>

      {/* OPTIONS */}
      <div className="space-y-2">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(q.questionNo, opt)}
            className={`p-3 w-full rounded-lg border text-left transition-all
              ${
                selected === opt
                  ? "border-purple-500 bg-purple-500/20 text-purple-300"
                  : "border-[var(--border)] hover:border-purple-500/50"
              }`}
          >
            <span className="font-medium mr-3">
              {String.fromCharCode(65 + idx)}.
            </span>
            {opt}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
