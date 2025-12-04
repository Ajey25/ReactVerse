import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FeaturePill({ title, text }) {
  const pillRef = useRef(null);

  useEffect(() => {
    const el = pillRef.current;

    // GSAP scroll animation synced with Lenis
    const anim = gsap.fromTo(
      el,
      {
        y: 80,
        opacity: 0,
        rotateX: 15,
        rotateY: -12,
        scale: 0.92,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 40%",
          scrub: 0.4,
        },
      }
    );

    return () => anim.kill();
  }, []);

  return (
    <motion.div
      ref={pillRef}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="
        bg-white/5 
        border border-white/10 
        rounded-xl 
        p-4 
        backdrop-blur-md 
        text-left 
        text-gray-200
        shadow-xl
        hover:shadow-2xl
        transition-shadow
      "
    >
      <div className="font-semibold text-lg">{title}</div>
      <div className="mt-2 text-sm text-gray-300">{text}</div>
    </motion.div>
  );
}
