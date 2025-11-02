"use client";

// src/components/Management/StoreManagement/Analytics/SalesChart.tsx
import { useState } from 'react';

interface SalesData {
  month: string;
  revenue: number;
  orders: number;
}

export default function SalesChart() {
  const [timeRange, setTimeRange] = useState('6months');
  
  const [salesData] = useState<SalesData[]>([
    { month: 'Aug 2023', revenue: 12500, orders: 45 },
    { month: 'Sep 2023', revenue: 15200, orders: 52 },
    { month: 'Oct 2023', revenue: 18900, orders: 68 },
    { month: 'Nov 2023', revenue: 22100, orders: 78 },
    { month: 'Dec 2023', revenue: 28500, orders: 95 },
    { month: 'Jan 2024', revenue: 31200, orders: 108 }
  ]);

  const maxRevenue = Math.max(...salesData.map(d => d.revenue));

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-bold">Sales Analytics</h2>
          <div className="flex flex-row gap-2 flex-wrap">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            >
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last 12 Months</option>
              <option value="year">This Year</option>
            </select>
            <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
              Export Data
            </button>
          </div>
        </div>

        {/* Chart Area */}
        <div className="h-80 bg-gray-50 rounded-lg p-4 mb-6">
          <div className="h-full flex items-end justify-between space-x-2">
            {salesData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                {/* Revenue Bar */}
                <div className="w-full flex flex-col items-center mb-2">
                  <div 
                    className="w-full bg-green-500 rounded-t"
                    style={{ height: `${(data.revenue / maxRevenue) * 200}px` }}
                  ></div>
                  <div className="text-xs text-gray-600 mt-1 text-center">
                    <div className="font-medium">${(data.revenue / 1000).toFixed(1)}k</div>
                    <div className="text-gray-500">{data.orders} orders</div>
                  </div>
                </div>
                
                {/* Month Label */}
                <div className="text-xs text-gray-500 text-center">
                  {data.month.split(' ')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Total Revenue</p>
                <p className="text-2xl font-bold text-green-800">
                  ${salesData.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()}
                </p>
              </div>
              <div className="text-2xl text-green-600">💰</div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Orders</p>
                <p className="text-2xl font-bold text-blue-800">
                  {salesData.reduce((sum, d) => sum + d.orders, 0)}
                </p>
              </div>
              <div className="text-2xl text-blue-600">📦</div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Avg Order Value</p>
                <p className="text-2xl font-bold text-purple-800">
                  ${Math.round(salesData.reduce((sum, d) => sum + d.revenue, 0) / salesData.reduce((sum, d) => sum + d.orders, 0))}
                </p>
              </div>
              <div className="text-2xl text-purple-600">📊</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
