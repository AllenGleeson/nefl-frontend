// src/components/Management/ManagementHeader.tsx
export default function ManagementHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">League Management</h1>
        <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl">
          Manage your football league with comprehensive tools for fixtures, clubs, 
          statistics, and administrative tasks.
        </p>
      </div>
    </div>
  );
}
