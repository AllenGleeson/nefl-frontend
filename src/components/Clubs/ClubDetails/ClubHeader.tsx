"use client";

import Image from "next/image";
import { FaFacebook, FaGlobe, FaInstagram, FaXTwitter } from "react-icons/fa6";

interface ClubHeaderProps {
    name: string;
    logo: string;
    founded: number;
    ground: string;
    bio: string;
    website?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
}

export default function ClubHeader({ name, logo, founded, ground, bio, website, facebook, instagram, twitter }: ClubHeaderProps) {
    return (
        <div className="p-10 mb-4 relative">
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
                    </div>
                    <p className="text-white/80 mb-4">{bio}</p>
                    {(website || facebook || instagram || twitter) && (
                        <div className="flex flex-wrap items-center gap-2">
                            {website && (
                                <a
                                    href={website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                                    aria-label="Visit website"
                                >
                                    <FaGlobe className="w-5 h-5" />
                                </a>
                            )}
                            {facebook && (
                                <a
                                    href={facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-[#1877F2] hover:text-white transition-colors"
                                    aria-label="Facebook"
                                >
                                    <FaFacebook className="w-5 h-5" />
                                </a>
                            )}
                            {instagram && (
                                <a
                                    href={instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-[#E4405F] hover:text-white transition-colors"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram className="w-5 h-5" />
                                </a>
                            )}
                            {twitter && (
                                <a
                                    href={twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-[var(--md-on-surface)] hover:text-white transition-colors"
                                    aria-label="X (Twitter)"
                                >
                                    <FaXTwitter className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}