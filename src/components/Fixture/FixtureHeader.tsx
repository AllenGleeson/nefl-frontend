"use client";

// src/components/Fixture/FixtureHeader.tsx
interface FixtureHeaderProps {
  homeTeam: {
    name: string;
    logo: string;
    score: number;
  };
  awayTeam: {
    name: string;
    logo: string;
    score: number;
  };
  status: string;
  date: string;
  venue: string;
}

export default function FixtureHeader({ homeTeam, awayTeam, status, date, venue }: FixtureHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="text-center mb-4">
        <div className="text-sm text-gray-600 mb-2">{date}</div>
        <div className="text-lg font-semibold text-gray-800">{venue}</div>
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
          status === 'FT' ? 'bg-green-100 text-green-800' : 
          status === 'LIVE' ? 'bg-red-100 text-red-800' : 
          'bg-blue-100 text-blue-800'
        }`}>
          {status}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        {/* Home Team */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="text-right flex-1">
            <h2 className="text-xl font-bold">{homeTeam.name}</h2>
          </div>
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🏠</span>
          </div>
        </div>
        
        {/* Score */}
        <div className="mx-8 text-center">
          <div className="text-4xl font-bold text-gray-900">
            {homeTeam.score} - {awayTeam.score}
          </div>
        </div>
        
        {/* Away Team */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">✈️</span>
          </div>
          <div className="text-left flex-1">
            <h2 className="text-xl font-bold">{awayTeam.name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
