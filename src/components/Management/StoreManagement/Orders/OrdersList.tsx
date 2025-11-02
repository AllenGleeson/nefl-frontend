"use client";

// src/components/Management/StoreManagement/Orders/OrdersList.tsx
import { useState } from 'react';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
  items: number;
}

interface OrdersListProps {
  onOrderClick?: (orderId: string) => void;
}

export default function OrdersList({ onOrderClick }: OrdersListProps) {
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-001',
      customerName: 'John Smith',
      email: 'john@example.com',
      total: 89.97,
      status: 'processing',
      paymentStatus: 'paid',
      createdAt: '2024-01-15',
      items: 3
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      customerName: 'Sarah Johnson',
      email: 'sarah@example.com',
      total: 45.99,
      status: 'shipped',
      paymentStatus: 'paid',
      createdAt: '2024-01-14',
      items: 2
    },
    {
      id: '3',
      orderNumber: 'ORD-003',
      customerName: 'Mike Wilson',
      email: 'mike@example.com',
      total: 125.50,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: '2024-01-13',
      items: 4
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-bold">Orders</h2>
          <div className="flex flex-row gap-2 flex-wrap">
            <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
              <span className="hidden sm:inline">Export Orders</span>
              <span className="sm:hidden">Export</span>
            </button>
            <button className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base">
              <span className="hidden sm:inline">Filter Orders</span>
              <span className="sm:hidden">Filter</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              {/* Mobile Layout */}
              <div className="block sm:hidden">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-semibold">{order.orderNumber}</h3>
                    <p className="text-sm text-gray-600">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">${order.total}</p>
                    <p className="text-xs text-gray-500">{order.items} items</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </span>
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => onOrderClick?.(order.id)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    View Details
                  </button>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Update Status
                  </button>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="text-lg font-semibold">{order.orderNumber}</h3>
                    <p className="text-sm text-gray-600">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-lg font-bold">${order.total}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Items</p>
                    <p className="text-lg font-medium">{order.items}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="text-sm font-medium">{order.createdAt}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onOrderClick?.(order.id)}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      View
                    </button>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Update
                    </button>
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
