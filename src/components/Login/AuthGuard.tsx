"use client";

// src/components/Login/AuthGuard.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'manager' | 'editor' | 'viewer';
  redirectTo?: string;
}

export default function AuthGuard({ 
  children, 
  requiredRole, 
  redirectTo = '/login' 
}: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check if we're in the browser
        if (typeof window === 'undefined') {
          setIsLoading(false);
          return;
        }

        const userData = localStorage.getItem('nefl_user');
        if (!userData) {
          router.push(redirectTo);
          return;
        }

        const user = JSON.parse(userData);
        setIsAuthenticated(true);

        // Check role if required
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
      } catch (error) {
        router.push(redirectTo);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [requiredRole, redirectTo, router]);

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