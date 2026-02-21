export default function LessonHeading({
  moduleOrder,
  lessonNumber,
  title,
  subtopic,
}) {
  return (
    <div className="mb-8">
      {/* Lesson Badge */}
      <div
        className="
          px-3 py-1 rounded-full inline-block text-sm font-medium mb-3
          bg-[var(--tag-bg)] 
          text-[var(--tag-text)] 
          border border-[var(--tag-border)]
        "
      >
        Lesson {moduleOrder}.{lessonNumber}
      </div>

      {/* Title — Gradient but readable in both themes */}
      <h1
        className="
          text-4xl font-bold mb-2 
          bg-gradient-to-r from-blue-500 to-purple-600 
          bg-clip-text text-transparent
        "
      >
        {title}
      </h1>

      {/* Subtopic — Theme-aware text */}
      {subtopic && <p className="text-[var(--text)]/70 text-lg">{subtopic}</p>}
    </div>
  );
}
