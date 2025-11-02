"use client";

// src/components/Management/UsersManagement/UserActivityLog.tsx
import { useState } from 'react';

interface UserActivity {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  details: string;
  ipAddress?: string;
  userAgent?: string;
}

interface Props {
  userId: string;
  userName: string;
}

export default function UserActivityLog({ userId, userName }: Props) {
  const [activities] = useState<UserActivity[]>([
    {
      id: '1',
      userId: userId,
      action: 'Login',
      timestamp: '2024-01-15 14:30:25',
      details: 'User logged in successfully',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: '2',
      userId: userId,
      action: 'Profile Update',
      timestamp: '2024-01-15 10:15:42',
      details: 'Updated phone number and department',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: '3',
      userId: userId,
      action: 'Password Change',
      timestamp: '2024-01-14 16:22:18',
      details: 'Password changed successfully',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: '4',
      userId: userId,
      action: 'Logout',
      timestamp: '2024-01-14 16:20:05',
      details: 'User logged out',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: '5',
      userId: userId,
      action: 'Login',
      timestamp: '2024-01-14 09:05:33',
      details: 'User logged in successfully',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  ]);

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'login': return 'bg-green-100 text-green-800';
      case 'logout': return 'bg-gray-100 text-gray-800';
      case 'profile update': return 'bg-blue-100 text-blue-800';
      case 'password change': return 'bg-yellow-100 text-yellow-800';
      case 'role change': return 'bg-purple-100 text-purple-800';
      case 'status change': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'login': return '🔐';
      case 'logout': return '🚪';
      case 'profile update': return '✏️';
      case 'password change': return '🔑';
      case 'role change': return '👤';
      case 'status change': return '⚡';
      default: return '📝';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Activity Log - {userName}</h2>
        
        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No activity found for this user.</p>
            </div>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 text-2xl">
                    {getActionIcon(activity.action)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(activity.action)}`}>
                          {activity.action}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2">{activity.details}</p>
                    
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      {activity.ipAddress && (
                        <span>IP: {activity.ipAddress}</span>
                      )}
                      {activity.userAgent && (
                        <span className="truncate max-w-xs">
                          Browser: {activity.userAgent.split(' ')[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {activities.length > 0 && (
          <div className="mt-4 text-center">
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              Load More Activity
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
