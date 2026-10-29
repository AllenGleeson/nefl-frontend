import type { ReactNode } from "react";

// Shared building blocks for admin pages, styled to match the public site.

export function AdminPageHeader({
  eyebrow = "League admin",
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden bg-[var(--md-primary)] text-[var(--md-on-primary)]">
      <span
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 40px, transparent 40px 80px), radial-gradient(80% 120% at 100% 0%, rgba(139,208,239,0.25), transparent 60%)",
        }}
      />
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--md-primary-container)]">{eyebrow}</p>
          <h1 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-bold">{title}</h1>
          {description && <p className="mt-2 text-white/80 max-w-2xl">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </header>
  );
}

export function AdminSection({ title, children, action }: { title?: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="text-xl font-bold text-[var(--md-on-surface)]">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

const changeColour = {
  positive: "text-emerald-600",
  negative: "text-[var(--md-error)]",
  neutral: "text-[var(--md-on-surface-variant)]",
};

export function StatCard({
  title,
  value,
  icon,
  change,
  changeType = "neutral",
}: {
  title: string;
  value: string | number;
  icon?: ReactNode;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] p-5 shadow-sm">
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--md-primary)] to-[var(--md-primary-container)]" />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[var(--md-on-surface-variant)] truncate">{title}</p>
          <p className="mt-1 text-3xl font-bold text-[var(--md-on-surface)] tabular-nums">{value}</p>
          {change && <p className={`mt-1 text-xs font-medium ${changeColour[changeType]} truncate`}>{change}</p>}
        </div>
        {icon && (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--md-primary-container)]/50 text-xl text-[var(--md-on-primary-container)]">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}
