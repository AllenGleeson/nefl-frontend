// src/components/Management/UsersManagement/UserRoles.tsx
interface Role {
  name: string;
  description: string;
  permissions: string[];
  color: string;
  userCount: number;
}

export default function UserRoles() {
  const roles: Role[] = [
    {
      name: 'Admin',
      description: 'Full system access',
      permissions: ['All permissions', 'User management', 'System settings'],
      color: 'bg-red-100 text-red-800',
      userCount: 3
    },
    {
      name: 'Manager',
      description: 'League management access',
      permissions: ['Manage fixtures', 'Manage clubs', 'View statistics'],
      color: 'bg-purple-100 text-purple-800',
      userCount: 5
    },
    {
      name: 'Editor',
      description: 'Content editing access',
      permissions: ['Edit news', 'Update statistics', 'Manage store'],
      color: 'bg-blue-100 text-blue-800',
      userCount: 8
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4">User Roles</h2>
        <div className="space-y-4">
          {roles.map((role, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                <h3 className="font-semibold text-sm sm:text-base">{role.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${role.color}`}>
                    {role.userCount} users
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-3">{role.description}</p>
              <div className="space-y-1">
                {role.permissions.map((permission, permIndex) => (
                  <div key={permIndex} className="flex items-center text-xs sm:text-sm text-gray-500">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2 flex-shrink-0"></span>
                    <span className="truncate">{permission}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
