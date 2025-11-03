// src/components/About/AboutTab.tsx
import AboutCarousel from "./AboutCarousel";
import LeagueHistory from "./LeagueHistory";
import Timeline from "./Timeline";

export default function HistoryTab() {
  return (
    <div className="about-tab">
      <LeagueHistory />
      <Timeline />
      <AboutCarousel />
    </div>
  );
}