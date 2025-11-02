"use client";

// src/app/management/store/orders/page.tsx
import { useState } from 'react';
import StoreManagementLayout from "@/components/Management/StoreManagement/StoreManagementLayout";
import { OrdersList, OrderDetails, OrderFilters } from "@/components/Management/StoreManagement/Orders";

export default function OrdersManagementPage() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [, setFilters] = useState({
    status: '',
    paymentStatus: '',
    dateRange: '',
    search: ''
  });

  const handleOrderClick = (orderId: string) => {
    setSelectedOrderId(orderId);
  };

  const handleCloseOrderDetails = () => {
    setSelectedOrderId(null);
  };

  const handleFiltersChange = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
    console.log('Filters changed:', newFilters);
  };

  return (
    <StoreManagementLayout currentPage="orders" pageTitle="Orders">
      <OrderFilters onFiltersChange={handleFiltersChange} />
      <OrdersList onOrderClick={handleOrderClick} />
      
      {selectedOrderId && (
        <OrderDetails 
          orderId={selectedOrderId} 
          onClose={handleCloseOrderDetails} 
        />
      )}
    </StoreManagementLayout>
  );
}
