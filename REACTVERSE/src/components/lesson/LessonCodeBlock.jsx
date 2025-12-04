import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCode } from "react-icons/fi";

export default function LessonCodeBlock({ codeBlocks }) {
  if (!codeBlocks || codeBlocks.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
        <FiCode className="text-purple-400" /> Code Examples
      </h2>

      <div className="space-y-4">
        {codeBlocks.map((b, i) => (
          <div
            key={i}
            className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--glass)]"
          >
            <div className="px-4 py-2 border-b border-[var(--border)] text-sm text-gray-300">
              {b.language}
            </div>

            <SyntaxHighlighter
              language={b.language}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                background: "transparent",
                padding: "1.5rem",
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
