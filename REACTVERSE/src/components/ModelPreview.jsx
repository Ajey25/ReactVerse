import { motion } from "framer-motion";
import { ModuleCard } from "./ModuleCard";

export function ModulesPreview() {
  const modules = [
    "Intro to React",
    "JSX",
    "Components",
    "Props",
    "State",
    "Hooks",
    "Routing",
  ];

  return (
    <section
      id="modules"
      className="relative z-20 py-20 bg-gradient-to-b from-black/30 to-black/20"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* SECTION TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{}}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <SectionTitle
            title="Lessons & Modules"
            subtitle="Structured lessons that scale with you"
          />
        </motion.div>

        {/* MODULE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {modules.map((m, i) => (
            <ModuleCard
              key={m}
              title={m}
              lessons={3 + (i % 3)}
              quizzes={1 + (i % 2)}
              direction={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
      <p className="mt-2 text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}
