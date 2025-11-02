"use client";

// src/components/Management/StoreManagement/Inventory/InventoryList.tsx
import { useState } from 'react';

interface InventoryItem {
  id: string;
  productName: string;
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastUpdated: string;
  cost: number;
  price: number;
}

export default function InventoryList() {
  const [inventory] = useState<InventoryItem[]>([
    {
      id: '1',
      productName: 'NEFL Official Jersey',
      sku: 'JER-001',
      category: 'Jerseys',
      currentStock: 25,
      minStock: 10,
      maxStock: 100,
      status: 'in_stock',
      lastUpdated: '2024-01-15',
      cost: 20.00,
      price: 49.99
    },
    {
      id: '2',
      productName: 'League Scarf',
      sku: 'SCF-001',
      category: 'Accessories',
      currentStock: 0,
      minStock: 5,
      maxStock: 50,
      status: 'out_of_stock',
      lastUpdated: '2024-01-10',
      cost: 8.00,
      price: 19.99
    },
    {
      id: '3',
      productName: 'Match Day Program',
      sku: 'PRG-001',
      category: 'Programs',
      currentStock: 3,
      minStock: 10,
      maxStock: 200,
      status: 'low_stock',
      lastUpdated: '2024-01-14',
      cost: 2.00,
      price: 5.99
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_stock': return 'In Stock';
      case 'low_stock': return 'Low Stock';
      case 'out_of_stock': return 'Out of Stock';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-bold">Inventory</h2>
          <div className="flex flex-row gap-2 flex-wrap">
            <button className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base">
              <span className="hidden sm:inline">Bulk Update</span>
              <span className="sm:hidden">Bulk</span>
            </button>
            <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
              <span className="hidden sm:inline">Export Inventory</span>
              <span className="sm:hidden">Export</span>
            </button>
            <button className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base">
              <span className="hidden sm:inline">Stock Alerts</span>
              <span className="sm:hidden">Alerts</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {inventory.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              {/* Mobile Layout */}
              <div className="block sm:hidden">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">📦</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold mb-1 line-clamp-2">{item.productName}</h3>
                    <p className="text-sm text-gray-600 mb-2">SKU: {item.sku}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div className="text-center bg-gray-50 rounded p-2">
                    <p className="text-gray-500">Current Stock</p>
                    <p className="font-medium">{item.currentStock}</p>
                  </div>
                  <div className="text-center bg-gray-50 rounded p-2">
                    <p className="text-gray-500">Min Stock</p>
                    <p className="font-medium">{item.minStock}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                    Update Stock
                  </button>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{item.productName}</h3>
                      <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-3 text-sm">
                    <div>
                      <p className="text-gray-500">Current Stock</p>
                      <p className="font-medium">{item.currentStock}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Min Stock</p>
                      <p className="font-medium">{item.minStock}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Max Stock</p>
                      <p className="font-medium">{item.maxStock}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Cost</p>
                      <p className="font-medium">${item.cost}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-800 text-sm">
                        Update
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
