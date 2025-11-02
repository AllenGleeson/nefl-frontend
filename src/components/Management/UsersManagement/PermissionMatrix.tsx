"use client";

// src/components/Management/UsersManagement/PermissionMatrix.tsx
import React, { useState } from 'react';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'users' | 'content' | 'system' | 'reports';
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export default function PermissionMatrix() {
  const [permissions] = useState<Permission[]>([
    // User Management
    { id: 'user_create', name: 'Create Users', description: 'Add new users to the system', category: 'users' },
    { id: 'user_read', name: 'View Users', description: 'View user information and lists', category: 'users' },
    { id: 'user_update', name: 'Edit Users', description: 'Modify user information and settings', category: 'users' },
    { id: 'user_delete', name: 'Delete Users', description: 'Remove users from the system', category: 'users' },
    { id: 'user_roles', name: 'Manage Roles', description: 'Assign and modify user roles', category: 'users' },
    
    // Content Management
    { id: 'content_create', name: 'Create Content', description: 'Create news articles and posts', category: 'content' },
    { id: 'content_read', name: 'View Content', description: 'View all content including drafts', category: 'content' },
    { id: 'content_update', name: 'Edit Content', description: 'Modify existing content', category: 'content' },
    { id: 'content_delete', name: 'Delete Content', description: 'Remove content from the system', category: 'content' },
    { id: 'content_publish', name: 'Publish Content', description: 'Publish content to live site', category: 'content' },
    
    // System Management
    { id: 'system_settings', name: 'System Settings', description: 'Modify system configuration', category: 'system' },
    { id: 'system_backup', name: 'Backup Data', description: 'Create and manage system backups', category: 'system' },
    { id: 'system_logs', name: 'View Logs', description: 'Access system and audit logs', category: 'system' },
    { id: 'system_maintenance', name: 'Maintenance Mode', description: 'Enable/disable maintenance mode', category: 'system' },
    
    // Reports
    { id: 'reports_view', name: 'View Reports', description: 'Access all system reports', category: 'reports' },
    { id: 'reports_export', name: 'Export Data', description: 'Export data in various formats', category: 'reports' },
    { id: 'reports_analytics', name: 'Analytics', description: 'Access detailed analytics data', category: 'reports' }
  ]);

  const [roles] = useState<Role[]>([
    {
      id: 'admin',
      name: 'Admin',
      permissions: [
        'user_create', 'user_read', 'user_update', 'user_delete', 'user_roles',
        'content_create', 'content_read', 'content_update', 'content_delete', 'content_publish',
        'system_settings', 'system_backup', 'system_logs', 'system_maintenance',
        'reports_view', 'reports_export', 'reports_analytics'
      ]
    },
    {
      id: 'manager',
      name: 'Manager',
      permissions: [
        'user_read', 'user_update',
        'content_create', 'content_read', 'content_update', 'content_publish',
        'reports_view', 'reports_export'
      ]
    },
    {
      id: 'editor',
      name: 'Editor',
      permissions: [
        'content_create', 'content_read', 'content_update'
      ]
    }
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'users': return 'bg-blue-100 text-blue-800';
      case 'content': return 'bg-green-100 text-green-800';
      case 'system': return 'bg-red-100 text-red-800';
      case 'reports': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (roleId: string) => {
    switch (roleId) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-purple-100 text-purple-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const hasPermission = (roleId: string, permissionId: string) => {
    const role = roles.find(r => r.id === roleId);
    return role?.permissions.includes(permissionId) || false;
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Permission Matrix</h2>
        <p className="text-sm text-gray-600 mb-6">
          This matrix shows which permissions are granted to each role. Check marks indicate that a role has access to that permission.
        </p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permission
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                {roles.map((role) => (
                  <th key={role.id} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(role.id)}`}>
                      {role.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                <React.Fragment key={category}>
                  <tr className="bg-gray-50">
                    <td colSpan={roles.length + 2} className="px-3 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
                        {category.charAt(0).toUpperCase() + category.slice(1)} Permissions
                      </span>
                    </td>
                  </tr>
                  {categoryPermissions.map((permission) => (
                    <tr key={permission.id} className="hover:bg-gray-50">
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                          <div className="text-sm text-gray-500">{permission.description}</div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(permission.category)}`}>
                          {permission.category}
                        </span>
                      </td>
                      {roles.map((role) => (
                        <td key={role.id} className="px-3 py-4 whitespace-nowrap text-center">
                          {hasPermission(role.id, permission.id) ? (
                            <span className="text-green-600 text-lg">✓</span>
                          ) : (
                            <span className="text-gray-300 text-lg">✗</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Legend</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-green-600 text-lg mr-2">✓</span>
              <span className="text-gray-700">Permission granted</span>
            </div>
            <div>
              <span className="text-gray-300 text-lg mr-2">✗</span>
              <span className="text-gray-700">Permission denied</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
