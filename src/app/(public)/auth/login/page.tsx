'use client';

import LoginForm from '@/src/components/auth/login-form';
import { Suspense } from 'react';
import { AuthLayout } from '@/src/components/auth/auth-layout';

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense
        fallback={
          <div className='flex items-center justify-center'>
            <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
