// src/components/About/index.tsx
import HistoryTab from "./HistoryTab";
import GroundsTab from "./GroundsTab";
import RollOfHonourTab from "./RollOfHonourTab";
import TabNavigation from "./TabNavigation";

export default function About() {
  const tabs = [
    {
      id: "about",
      label: "History",
      content: <HistoryTab />
    },
    {
      id: "grounds",
      label: "Grounds",
      content: <GroundsTab />
    },
    {
      id: "roll-of-honour",
      label: "Roll of Honour",
      content: <RollOfHonourTab />
    }
  ];

  return (
    <div className="about-page bg-[var(--md-surface)] min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <TabNavigation tabs={tabs} />
      </div>
    </div>
  );
}