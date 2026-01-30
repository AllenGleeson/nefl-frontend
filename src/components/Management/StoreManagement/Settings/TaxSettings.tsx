"use client";

// src/components/Management/StoreManagement/Settings/TaxSettings.tsx
import { useState } from 'react';

interface TaxRate {
  id: string;
  name: string;
  rate: number;
  type: 'percentage' | 'fixed';
  countries: string[];
  enabled: boolean;
}

export default function TaxSettings() {
  const [taxRates] = useState<TaxRate[]>([
    {
      id: '1',
      name: 'VAT Ireland',
      rate: 23,
      type: 'percentage',
      countries: ['Ireland'],
      enabled: true
    },
    {
      id: '2',
      name: 'VAT UK',
      rate: 20,
      type: 'percentage',
      countries: ['United Kingdom'],
      enabled: true
    },
    {
      id: '3',
      name: 'VAT EU',
      rate: 19,
      type: 'percentage',
      countries: ['Germany', 'France', 'Spain', 'Italy'],
      enabled: true
    },
    {
      id: '4',
      name: 'No Tax',
      rate: 0,
      type: 'percentage',
      countries: ['United States', 'Canada'],
      enabled: false
    }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Here you would make the actual API call to save tax settings
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-bold">Tax Settings</h2>
          <div className="flex flex-row gap-2 flex-wrap">
            <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
              Add Tax Rate
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
            <strong>Instructions:</strong> Configure tax rates for different regions. Tax will be automatically calculated based on customer location.
          </p>
        </div>
        
        <div className="space-y-4">
          {taxRates.map((tax) => (
            <div key={tax.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              {/* Mobile Layout */}
              <div className="block sm:hidden">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-semibold">{tax.name}</h3>
                    <p className="text-sm text-gray-600">{tax.countries.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      {tax.type === 'percentage' ? `${tax.rate}%` : `€${tax.rate}`}
                    </p>
                    <p className="text-xs text-gray-500">{tax.type}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tax.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {tax.enabled ? 'Enabled' : 'Disabled'}
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
                      <span className="text-lg">🧾</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{tax.name}</h3>
                    <p className="text-sm text-gray-600">{tax.countries.join(', ')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Rate</p>
                    <p className="text-lg font-bold">
                      {tax.type === 'percentage' ? `${tax.rate}%` : `€${tax.rate}`}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="text-lg font-medium capitalize">{tax.type}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tax.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {tax.enabled ? 'Enabled' : 'Disabled'}
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

        {/* Add New Tax Rate Button */}
        <div className="mt-6 text-center">
          <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300 w-full">
            + Add New Tax Rate
          </button>
        </div>

        {/* Tax Information */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="text-sm font-semibold text-yellow-800 mb-2">Tax Information</h4>
          <ul className="text-xs text-yellow-700 space-y-1">
            <li>• Tax rates are automatically applied based on customer location</li>
            <li>• EU customers will see VAT included in prices</li>
            <li>• Non-EU customers may be subject to local tax laws</li>
            <li>• Consult with a tax professional for compliance requirements</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
