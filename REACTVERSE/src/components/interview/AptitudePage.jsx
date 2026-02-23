// AptitudePage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AptiMCQ from "./AptiMCQ";
import { useProgress } from "../../context/ProgressContext";
import toast from "react-hot-toast";
import Commet from "react-loading-indicators/Commet";
import ResultCard from "./ResultCard";

export default function AptitudePage() {
  const { refreshProgress } = useProgress();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { levelId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // CBT navigation
  const [currentQ, setCurrentQ] = useState(0);
  const activeQuestion = questions[currentQ];

  // ✅ enable submit only if all questions answered
  const allAnswered =
    questions.length > 0 && Object.keys(answers).length === questions.length;

  const fetchAptiQuestions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/apti/level/${levelId}`);
      const data = await res.json();

      if (data.success) {
        setQuestions(data.questions);
        setCurrentQ(0);
        setAnswers({});
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load questions ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAptiQuestions();
  }, [levelId]);

  const handleSelect = (qNo, option) => {
    setAnswers((prev) => ({ ...prev, [qNo]: option }));
  };

  const submitTest = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;
      if (!userId) return;

      const formatted = Object.keys(answers).map((q) => ({
        questionNo: Number(q),
        selected: answers[q],
      }));

      const res = await fetch(`${BASE_URL}/api/apti-progress/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          level: Number(levelId),
          answers: formatted,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setResult(data);
        refreshProgress();
        toast.success("Test submitted 🎉");
      } else {
        toast.error("Submission failed ❌");
      }
    } catch {
      toast.error("Something went wrong ❌");
    }
  };

  // 🔥 RESULT SCREEN
  if (result) {
    return (
      <div className=" flex items-center justify-center p-6">
        <ResultCard
          result={result}
          levelId={levelId}
          onBack={() => navigate("/interview/aptitude")}
        />
      </div>
    );
  }

  // 🔄 LOADER
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0f172a]">
        <Commet color="blue" size="medium" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-lg sm:text-2xl font-bold leading-tight">
          Aptitude Test – Level {levelId}
        </h1>

        <button
          onClick={submitTest}
          disabled={!allAnswered}
          className={`
          w-full sm:w-auto
          py-3 sm:py-2
          px-6 sm:px-10
          rounded-xl font-semibold
          transition-all duration-300
          text-sm sm:text-base
          ${
            allAnswered
              ? "bg-green-600 hover:bg-green-700 text-white shadow-lg active:scale-95"
              : "bg-green-600/30 text-white/60 cursor-not-allowed"
          }
        `}
        >
          🚀 Complete Test
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* QUESTION AREA */}
        <div className="lg:col-span-3 w-full">
          {activeQuestion && (
            <div className="rounded-xl p-4 sm:p-6 bg-[var(--card-bg)] min-h-[220px]">
              <AptiMCQ
                q={activeQuestion}
                selected={answers[activeQuestion.questionNo]}
                setSelected={handleSelect}
              />
            </div>
          )}

          {/* NAVIGATION */}
          <div className="flex flex-col sm:flex-row justify-between mt-4 gap-3">
            <button
              disabled={currentQ === 0}
              onClick={() => setCurrentQ((q) => q - 1)}
              className="w-full sm:w-auto px-4 py-3 rounded-lg border text-sm disabled:opacity-40"
            >
              ⬅ Previous
            </button>

            <button
              disabled={currentQ === questions.length - 1}
              onClick={() => setCurrentQ((q) => q + 1)}
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm bg-purple-600 text-white disabled:opacity-40 active:scale-95"
            >
              Save & Next ➡
            </button>
          </div>
        </div>

        {/* QUESTION PALETTE */}
        <div className="border rounded-xl p-4 bg-[var(--card-bg)]">
          <h3 className="font-semibold mb-3 text-base">Questions</h3>

          {/* 5 QUESTIONS PER ROW */}
          <div className="grid grid-cols-5 gap-1.5">
            {questions.map((q, idx) => {
              const attempted = answers[q.questionNo];
              const isActive = idx === currentQ;

              return (
                <button
                  key={q._id}
                  onClick={() => setCurrentQ(idx)}
                  className={`
                  w-11 h-11
                  rounded-md
                  text-sm font-bold
                  transition-colors
                  ${
                    isActive
                      ? "bg-[var(--primary,#3b82f6)] text-white"
                      : attempted
                        ? "bg-[var(--success,#22c55e)] text-white"
                        : "bg-[var(--muted-bg,#e5e7eb)] text-[var(--text-muted,#6b7280)] border border-[var(--border)]"
                  }
                `}
                >
                  {q.questionNo}
                </button>
              );
            })}
          </div>

          <div className="mt-4 text-xs sm:text-sm opacity-80 space-y-1">
            <p>🔵 Current</p>
            <p>🟢 Attempted</p>
            <p>⚪ Not Attempted</p>
          </div>
        </div>
      </div>
    </div>
  );
}
