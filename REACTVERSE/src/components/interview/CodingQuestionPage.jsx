import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import useSandboxRunner from "../../hooks/useSandboxRunner";
import axios from "axios";
import { useProgress } from "../../context/ProgressContext";
import toast from "react-hot-toast";
import Commet from "react-loading-indicators/Commet";
import AnswerPopup from "./AnswerPopup"; // ✅ Import the popup
import { Eye } from "lucide-react"; // ✅ Import icon

export default function CodingQuestionPage() {
  const { levelId } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("");
  const [testResults, setTestResults] = useState([]);
  const [running, setRunning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showAnswerPopup, setShowAnswerPopup] = useState(false); // ✅ Popup state

  const { refreshProgress } = useProgress();
  const { run } = useSandboxRunner();

  useEffect(() => {
    async function fetchQuestion() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/api/coding/${levelId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch question");
        }
        const data = await res.json();
        setQuestion(data);
        setCode(data.starterCode || "");
        setTestResults([]);
        setSubmitted(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestion();
  }, [levelId, BASE_URL]);

  const extractComponentName = (code) => {
    const match = code.match(/function\s+(\w+)\s*\(/);
    return match ? match[1] : "Counter";
  };

  async function runTests() {
    setRunning(true);
    setTestResults([]);
    try {
      const componentName = extractComponentName(code);
      const results = await run(code, question.tests, componentName);
      if (results && Array.isArray(results)) {
        setTestResults(results);
      } else {
        throw new Error("No results returned from test runner");
      }
    } catch (error) {
      console.error("Run tests error:", error);
      setTestResults([
        {
          id: 0,
          desc: "Test execution failed",
          pass: false,
          error:
            error.message ||
            "Could not run tests. Please check your code syntax.",
        },
      ]);
    } finally {
      setRunning(false);
    }
  }

  const submitSolution = async () => {
    if (!allPassed) return;

    const questionId = Number(levelId);
    const xpMap = {
      1: 20,
      2: 30,
      3: 50,
    };
    const xp = xpMap[questionId] || 20;

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/codingprogress`, {
        userId,
        questionId,
        xp,
      });
      console.log("Submitted:", res.data);
      toast.success("Solution submitted! ✨");
      setSubmitted(true);
      refreshProgress();
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data?.message === "Already submitted") {
        toast.error(
          "You've already submitted this question. No XP this time 😄",
        );
        setSubmitted(true);
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const allPassed = testResults.length > 0 && testResults.every((t) => t.pass);
  const passedCount = testResults.filter((t) => t.pass).length;

  if (loading && !question) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <Commet color="#60a5fa" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-4"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="rounded-lg p-4 sm:p-6 mb-4"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          {/* TOP BADGES */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
            <span
              className="px-3 py-1 rounded-full text-xs sm:text-sm"
              style={{
                background: "var(--success)",
                color: "var(--success-text)",
              }}
            >
              Level {levelId}
            </span>

            {allPassed && (
              <span
                className="px-3 py-1 rounded-full text-xs sm:text-sm"
                style={{
                  background: "var(--success)",
                  color: "var(--success-text)",
                }}
              >
                ✓ All Tests Passed
              </span>
            )}

            {submitted && (
              <span
                className="px-3 py-1 rounded-full text-xs sm:text-sm"
                style={{
                  background: "#f59e0b",
                  color: "#ffffff",
                }}
              >
                ✨ Submitted
              </span>
            )}
          </div>

          {/* TITLE */}
          <h1
            className="text-xl sm:text-3xl font-bold mb-3 sm:mb-4 leading-tight"
            style={{ color: "var(--text-bold)" }}
          >
            {question?.title}
          </h1>

          {/* DESCRIPTION */}
          <p
            className="mb-4 text-sm sm:text-base leading-relaxed"
            style={{ color: "var(--answer-text)" }}
          >
            {question?.description}
          </p>

          {/* HINT */}
          {question?.hints && (
            <div
              className="rounded p-3 sm:p-4 mb-4"
              style={{
                background: "var(--answer-bg)",
                border: "1px solid var(--answer-border)",
              }}
            >
              <strong
                className="block mb-1 text-sm sm:text-base"
                style={{ color: "var(--text-bold)" }}
              >
                💡 Hint:
              </strong>
              <span
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: "var(--answer-text)" }}
              >
                {question.hints}
              </span>
            </div>
          )}

          {/* REQUIREMENTS */}
          {question?.requirements && question.requirements.length > 0 && (
            <div
              className="rounded p-3 sm:p-4"
              style={{
                background: "var(--answer-bg)",
                border: "1px solid var(--answer-border)",
              }}
            >
              <h3
                className="font-semibold mb-2 text-sm sm:text-base"
                style={{ color: "var(--text-bold)" }}
              >
                Requirements
              </h3>

              <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                {question.requirements.map((req, idx) => (
                  <li key={idx} style={{ color: "var(--answer-text)" }}>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Pass Summary */}
        {testResults.length > 0 && (
          <div
            className="p-4 rounded-lg mb-4"
            style={{
              background: allPassed
                ? "rgba(34, 197, 94, 0.1)"
                : "rgba(239, 68, 68, 0.1)",
              border: allPassed
                ? "1px solid var(--success)"
                : "1px solid #ef4444",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div
              className="text-2xl font-bold"
              style={{
                color: allPassed ? "var(--success)" : "#ef4444",
              }}
            >
              {passedCount}/{testResults.length} Passed
            </div>
          </div>
        )}

        {/* Editor Section */}
        <div
          className="rounded-lg overflow-hidden mb-4"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            boxShadow: "var(--shadow-medium)",
          }}
        >
          {/* HEADER */}
          <div
            className="px-3 sm:px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            style={{
              background: "var(--answer-bg)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span
                className="text-sm truncate"
                style={{ color: "var(--text)" }}
              >
                solution.jsx
              </span>
            </div>

            {/* RIGHT SIDE BUTTONS */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {/* View Answer */}
              <button
                onClick={() => setShowAnswerPopup(true)}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded text-sm font-medium flex items-center justify-center gap-2 border transition"
                style={{
                  background: "var(--tag-bg)",
                  color: "var(--text)",
                  borderColor: "var(--tag-border)",
                }}
              >
                <Eye size={16} />
                View
              </button>

              {/* Run Tests */}
              <button
                onClick={runTests}
                disabled={running}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded text-sm font-medium transition"
                style={{
                  background: running ? "var(--button-disabled)" : "#3b82f6",
                  color: running ? "var(--button-disabled-text)" : "#ffffff",
                  opacity: running ? 0.6 : 1,
                }}
              >
                {running ? "Running..." : "▶ Run"}
              </button>

              {/* Submit */}
              <button
                onClick={submitSolution}
                disabled={!allPassed || submitted || loading}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded text-sm font-medium transition"
                style={{
                  background:
                    !allPassed || submitted || loading
                      ? "var(--button-disabled)"
                      : "var(--success)",
                  color:
                    !allPassed || submitted || loading
                      ? "var(--button-disabled-text)"
                      : "var(--success-text)",
                  opacity: !allPassed || submitted || loading ? 0.6 : 1,
                }}
              >
                ✓ Submit
              </button>
            </div>
          </div>

          {/* EDITOR */}
          <div className="h-[60vh] sm:h-96">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={(v) => setCode(v)}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                lineHeight: 20,
                fontFamily: "'Fira Code', 'Consolas', monospace",
                padding: { top: 12, bottom: 12 },
                scrollBeyondLastLine: false,
                renderLineHighlight: "all",
                cursorBlinking: "smooth",
                wordWrap: "on",
                wrappingIndent: "indent",
              }}
            />
          </div>
        </div>

        {/* Tests and Preview - Same as before */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tests Panel */}
          <div
            className="rounded-lg overflow-hidden"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div
              className="px-4 py-2 font-semibold"
              style={{
                background: "var(--answer-bg)",
                color: "var(--text-bold)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              Test Cases
            </div>
            <div
              className="p-4 space-y-3 max-h-96 overflow-y-auto"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "var(--scrollbar-thumb) var(--scrollbar-track)",
              }}
            >
              {testResults.length === 0 ? (
                <div
                  className="text-center py-8"
                  style={{ color: "var(--tag-text)" }}
                >
                  Click "Run Tests" to see results
                </div>
              ) : (
                testResults.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded"
                    style={{
                      background: t.pass
                        ? "rgba(34, 197, 94, 0.1)"
                        : "rgba(239, 68, 68, 0.1)",
                      border: t.pass
                        ? "1px solid var(--success)"
                        : "1px solid #ef4444",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{
                          background: t.pass ? "var(--success)" : "#ef4444",
                          color: "#ffffff",
                        }}
                      >
                        {t.pass ? "✓" : "✕"}
                      </div>
                      <div className="flex-1">
                        <div
                          className="font-semibold"
                          style={{ color: "var(--text-bold)" }}
                        >
                          Test {idx + 1}
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: "var(--answer-text)" }}
                        >
                          {t.desc}
                        </div>
                        {!t.pass && t.error && (
                          <div
                            className="mt-2 p-2 rounded text-xs font-mono"
                            style={{
                              background: "var(--answer-bg)",
                              color: "#ef4444",
                              border: "1px solid var(--border)",
                            }}
                          >
                            {t.error}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div
            className="rounded-lg overflow-hidden"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div
              className="px-4 py-2 font-semibold"
              style={{
                background: "var(--answer-bg)",
                color: "var(--text-bold)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              Live Preview
            </div>
            <div>
              <iframe
                title="preview"
                className="w-full h-96 border-0"
                srcDoc={`
                <html>
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>${question?.styles || ""}</style>
                  </head>
                  <body style="margin: 0; padding: 12px; overflow: auto;">
                    <div id="root"></div>
                    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
                    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
                    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
                    <script type="text/babel">
                      const { useState } = React;
                      ${code
                        .replace(/import\s+.*?from\s+['"].*?['"];?/g, "")
                        .replace(/export\s+default\s+/g, "")
                        .replace(/export\s+(?!default)[a-zA-Z]+/g, "")}
                      const root = ReactDOM.createRoot(document.getElementById('root'));
                      const Component = ${extractComponentName(code)};
                      root.render(<Component />);
                    </script>
                  </body>
                </html>
              `}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Answer Popup */}
      {showAnswerPopup && (
        <AnswerPopup
          answer={question?.answer || "// No solution available"}
          onClose={() => setShowAnswerPopup(false)}
        />
      )}
    </div>
  );
}
