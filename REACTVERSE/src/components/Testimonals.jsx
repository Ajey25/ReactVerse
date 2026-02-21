import { SectionTitle } from "./ModelPreview.jsx";

const testimonials = [
  {
    name: "Ria",
    role: "Frontend Developer",
    quote:
      "Lessons are clear and the projects actually teach you how to build real applications.",
    color: "from-pink-500 to-purple-500",
  },
  {
    name: "Sam",
    role: "CS Student",
    quote:
      "Sandbox + step-by-step projects = the fastest way I learned React.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Dev",
    role: "Job Seeker",
    quote:
      "Interview challenges prepared me for the exact questions I faced in interviews.",
    color: "from-emerald-500 to-teal-500",
  },
];

function TestimonialCard({ name, role, quote, color }) {
  return (
    <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg hover:-translate-y-1 transition-all">
      {/* Quote mark */}
      <div className="absolute -top-4 -left-3 text-6xl text-white/10 font-serif">
        “
      </div>

      {/* Quote */}
      <p className="relative text-white/90 text-sm leading-relaxed">
        {quote}
      </p>

      {/* User info */}
      <div className="mt-6 flex items-center gap-4">
        {/* Avatar */}
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-lg shadow-md`}
        >
          {name.charAt(0)}
        </div>

        {/* Name + Role + Stars */}
        <div className="flex justify-between items-start w-full">
          <div>
            <div className="font-semibold text-white">{name}</div>
            <div className="text-xs text-gray-400">{role}</div>
          </div>

          <div className="text-yellow-400 text-sm whitespace-nowrap">
            ★★★★★
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative z-20 py-0 bg-gradient-to-b from-black/50 to-black/20">
      <div className="relative z-30 max-w-7xl mx-auto px-6">
        <SectionTitle
          title="What learners say"
          subtitle="Real feedback from early users"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
