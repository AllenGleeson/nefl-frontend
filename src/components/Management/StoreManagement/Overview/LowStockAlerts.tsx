"use client";

// src/components/Management/StoreManagement/Overview/LowStockAlerts.tsx
import { useState } from 'react';
import Link from 'next/link';

interface LowStockItem {
  id: string;
  productName: string;
  currentStock: number;
  minStock: number;
  status: 'low' | 'out_of_stock';
}

export default function LowStockAlerts() {
  const [lowStockItems] = useState<LowStockItem[]>([
    {
      id: '1',
      productName: 'League Scarf',
      currentStock: 0,
      minStock: 5,
      status: 'out_of_stock'
    },
    {
      id: '2',
      productName: 'Match Day Program',
      currentStock: 3,
      minStock: 10,
      status: 'low'
    },
    {
      id: '3',
      productName: 'Team Badge',
      currentStock: 2,
      minStock: 8,
      status: 'low'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'out_of_stock': return 'Out of Stock';
      case 'low': return 'Low Stock';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold">Low Stock Alerts</h2>
          <Link 
            href="/management/store/inventory"
            className="text-sm text-green-600 hover:text-green-800 font-medium"
          >
            Manage Inventory →
          </Link>
        </div>
        
        <div className="space-y-3">
          {lowStockItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-medium text-sm">{item.productName}</p>
                    <p className="text-xs text-gray-600">
                      Current: {item.currentStock} | Min: {item.minStock}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {getStatusText(item.status)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <button className="text-sm text-green-600 hover:text-green-800 font-medium">
                  Restock
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
