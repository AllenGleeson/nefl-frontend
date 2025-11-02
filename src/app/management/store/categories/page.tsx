"use client";

// src/app/management/store/categories/page.tsx
import { useState } from 'react';
import StoreManagementLayout from "@/components/Management/StoreManagement/StoreManagementLayout";
import { CategoriesList, AddCategoryForm, CategoryTree } from "@/components/Management/StoreManagement/Categories";

export default function CategoriesManagementPage() {
  const [activeTab, setActiveTab] = useState<'list' | 'tree'>('list');
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const handleAddCategory = () => {
    setIsAddCategoryModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddCategoryModalOpen(false);
  };

  const handleCategoryAdded = () => {
    console.log('Category added successfully');
    setIsAddCategoryModalOpen(false);
  };

  return (
    <StoreManagementLayout currentPage="categories" pageTitle="Categories">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="px-4 sm:px-6">
          <nav className="flex space-x-8 overflow-x-auto" aria-label="Categories Navigation">
            <button
              onClick={() => setActiveTab('list')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'list'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Categories List
            </button>
            <button
              onClick={() => setActiveTab('tree')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'tree'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Category Tree
            </button>
          </nav>
        </div>
      </div>

      {/* Active Component */}
      {activeTab === 'list' ? (
        <CategoriesList onAddCategory={handleAddCategory} />
      ) : (
        <CategoryTree />
      )}
      
      <AddCategoryForm 
        isOpen={isAddCategoryModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleCategoryAdded}
      />
    </StoreManagementLayout>
  );
}
