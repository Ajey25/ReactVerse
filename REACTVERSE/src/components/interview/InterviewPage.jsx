// InterviewPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiBook, FiClock, FiTag } from "react-icons/fi";
import { useProgress } from "../../context/ProgressContext";

export default function InterviewPage() {
  const { levelId } = useParams();
  const { refreshProgress } = useProgress();
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/interview/level/${levelId}?page=${page}`
      );
      const data = await res.json();

      if (data.success) {
        setQuestions(data.questions);
        setTotalPages(data.totalPages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [page, levelId]);

  const markPageCompleted = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;

      if (!userId) return;

      await fetch(
        "http://localhost:5000/api/interview-progress/complete-page",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            cardId: "Top 50 Interview Questions",
            levelNo: levelId,
            pageNo: page,
          }),
        }
      );

      refreshProgress();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!loading) markPageCompleted();
  }, [loading]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-500/10 border border-blue-500/20
         rounded-2xl p-6 mb-8"
      >
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FiBook className="text-blue-400" /> Interview Questions
        </h1>

        <p className="text-sm mt-1 text-white/60">Level {levelId}</p>
      </motion.div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <>
          {questions.map((q, index) => (
            <motion.div
              key={q._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[var(--card-bg)] border rounded-2xl p-4 mb-4"
            >
              <h2 className="font-semibold mb-2">
                {q.questionNo}. {q.question}
              </h2>

              {q.tags?.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {q.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-[var(--tag-bg)] px-2 py-1 rounded"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              <p>{q.answer}</p>
            </motion.div>
          ))}

          <div className="flex justify-center items-center gap-4 mt-10">
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
        </>
      )}
    </div>
  );
}
