"use client"

import ClubsSearchBar from "./ClubsSearchBar"

type Props = {
    setSearch?: (q: string) => void
    showSearch?: boolean
}

export default function ClubsHeader({
    setSearch,
    showSearch = true,
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

            {/* Search Bar */}
            {showSearch && setSearch && (
                <div className="flex justify-center">
                    <ClubsSearchBar setSearch={setSearch} />
                </div>
            )}
        </div>
    );
}