import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
  requireVerified?: boolean;
}

export default function ProtectedRoute({
  children,
  roles = [],
  requireVerified = false,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading, isLoggingOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        if (!isLoggingOut) {
          toast.error('Anda harus login terlebih dahulu');
        }
        router.push('/auth/login');
      } else {
        if (roles.length > 0 && user && !roles.includes(user.role)) {
          toast.error('Anda tidak memiliki akses ke halaman ini');
          router.push('/');
        } else if (requireVerified && user && !user.isVerified) {
          toast.error('Akun Anda belum terverifikasi. Silakan cek email Anda.');
          router.push('/');
        }
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    router,
    user,
    roles,
    requireVerified,
    isLoggingOut,
  ]);

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
      </div>
    );
  }

  if (!isAuthenticated) return null;
  if (roles.length > 0 && user && !roles.includes(user.role)) return null;
  if (requireVerified && user && !user.isVerified) return null;

  return <>{children}</>;
}
