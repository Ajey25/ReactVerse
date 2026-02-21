// AnswerPopup.jsx
import { useState } from "react";
import { X, AlertTriangle, Eye } from "lucide-react";

export default function AnswerPopup({ answer, onClose }) {
  const [showWarning, setShowWarning] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setShowWarning(false);
    setConfirmed(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0, 0, 0, 0.7)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-lg shadow-2xl max-h-[90vh] overflow-hidden"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{
            background: "var(--answer-bg)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center gap-2">
            <Eye size={20} style={{ color: "var(--text-bold)" }} />
            <h2
              className="text-xl font-bold"
              style={{ color: "var(--text-bold)" }}
            >
              Expected Solution
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full transition-colors hover:bg-opacity-80"
            style={{
              background: "var(--tag-bg)",
              color: "var(--text)",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-8rem)] custom-scrollbar">
          {showWarning ? (
            // Warning Screen
            <div className="p-8 text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "2px solid #ef4444",
                }}
              >
                <AlertTriangle size={32} color="#ef4444" />
              </div>

              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-bold)" }}
              >
                ⚠️ Wait! Before You Continue...
              </h3>

              <div
                className="text-left max-w-md mx-auto space-y-4 mb-6"
                style={{ color: "var(--answer-text)" }}
              >
                <p className="text-base">
                  <strong style={{ color: "var(--text-bold)" }}>
                    Viewing the solution won't help you learn effectively.
                  </strong>
                </p>

                <p>Consider trying these first:</p>

                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Review the requirements and hints carefully</li>
                  <li>Break down the problem into smaller steps</li>
                  <li>Check the console for error messages</li>
                  <li>Try running the tests to see what's failing</li>
                  <li>Search for similar examples online</li>
                </ul>

                <div
                  className="p-4 rounded-lg mt-6"
                  style={{
                    background: "var(--answer-bg)",
                    border: "1px solid var(--answer-border)",
                  }}
                >
                  <p className="text-sm" style={{ color: "var(--tag-text)" }}>
                    💡 <strong>Pro Tip:</strong> The struggle is where real
                    learning happens. Give yourself time to think and
                    experiment!
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg font-medium transition-all"
                  style={{
                    background: "var(--success)",
                    color: "var(--success-text)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = "0.9";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = "1";
                  }}
                >
                  I'll Try Again
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-6 py-3 rounded-lg font-medium transition-all"
                  style={{
                    background: "var(--tag-bg)",
                    color: "var(--text)",
                    border: "1px solid var(--tag-border)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "var(--tag-bg-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "var(--tag-bg)";
                  }}
                >
                  Show Solution Anyway
                </button>
              </div>
            </div>
          ) : (
            // Solution Screen
            <div className="p-6">
              <div
                className="mb-4 p-3 rounded-lg"
                style={{
                  background: "rgba(34, 197, 94, 0.1)",
                  border: "1px solid var(--success)",
                }}
              >
                <p className="text-sm" style={{ color: "var(--success)" }}>
                  ✓ Here's the expected solution. Try to understand each part
                  before copying it.
                </p>
              </div>

              <div
                className="rounded-lg overflow-hidden"
                style={{
                  background: "var(--answer-bg)",
                  border: "1px solid var(--answer-border)",
                }}
              >
                <div
                  className="px-4 py-2 text-sm font-semibold border-b"
                  style={{
                    background: "var(--tag-bg)",
                    color: "var(--text-bold)",
                    borderColor: "var(--border)",
                  }}
                >
                  solution.jsx
                </div>
                <pre
                  className="p-4 overflow-x-auto text-sm"
                  style={{
                    color: "var(--text)",
                    fontFamily: "'Fira Code', 'Consolas', monospace",
                  }}
                >
                  <code>{answer}</code>
                </pre>
              </div>

              <div
                className="mt-4 p-4 rounded-lg"
                style={{
                  background: "var(--answer-bg)",
                  border: "1px solid var(--answer-border)",
                }}
              >
                <p className="text-sm" style={{ color: "var(--tag-text)" }}>
                  <strong style={{ color: "var(--text-bold)" }}>
                    What to do next:
                  </strong>
                  <br />
                  Study this solution, understand the logic, then try to
                  implement it yourself from scratch. Don't just copy-paste!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {confirmed && (
          <div
            className="px-6 py-4 border-t flex justify-end"
            style={{
              background: "var(--answer-bg)",
              borderColor: "var(--border)",
            }}
          >
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg font-medium transition-all"
              style={{
                background: "var(--success)",
                color: "var(--success-text)",
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = "1";
              }}
            >
              Got It!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
