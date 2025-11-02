"use client"

type Props = {
    setSearch: (q: string) => void
}

export default function ClubsSearchBar({ setSearch }: Props) {
    return (
        <input
            type="text"
            placeholder="Search clubs..."
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 max-w-lg bg-white/10 border border-white/30 rounded-xl px-4 py-2.5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 hover:border-white/40 hover:bg-white/20 transition-all duration-200 shadow-sm"
        />
    )
}

