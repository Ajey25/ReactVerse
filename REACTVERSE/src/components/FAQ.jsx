import { SectionTitle } from "./ModelPreview";

export function FAQ() {
  const items = [
    {
      q: "How long to learn React?",
      a: "Depends on practice. Our micro-projects help you build quickly.",
    },
    {
      q: "Is this for beginners?",
      a: "Yes — lessons start from fundamentals and move to advanced.",
    },
    {
      q: "Is progress saved?",
      a: "All progress is saved locally in your browser via localStorage.",
    },
  ];

  return (
    <section className="relative z-20 py-20 bg-gradient-to-b from-black/10 to-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title={"FAQ"} subtitle={"Common questions answered"} />

        <div className="mt-8 space-y-4">
          {items.map((it) => (
            <details
              key={it.q}
              className="bg-white/10 border border-white/20 p-4 rounded-lg"
            >
              <summary className="font-semibold text-white">{it.q}</summary>
              <div className="mt-2 text-gray-300">{it.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
