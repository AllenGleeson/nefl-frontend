// src/components/About/index.tsx
import Image from "next/image";
import { BookOpen, MapPin, Trophy } from "lucide-react";
import HistoryTab from "./HistoryTab";
import GroundsTab from "./GroundsTab";
import RollOfHonourTab from "./RollOfHonourTab";
import TabNavigation from "./TabNavigation";

const stats = [
  { value: "1980", label: "Founded" },
  { value: "51", label: "Clubs" },
  { value: "71", label: "Adult teams" },
  { value: "6,000+", label: "Players (incl. NECSL)" },
];

export default function About() {
  const tabs = [
    { id: "history", label: "History", icon: <BookOpen className="w-4 h-4" aria-hidden />, content: <HistoryTab /> },
    { id: "grounds", label: "Grounds", icon: <MapPin className="w-4 h-4" aria-hidden />, content: <GroundsTab /> },
    { id: "roll-of-honour", label: "Roll of Honour", icon: <Trophy className="w-4 h-4" aria-hidden />, content: <RollOfHonourTab /> },
  ];

  return (
    <div className="about-page bg-[var(--md-surface)] min-h-screen">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[var(--md-primary)] text-[var(--md-on-primary)]">
        <Image
          src="https://i0.wp.com/nefl.ie/wp-content/uploads/2021/02/MDL-Aerial-Shots-05..jpg"
          alt=""
          fill
          priority
          className="object-cover -z-10 opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--md-primary)] via-[var(--md-primary)]/85 to-[var(--md-primary)]/40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--md-primary-container)]">
            About the league
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight">
            Over four decades of football in the North East
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-2xl">
            From eight teams in Mid Meath in 1980 to one of the largest junior leagues in the country, with a home of
            its own at the MDL grounds in Navan.
          </p>

          <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm px-4 py-3">
                <dt className="text-xs text-white/70">{s.label}</dt>
                <dd className="text-2xl sm:text-3xl font-bold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <TabNavigation tabs={tabs} />
      </div>
    </div>
  );
}
