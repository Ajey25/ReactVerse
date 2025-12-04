export default function LessonContent({ content }) {
  if (!content) return null;

  return (
    <div className="bg-[var(--glass)] p-8 rounded-2xl backdrop-blur-xl border border-[var(--border)] mb-10">
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
