// AptitudePage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AptiMCQ from "./AptiMCQ";
import { useProgress } from "../../context/ProgressContext";

export default function AptitudePage() {
  const { refreshProgress } = useProgress();

  const { levelId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchAptiQuestions = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/apti/level/${levelId}/page/${page}`
      );
      const data = await res.json();

      if (data.success) {
        setQuestions(data.questions);
        setTotalPages(data.totalPages);
        setTotalQuestions(data.totalQuestions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAptiQuestions();
  }, [page, levelId]);

  const handleSelect = (qNo, option) => {
    setAnswers((prev) => ({ ...prev, [qNo]: option }));
  };

  const submitTest = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    const formatted = Object.keys(answers).map((q) => ({
      questionNo: Number(q),
      selected: answers[q],
    }));

    const res = await fetch("http://localhost:5000/api/apti-progress/submit", {
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
    } else alert("Error submitting test. Please try again.");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Aptitude – Level {levelId}</h1>

      {loading ? (
        <div className="py-12 text-center">Loading…</div>
      ) : (
        <>
          {questions.map((q, i) => (
            <AptiMCQ
              key={q._id}
              q={q}
              index={i}
              selected={answers[q.questionNo]}
              setSelected={handleSelect}
            />
          ))}

          <div className="flex justify-center gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 border rounded-xl"
            >
              ⬅️ Prev
            </button>

            <span>
              Page {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border rounded-xl"
            >
              Next ➡️
            </button>
          </div>

          {Object.keys(answers).length === totalQuestions && (
            <button
              onClick={submitTest}
              className="mt-10 w-full py-3 bg-purple-600 text-white rounded-xl"
            >
              🚀 Complete Test
            </button>
          )}

          {result && (
            <div className="mt-6 p-6 border rounded-xl bg-[var(--card-bg)]">
              <h2 className="text-xl font-bold mb-3">🎉 Test Summary</h2>
              <p>Correct: {result.summary.correct}</p>
              <p>Wrong: {result.summary.wrong}</p>
              <p>Total: {result.summary.total}</p>
              <p>XP Earned: {result.summary.earnedXP}</p>
              <p>Best Score: {result.summary.bestScore}</p>
              <p>Attempts: {result.summary.attempts}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
