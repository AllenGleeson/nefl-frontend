// src/components/Management/RecentActivity.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { adminActivity } from "@/data/adminActivity";
import { AdminSection } from "./AdminUI";
import ActivityItem from "./Activity/ActivityItem";

const RECENT_COUNT = 5;

export default function RecentActivity() {
  const recent = [...adminActivity].sort((a, b) => b.at.localeCompare(a.at)).slice(0, RECENT_COUNT);

  return (
    <AdminSection title="Recent activity">
      <div className="rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] shadow-sm overflow-hidden">
        {recent.length > 0 ? (
          <ul className="px-4 sm:px-6 divide-y divide-[var(--md-outline-variant)]">
            {recent.map((item) => (
              <ActivityItem key={item.id} item={item} showDate />
            ))}
          </ul>
        ) : (
          <p className="py-8 text-center text-[var(--md-on-surface-variant)]">No recent activity</p>
        )}
        <div className="px-4 sm:px-6 py-3 bg-[var(--md-surface-container-low)] border-t border-[var(--md-outline-variant)]">
          <Link
            href="/management/activity"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--md-primary)] hover:underline underline-offset-4"
          >
            View all activity
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </div>
    </AdminSection>
  );
}
