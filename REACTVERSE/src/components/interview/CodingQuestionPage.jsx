import { useParams } from "react-router-dom";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { codingQuestions } from "../../data/codingQuestions";
import useSandboxRunner from "../../hooks/useSandboxRunner";

export default function CodingQuestionPage() {
  const { levelId } = useParams();
  const question = codingQuestions[levelId];

  const [code, setCode] = useState(question.starterCode);
  const [testResults, setTestResults] = useState([]);
  const [running, setRunning] = useState(false);

  const { run } = useSandboxRunner();

  async function runTests() {
    setRunning(true);

    const results = await run(code, question.tests);
    if (!Array.isArray(results)) {
      setTestResults([]);
      setRunning(false);
      return;
    }
    setTestResults(results);

    setRunning(false);
  }

  const allPassed = testResults.length > 0 && testResults.every((t) => t.pass);
  const passedCount = testResults.filter((t) => t.pass).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* QUESTION HEADER */}
        <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30">
                  Level {levelId}
                </span>
                {allPassed && (
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs font-semibold rounded-full border border-green-500/30 animate-pulse">
                    ✓ All Tests Passed
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {question.title}
              </h1>
              <p className="text-slate-300 text-base leading-relaxed">
                {question.description}
              </p>
              <p>{question.hints}</p>
            </div>
            {testResults.length > 0 && (
              <div className="flex flex-col items-center justify-center bg-slate-800/50 rounded-xl p-4 min-w-[100px] border border-slate-700">
                <div className="text-4xl font-bold text-white mb-1">
                  {passedCount}/{testResults.length}
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">
                  Passed
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CODE EDITOR */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-800/80 px-5 py-3 border-b border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="ml-3 text-sm font-medium text-slate-300">
                solution.jsx
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={runTests}
                disabled={running}
                className={`
                  px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200
                  ${
                    running
                      ? "bg-indigo-600/50 text-indigo-200 cursor-wait"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                  }
                `}
              >
                {running ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Running...
                  </span>
                ) : (
                  "▶ Run Tests"
                )}
              </button>
              <button
                disabled={!allPassed}
                className={`
                  px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200
                  ${
                    allPassed
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
                      : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                  }
                `}
              >
                ✓ Submit Solution
              </button>
            </div>
          </div>
          <div className="p-4">
            <Editor
              height="60vh"
              theme="vs-dark"
              defaultLanguage="javascript"
              value={code}
              onChange={(v) => setCode(v)}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineHeight: 22,
                fontFamily: "'Fira Code', 'Consolas', monospace",
                padding: { top: 16, bottom: 16 },
                scrollBeyondLastLine: false,
                renderLineHighlight: "all",
                cursorBlinking: "smooth",
              }}
            />
          </div>
        </div>

        {/* TESTS AND OUTPUT */}
        <div className="grid grid-cols-2 gap-6">
          {/* TESTS PANEL */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-slate-800/80 px-5 py-3 border-b border-slate-700/50">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                Test Cases
              </h2>
            </div>

            <div className="p-5 max-h-96 overflow-y-auto">
              {testResults.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <svg
                    className="w-16 h-16 text-slate-600 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-slate-400 text-sm">
                    Click "Run Tests" to see results
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {testResults.map((t, idx) => (
                    <div
                      key={t.id}
                      className={`
                        p-4 rounded-xl border transition-all duration-200
                        ${
                          t.pass
                            ? "bg-green-500/10 border-green-500/30 hover:bg-green-500/15"
                            : "bg-red-500/10 border-red-500/30 hover:bg-red-500/15"
                        }
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`
                          flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs
                          ${
                            t.pass
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }
                        `}
                        >
                          {t.pass ? "✓" : "✕"}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white mb-1">
                            Test {idx + 1}
                          </div>
                          <div
                            className={`text-sm ${
                              t.pass ? "text-green-200" : "text-red-200"
                            }`}
                          >
                            {t.desc}
                          </div>
                          {!t.pass && t.error && (
                            <div className="mt-2 text-xs text-red-300 bg-red-950/30 p-2 rounded border border-red-800/30">
                              {t.error}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* OUTPUT PANEL */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-slate-800/80 px-5 py-3 border-b border-slate-700/50">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Live Preview
              </h2>
            </div>

            <div className="p-5 h-96">
              <iframe
                id="preview"
                title="output"
                sandbox="allow-scripts"
                className="w-full h-full rounded-xl bg-white shadow-inner"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
