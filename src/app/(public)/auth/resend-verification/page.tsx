'use client';

import { Suspense } from 'react';
import { AuthLayout } from '@/src/components/auth/auth-layout';
import { ResendVerificationForm } from '@/src/components/auth/resend-verification-form';

export default function ResendVerificationPage() {
  return (
    <AuthLayout quote='Link verifikasi Anda sudah kedaluwarsa? Tidak masalah! Dapatkan link baru dengan memasukkan email Anda.'>
      <Suspense
        fallback={
          <div className='flex items-center justify-center'>
            <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
          </div>
        }
      >
        <ResendVerificationForm />
      </Suspense>
    </AuthLayout>
  );
}
