"use client";

// src/components/Management/StoreManagement/Inventory/StockAlerts.tsx
import { useState } from 'react';

interface StockAlert {
  id: string;
  productName: string;
  sku: string;
  currentStock: number;
  minStock: number;
  alertType: 'low_stock' | 'out_of_stock' | 'overstock';
  priority: 'high' | 'medium' | 'low';
  lastAlert: string;
}

export default function StockAlerts() {
  const [alerts] = useState<StockAlert[]>([
    {
      id: '1',
      productName: 'League Scarf',
      sku: 'SCF-001',
      currentStock: 0,
      minStock: 5,
      alertType: 'out_of_stock',
      priority: 'high',
      lastAlert: '2024-01-10'
    },
    {
      id: '2',
      productName: 'Match Day Program',
      sku: 'PRG-001',
      currentStock: 3,
      minStock: 10,
      alertType: 'low_stock',
      priority: 'medium',
      lastAlert: '2024-01-14'
    },
    {
      id: '3',
      productName: 'Team Badge',
      sku: 'BDG-001',
      currentStock: 150,
      minStock: 20,
      alertType: 'overstock',
      priority: 'low',
      lastAlert: '2024-01-12'
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'overstock': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertTypeText = (type: string) => {
    switch (type) {
      case 'out_of_stock': return 'Out of Stock';
      case 'low_stock': return 'Low Stock';
      case 'overstock': return 'Overstock';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-bold">Stock Alerts</h2>
          <div className="flex flex-row gap-2 flex-wrap">
            <button className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base">
              <span className="hidden sm:inline">Mark All Read</span>
              <span className="sm:hidden">Mark Read</span>
            </button>
            <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
              <span className="hidden sm:inline">Export Alerts</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${getPriorityColor(alert.priority)}`}>
              {/* Mobile Layout */}
              <div className="block sm:hidden">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-xl">⚠️</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold mb-1 line-clamp-2">{alert.productName}</h3>
                    <p className="text-sm text-gray-600 mb-2">SKU: {alert.sku}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAlertTypeColor(alert.alertType)}`}>
                        {getAlertTypeText(alert.alertType)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                        {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)} Priority
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div className="text-center bg-white rounded p-2">
                    <p className="text-gray-500">Current Stock</p>
                    <p className="font-medium">{alert.currentStock}</p>
                  </div>
                  <div className="text-center bg-white rounded p-2">
                    <p className="text-gray-500">Min Stock</p>
                    <p className="font-medium">{alert.minStock}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                    Restock
                  </button>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Product
                  </button>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⚠️</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{alert.productName}</h3>
                      <p className="text-sm text-gray-600">SKU: {alert.sku}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAlertTypeColor(alert.alertType)}`}>
                        {getAlertTypeText(alert.alertType)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                        {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)} Priority
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                    <div>
                      <p className="text-gray-500">Current Stock</p>
                      <p className="font-medium">{alert.currentStock}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Min Stock</p>
                      <p className="font-medium">{alert.minStock}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Alert</p>
                      <p className="font-medium">{alert.lastAlert}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-800 text-sm">
                        Restock
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View
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
