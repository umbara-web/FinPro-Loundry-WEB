'use client';

import { Suspense } from 'react';
import { AuthLayout } from '@/src/components/auth/auth-layout';
import { VerifyContent } from '@/src/components/auth/verify-content';

export default function VerifyPage() {
  return (
    <AuthLayout>
      <Suspense
        fallback={
          <div className='flex items-center justify-center'>
            <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
          </div>
        }
      >
        <VerifyContent />
      </Suspense>
    </AuthLayout>
  );
}
