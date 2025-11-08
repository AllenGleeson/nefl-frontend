"use client";

// src/components/Fixture/SubstitutesSection.tsx
interface Substitute {
  id: string;
  name: string;
  position: string;
  number: number;
  team: 'home' | 'away';
}

interface SubstitutesSectionProps {
  substitutes: Substitute[];
}

export default function SubstitutesSection({ substitutes }: SubstitutesSectionProps) {
  const homeSubs = substitutes.filter(sub => sub.team === 'home');
  const awaySubs = substitutes.filter(sub => sub.team === 'away');

  return (
    <div className="rounded-lg p-6 mb-6">
      <h3 className="text-lg font-bold mb-4">Substitutes</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Home Substitutes */}
        <div>
          <h4 className="font-semibold text-sm text-gray-600 mb-3">Home Team</h4>
          <div className="space-y-2">
            {homeSubs.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
                    {sub.number}
                  </span>
                  <div>
                    <p className="font-medium text-sm">{sub.name}</p>
                    <p className="text-xs text-gray-500">{sub.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Away Substitutes */}
        <div>
          <h4 className="font-semibold text-sm text-gray-600 mb-3">Away Team</h4>
          <div className="space-y-2">
            {awaySubs.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
                    {sub.number}
                  </span>
                  <div>
                    <p className="font-medium text-sm">{sub.name}</p>
                    <p className="text-xs text-gray-500">{sub.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
