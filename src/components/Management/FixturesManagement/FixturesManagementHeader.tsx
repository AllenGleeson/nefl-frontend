// src/components/Management/FixturesManagement/FixturesManagementHeader.tsx
import Link from 'next/link';

export default function FixturesManagementHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Fixtures Management</h1>
            <p className="text-xl text-blue-100">
              Manage match schedules, results, and fixture updates
            </p>
          </div>
          <Link
            href="/management"
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
