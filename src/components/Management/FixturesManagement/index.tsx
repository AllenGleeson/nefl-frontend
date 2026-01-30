"use client";

// src/components/Management/FixturesManagement/index.tsx
import { useState } from 'react';
import FixturesManagementHeader from './FixturesManagementHeader';
import FixturesList from './FixturesList';
import AddFixtureForm from './AddFixtureForm';
import EditFixtureForm from './EditFixtureForm';
import ScoreEntry from './ScoreEntry';
import FixturesFilter from './FixturesFilter';

// Export components for use in other parts of the app
export { ScoreEntry, EditFixtureForm };

interface GoalDetail {
  id: string;
  player: string;
  time: string;
}

interface Fixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  league: string;
  status: 'scheduled' | 'live' | 'completed' | 'postponed';
  homeScore?: number;
  awayScore?: number;
  homeGoals?: GoalDetail[];
  awayGoals?: GoalDetail[];
}

export default function FixturesManagement() {
  const [filters, setFilters] = useState({
    status: 'all',
    league: 'all',
    team: 'all',
    dateRange: 'all'
  });

  const [isAddFixtureModalOpen, setIsAddFixtureModalOpen] = useState(false);
  const [isEditFixtureModalOpen, setIsEditFixtureModalOpen] = useState(false);
  const [isScoreEntryModalOpen, setIsScoreEntryModalOpen] = useState(false);
  const [selectedFixture, setSelectedFixture] = useState<Fixture | null>(null);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleAddFixture = () => {
    setIsAddFixtureModalOpen(true);
  };

  const handleEditFixture = (fixture: Fixture) => {
    setSelectedFixture(fixture);
    setIsEditFixtureModalOpen(true);
  };

  const handleScoreEntry = (fixture: Fixture) => {
    setSelectedFixture(fixture);
    setIsScoreEntryModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddFixtureModalOpen(false);
    setIsEditFixtureModalOpen(false);
    setIsScoreEntryModalOpen(false);
    setSelectedFixture(null);
  };

  const handleFixtureAdded = () => {
    handleCloseModal();
  };

  const handleFixtureUpdated = () => {
    handleCloseModal();
  };

  const handleScoreUpdated = () => {
    handleCloseModal();
  };

  return (
    <div className="fixtures-management">
      <FixturesManagementHeader />
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <FixturesFilter onFilterChange={handleFilterChange} />
        <div className="mt-6 sm:mt-8">
          <FixturesList 
            filters={filters} 
            onAddFixture={handleAddFixture}
            onEditFixture={handleEditFixture}
            onScoreEntry={handleScoreEntry}
          />
        </div>
      </div>
      
      {/* Add Fixture Modal */}
      <AddFixtureForm 
        isOpen={isAddFixtureModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleFixtureAdded}
      />

      {/* Edit Fixture Modal */}
      <EditFixtureForm
        isOpen={isEditFixtureModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleFixtureUpdated}
        fixture={selectedFixture}
      />

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
        onScoreUpdate={(_fixtureId, _homeScore, _awayScore, _homeGoals, _awayGoals) => {
          handleScoreUpdated();
        }}
      />
    </div>
  );
}
