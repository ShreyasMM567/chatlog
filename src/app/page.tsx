import Navbar from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProfessionalSummary from "../components/ProfessionalSummary";
import FeaturedProjects from "../components/FeaturedProjects";
import AnimatedDecor from "../components/AnimatedDecor";

export default function Home() {
  return (
    <div>
      <AnimatedDecor />
      <Navbar />
      <HeroSection />
      <ProfessionalSummary />
      <FeaturedProjects />
    </div>
  );
}
