"use client";

// src/components/Management/StoreManagement/Settings/ShippingSettings.tsx
import { useState } from 'react';

interface ShippingZone {
  id: string;
  name: string;
  countries: string[];
  rate: number;
  freeShippingThreshold: number;
  enabled: boolean;
}

export default function ShippingSettings() {
  const [shippingZones] = useState<ShippingZone[]>([
    {
      id: '1',
      name: 'Ireland',
      countries: ['Ireland'],
      rate: 5.99,
      freeShippingThreshold: 50,
      enabled: true
    },
    {
      id: '2',
      name: 'UK',
      countries: ['United Kingdom'],
      rate: 8.99,
      freeShippingThreshold: 75,
      enabled: true
    },
    {
      id: '3',
      name: 'Europe',
      countries: ['Germany', 'France', 'Spain', 'Italy', 'Netherlands'],
      rate: 12.99,
      freeShippingThreshold: 100,
      enabled: true
    },
    {
      id: '4',
      name: 'Rest of World',
      countries: ['United States', 'Canada', 'Australia'],
      rate: 19.99,
      freeShippingThreshold: 150,
      enabled: false
    }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving shipping settings:', shippingZones);
      // Here you would make the actual API call to save shipping settings
    } catch (error) {
      console.error('Error saving shipping settings:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-bold">Shipping Settings</h2>
          <div className="flex flex-row gap-2 flex-wrap">
            <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
              Add Zone
            </button>
            <button 
              onClick={handleSave}
              disabled={isSubmitting}
              className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>

        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Instructions:</strong> Configure shipping zones and rates for different regions. Customers will see shipping costs based on their location.
          </p>
        </div>
        
        <div className="space-y-4">
          {shippingZones.map((zone) => (
            <div key={zone.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              {/* Mobile Layout */}
              <div className="block sm:hidden">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-semibold">{zone.name}</h3>
                    <p className="text-sm text-gray-600">{zone.countries.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">€{zone.rate}</p>
                    <p className="text-xs text-gray-500">Free over €{zone.freeShippingThreshold}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    zone.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {zone.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                  <div className="flex space-x-2">
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">🚚</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{zone.name}</h3>
                    <p className="text-sm text-gray-600">{zone.countries.join(', ')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Rate</p>
                    <p className="text-lg font-bold">€{zone.rate}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Free Shipping</p>
                    <p className="text-lg font-medium">€{zone.freeShippingThreshold}+</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      zone.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {zone.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-green-600 hover:text-green-800 text-sm">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Zone Button */}
        <div className="mt-6 text-center">
          <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300 w-full">
            + Add New Shipping Zone
          </button>
        </div>
      </div>
    </div>
  );
}
