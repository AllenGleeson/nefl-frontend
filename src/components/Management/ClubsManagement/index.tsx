"use client";

// src/components/Management/ClubsManagement/index.tsx
import ClubsManagementHeader from './ClubsManagementHeader';
import ClubsList from './ClubsList';
import ClubsStats from './ClubsStats';
import { currentUser } from '@/data/adminUsers';


export default function ClubsManagement() {
  return (
    <div className="clubs-management">
      <ClubsManagementHeader />
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <ClubsStats />
        <div className="mt-6 sm:mt-8">
          <ClubsList currentUser={currentUser} />
        </div>
      </div>
      
    </div>
  );
}
