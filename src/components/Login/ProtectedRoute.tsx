"use client";

// src/components/Login/ProtectedRoute.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'manager' | 'editor' | 'viewer';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }

      try {
        const userData = localStorage.getItem('nefl_user');
        if (!userData) {
          router.push('/login');
          return;
        }

        const user = JSON.parse(userData);
        setIsAuthenticated(true);

        if (requiredRole) {
          const roleHierarchy = {
            'viewer': 1,
            'editor': 2,
            'manager': 3,
            'admin': 4
          };

          const userRoleLevel = roleHierarchy[user.role as keyof typeof roleHierarchy] || 0;
          const requiredRoleLevel = roleHierarchy[requiredRole];

          if (userRoleLevel < requiredRoleLevel) {
            router.push('/unauthorized');
            return;
          }
        }
      } catch {
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [requiredRole, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
