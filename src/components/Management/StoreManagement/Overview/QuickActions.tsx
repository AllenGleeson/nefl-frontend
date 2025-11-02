"use client";

// src/components/Management/StoreManagement/Overview/QuickActions.tsx
import Link from 'next/link';

export default function QuickActions() {
  const actions = [
    {
      title: 'Add Product',
      description: 'Create a new product',
      icon: '➕',
      href: '/management/store/products',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'View Orders',
      description: 'Manage customer orders',
      icon: '📦',
      href: '/management/store/orders',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Check Inventory',
      description: 'Review stock levels',
      icon: '📊',
      href: '/management/store/inventory',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'View Analytics',
      description: 'Sales and performance',
      icon: '📈',
      href: '/management/store/analytics',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className={`${action.color} text-white rounded-lg p-4 transition-colors transform hover:scale-105`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{action.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                <p className="text-xs opacity-90">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
