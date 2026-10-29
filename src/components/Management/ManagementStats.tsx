// src/components/Management/ManagementStats.tsx
import { CalendarClock, CircleCheck, Shield, Trophy } from "lucide-react";
import { AdminSection, StatCard } from "./AdminUI";

const stats = [
  { title: "Total clubs", value: "24", icon: <Shield className="w-5 h-5" />, change: "+2 this season", changeType: "positive" as const },
  { title: "Active leagues", value: "6", icon: <Trophy className="w-5 h-5" />, change: "No change", changeType: "neutral" as const },
  { title: "Matches played", value: "156", icon: <CircleCheck className="w-5 h-5" />, change: "+12 this week", changeType: "positive" as const },
  { title: "Upcoming fixtures", value: "18", icon: <CalendarClock className="w-5 h-5" />, change: "This weekend", changeType: "neutral" as const },
];

export default function ManagementStats() {
  return (
    <AdminSection title="League overview">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </AdminSection>
  );
}
