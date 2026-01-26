'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { AuthLogo } from './shared/auth-logo';

interface AuthLayoutProps {
  children: ReactNode;
  quote?: string;
  sideImage?: string;
}

export function AuthLayout({
  children,
  quote = 'Rasakan kesegaran dan kebersihan terbaik yang pernah Anda rasakan. Bergabunglah dengan FreshLaundry hari ini dan biarkan kami mengurus detailnya.',
  sideImage = '/images/auth/register-side.png',
}: AuthLayoutProps) {
  return (
    <div className='min-h-screen w-full lg:grid lg:grid-cols-2'>
      {/* Sisi Kiri - Desktop */}
      <div className='bg-muted relative hidden h-full flex-col p-20 text-white lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <Link
            href='/'
            className='flex items-center gap-2 transition-colors hover:text-blue-500'
          >
            <IconArrowLeft className='h-6 w-6' />
            <span className='text-xl font-bold'>Kembali ke Halaman Utama</span>
          </Link>
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <div className='flex items-center gap-1'>
              <AuthLogo />
            </div>
            <p className='text-lg'>&ldquo;{quote}&rdquo;</p>
          </blockquote>
        </div>
        <div className='absolute inset-0 z-0'>
          <Image
            src={sideImage}
            alt='Auth Sidebar'
            fill
            className='object-cover opacity-50'
            priority
          />
        </div>
      </div>

      {/* Sisi Kanan - Mobile & Content */}
      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-full max-w-87.5 gap-6 px-4'>
          <div className='mb-4 lg:hidden'>
            <Link
              href='/'
              className='flex items-center gap-2 text-gray-900 transition-colors hover:text-blue-500 dark:text-white'
            >
              <IconArrowLeft className='h-5 w-5' /> Kembali ke Halaman Utama
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
