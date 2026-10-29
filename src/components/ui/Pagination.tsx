"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonStyles } from "./Button";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Label for screen readers, e.g. "Activity pages" */
  label?: string;
};

/** Page numbers to show: always first and last, the current page and its neighbours, with gaps as null */
function pageList(page: number, total: number): (number | null)[] {
  const pages = new Set([1, total, page - 1, page, page + 1].filter((p) => p >= 1 && p <= total));
  const sorted = Array.from(pages).sort((a, b) => a - b);
  const out: (number | null)[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push(null);
    out.push(p);
  });
  return out;
}

export default function Pagination({ page, totalPages, onPageChange, label = "Pages" }: Props) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label={label} className="flex flex-wrap items-center justify-center gap-1.5">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={buttonStyles({ variant: "outline", size: "sm" })}
      >
        <ChevronLeft className="w-4 h-4" aria-hidden />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {pageList(page, totalPages).map((p, i) =>
        p === null ? (
          <span key={`gap-${i}`} className="px-1 text-[var(--md-on-surface-variant)]" aria-hidden>
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
            aria-label={`Page ${p}`}
            className={buttonStyles({ variant: p === page ? "primary" : "outline", size: "icon-sm" })}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={buttonStyles({ variant: "outline", size: "sm" })}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" aria-hidden />
      </button>
    </nav>
  );
}
