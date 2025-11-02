"use client";

// src/components/Management/UsersManagement/index.tsx
import { useState } from 'react';
import UsersManagementHeader from './UsersManagementHeader';
import UsersList from './UsersList';
import AddUserForm from './AddUserForm';
import UsersStats from './UsersStats';
import UserRoles from './UserRoles';
import UserActivityLog from './UserActivityLog';
import PermissionMatrix from './PermissionMatrix';

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

export default function UsersManagement() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isViewUserModalOpen, setIsViewUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAddUser = () => {
    setIsAddUserModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditUserModalOpen(true);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewUserModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddUserModalOpen(false);
    setIsEditUserModalOpen(false);
    setIsViewUserModalOpen(false);
    setSelectedUser(null);
  };

  const handleUserAdded = () => {
    // Here you could refresh the users list or show a success message
    console.log('User added successfully!');
  };

  return (
    <div className="users-management">
      <UsersManagementHeader />
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <UsersStats />
        <div className="space-y-6 sm:space-y-8 mt-6 sm:mt-8">
          <UsersList 
            onAddUser={handleAddUser}
            onEditUser={handleEditUser}
            onViewUser={handleViewUser}
          />
          <UserRoles />
          <PermissionMatrix />
        </div>
      </div>
      
      {/* Add User Modal */}
      <AddUserForm 
        isOpen={isAddUserModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleUserAdded}
      />
      
      {/* Edit User Modal - Placeholder for now */}
      {isEditUserModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Edit User: {selectedUser.name}</h2>
            <p className="text-gray-600 mb-4">Edit user functionality will be implemented here.</p>
            <button
              onClick={handleCloseModal}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* View User Modal */}
      {isViewUserModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="bg-black bg-opacity-50 fixed inset-0" onClick={handleCloseModal}></div>
            <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">User Details: {selectedUser.name}</h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* User Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Email:</span>
                        <span>{selectedUser.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Role:</span>
                        <span className="capitalize">{selectedUser.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedUser.status === 'active' ? 'bg-green-100 text-green-800' :
                          selectedUser.status === 'inactive' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Department:</span>
                        <span>{selectedUser.department || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Manager:</span>
                        <span>{selectedUser.manager || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Phone:</span>
                        <span>{selectedUser.phone || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Last Login:</span>
                        <span>{selectedUser.lastLogin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Created:</span>
                        <span>{selectedUser.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Activity Log */}
                  <div>
                    <UserActivityLog userId={selectedUser.id} userName={selectedUser.name} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
