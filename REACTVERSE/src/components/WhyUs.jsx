export function WhyUs() {
  return (
    <section className="py-20 bg-black text-white text-center">
      <h2 className="text-4xl font-bold mb-10">Why Learn With Reactverse?</h2>
      <div className="grid md:grid-cols-3 gap-10 px-10">
        <div className="p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold mb-3">Structured Lessons</h3>
          <p className="text-gray-300">
            Follow step-by-step guided modules with quizzes.
          </p>
        </div>
        <div className="p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold mb-3">Live Playground</h3>
          <p className="text-gray-300">
            Write code and see results instantly with Sandpack.
          </p>
        </div>
        <div className="p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold mb-3">Real Projects</h3>
          <p className="text-gray-300">
            Build mini projects that actually teach you React.
          </p>
        </div>
      </div>
    </section>
  );
}
