import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiCircle,
  FiXCircle,
  FiRefreshCw,
} from "react-icons/fi";

export default function LessonQuiz({
  quiz = [],
  currentQuestion,
  setCurrentQuestion,
  answers,
  setAnswers,
  showResults,
  setShowResults,
  slideDir,
  setSlideDir,
}) {
  if (!quiz || quiz.length === 0) {
    return (
      <div className="p-6 mt-10 bg-[var(--glass)] backdrop-blur-xl border border-[var(--border)] rounded-2xl text-center text-gray-400">
        No quiz available for this lesson.
      </div>
    );
  }

  const question = quiz[currentQuestion];

  const handleSelect = (optionIndex) => {
    if (showResults) return;

    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex,
    });
  };

  const goNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setSlideDir("right");
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const goPrev = () => {
    if (currentQuestion > 0) {
      setSlideDir("left");
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const score = Object.keys(answers).reduce((acc, qIndex) => {
    const q = quiz[qIndex];
    if (answers[qIndex] === q.correctAnswer) return acc + 1;
    return acc;
  }, 0);

  const percentage = Math.round((score / quiz.length) * 100);

  return (
    <div className="mt-12 bg-[var(--glass)] backdrop-blur-xl border border-[var(--border)] rounded-2xl p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <FiCheckCircle className="text-green-500 text-3xl" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Test Your Knowledge
        </h2>
      </div>

      {!showResults ? (
        <>
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>
                Question {currentQuestion + 1} of {quiz.length}
              </span>
              <span>{Object.keys(answers).length} answered</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / quiz.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* QUESTION CARD */}
          <motion.div
            key={currentQuestion}
            initial={{ x: slideDir === "right" ? 60 : -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="p-6 bg-white/5 rounded-xl border border-[var(--border)] mb-6"
          >
            <p className="text-xl font-semibold mb-6 text-[var(--text-bold)]">
              {question.question}
            </p>

            <div className="space-y-3">
              {question.options.map((opt, i) => {
                const isSelected = answers[currentQuestion] === i;

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 group
                      ${
                        isSelected
                          ? "bg-blue-500/20 border-blue-500 text-blue-400"
                          : "bg-white/5 border-[var(--border)] hover:bg-white/10 text-[var(--text)]/70 hover:text-[var(--text)]"
                      }
                    `}
                  >
                    <FiCircle
                      className={`flex-shrink-0 ${
                        isSelected ? "text-blue-500" : "text-gray-500"
                      }`}
                    />
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* NAV BUTTONS */}
          <div className="flex justify-between items-center">
            <button
              onClick={goPrev}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-xl border border-[var(--border)] font-semibold transition-all ${
                currentQuestion === 0
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-white/10 text-white"
              }`}
            >
              Previous
            </button>

            <button
              onClick={goNext}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              {currentQuestion === quiz.length - 1 ? "Finish Quiz" : "Next"}
            </button>
          </div>
        </>
      ) : (
        /* RESULTS SECTION */
        /* RESULTS SECTION */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Score Card */}
          <div className="text-center mb-8 p-8 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/50 rounded-2xl">
            <div className="text-7xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-3">
              {percentage}%
            </div>

            <h3 className="text-2xl font-semibold mb-2 text-white">
              {percentage >= 80
                ? "🎉 Excellent Work!"
                : percentage >= 60
                ? "👍 Good Job!"
                : "💪 Keep Learning!"}
            </h3>

            <p className="text-gray-400 text-lg">
              You got <span className="text-white font-semibold">{score}</span>{" "}
              out of{" "}
              <span className="text-white font-semibold">{quiz.length}</span>{" "}
              correct!
            </p>
          </div>

          {/* RETRY */}
          <button
            onClick={() => {
              setShowResults(false);
              setAnswers({});
              setCurrentQuestion(0);
              setSlideDir("right");
            }}
            className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <FiRefreshCw />
            Retry Quiz
          </button>
        </motion.div>
      )}
    </div>
  );
}
