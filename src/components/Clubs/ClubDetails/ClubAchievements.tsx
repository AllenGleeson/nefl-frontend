"use client";

import { useState, useMemo } from "react";

/** Club achievement: league placing (1st/2nd/3rd), individual award, or other (cup/trophy). */
export interface Achievement {
  id: string;
  title: string;
  year: number;
  type: "league" | "cup" | "trophy" | "award";
  competition: string;
  position?: "winner" | "runner-up" | "third-place" | "semi-finalist" | "quarter-finalist";
  description?: string;
  /** For individual awards: the person/recipient name. */
  recipient?: string;
}

interface ClubAchievementsProps {
  achievements: Achievement[];
}

function placeLabel(position?: Achievement["position"]): string {
  if (!position) return "—";
  switch (position) {
    case "winner":
      return "1st";
    case "runner-up":
      return "2nd";
    case "third-place":
      return "3rd";
    case "semi-finalist":
      return "Semi-finalist";
    case "quarter-finalist":
      return "Quarter-finalist";
    default:
      return "—";
  }
}

/** Roll-of-honour style table for one category. */
function HonourTable({
  rows,
  columns,
}: {
  rows: Array<Record<string, React.ReactNode>>;
  columns: { key: string; header: string }[];
}) {
  if (rows.length === 0) return null;

  return (
    <div className="rounded-lg border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-0 sm:min-w-[400px]">
            <thead className="bg-white/10">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-white/5 hover:bg-white/10"
                      : "bg-white/[0.07] hover:bg-white/10"
                  }
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-white/90"
                    >
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default function ClubAchievements({ achievements }: ClubAchievementsProps) {
  const leagueAchievements = useMemo(
    () =>
      achievements
        .filter((a) => a.type === "league")
        .sort((a, b) => b.year - a.year),
    [achievements]
  );

  const individualAchievements = useMemo(
    () =>
      achievements
        .filter((a) => a.type === "award")
        .sort((a, b) => b.year - a.year),
    [achievements]
  );

  const otherAchievements = useMemo(
    () =>
      achievements
        .filter((a) => a.type === "cup" || a.type === "trophy")
        .sort((a, b) => b.year - a.year),
    [achievements]
  );

  type TabId = "league" | "individual" | "cups";
  const allTabs: { id: TabId; label: string; count: number }[] = [
    { id: "league", label: "League placings", count: leagueAchievements.length },
    { id: "individual", label: "Individual achievements", count: individualAchievements.length },
    { id: "cups", label: "Cups & trophies", count: otherAchievements.length },
  ];
  const tabs = allTabs.filter((t) => t.count > 0);

  const defaultTab = tabs[0]?.id ?? "league";
  const [activeTab, setActiveTab] = useState<TabId>(defaultTab);

  if (achievements.length === 0) {
    return (
      <div className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-white">Roll of Honour</h2>
        <div className="text-center py-8">
          <div className="text-white/40 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2 text-white">No honours recorded</h3>
          <p className="text-white/70">This club&apos;s achievements haven&apos;t been added yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-white">Roll of Honour</h2>

      <div className="flex flex-wrap gap-1 border-b border-white/10 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-white/15 text-white border border-b-0 border-white/20 -mb-px"
                : "text-white/70 hover:text-white hover:bg-white/10 border border-transparent"
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-1.5 text-white/60">({tab.count})</span>
            )}
          </button>
        ))}
      </div>

      {activeTab === "league" && (
        <HonourTable
          columns={[
            { key: "year", header: "Year" },
            { key: "league", header: "League" },
            { key: "place", header: "Place" },
          ]}
          rows={leagueAchievements.map((a) => ({
            year: a.year,
            league: a.competition,
            place: placeLabel(a.position),
          }))}
        />
      )}

      {activeTab === "individual" && (
        <HonourTable
          columns={[
            { key: "year", header: "Year" },
            { key: "award", header: "Award" },
            { key: "recipient", header: "Recipient" },
          ]}
          rows={individualAchievements.map((a) => ({
            year: a.year,
            award: a.competition || a.title,
            recipient: a.recipient ?? a.title ?? "—",
          }))}
        />
      )}

      {activeTab === "cups" && (
        <HonourTable
          columns={[
            { key: "year", header: "Year" },
            { key: "competition", header: "Competition" },
            { key: "result", header: "Result" },
          ]}
          rows={otherAchievements.map((a) => ({
            year: a.year,
            competition: a.competition,
            result: placeLabel(a.position),
          }))}
        />
      )}
    </div>
  );
}
