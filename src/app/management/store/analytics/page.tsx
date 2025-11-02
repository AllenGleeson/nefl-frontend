"use client";

// src/app/management/store/analytics/page.tsx
import { useState } from 'react';
import StoreManagementLayout from "@/components/Management/StoreManagement/StoreManagementLayout";
import { SalesChart, TopProducts, RevenueReport } from "@/components/Management/StoreManagement/Analytics";

export default function AnalyticsManagementPage() {
  const [activeTab, setActiveTab] = useState<'sales' | 'products' | 'revenue'>('sales');

  const tabs = [
    { id: 'sales', label: 'Sales Chart', component: SalesChart },
    { id: 'products', label: 'Top Products', component: TopProducts },
    { id: 'revenue', label: 'Revenue Report', component: RevenueReport },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || SalesChart;

  return (
    <StoreManagementLayout currentPage="analytics" pageTitle="Analytics">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="px-4 sm:px-6">
          <nav className="flex space-x-8 overflow-x-auto" aria-label="Analytics Navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'sales' | 'products' | 'revenue')}
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
