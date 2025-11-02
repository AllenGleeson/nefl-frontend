// src/components/Home/index.tsx
import Sponsors from "../Sponsers";
import AboutUs from "../AboutSection";
import HeroSection from "./HeroSection";
import LatestResults from "./LatestResults";
import LeaguesSection from "./LeaguesSection";
import NewsSection from "./NewsSection";
import StoreHighlights from "./StoreHighlights";
import "@/styles/home.css";

export default function Home() {
  return (
    <div className="home-page space-y-4 sm:space-y-6 md:space-y-8">
      <HeroSection />
      <LatestResults />
      <LeaguesSection />
      <NewsSection />
      <StoreHighlights />
      <Sponsors />
      <AboutUs />
    </div>
  );
}