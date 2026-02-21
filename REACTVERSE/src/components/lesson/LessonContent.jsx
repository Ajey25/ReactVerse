export default function LessonContent({ content }) {
  if (!content) return null;

  return (
    <div className="bg-[var(--glass)] text-base sm:text-xl p-4 sm:p-8 rounded-xl sm:rounded-2xl backdrop-blur-xl border border-[var(--border)] mb-6 sm:mb-10 max-w-full overflow-hidden">
      <div
        className="prose prose-invert max-w-none w-full break-words overflow-hidden prose-pre:max-w-full prose-pre:overflow-x-auto prose-img:max-w-full prose-img:h-auto prose-table:max-w-full prose-table:overflow-x-auto text-[var(--text)]"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
