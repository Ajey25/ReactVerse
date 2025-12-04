import { SectionTitle } from "./ModelPreview";

export function ProfilePreview() {
  return (
    <section
      id="profile"
      className="relative z-10 py-20 bg-gradient-to-b from-black/60 to-black/30"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          title={"Your Progress & Profile"}
          subtitle={"Track XP, claim badges and keep your streak alive."}
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {/* MAIN PROFILE CARD */}
          <div className="col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg shadow-black/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-semibold">XP</div>
                <div className="text-gray-300 mt-1">1200 XP</div>
              </div>

              <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center text-white border border-white/20 shadow-md shadow-black/20">
                Avatar
              </div>
            </div>

            <div className="mt-6">
              <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden backdrop-blur-md">
                <div className="h-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full w-3/4"></div>
              </div>
              <div className="mt-2 text-sm text-gray-300">
                Progress to next level • 75%
              </div>
            </div>
          </div>

          {/* BADGES CARD */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-lg shadow-black/20">
            <div className="font-semibold text-white">Badges</div>

            <div className="mt-3 flex gap-4 flex-col">
              <div className="px-3 py-2 rounded bg-white/10 backdrop-blur-md text-sm text-gray-200 border border-white/10">
                Streak
              </div>
              <div className="px-3 py-2 rounded bg-white/10 backdrop-blur-md text-sm text-gray-200 border border-white/10">
                Quiz Master
              </div>
              <div className="px-3 py-2 rounded bg-white/10 backdrop-blur-md text-sm text-gray-200 border border-white/10">
                Project Finisher
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
