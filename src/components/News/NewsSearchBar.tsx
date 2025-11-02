"use client"

type Props = {
    setSearch: (q: string) => void
}

export default function NewsSearchBar({ setSearch }: Props) {
    return (
        <input
            type="text"
            placeholder="Search news articles..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-lg bg-[var(--md-surface-container)] border border-[var(--md-outline)] rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-[var(--md-on-surface)] placeholder-[var(--md-on-surface-variant)] focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] focus:border-[var(--md-primary)] hover:border-[var(--md-primary)] hover:bg-[var(--md-surface-container-high)] transition-all duration-200 shadow-sm"
        />
    )
}
