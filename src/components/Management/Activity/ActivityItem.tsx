import { CalendarDays, CircleCheck, Newspaper, Settings, Shield, UserCog } from "lucide-react";
import type { ActivityType, AdminActivity } from "@/data/adminActivity";
import { roleBadge, roleLabels } from "@/data/adminUsers";

const icons: Record<ActivityType, typeof CalendarDays> = {
  fixture: CalendarDays,
  result: CircleCheck,
  club: Shield,
  news: Newspaper,
  user: UserCog,
  general: Settings,
};

export function formatActivityTime(iso: string, withDate = false) {
  const d = new Date(iso);
  const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  if (!withDate) return time;
  return `${d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}, ${time}`;
}

export default function ActivityItem({ item, showDate = false }: { item: AdminActivity; showDate?: boolean }) {
  const Icon = icons[item.type];
  return (
    <li className="flex items-start gap-3 sm:gap-4 py-3 sm:py-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--md-primary-container)]/50 text-[var(--md-on-primary-container)]">
        <Icon className="w-4 h-4" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-3">
          <h3 className="text-sm font-semibold text-[var(--md-on-surface)]">{item.title}</h3>
          <time dateTime={item.at} className="shrink-0 text-xs text-[var(--md-on-surface-variant)]">
            {formatActivityTime(item.at, showDate)}
          </time>
        </div>
        <p className="mt-0.5 text-sm text-[var(--md-on-surface-variant)]">{item.description}</p>
        <p className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-[var(--md-on-surface-variant)]">
          <span>
            by <span className="font-semibold text-[var(--md-on-surface)]">{item.user.name}</span>
          </span>
          <span className="text-[var(--md-on-surface-variant)]/80">@{item.user.username}</span>
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${roleBadge[item.user.role]}`}>
            {roleLabels[item.user.role]}
          </span>
        </p>
      </div>
    </li>
  );
}
