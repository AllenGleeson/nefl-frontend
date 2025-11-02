"use client";

// src/components/Management/StoreManagement/Analytics/TopProducts.tsx
import { useState } from 'react';

interface TopProduct {
  id: string;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  orders: number;
  growth: number;
}

export default function TopProducts() {
  const [timeRange, setTimeRange] = useState('month');
  
  const [topProducts] = useState<TopProduct[]>([
    {
      id: '1',
      name: 'NEFL Official Jersey',
      category: 'Jerseys',
      sales: 45,
      revenue: 2245.50,
      orders: 45,
      growth: 12.5
    },
    {
      id: '2',
      name: 'League Scarf',
      category: 'Accessories',
      sales: 38,
      revenue: 759.62,
      orders: 38,
      growth: 8.3
    },
    {
      id: '3',
      name: 'Match Day Program',
      category: 'Programs',
      sales: 125,
      revenue: 748.75,
      orders: 125,
      growth: -2.1
    },
    {
      id: '4',
      name: 'Team Badge',
      category: 'Accessories',
      sales: 28,
      revenue: 139.72,
      orders: 28,
      growth: 15.7
    },
    {
      id: '5',
      name: 'Away Jersey',
      category: 'Jerseys',
      sales: 22,
      revenue: 1099.78,
      orders: 22,
      growth: 5.2
    }
  ]);

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return '↗';
    if (growth < 0) return '↘';
    return '→';
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-bold">Top Selling Products</h2>
          <div className="flex flex-row gap-2 flex-wrap">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
              Export Report
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              {/* Mobile Layout */}
              <div className="block sm:hidden">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-600">#{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {product.sales} sold
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGrowthColor(product.growth)}`}>
                        {getGrowthIcon(product.growth)} {Math.abs(product.growth)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div className="text-center bg-gray-50 rounded p-2">
                    <p className="text-gray-500">Revenue</p>
                    <p className="font-medium">${product.revenue.toFixed(2)}</p>
                  </div>
                  <div className="text-center bg-gray-50 rounded p-2">
                    <p className="text-gray-500">Orders</p>
                    <p className="font-medium">{product.orders}</p>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-600">#{index + 1}</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {product.sales} sold
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGrowthColor(product.growth)}`}>
                        {getGrowthIcon(product.growth)} {Math.abs(product.growth)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                    <div>
                      <p className="text-gray-500">Revenue</p>
                      <p className="font-medium">${product.revenue.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Orders</p>
                      <p className="font-medium">{product.orders}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Avg Price</p>
                      <p className="font-medium">${(product.revenue / product.orders).toFixed(2)}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-800 text-sm">
                        View Details
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Edit Product
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
