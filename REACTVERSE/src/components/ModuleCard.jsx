import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ModuleCard({ title, lessons, quizzes }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;

    const anim = gsap.fromTo(
      el,
      {
        y: 95,
        opacity: 0,
        rotateX: 5,
        rotateY: -5,
        scale: 0.95,
        filter: "blur(2px)",
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          end: "top 50%",
          scrub: 0.25,
        },
      }
    );

    return () => anim.kill();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{
        scale: 1.01,
        y: -2,
        transition: { duration: 0.1 },
      }}
      whileTap={{ scale: 0.99 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6
      hover:bg-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-lg text-white">{title}</div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-300">
        Short description preview goes here — one punchy line about what you
        learn in this module.
      </div>
    </motion.div>
  );
}
