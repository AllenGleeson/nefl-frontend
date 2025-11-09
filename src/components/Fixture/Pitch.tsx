"use client";

// src/components/Fixture/Pitch.tsx
import { ReactNode } from 'react';

interface PitchProps {
  children: ReactNode;
}

export default function Pitch({ children }: PitchProps) {
  return (
    <div className="relative w-full h-[450px] bg-green-400/70 border-4 border-white overflow-hidden">
      {/* Center Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white"></div>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-38 h-38 border-4 border-white rounded-full"></div>
      
      {/* Left Goal (Home Team) */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-28 border-t-4 border-r-4 border-b-4 border-white"></div>
      
      {/* Right Goal (Away Team) */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-28 border-t-4 border-l-4 border-b-4 border-white"></div>
      
      {/* Penalty Areas */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-32 h-45 border-t-4 border-r-4 border-b-4 border-white"></div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-45 border-t-4 border-l-4 border-b-4 border-white"></div>
      
      {/* Player positions rendered as children */}
      {children}
    </div>
  );
}

