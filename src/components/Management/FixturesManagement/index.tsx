"use client";

// src/components/Management/FixturesManagement/index.tsx
import { useState } from 'react';
import FixturesManagementHeader from './FixturesManagementHeader';
import FixturesList from './FixturesList';
import EditFixtureForm from './EditFixtureForm';
import ScoreEntry from './ScoreEntry';
import FixturesFilter from './FixturesFilter';
import type { AdminFixture } from './types';

// Export components for use in other parts of the app
export { ScoreEntry, EditFixtureForm };

type Fixture = AdminFixture;

export default function FixturesManagement() {
  const [filters, setFilters] = useState({
    status: 'all',
    league: 'all',
    team: 'all',
    dateRange: 'all'
  });

  const [isScoreEntryModalOpen, setIsScoreEntryModalOpen] = useState(false);
  const [selectedFixture, setSelectedFixture] = useState<Fixture | null>(null);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleScoreEntry = (fixture: Fixture) => {
    setSelectedFixture(fixture);
    setIsScoreEntryModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsScoreEntryModalOpen(false);
    setSelectedFixture(null);
  };

  const handleScoreUpdated = () => {
    handleCloseModal();
  };

  return (
    <div className="fixtures-management">
      <FixturesManagementHeader />
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <FixturesFilter onFilterChange={handleFilterChange} />
        <div className="mt-6 sm:mt-8">
          <FixturesList 
            filters={filters} 
            onScoreEntry={handleScoreEntry}
          />
        </div>
      </div>
      


      {/* Score Entry Modal */}
      <ScoreEntry
        isOpen={isScoreEntryModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleScoreUpdated}
        fixtureId={selectedFixture?.id || ''}
        homeTeam={selectedFixture?.homeTeam || ''}
        awayTeam={selectedFixture?.awayTeam || ''}
        currentHomeScore={selectedFixture?.homeScore}
        currentAwayScore={selectedFixture?.awayScore}
        onScoreUpdate={(_fixtureId, _homeScore, _awayScore) => {
          handleScoreUpdated();
        }}
      />
    </div>
  );
}
