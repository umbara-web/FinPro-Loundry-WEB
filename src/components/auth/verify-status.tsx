import { AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

export function VerifyInvalidToken() {
  return (
    <div className='space-y-4 text-center'>
      <div className='mb-4 flex justify-center text-red-500'>
        <AlertCircle size={48} />
      </div>
      <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
        Token Tidak Valid atau Kedaluwarsa
      </h2>
      <p className='text-gray-500 dark:text-gray-400'>
        Token verifikasi tidak valid, sudah digunakan, atau sudah kedaluwarsa
        (lebih dari 1 jam).
      </p>
      <div className='space-y-2 pt-4'>
        <Link href='/auth/resend-verification'>
          <Button className='w-full bg-blue-600 text-white hover:bg-blue-700'>
            Kirim Ulang Email Verifikasi
          </Button>
        </Link>
        <Link href='/auth/login'>
          <Button variant='outline' className='w-full'>
            Kembali ke Login
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function VerifySuccess() {
  return (
    <div className='text-center'>
      <div className='mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30'>
        <CheckCircle2 className='h-6 w-6 text-green-600 dark:text-green-400' />
      </div>
      <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
        Verifikasi Berhasil!
      </h2>
      <p className='mt-2 text-gray-500 dark:text-gray-400'>
        Password Anda telah disetel.
      </p>
      <p className='mt-4 text-sm text-blue-500'>Redirecting to login...</p>
    </div>
  );
}
