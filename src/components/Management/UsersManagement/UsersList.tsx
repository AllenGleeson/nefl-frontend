"use client";

// src/components/Management/UsersManagement/UsersList.tsx
import { useState, useMemo } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'editor';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  createdAt: string;
  avatar?: string;
  phone?: string;
  department?: string;
  manager?: string;
}

type Props = {
  onAddUser?: () => void
  onEditUser?: (user: User) => void
  onViewUser?: (user: User) => void
}

export default function UsersList({ onAddUser, onEditUser, onViewUser }: Props) {
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@nefl.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15 14:30',
      createdAt: '2023-06-15',
      avatar: '/images/avatars/john.jpg',
      phone: '+1-555-0123',
      department: 'IT',
      manager: 'CEO'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@nefl.com',
      role: 'manager',
      status: 'active',
      lastLogin: '2024-01-15 09:15',
      createdAt: '2023-08-22',
      avatar: '/images/avatars/sarah.jpg',
      phone: '+1-555-0124',
      department: 'Operations',
      manager: 'John Smith'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@nefl.com',
      role: 'editor',
      status: 'active',
      lastLogin: '2024-01-14 16:45',
      createdAt: '2023-09-10',
      avatar: '/images/avatars/mike.jpg',
      phone: '+1-555-0125',
      department: 'Content',
      manager: 'Sarah Johnson'
    },
    {
      id: '4',
      name: 'Emma Davis',
      email: 'emma.davis@nefl.com',
      role: 'editor',
      status: 'pending',
      lastLogin: 'Never',
      createdAt: '2024-01-10',
      avatar: '/images/avatars/emma.jpg',
      phone: '+1-555-0126',
      department: 'Content',
      manager: 'Sarah Johnson'
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@nefl.com',
      role: 'editor',
      status: 'inactive',
      lastLogin: '2024-01-05 11:20',
      createdAt: '2023-07-18',
      avatar: '/images/avatars/david.jpg',
      phone: '+1-555-0127',
      department: 'Marketing',
      manager: 'Sarah Johnson'
    },
    {
      id: '6',
      name: 'Lisa Anderson',
      email: 'lisa.anderson@nefl.com',
      role: 'manager',
      status: 'active',
      lastLogin: '2024-01-14 10:30',
      createdAt: '2023-05-20',
      avatar: '/images/avatars/lisa.jpg',
      phone: '+1-555-0128',
      department: 'Finance',
      manager: 'John Smith'
    },
    {
      id: '7',
      name: 'Tom Wilson',
      email: 'tom.wilson@nefl.com',
      role: 'editor',
      status: 'active',
      lastLogin: '2024-01-13 15:45',
      createdAt: '2023-11-12',
      avatar: '/images/avatars/tom.jpg',
      phone: '+1-555-0129',
      department: 'Content',
      manager: 'Sarah Johnson'
    },
    {
      id: '8',
      name: 'Rachel Green',
      email: 'rachel.green@nefl.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15 08:20',
      createdAt: '2023-04-08',
      avatar: '/images/avatars/rachel.jpg',
      phone: '+1-555-0130',
      department: 'IT',
      manager: 'John Smith'
    }
  ]);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.department?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  // Bulk operations
  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map(user => user.id));
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for users:`, selectedUsers);
    // Implement bulk actions here
    setSelectedUsers([]);
  };

  const handleUserAction = (action: string, user: User) => {
    switch (action) {
      case 'edit':
        onEditUser?.(user);
        break;
      case 'view':
        onViewUser?.(user);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
          console.log('Delete user:', user.id);
        }
        break;
      case 'toggle-status':
        console.log('Toggle status for user:', user.id);
        break;
      case 'change-role':
        console.log('Change role for user:', user.id);
        break;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-purple-100 text-purple-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-bold">User Accounts ({filteredUsers.length})</h2>
          <div className="flex flex-row gap-2 flex-wrap">
            {onAddUser && (
              <button 
                onClick={onAddUser}
                className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm sm:text-base"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Add User</span>
                <span className="sm:hidden">Add</span>
              </button>
            )}
            <button className="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base">
              <span className="hidden sm:inline">Export Users</span>
              <span className="sm:hidden">Export</span>
            </button>
            {selectedUsers.length > 0 && (
              <div className="relative">
                <select 
                  onChange={(e) => handleBulkAction(e.target.value)}
                  className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base appearance-none pr-8"
                >
                  <option value="">Bulk Actions ({selectedUsers.length})</option>
                  <option value="activate">Activate Selected</option>
                  <option value="deactivate">Deactivate Selected</option>
                  <option value="change-role">Change Role</option>
                  <option value="export">Export Selected</option>
                  <option value="delete">Delete Selected</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search users by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="editor">Editor</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
        
        {/* Select All Checkbox */}
        {paginatedUsers.length > 0 && (
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
              onChange={handleSelectAll}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">
              Select All ({selectedUsers.length}/{paginatedUsers.length})
            </label>
          </div>
        )}

        <div className="space-y-4">
          {paginatedUsers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No users found matching your criteria.</p>
            </div>
          ) : (
            paginatedUsers.map((user) => (
              <div key={user.id} className={`border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${selectedUsers.includes(user.id) ? 'bg-indigo-50 border-indigo-200' : ''}`}>
                {/* Mobile Layout */}
                <div className="block sm:hidden">
                  <div className="flex items-start space-x-3 mb-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-indigo-600">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold mb-1 line-clamp-1">{user.name}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-1">{user.email}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                    <div className="text-center bg-gray-50 rounded p-2">
                      <p className="text-gray-500">Last Login</p>
                      <p className="font-medium truncate">{user.lastLogin}</p>
                    </div>
                    <div className="text-center bg-gray-50 rounded p-2">
                      <p className="text-gray-500">Department</p>
                      <p className="font-medium">{user.department || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => handleUserAction('edit', user)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium px-2 py-1 rounded hover:bg-indigo-50"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleUserAction('view', user)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium px-2 py-1 rounded hover:bg-blue-50"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleUserAction('toggle-status', user)}
                      className="text-green-600 hover:text-green-800 text-sm font-medium px-2 py-1 rounded hover:bg-green-50"
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button 
                      onClick={() => handleUserAction('delete', user)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium px-2 py-1 rounded hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-indigo-600">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        {user.department && (
                          <p className="text-xs text-gray-500">{user.department} • {user.manager}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                      <div>
                        <p className="text-gray-500">Last Login</p>
                        <p className="font-medium">{user.lastLogin}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Created</p>
                        <p className="font-medium">{user.createdAt}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Phone</p>
                        <p className="font-medium">{user.phone || 'N/A'}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => handleUserAction('edit', user)}
                          className="text-indigo-600 hover:text-indigo-800 text-sm px-2 py-1 rounded hover:bg-indigo-50"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleUserAction('view', user)}
                          className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded hover:bg-blue-50"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => handleUserAction('toggle-status', user)}
                          className="text-green-600 hover:text-green-800 text-sm px-2 py-1 rounded hover:bg-green-50"
                        >
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button 
                          onClick={() => handleUserAction('delete', user)}
                          className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((currentPage - 1) * usersPerPage) + 1} to {Math.min(currentPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    page === currentPage
                      ? 'text-indigo-600 bg-indigo-50 border border-indigo-300'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
