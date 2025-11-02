"use client";

// src/components/Management/StoreManagement/index.tsx
import { useState } from 'react';
import StoreManagementLayout from './StoreManagementLayout';
import { ProductsList, AddProductForm } from './Products';
import StoreStats from './StoreStats';

export default function StoreManagement() {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const handleAddProduct = () => {
    setIsAddProductModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddProductModalOpen(false);
  };

  const handleProductAdded = () => {
    console.log('Product added successfully');
    setIsAddProductModalOpen(false);
  };

  return (
    <StoreManagementLayout currentPage="overview" pageTitle="Store Management">
      <StoreStats />
      <div className="mt-6 sm:mt-8">
        <ProductsList onAddProduct={handleAddProduct} />
      </div>

      <AddProductForm 
        isOpen={isAddProductModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleProductAdded}
      />
    </StoreManagementLayout>
  );
}
