export default function LessonHeading({
  moduleOrder,
  lessonNumber,
  title,
  subtopic,
}) {
  return (
    <div className="mb-8">
      <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full inline-block text-sm font-medium mb-3">
        Lesson {moduleOrder}.{lessonNumber}
      </div>

      <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text mb-2">
        {title}
      </h1>

      {subtopic && <p className="text-gray-400 text-lg">{subtopic}</p>}
    </div>
  );
}
