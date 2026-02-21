import { SectionTitle } from "./ModelPreview";
import { FiChevronDown } from "react-icons/fi";

export function FAQ() {
  const items = [
    {
      q: "Do I need JavaScript knowledge before learning React?",
      a: "Basic JavaScript fundamentals (variables, functions, arrays) are enough. We explain React concepts assuming minimal prior knowledge.",
    },
    {
      q: "Does this course cover React Hooks?",
      a: "Yes. We cover all essential hooks like useState, useEffect, useRef, and explain when and why to use them.",
    },
    {
      q: "Is this platform beginner-friendly?",
      a: "Absolutely. Lessons start from JSX and components, then gradually move to advanced patterns and interview-level problems.",
    },
    {
      q: "Is this focused on projects or just theory?",
      a: "This is heavily project-based. You’ll build real apps like counters, to-do lists, and interview-style challenges.",
    },
    {
      q: "Is this enough to prepare for React interviews?",
      a: "Yes. The platform focuses on commonly asked React interview questions, tricky scenarios, and hands-on coding rounds.",
    },
    {
      q: "Is my progress saved?",
      a: "Yes. Your progress, XP, and badges are saved locally in your browser and restored automatically.",
    },
  ];

  return (
    <section className="relative z-20 py-2 bg-gradient-to-b from-black/20 to-black/30">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          title="FAQ"
          subtitle="Common questions about learning React"
        />

        {/* 2-column FAQ grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((it) => (
            <details
              key={it.q}
              className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 transition-all"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-semibold text-white">{it.q}</span>
                <FiChevronDown className="text-white/60 transition-transform group-open:rotate-180" />
              </summary>

              <div className="mt-3 text-gray-300 text-sm leading-relaxed">
                {it.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
