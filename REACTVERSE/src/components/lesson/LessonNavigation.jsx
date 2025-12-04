import { FiChevronLeft, FiChevronRight, FiCheckCircle } from "react-icons/fi";

export default function LessonNavigation({
  prev,
  next,
  navigateNext,
  navigatePrev,
  onComplete, // <-- NEW
}) {
  const isLastLesson = !next;

  return (
    <div className="flex justify-between items-center pt-8 border-t border-[var(--border)] mt-10">
      {prev ? (
        <button
          onClick={navigatePrev}
          className="px-6 py-3 rounded-xl bg-white/5 border border-[var(--border)] flex items-center gap-2 hover:bg-white/10 transition"
        >
          <FiChevronLeft className="text-gray-400" />
          {prev.title}
        </button>
      ) : (
        <div />
      )}

      {/* If next exists → normal Next button */}
      {next ? (
        <button
          onClick={navigateNext}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center gap-2 hover:opacity-90 transition"
        >
          {next.title}
          <FiChevronRight />
        </button>
      ) : (
        /* If NO next → Show a Complete button */
        <button
          onClick={onComplete}
          className="px-6 py-3 rounded-xl bg-green-600 text-white flex items-center gap-2 hover:bg-green-700 transition"
        >
          Finish Lesson
          <FiCheckCircle />
        </button>
      )}
    </div>
  );
}
