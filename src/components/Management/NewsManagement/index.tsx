"use client";

// src/components/Management/NewsManagement/index.tsx
import { useState } from 'react';
import NewsManagementHeader from './NewsManagementHeader';
import NewsList from './NewsList';
import AddNewsForm from './AddNewsForm';
import NewsStats from './NewsStats';

export default function NewsManagement() {
  const [isAddNewsModalOpen, setIsAddNewsModalOpen] = useState(false);

  const handleAddNews = () => {
    setIsAddNewsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddNewsModalOpen(false);
  };

  const handleNewsAdded = () => {
    // Here you could refresh the news list or show a success message
    console.log('News article added successfully!');
  };

  return (
    <div className="news-management">
      <NewsManagementHeader />
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <NewsStats />
        <div className="mt-6 sm:mt-8">
          <NewsList onAddNews={handleAddNews} />
        </div>
      </div>
      
      {/* Add News Modal */}
      <AddNewsForm 
        isOpen={isAddNewsModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleNewsAdded}
      />
    </div>
  );
}
