"use client";

// src/components/Management/StoreManagement/Analytics/RevenueReport.tsx
import { useState } from 'react';

interface RevenueData {
  period: string;
  revenue: number;
  orders: number;
  avgOrderValue: number;
  growth: number;
}

export default function RevenueReport() {
  const [timeRange, setTimeRange] = useState('monthly');
  
  const [revenueData] = useState<RevenueData[]>([
    {
      period: 'January 2024',
      revenue: 31200,
      orders: 108,
      avgOrderValue: 288.89,
      growth: 9.5
    },
    {
      period: 'December 2023',
      revenue: 28500,
      orders: 95,
      avgOrderValue: 300.00,
      growth: 7.2
    },
    {
      period: 'November 2023',
      revenue: 22100,
      orders: 78,
      avgOrderValue: 283.33,
      growth: 4.8
    },
    {
      period: 'October 2023',
      revenue: 18900,
      orders: 68,
      avgOrderValue: 277.94,
      growth: 2.1
    },
    {
      period: 'September 2023',
      revenue: 15200,
      orders: 52,
      avgOrderValue: 292.31,
      growth: -1.5
    },
    {
      period: 'August 2023',
      revenue: 12500,
      orders: 45,
      avgOrderValue: 277.78,
      growth: 0
    }
  ]);

  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = revenueData.reduce((sum, d) => sum + d.orders, 0);
  const avgGrowth = revenueData.reduce((sum, d) => sum + d.growth, 0) / revenueData.length;

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
          <h2 className="text-lg sm:text-xl font-bold">Revenue Report</h2>
          <div className="flex flex-row gap-2 flex-wrap">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
              Export Report
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Total Revenue</p>
                <p className="text-xl font-bold text-green-800">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="text-xl text-green-600">💰</div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Orders</p>
                <p className="text-xl font-bold text-blue-800">
                  {totalOrders}
                </p>
              </div>
              <div className="text-xl text-blue-600">📦</div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Avg Order Value</p>
                <p className="text-xl font-bold text-purple-800">
                  ${(totalRevenue / totalOrders).toFixed(2)}
                </p>
              </div>
              <div className="text-xl text-purple-600">📊</div>
            </div>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Avg Growth</p>
                <p className={`text-xl font-bold ${getGrowthColor(avgGrowth)}`}>
                  {getGrowthIcon(avgGrowth)} {Math.abs(avgGrowth).toFixed(1)}%
                </p>
              </div>
              <div className="text-xl text-orange-600">📈</div>
            </div>
          </div>
        </div>
        
        {/* Revenue Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Period</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Revenue</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Orders</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Avg Order Value</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Growth</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((data, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{data.period}</td>
                  <td className="py-3 px-4 text-right font-medium">
                    ${data.revenue.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right">{data.orders}</td>
                  <td className="py-3 px-4 text-right">
                    ${data.avgOrderValue.toFixed(2)}
                  </td>
                  <td className={`py-3 px-4 text-right font-medium ${getGrowthColor(data.growth)}`}>
                    {getGrowthIcon(data.growth)} {Math.abs(data.growth)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
