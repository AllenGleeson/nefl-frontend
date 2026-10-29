"use client";

import type { ReactNode } from "react";

export type IconToggleOption<T extends string> = {
  value: T;
  label: string;
  icon: ReactNode;
};

type Props<T extends string> = {
  options: [IconToggleOption<T>, IconToggleOption<T>];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
};

// Two-option segmented control that shows icons only. The label is used for
// the tooltip and screen readers.
export default function IconToggle<T extends string>({ options, value, onChange, ariaLabel }: Props<T>) {
  const activeIndex = options.findIndex((o) => o.value === value);

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="relative flex bg-[var(--md-surface-container)] rounded-full p-1 h-11 sm:h-12 shadow-sm shrink-0"
    >
      <div
        aria-hidden
        className="absolute top-1 bottom-1 left-1 w-11 sm:w-12 bg-[var(--md-primary)] rounded-full shadow-md transition-transform duration-300"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={active}
            aria-label={option.label}
            title={option.label}
            className={`relative z-10 w-11 sm:w-12 h-full rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] focus-visible:ring-offset-2 ${
              active
                ? "text-[var(--md-on-primary)]"
                : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)]"
            }`}
          >
            {option.icon}
          </button>
        );
      })}
    </div>
  );
}
