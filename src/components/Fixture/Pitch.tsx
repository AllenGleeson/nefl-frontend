"use client";

// src/components/Fixture/Pitch.tsx
import { ReactNode } from 'react';

interface PitchProps {
  children: ReactNode;
}

export default function Pitch({ children }: PitchProps) {
  return (
    <div className="relative w-full h-[450px] bg-green-500 rounded-lg border-4 border-white overflow-hidden">
      {/* Center Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white"></div>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-white rounded-full"></div>
      
      {/* Left Goal (Home Team) */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-20 border-4 border-white bg-white"></div>
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-24 border-4 border-white"></div>
      
      {/* Right Goal (Away Team) */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-20 border-4 border-white bg-white"></div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-24 border-4 border-white"></div>
      
      {/* Penalty Areas */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-32 border-4 border-white"></div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-32 border-4 border-white"></div>
      
      {/* Player positions rendered as children */}
      {children}
    </div>
  );
}

