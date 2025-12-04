import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { motion } from "framer-motion";
import { CTAButton } from "./CTAButton";
import { FeaturePill } from "./FeaturePill";

/* particles init */
const particlesInit = async (engine) => {
  await loadSlim(engine);
};

export function Hero() {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* PARTICLES */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0"
        options={{
          background: { color: "#000" },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
            },
            modes: { repulse: { distance: 120 }, push: { quantity: 4 } },
          },
          particles: {
            number: { value: 90, density: { enable: true, area: 900 } },
            color: { value: ["#8b5cf6", "#06b6d4", "#f472b6"] },
            links: {
              enable: true,
              distance: 140,
              color: "#7c3aed",
              opacity: 0.25,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.7,
              outModes: { default: "bounce" },
            },
            size: { value: 2 },
            opacity: { value: 0.7 },
          },
        }}
      />

      {/* BLURRED GRADIENT BLOBS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -top-40 left-10 w-80 h-80 rounded-full bg-purple-700 blur-3xl z-10"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.45, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="absolute -bottom-40 right-10 w-96 h-96 rounded-full bg-blue-600 blur-3xl z-10"
      />

      {/* MAIN CONTENT */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
        {/* HERO TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-white tracking-tight"
        >
          Step into the{" "}
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300"
          >
            Reactverse
          </motion.span>
        </motion.h1>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="mt-6 text-gray-300 max-w-3xl text-lg md:text-xl"
        >
          Learn React with hands-on lessons, live playgrounds, micro-projects
          and interview challenges — all saved locally so you can pick up where
          you left off.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="flex items-center gap-4 mt-8"
        >
          <CTAButton>Start Learning</CTAButton>
          <button className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 text-white text-sm hover:bg-white/5 transition">
            Explore Modules
          </button>
        </motion.div>

        {/* FEATURES */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="mt-12 w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeaturePill
              title="Interactive"
              text="Live playground & instant feedback"
            />
            <FeaturePill title="Guided" text="Step-by-step lessons & quizzes" />
            <FeaturePill
              title="Practical"
              text="Mini-projects & interview prep"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
