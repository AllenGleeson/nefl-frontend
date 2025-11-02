"use client";

// src/app/management/store/products/page.tsx
import { useState } from 'react';
import StoreManagementLayout from "@/components/Management/StoreManagement/StoreManagementLayout";
import { ProductsList, AddProductForm } from "@/components/Management/StoreManagement/Products";

export default function ProductsManagementPage() {
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
    <StoreManagementLayout currentPage="products" pageTitle="Products">
      <ProductsList onAddProduct={handleAddProduct} />
      
      <AddProductForm 
        isOpen={isAddProductModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleProductAdded}
      />
    </StoreManagementLayout>
  );
}
