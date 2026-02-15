'use client';

import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user, isAuthenticated, isLoading, isLoggingOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        if (!isLoggingOut) {
          toast.error('Anda harus login terlebih dahulu');
        }
        router.push('/auth/login');
      } else if (user && !allowedRoles.includes(user.role)) {
        toast.error('Anda tidak memiliki akses ke halaman ini');
        router.push('/');
      }
    }
  }, [isAuthenticated, isLoading, user, router, JSON.stringify(allowedRoles), isLoggingOut]);

  if (isLoading) {
    // You might want to replace this with a proper loading spinner component
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated || (user && !allowedRoles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
}
