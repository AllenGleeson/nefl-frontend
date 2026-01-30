"use client";

// src/components/Management/LeaguesManagement/index.tsx
import { useState } from 'react';
import LeaguesManagementHeader from './LeaguesManagementHeader';
import LeaguesList from './LeaguesList';
import AddLeagueForm from './AddLeagueForm';
import LeagueTable from './LeagueTable';

export default function LeaguesManagement() {
  const [isAddLeagueModalOpen, setIsAddLeagueModalOpen] = useState(false);

  const handleAddLeague = () => {
    setIsAddLeagueModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddLeagueModalOpen(false);
  };

  const handleLeagueAdded = () => {
    // Refresh the leagues list or handle success
    setIsAddLeagueModalOpen(false);
  };

  return (
    <div className="leagues-management">
      <LeaguesManagementHeader />
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          <LeaguesList onAddLeague={handleAddLeague} />
          <LeagueTable />
        </div>
      </div>

      <AddLeagueForm 
        isOpen={isAddLeagueModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleLeagueAdded}
      />
    </div>
  );
}
