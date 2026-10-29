"use client";

// src/components/Management/ClubsManagement/ClubsManagementControls.tsx
import { LayoutGrid, List } from "lucide-react";
import IconToggle from "@/components/ui/IconToggle";

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
  statusFilter: 'all' | 'active' | 'inactive';
  onStatusFilterChange: (status: 'all' | 'active' | 'inactive') => void;
  showControls: boolean;
}

export default function ClubsManagementControls({ 
  searchQuery, 
  onSearchChange, 
  viewMode, 
  onViewModeChange, 
  statusFilter,
  onStatusFilterChange,
  showControls 
}: Props) {
  if (!showControls) {
    return null;
  }

  return (
    <div className="bg-[var(--md-surface-container-lowest)] rounded-2xl shadow-sm mb-6 border border-[var(--md-outline-variant)]">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Search Bar and Status Filter */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-[var(--md-on-surface-variant)]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search clubs..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-[var(--md-outline-variant)] rounded-lg leading-5 bg-[var(--md-surface-container-lowest)] placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[var(--md-primary)] focus:border-[var(--md-primary)] sm:text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--md-on-surface-variant)]/70 hover:text-[var(--md-on-surface-variant)]"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="min-w-0 sm:min-w-[140px]">
              <select
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value as 'all' | 'active' | 'inactive')}
                className="block w-full px-3 py-2 border border-[var(--md-outline-variant)] rounded-lg leading-5 bg-[var(--md-surface-container-lowest)] focus:outline-none focus:ring-1 focus:ring-[var(--md-primary)] focus:border-[var(--md-primary)] sm:text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <IconToggle<'list' | 'grid'>
            ariaLabel="Clubs layout"
            value={viewMode}
            onChange={onViewModeChange}
            options={[
              { value: 'list', label: 'List view', icon: <List className="w-5 h-5" /> },
              { value: 'grid', label: 'Grid view', icon: <LayoutGrid className="w-5 h-5" /> },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
