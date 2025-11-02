"use client";

// src/components/Management/StoreManagement/Overview/RecentOrders.tsx
import { useState } from 'react';
import Link from 'next/link';

interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

export default function RecentOrders() {
  const [recentOrders] = useState<RecentOrder[]>([
    {
      id: '1',
      orderNumber: 'ORD-001',
      customerName: 'John Smith',
      total: 89.97,
      status: 'processing',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      customerName: 'Sarah Johnson',
      total: 45.99,
      status: 'shipped',
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      orderNumber: 'ORD-003',
      customerName: 'Mike Wilson',
      total: 125.50,
      status: 'pending',
      createdAt: '2024-01-13'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold">Recent Orders</h2>
          <Link 
            href="/management/store/orders"
            className="text-sm text-green-600 hover:text-green-800 font-medium"
          >
            View All →
          </Link>
        </div>
        
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-medium text-sm">{order.orderNumber}</p>
                    <p className="text-xs text-gray-600">{order.customerName}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">€{order.total}</p>
                <p className="text-xs text-gray-500">{order.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
