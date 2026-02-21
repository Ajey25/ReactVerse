import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCode } from "react-icons/fi";

export default function LessonCodeBlock({ codeBlocks }) {
  if (!codeBlocks || codeBlocks.length === 0) return null;

  // Detect theme from HTML root (same as your global theme system)
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
        <FiCode className="text-purple-400" /> Code Examples
      </h2>

      <div className="space-y-4">
        {codeBlocks.map((b, i) => (
          <div
            key={i}
            className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--card-bg)]"
          >
            {/* Header */}
            <div className="px-4 py-2 border-b border-[var(--border)] text-sm text-[var(--text-bold)]">
              {b.language}
            </div>

            {/* 🔥 THEME-AWARE HIGHLIGHTER */}
            <SyntaxHighlighter
              language={b.language}
              style={isDark ? vscDarkPlus : prism}
              customStyle={{
                margin: 0,
                background: "transparent",
                padding: "1.5rem",
                fontSize: "1rem",
                color: "var(--text)", // matches your theme text
              }}
            >
              {b.code}
            </SyntaxHighlighter>
          </div>
        ))}
      </div>
    </div>
  );
}
