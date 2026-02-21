import { Navbar } from "../components/Navbar.jsx";
import { CTAButton } from "../components/CTAButton.jsx";
import { FeaturePill } from "../components/FeaturePill.jsx";
import { ModulesPreview, SectionTitle } from "../components/ModelPreview.jsx";
import { ModuleCard } from "../components/ModuleCard.jsx";
import { PlaygroundTeaser } from "../components/PlaygroundTeaser.jsx";
import { Projects } from "../components/Projects.jsx";
import { InterviewPrep } from "../components/InterviewPrep.jsx";
import { ProfilePreview } from "../components/ProfilePreview.jsx";
import { Testimonials } from "../components/Testimonals.jsx";
import { FAQ } from "../components/FAQ.jsx";
import { Footer } from "../components/Footer.jsx";
import { Hero } from "../components/Hero.jsx";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      <main className="pt-16 sm:pt-25">
        {/* HERO */}
        <Hero />

        {/* MODULES */}
        <section className="mt-10 sm:mt-10">
          <ModulesPreview />
        </section>

        {/* PLAYGROUND */}
        <section className="mt-14 sm:mt-20">
          <PlaygroundTeaser />
        </section>

        {/* PROJECTS */}
        <section className="mt-14 sm:mt-20">
          <Projects />
        </section>

        {/* INTERVIEW */}
        <section className="mt-14 sm:mt-20">
          <InterviewPrep />
        </section>

        {/* PROFILE */}
        <section className="mt-14 sm:mt-20">
          <ProfilePreview />
        </section>

        {/* TESTIMONIALS */}
        <section className="mt-14 sm:mt-20">
          <Testimonials />
        </section>

        {/* FAQ */}
        <section className="mt-14 sm:mt-20">
          <FAQ />
        </section>

        {/* FOOTER */}
        <Footer />
      </main>
    </div>
  );
}
