"use client";

// src/components/Fixture/ManagersSection.tsx
interface Manager {
  name: string;
  photo: string;
  team: string;
}

interface ManagersSectionProps {
  homeManager: Manager;
  awayManager: Manager;
}

export default function ManagersSection({ homeManager, awayManager }: ManagersSectionProps) {
  return (
    <div className="rounded-lg p-6 mb-6">
      <h3 className="text-lg font-bold mb-4">Managers</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Home Manager */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">👨‍💼</span>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-600">{homeManager.team}</h4>
            <p className="font-bold text-lg">{homeManager.name}</p>
          </div>
        </div>
        
        {/* Away Manager */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">👨‍💼</span>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-600">{awayManager.team}</h4>
            <p className="font-bold text-lg">{awayManager.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
