import { SectionTitle } from "./ModelPreview";
import { CTAButton } from "./CTAButton";
import { Sandpack } from "@codesandbox/sandpack-react";
import { useRef } from "react";
import { motion } from "framer-motion";

export function PlaygroundTeaser() {
  const cardRef = useRef(null);

  // 3D tilt smoothened + optimized
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    // Normalized values (GPU friendly)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateX = (-y * 15).toFixed(2); // max 15 deg
    const rotateY = (x * 15).toFixed(2);

    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.04)
    `;
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  // Reusable animations for the left text block
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <section id="playground" className="relative z-10 py-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* LEFT TEXT */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.15 }}
        >
          <motion.div variants={fadeUp}>
            <SectionTitle
              title="Interactive Playground"
              subtitle="Run, tweak and see output in real-time using Sandpack powered editor."
            />
          </motion.div>

          <motion.p
            className="mt-4 text-gray-300 text-center"
            variants={fadeUp}
          >
            Write code inside a live sandbox editor, run real test cases, and
            submit your solution to earn XP. Stuck? View the reference answer
            and learn the correct approach instantly.
          </motion.p>

          {/* <motion.div className="mt-6 flex gap-4" variants={fadeUp}>
            <CTAButton>Try the Sandbox</CTAButton>
            <button className="px-4 py-2 rounded-full border border-white/20 text-white">
              See examples
            </button>
          </motion.div> */}
        </motion.div>

        {/* RIGHT - SANDBOX CARD */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            className="bg-white/10 border border-white/20 backdrop-blur-xl 
                       rounded-xl p-4 shadow-2xl
                       transition-transform duration-200 will-change-transform"
          >
            <Sandpack
              template="react"
              theme="dark"
              style={{
                height: "310px",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            />

            <div className="text-sm text-gray-300 mt-2">
              Live editor with preview, auto-reload, and reset.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
