export default function LessonImages({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-3">Visuals</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="rounded-xl border border-[var(--border)]"
          />
        ))}
      </div>
    </div>
  );
}
