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
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <ModulesPreview />
        <PlaygroundTeaser />
        <Projects />
        <InterviewPrep />
        <ProfilePreview />
        <Testimonials />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}
