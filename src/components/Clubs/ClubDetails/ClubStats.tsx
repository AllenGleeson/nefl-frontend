"use client";

interface ClubStatsProps {
    league: string;
    position: number;
    matchesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
}

export default function ClubStats({ 
    league: _league, 
    position, 
    matchesPlayed, 
    wins, 
    draws, 
    losses, 
    goalsFor, 
    goalsAgainst 
}: ClubStatsProps) {
    const points = (wins * 3) + (draws * 1);
    const goalDifference = goalsFor - goalsAgainst;

    return (
        <div className="p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Current Season Stats</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{position}</div>
                    <div className="text-sm text-white/70">League Position</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{points}</div>
                    <div className="text-sm text-white/70">Points</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{matchesPlayed}</div>
                    <div className="text-sm text-white/70">Matches Played</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">{goalDifference > 0 ? '+' : ''}{goalDifference}</div>
                    <div className="text-sm text-white/70">Goal Difference</div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/5 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{wins}</div>
                    <div className="text-sm text-white/70">Wins</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-600">{draws}</div>
                    <div className="text-sm text-white/70">Draws</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">{losses}</div>
                    <div className="text-sm text-white/70">Losses</div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex justify-between text-sm">
                    <span className="text-white/70">Goals For: <span className="font-semibold text-green-600">{goalsFor}</span></span>
                    <span className="text-white/70">Goals Against: <span className="font-semibold text-red-600">{goalsAgainst}</span></span>
                </div>
            </div>
        </div>
    );
}