"use client";

// src/app/management/store/settings/page.tsx
import { useState } from 'react';
import StoreManagementLayout from "@/components/Management/StoreManagement/StoreManagementLayout";
import { StoreSettingsForm, ShippingSettings, TaxSettings } from "@/components/Management/StoreManagement/Settings";

export default function SettingsManagementPage() {
  const [activeTab, setActiveTab] = useState<'store' | 'shipping' | 'tax'>('store');

  const tabs = [
    { id: 'store', label: 'Store Settings', component: StoreSettingsForm },
    { id: 'shipping', label: 'Shipping', component: ShippingSettings },
    { id: 'tax', label: 'Tax Settings', component: TaxSettings },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || StoreSettingsForm;

  return (
    <StoreManagementLayout currentPage="settings" pageTitle="Settings">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="px-4 sm:px-6">
          <nav className="flex space-x-8 overflow-x-auto" aria-label="Settings Navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'store' | 'shipping' | 'tax')}
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
