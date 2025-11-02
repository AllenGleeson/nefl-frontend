"use client";

import { Fixture } from "@/data/club";

interface ClubFixturesProps {
    fixtures: Fixture[];
}

export default function ClubFixtures({ fixtures }: ClubFixturesProps) {
    return (
        <div className="p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Fixtures & Results</h2>
            <div className="space-y-3">
                {fixtures.map((fixture, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-white/10 transition border border-white/10">
                        <div className="flex-1">
                            <p className="text-sm text-white/60 mb-1">{fixture.date}</p>
                            <p className="font-medium">
                                vs {fixture.opponent}
                            </p>
                        </div>
                        <div className="text-right">
                            {fixture.result ? (
                                <p className="text-blue-400 font-semibold text-lg">{fixture.result}</p>
                            ) : (
                                <p className="text-white/50 text-sm">Upcoming</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}