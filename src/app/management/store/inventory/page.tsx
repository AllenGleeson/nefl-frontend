"use client";

// src/app/management/store/inventory/page.tsx
import { useState } from 'react';
import StoreManagementLayout from "@/components/Management/StoreManagement/StoreManagementLayout";
import { InventoryList, StockAlerts, BulkStockUpdate } from "@/components/Management/StoreManagement/Inventory";

export default function InventoryManagementPage() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'alerts' | 'bulk'>('inventory');

  const tabs = [
    { id: 'inventory', label: 'Inventory List', component: InventoryList },
    { id: 'alerts', label: 'Stock Alerts', component: StockAlerts },
    { id: 'bulk', label: 'Bulk Update', component: BulkStockUpdate },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || InventoryList;

  return (
    <StoreManagementLayout currentPage="inventory" pageTitle="Inventory">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="px-4 sm:px-6">
          <nav className="flex space-x-8 overflow-x-auto" aria-label="Inventory Navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Active Component */}
      <ActiveComponent />
    </StoreManagementLayout>
  );
}
