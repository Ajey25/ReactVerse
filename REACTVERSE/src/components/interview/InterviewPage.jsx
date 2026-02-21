import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiBook, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useProgress } from "../../context/ProgressContext";
import toast from "react-hot-toast";
import Commet from "react-loading-indicators/Commet";

export default function InterviewPage() {
  const { levelId } = useParams();
  const { refreshProgress } = useProgress();
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${BASE_URL}/api/interview/level/${levelId}?page=${page}`
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

      const res = await fetch(
        `${BASE_URL}/api/interview-progress/complete-page`,
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

      const data = await res.json();
      refreshProgress();

      if (
        data.success &&
        data.message !== "Page already completed. No XP awarded."
      ) {
        toast.success("Page marked as complete! 🎉");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error ⚠️");
    }
  };

  useEffect(() => {
    if (!loading) markPageCompleted();
  }, [loading]);

  return (
    <div
      className="min-h-screen p-6 max-w-4xl mx-auto transition"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 mb-8 shadow-lg"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
        }}
      >
        <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-bold)]">
          <FiBook className="text-purple-400" /> Interview Questions
        </h1>
        <p className="text-sm mt-1 opacity-70">Level {levelId}</p>
      </motion.div>

      {/* LOADING */}
      {loading ? (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <Commet color="blue" size="medium" />
        </div>
      ) : (
        <>
          {/* QUESTIONS LIST */}
          {questions.map((q, index) => (
            <motion.div
              key={q._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl p-5 mb-5 shadow-md transition-all hover:shadow-lg"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              <h2
                className="font-semibold mb-3 text-[var(--text-bold)] leading-snug"
                style={{ fontSize: "1.05rem" }}
              >
                {q.questionNo}. {q.question}
              </h2>

              {/* TAGS */}
              {q.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {q.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 text-xs rounded-md border"
                      style={{
                        background: "var(--tag-bg)",
                        borderColor: "var(--tag-border)",
                        color: "var(--tag-text)",
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              <p className="leading-relaxed opacity-90">{q.answer}</p>
            </motion.div>
          ))}

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-5 py-2 flex items-center gap-2 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                color: "var(--text)",
              }}
            >
              <FiArrowLeft /> Prev
            </button>

            <span className="text-sm opacity-80">
              Page {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-5 py-2 flex items-center gap-2 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                color: "var(--text)",
              }}
            >
              Next <FiArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
