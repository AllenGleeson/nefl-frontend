"use client";

// src/components/Management/StoreManagement/Overview/SalesSummary.tsx
import { useState } from 'react';
interface SalesData {
  period: string;
  revenue: number;
  orders: number;
  growth: number;
}

export default function SalesSummary() {
  const [salesData] = useState<SalesData[]>([
    {
      period: 'Today',
      revenue: 1250,
      orders: 8,
      growth: 12.5
    },
    {
      period: 'This Week',
      revenue: 8750,
      orders: 45,
      growth: 8.3
    },
    {
      period: 'This Month',
      revenue: 31200,
      orders: 108,
      growth: 15.7
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
        <h2 className="text-lg sm:text-xl font-bold mb-4">Sales Summary</h2>
        
        <div className="space-y-4">
          {salesData.map((data, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{data.period}</h3>
                <div className="flex items-center space-x-4 mt-1">
                  <div>
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="font-bold text-lg">€{data.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Orders</p>
                    <p className="font-semibold">{data.orders}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Growth</p>
                <p className={`font-semibold ${getGrowthColor(data.growth)}`}>
                  {getGrowthIcon(data.growth)} {Math.abs(data.growth)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
