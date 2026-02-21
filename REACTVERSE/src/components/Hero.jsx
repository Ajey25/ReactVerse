import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { motion } from "framer-motion";
import { CTAButton } from "./CTAButton";
import { FeaturePill } from "./FeaturePill";
import { useNavigate } from "react-router-dom";
/* particles init */
const particlesInit = async (engine) => {
  await loadSlim(engine);
};

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] bg-black overflow-hidden">
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
            modes: { repulse: { distance: 100 }, push: { quantity: 3 } },
          },
          particles: {
            number: {
              value: 50,
              density: { enable: true, area: 900 },
            },
            color: { value: ["#8b5cf6", "#06b6d4", "#f472b6"] },
            links: {
              enable: true,
              distance: 130,
              color: "#7c3aed",
              opacity: 0.2,
              width: 1,
            },
            move: { enable: true, speed: 0.6 },
            size: { value: 2 },
            opacity: { value: 0.6 },
          },
        }}
      />

      {/* BLOBS (smaller on mobile) */}
      <motion.div className="absolute -top-32 left-4 sm:left-10 w-60 h-60 sm:w-80 sm:h-80 rounded-full bg-purple-700 blur-3xl z-10 opacity-50" />
      <motion.div className="absolute -bottom-32 right-4 sm:right-10 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-blue-600 blur-3xl z-10 opacity-45" />

      {/* CONTENT */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center items-center text-center">
        {/* TITLE */}
        <motion.h1
          className="
            text-4xl sm:text-5xl md:text-7xl lg:text-8xl
            font-extrabold leading-tight text-white tracking-tight
          "
        >
          Step into the{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300">
            Reactverse
          </span>
        </motion.h1>

        {/* SUBTEXT */}
        <motion.p
          className="
            mt-4 sm:mt-6
            text-gray-300
            max-w-xl sm:max-w-2xl md:max-w-3xl
            text-sm sm:text-base md:text-xl
          "
        >
          Learn React with hands-on lessons, live playgrounds, micro-projects
          and interview challenges — all saved locally so you can pick up where
          you left off.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="
            mt-6 sm:mt-8
            flex flex-col sm:flex-row
            items-center gap-3 sm:gap-4
          "
        >
          <CTAButton
            onClick={() => {
              console.log("clicked");
              navigate("/signup");
            }}
          >
            Start Learning
          </CTAButton>

          <CTAButton onClick={() => navigate("/login")}>
            Explore Modules
          </CTAButton>
        </motion.div>

        {/* FEATURES */}
        <motion.div className="mt-10 sm:mt-12 w-full mb-8 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
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
