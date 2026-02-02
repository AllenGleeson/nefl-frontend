"use client"

import ClubsSearchBar from "./ClubsSearchBar"

export const ALL_LEAGUES_VALUE = ""

type Props = {
    setSearch?: (q: string) => void
    showSearch?: boolean
    selectedLeague?: string
    setSelectedLeague?: (league: string) => void
    leagueOptions?: string[]
}

export default function ClubsHeader({
    setSearch,
    showSearch = true,
    selectedLeague = ALL_LEAGUES_VALUE,
    setSelectedLeague,
    leagueOptions = [],
}: Props) {
    return (
        <div className="mb-12">
            {/* Title and Description */}
            <div className="text-center mb-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    Clubs
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                    Discover and explore all the clubs competing in our leagues.
                </p>
            </div>

            {/* Search Bar + League Dropdown */}
            {showSearch && setSearch && (
                <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 max-w-2xl mx-auto">
                    <ClubsSearchBar setSearch={setSearch} />
                    {setSelectedLeague && leagueOptions.length > 0 && (
                        <select
                            value={selectedLeague}
                            onChange={(e) => setSelectedLeague(e.target.value)}
                            className="bg-white/10 border border-white/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 hover:border-white/40 hover:bg-white/20 transition-all duration-200 shadow-sm min-w-[180px] sm:min-w-[200px] cursor-pointer"
                        >
                            <option value={ALL_LEAGUES_VALUE} className="bg-gray-800 text-white">
                                All leagues
                            </option>
                            {leagueOptions.map((name) => (
                                <option key={name} value={name} className="bg-gray-800 text-white">
                                    {name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            )}
        </div>
    );
}