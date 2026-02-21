import { SectionTitle } from "./ModelPreview.jsx";

const LevelRow = ({ title, description }) => (
  <div className="flex items-center justify-between bg-white/10 border border-white/20 rounded-lg px-4 py-3 backdrop-blur-xl">
    <div>
      <div className="text-white font-medium">{title}</div>
      <div className="text-gray-300 text-xs mt-1">{description}</div>
    </div>
  </div>
);

const PrepCard = ({ title, subtitle, children }) => (
  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl shadow-lg shadow-black/20">
    <div className="text-white font-semibold text-lg">{title}</div>
    <div className="text-gray-300 text-sm mt-1">{subtitle}</div>
    <div className="mt-4 space-y-3">{children}</div>
  </div>
);

export function InterviewPrep() {
  return (
    <section id="interview" className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          title="React Interview Prep"
          subtitle="No theory fluff. Only what React interviewers actually ask."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* PREPARE */}
          <PrepCard
            title="Prepare"
            subtitle="Most asked React interview questions"
          >
            <LevelRow
              title="Level 1 · React Basics"
              description="JSX, components, props, state"
            />
            <LevelRow
              title="Level 2 · Hooks & Forms"
              description="useState, useEffect, controlled inputs"
            />
            <LevelRow
              title="Level 3 · Advanced React"
              description="Re-renders, memo, performance"
            />
          </PrepCard>

          {/* QUIZ */}
          <PrepCard
            title="Quiz"
            subtitle="React questions under interview pressure"
          >
            <LevelRow
              title="Level 1 · Quiz"
              description="MCQ · Tricky code · Logic"
            />
            <LevelRow
              title="Level 2 · Quiz"
              description="Hooks pitfalls · Output based"
            />
            <LevelRow
              title="Level 3 · Quiz"
              description="Real interview trick questions"
            />
          </PrepCard>

          {/* CODING */}
          <PrepCard
            title="Coding Round"
            subtitle="Build what interviewers ask you to build"
          >
            <LevelRow
              title="Easy · Counter App"
              description="State, events, re-render basics"
            />
            <LevelRow
              title="Medium · Calculator"
              description="Complex state & edge cases"
            />
            <LevelRow
              title="Hard · To-Do App"
              description="Lists, keys, CRUD, state lifting"
            />
          </PrepCard>
        </div>
      </div>
    </section>
  );
}
