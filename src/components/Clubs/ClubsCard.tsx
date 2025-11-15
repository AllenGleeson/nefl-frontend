"use client"

import Image from "next/image";
import { Club } from "@/data/club";

interface ClubsCardProps {
  club: Club;
  isSelected?: boolean;
  shouldHide?: boolean;
  onCardClick: (slug: string) => void;
}

export default function ClubsCard({ club, isSelected = false, shouldHide = false, onCardClick }: ClubsCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onCardClick(club.slug)
  }

  return (
    <div
      onClick={!isSelected ? handleClick : undefined}
      className={`relative cursor-pointer transition-all duration-1000 ${isSelected
          ? 'absolute inset-0 z-50 flex items-center justify-center'
          : shouldHide
            ? 'opacity-0 pointer-events-none'
            : 'block'
        }`}
    >
      <div className={`flex flex-col items-center justify-center transition-all duration-1000 ${isSelected
          ? 'w-full h-full p-12'
          : 'p-3'
        }`}>
        <Image
          src={club.logo}
          alt={club.name}
          width={isSelected ? 800 : 200}
          height={isSelected ? 800 : 200}
          className={`object-contain transition-all duration-1000 ${isSelected
              ? 'w-full h-full max-w-full max-h-full'
              : 'group-hover:grayscale group-hover:opacity-75'
            }`}
          style={isSelected ? { width: '100%', height: '100%' } : {}}
        />
        <h2 className={`text-xl font-bold text-center text-white transition-all duration-700 ${isSelected ? 'opacity-0 absolute' : ''
          }`}>{club.name}</h2>
      </div>
    </div>
  );
}