'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { authApi } from '@/src/lib/api/auth-api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function SocialAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const syncSession = async () => {
      if (session?.user?.email) {
        // Check if we already have a backend token
        const existingToken = Cookies.get('token');
        if (!existingToken) {
          try {
            const result = await authApi.socialLogin({
              email: session.user.email,
              name: session.user.name || 'Social User',
            });

            // Store token
            Cookies.set('token', result.data.token, { expires: 1 });

            // Redirect to dashboard or home if currently on login page
            if (window.location.pathname === '/login') {
              router.push('/');
            }
          } catch (error) {
            console.error('Failed to sync social login:', error);
          }
        }
      }
    };

    syncSession();
  }, [session, router]);

  return <>{children}</>;
}
