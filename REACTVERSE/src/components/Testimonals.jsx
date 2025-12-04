import { SectionTitle } from "./ModelPreview.jsx";

export function Testimonials() {
  const data = [
    {
      name: "Ria",
      quote:
        "Lessons are clear and the projects actually teach you how to build.",
    },
    {
      name: "Sam",
      quote: "Sandbox + step-by-step projects = fastest way I learned React.",
    },
    {
      name: "Dev",
      quote:
        "Interview challenges prepared me for real questions I faced in interviews.",
    },
  ];

  return (
    <section className="relative z-20 py-20 bg-gradient-to-b from-black/50 to-black/20">
      <div className="relative z-30 max-w-7xl mx-auto px-6">
        <SectionTitle
          title={"What learners say"}
          subtitle={"Real feedback from early users"}
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((t) => (
            <div
              key={t.name}
              className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-lg"
            >
              <div className="text-white/90">“{t.quote}”</div>
              <div className="mt-4 font-semibold text-white text-lg">
                {t.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
