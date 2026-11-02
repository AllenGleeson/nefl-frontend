// src/components/Clubs/ClubDetails/Pitch.tsx
import { ReactNode } from "react";

interface PitchProps {
  children: ReactNode;
}

const line = "border-2 border-white/80";

/**
 * A football pitch drawn sideways, scaling with its container.
 * Children are positioned with percentages of the pitch's width and height.
 */
export default function Pitch({ children }: PitchProps) {
  return (
    <div className="relative w-full aspect-[105/68] cursor-default select-none rounded-xl overflow-hidden bg-[repeating-linear-gradient(90deg,#2e8b45_0_10%,#287c3d_10%_20%)]">
      {/* Markings */}
      <div aria-hidden className={`absolute inset-[3%] ${line}`}>
        <div className="absolute left-1/2 inset-y-0 w-0.5 -translate-x-1/2 bg-white/80" />
        <div className={`absolute left-1/2 top-1/2 h-[28%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full ${line}`} />
        <div className="absolute left-1/2 top-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80" />
        {/* Penalty and goal areas */}
        <div className={`absolute left-0 top-1/2 w-[16%] h-[60%] -translate-y-1/2 border-l-0 ${line}`} />
        <div className={`absolute right-0 top-1/2 w-[16%] h-[60%] -translate-y-1/2 border-r-0 ${line}`} />
        <div className={`absolute left-0 top-1/2 w-[5.5%] h-[27%] -translate-y-1/2 border-l-0 ${line}`} />
        <div className={`absolute right-0 top-1/2 w-[5.5%] h-[27%] -translate-y-1/2 border-r-0 ${line}`} />
      </div>

      {children}
    </div>
  );
}
