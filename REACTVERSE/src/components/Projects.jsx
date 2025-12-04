import { motion } from "framer-motion";
import { SectionTitle } from "./ModelPreview";
import counterImg from "../assets/images/counter.png";
import todoImg from "../assets/images/todo.png";
import pokemonImg from "../assets/images/pokemon.jpg";
import calculatorImg from "../assets/images/calculator.png";

export function Projects() {
  const projects = [
    { title: "Counter", time: "10 mins", image: counterImg },
    { title: "Todo App", time: "25 mins", image: todoImg },
    { title: "Pokémon Card", time: "30 mins", image: pokemonImg },
    { title: "Calculator", time: "20 mins", image: calculatorImg },
  ];

  // Container animation (stagger children)
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.3,
      },
    },
  };

  // Individual card animation
  const card = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
      },
    },
  };

  return (
    <section
      id="projects"
      className="relative z-10 py-20 bg-gradient-to-b from-black/40 to-black/20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          title={"Mini Projects"}
          subtitle={"Practice by building tiny, focused apps."}
        />

        {/* Grid with stagger animation */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {projects.map((p) => (
            <motion.div
              key={p.title}
              variants={card}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-lg shadow-black/20"
            >
              <div className="relative h-50 bg-white/10 rounded-md overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">{p.title}</div>
                  <div className="text-gray-300 text-sm">{p.time}</div>
                </div>

                <div className="text-sm bg-purple-600 px-3 py-1 rounded-full text-white cursor-pointer">
                  Start
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
