'use client';

import { WashingMachine, Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ColourfulText } from '@/src/components/ui/colourful-text';
import { FooterLinks } from './footer-links';

export function Footer() {
  const pathname = usePathname();
  return (
    <footer className='bg-surface-light border-t border-gray-200 pt-16 pb-8 dark:border-gray-800 dark:bg-slate-950'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <div className='mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5'>
          {/* Brand Info */}
          <div className='lg:col-span-2'>
            <Link
              href='/'
              className='mb-6 flex items-center gap-2'
              onClick={(e) => {
                if (pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <div className='text-primary flex size-8 items-center justify-center dark:text-white'>
                <WashingMachine className='h-6 w-6' />
              </div>
              <h2 className='text-primary text-xl font-bold dark:text-white'>
                <ColourfulText text='FreshLaundry' />
              </h2>
            </Link>
            <p className='mb-6 max-w-sm leading-relaxed text-gray-500 dark:text-gray-500'>
              Solusi laundry modern terpercaya untuk Anda yang sibuk. Kami
              mengutamakan kualitas, kebersihan, dan ketepatan waktu.
            </p>
            <div className='flex gap-4'>
              <a
                href='#'
                className='hover:bg-primary flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:text-white dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-200 dark:hover:text-black'
                aria-label='Facebook'
              >
                <Facebook className='h-5 w-5' />
              </a>
              <a
                href='#'
                className='hover:bg-primary flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:text-white dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-200 dark:hover:text-black'
                aria-label='Instagram'
              >
                <Instagram className='h-5 w-5' />
              </a>
              <a
                href='#'
                className='hover:bg-primary flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:text-white dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-200 dark:hover:text-black'
                aria-label='Twitter'
              >
                <Twitter className='h-5 w-5' />
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <FooterLinks
            title='Layanan'
            links={[
              { label: 'Kiloan', href: '#' },
              { label: 'Satuan / Dry Clean', href: '#' },
              { label: 'Karpet & Gorden', href: '#' },
              { label: 'Sepatu & Tas', href: '#' },
            ]}
          />

          {/* Links 2 */}
          <FooterLinks
            title='Perusahaan'
            links={[
              { label: 'Tentang Kami', href: '#' },
              { label: 'Karir', href: '#' },
              { label: 'Blog', href: '#' },
              { label: 'Kontak', href: '#' },
            ]}
          />

          {/* Links 3 */}
          <FooterLinks
            title='Bantuan'
            links={[
              { label: 'FAQ', href: '#' },
              { label: 'Syarat & Ketentuan', href: '#' },
              { label: 'Kebijakan Privasi', href: '#' },
            ]}
          />
        </div>

        <div className='flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 md:flex-row dark:border-gray-800'>
          <p className='text-center text-sm text-gray-500 md:text-left'>
            © 2025 FreshLaundry Indonesia. All rights reserved.
          </p>
          <div className='flex gap-6'>
            <a
              href='#'
              className='text-sm text-gray-500 transition-colors hover:text-blue-500 dark:hover:text-white'
            >
              Privacy Policy
            </a>
            <a
              href='#'
              className='text-sm text-gray-500 transition-colors hover:text-blue-500 dark:hover:text-white'
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
