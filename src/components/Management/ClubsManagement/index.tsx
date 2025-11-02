"use client";

// src/components/Management/ClubsManagement/index.tsx
import { useState } from 'react';
import ClubsManagementHeader from './ClubsManagementHeader';
import ClubsList from './ClubsList';
import AddClubForm from './AddClubForm';
import ClubsStats from './ClubsStats';

// Export formation components for use in club management
export { FormationViewer, FormationManager, FormationEditor } from './Formation';

export default function ClubsManagement() {
  const [isAddClubModalOpen, setIsAddClubModalOpen] = useState(false);

  // Mock current user - in real app this would come from auth context
  const currentUser = {
    id: '1',
    role: 'admin' as const
  };

  const handleAddClub = () => {
    setIsAddClubModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddClubModalOpen(false);
  };

  const handleClubAdded = () => {
    // Here you could refresh the clubs list or show a success message
    console.log('Club added successfully!');
  };
  return (
    <div className="clubs-management">
      <ClubsManagementHeader />
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <ClubsStats />
        <div className="mt-6 sm:mt-8">
          <ClubsList onAddClub={handleAddClub} currentUser={currentUser} />
        </div>
      </div>
      
      {/* Add Club Modal */}
      <AddClubForm 
        isOpen={isAddClubModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleClubAdded}
      />
    </div>
  );
}
