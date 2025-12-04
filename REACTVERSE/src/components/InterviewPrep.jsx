import { SectionTitle } from "./ModelPreview.jsx";

export function InterviewPrep() {
  return (
    <section id="interview" className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* LEFT SIDE */}
        <div>
          <SectionTitle
            title={"Interview Prep"}
            subtitle={
              "Questions, challenges and a sandbox to practice under pressure."
            }
          />

          <div className="mt-6 space-y-4">
            {/* QUESTION BANK CARD */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-xl shadow-lg shadow-black/20">
              <div className="font-semibold text-white">Question Bank</div>
              <div className="text-gray-300 text-sm mt-2">
                Curated questions with explanations and difficulty tags.
              </div>
            </div>

            {/* CHALLENGE GENERATOR CARD */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-xl shadow-lg shadow-black/20">
              <div className="font-semibold text-white">
                Challenge Generator
              </div>
              <div className="text-gray-300 text-sm mt-2">
                Generate a random question and solve it in the playground with a
                timer.
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-lg shadow-black/20">
            <div className="font-semibold text-white">Try a live challenge</div>

            <div className="mt-3 text-gray-300 text-sm">
              [ Timer & input placeholder ]
            </div>

            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 rounded-full bg-purple-600 text-white">
                Start
              </button>
              <button className="px-4 py-2 rounded-full border border-white/10 text-white">
                Random
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
