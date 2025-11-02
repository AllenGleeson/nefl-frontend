// src/components/Management/UsersManagement/UsersManagementHeader.tsx
import Link from 'next/link';

export default function UsersManagementHeader() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Users Management</h1>
            <p className="text-base sm:text-lg md:text-xl text-indigo-100">
              Manage user accounts, roles, and permissions
            </p>
          </div>
          <Link
            href="/management"
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base self-start sm:self-auto"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
