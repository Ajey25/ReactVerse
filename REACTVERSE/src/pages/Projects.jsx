import { motion } from "framer-motion";
import projects from "../data/projectsData";
import { FiStar, FiCode, FiZap, FiClock } from "react-icons/fi";

export default function Projects() {
  const cardGradients = [
    "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(147,197,253,0.15))", // Sky / Blue
    "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(196,181,253,0.15))", // Purple
    "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(134,239,172,0.15))", // Green
    "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(253,230,138,0.15))", // Amber
    "linear-gradient(135deg, rgba(244,63,94,0.15), rgba(253,164,175,0.15))", // Rose
    "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(129,140,248,0.15))", // Indigo
  ];

  return (
    <div
      className="min-h-screen p-0 md:p-4 transition-colors duration-300"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* Animated Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(96,165,250,0.10) 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{ x: [0, -70, 0], y: [0, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto  mb-8 text-center relative"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Build with Purpose
        </h1>
        <p className="text-lg md:text-lg opacity-70 max-w-2xl mx-auto font-light">
          Curated React project ideas to inspire your learning journey and help
          you create production-grade applications.
        </p>
      </motion.header>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto relative">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const gradient = cardGradients[index % cardGradients.length];

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div
                  className="relative rounded-3xl overflow-hidden h-full border backdrop-blur-md shadow-lg transition-all duration-300"
                  style={{
                    background: gradient,
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition duration-500 bg-gradient-to-br from-white/50" />

                  <div className="relative p-6">
                    {/* Difficulty */}
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 border 
                      ${
                        project.difficulty === "Beginner"
                          ? "bg-green-500/10 text-green-400 border-green-500/30"
                          : project.difficulty === "Intermediate"
                          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                          : "bg-red-500/10 text-red-400 border-red-500/30"
                      }`}
                    >
                      {project.difficulty}
                    </span>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-2 transition-all group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text">
                      {project.title}
                    </h3>

                    {/* Time Estimate */}
                    <div className="flex items-center gap-2 text-sm opacity-60 mb-3">
                      <FiClock className="w-4 h-4" />
                      <span>
                        {project.difficulty === "Beginner"
                          ? "2–4 weeks"
                          : project.difficulty === "Intermediate"
                          ? "1–2 months"
                          : "2–3 months"}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="opacity-80 mb-3 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="mb-5">
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <FiStar className="w-4 h-4" /> Core Features
                      </h4>
                      <ul className="space-y-2">
                        {project.features.slice(0, 3).map((feat, idx) => (
                          <li
                            key={idx}
                            className="flex gap-3 text-sm opacity-90"
                          >
                            <div
                              className="w-1.5 h-1.5 mt-1 rounded-full"
                              style={{
                                background:
                                  "linear-gradient(135deg, #60a5fa, #a855f7)",
                              }}
                            />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-2">
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <FiCode className="w-4 h-4" /> Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 text-xs rounded-lg backdrop-blur-sm border"
                            style={{
                              background: "var(--glass)",
                              borderColor: "var(--border)",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Actions (COMMENTED AS REQUESTED) */}
                    {/*
                    <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: "var(--border)" }}>
                      <motion.button ...>Explore Project</motion.button>
                      <motion.a ...>GitHub</motion.a>
                      <motion.button ...>Save</motion.button>
                    </div>
                    */}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
