"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface StoreManagementNavProps {
  currentPage: string;
}

export default function StoreManagementNav(_props: StoreManagementNavProps) {
  const pathname = usePathname();
  
  const navItems = [
    { id: 'overview', label: 'Overview', href: '/management/store' },
    { id: 'products', label: 'Products', href: '/management/store/products' },
    { id: 'orders', label: 'Orders', href: '/management/store/orders' },
    { id: 'inventory', label: 'Inventory', href: '/management/store/inventory' },
    { id: 'categories', label: 'Categories', href: '/management/store/categories' },
    { id: 'analytics', label: 'Analytics', href: '/management/store/analytics' },
    { id: 'settings', label: 'Settings', href: '/management/store/settings' },
  ];

  const isActive = (href: string) => {
    if (href === '/management/store') {
      return pathname === '/management/store';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-4 sm:px-6">
        <nav className="flex space-x-8 overflow-x-auto" aria-label="Store Management Navigation">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                isActive(item.href)
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
