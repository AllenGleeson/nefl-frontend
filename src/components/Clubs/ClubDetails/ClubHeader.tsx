"use client";

import Image from "next/image";

interface ClubHeaderProps {
    name: string;
    logo: string;
    founded: number;
    ground: string;
    bio: string;
    leagues: string[];
    website?: string;
}

export default function ClubHeader({ name, logo, founded, ground, bio, leagues, website }: ClubHeaderProps) {
    return (
        <div className="p-8 mb-8 relative">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
                <div className="flex-shrink-0">
                    <Image
                        src={logo}
                        alt={`${name} logo`}
                        width={150}
                        height={150}
                        className="w-24 h-24 md:w-32 md:h-32 object-contain"
                    />
                </div>
                <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-2">{name}</h1>
                    <div className="flex flex-wrap gap-4 mb-3 text-sm text-white/70">
                        <span>Founded: {founded}</span>
                        <span>Ground: {ground}</span>
                        <span>League: {leagues.join(", ")}</span>
                    </div>
                    <p className="text-white/80 mb-4">{bio}</p>
                    {website && (
                        <a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 text-sm rounded-xl transition bg-blue-100 border border-blue-300 text-blue-900 hover:bg-blue-200"
                        >
                            Visit Website
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}