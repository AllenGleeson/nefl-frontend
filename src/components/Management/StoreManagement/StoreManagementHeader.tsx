// src/components/Management/StoreManagement/StoreManagementHeader.tsx
import Link from 'next/link';

interface StoreManagementHeaderProps {
  currentPage: string;
  pageTitle: string;
}

export default function StoreManagementHeader({ currentPage, pageTitle }: StoreManagementHeaderProps) {
  const getPageDescription = (page: string) => {
    switch (page) {
      case 'overview':
        return 'Manage league merchandise, products, and inventory';
      case 'products':
        return 'Add, edit, and manage store products';
      case 'orders':
        return 'View and manage customer orders';
      case 'inventory':
        return 'Track stock levels and inventory';
      case 'categories':
        return 'Organize products into categories';
      case 'analytics':
        return 'View sales reports and analytics';
      case 'settings':
        return 'Configure store settings and preferences';
      default:
        return 'Manage league merchandise, products, and inventory';
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-green-100 mb-2">
              <Link href="/management" className="hover:text-white transition-colors">
                Management
              </Link>
              <span>›</span>
              <Link href="/management/store" className="hover:text-white transition-colors">
                Store
              </Link>
              {currentPage !== 'overview' && (
                <>
                  <span>›</span>
                  <span className="text-white">{pageTitle}</span>
                </>
              )}
            </nav>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              {currentPage === 'overview' ? 'Store Management' : pageTitle}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-green-100">
              {getPageDescription(currentPage)}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              href="/management"
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base text-center"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
