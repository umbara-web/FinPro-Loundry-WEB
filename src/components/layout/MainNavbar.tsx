'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { navLinks } from '@/src/data/navigation';
import { NavbarLogo } from '@/src/components/Home/Navbar/navbar-logo';
import { NavbarActions } from '@/src/components/Home/Navbar/navbar-actions';
import { NavbarMobile } from '@/src/components/Home/Navbar/navbar-mobile';
import { cn } from '@/src/lib/utils/utils';

export function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLoggedIn = status === 'authenticated';
  // const isVerified = !!session?.user?.isVerified;

  // const menuItems = isLoggedIn
  //   ? [
  //       { label: 'Dashboard', href: '/dashboard', disabled: !isVerified },
  //       {
  //         label: 'Tracking',
  //         href: '/dashboard/tracking',
  //         disabled: !isVerified,
  //       },
  //       { label: 'History', href: '/dashboard/history', disabled: !isVerified },
  //     ].filter((item) => !item.disabled)
  //   : navLinks;

  return (
    <motion.header>
      <nav className='fixed z-50 w-full'>
        <div
          className={cn(
            'container mx-auto px-2 transition-all duration-300 md:px-4 lg:px-6',
            isScrolled &&
              'bg-background/10 mt-4 max-w-7xl rounded-2xl shadow-xl shadow-zinc-300/20 backdrop-blur-lg lg:rounded-full'
          )}
        >
          <div className='relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0'>
            <div className='flex w-full items-center justify-between'>
              {/* Logo */}
              <div className='flex flex-1 justify-start'>
                <NavbarLogo isLoggedIn={isLoggedIn} pathname={pathname} />
              </div>

              {/* Desktop Menu */}
              <nav className='z-10 hidden flex-1 items-center justify-center gap-2 lg:flex'>
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className='text-primary px-4 py-2 text-sm font-medium transition-all hover:scale-105 hover:rounded-full hover:bg-gray-200 hover:shadow-lg dark:text-gray-200 dark:hover:bg-gray-800'
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Actions & Toggle */}
              <div className='flex flex-1 items-center justify-end gap-2'>
                {/* {isLoggedIn && !isVerified && (
                  <div className='hidden items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-800 lg:flex dark:border-yellow-900/50 dark:bg-yellow-900/20 dark:text-yellow-500'>
                    <span className='relative flex h-2 w-2'>
                      <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75'></span>
                      <span className='relative inline-flex h-2 w-2 rounded-full bg-yellow-500'></span>
                    </span>
                    Belum Verifikasi
                  </div>
                )} */}
                {/* Desktop Actions */}
                <NavbarActions isLoggedIn={isLoggedIn} session={session} />

                {/* Mobile Menu */}
                <NavbarMobile
                  isMobileMenuOpen={isMobileMenuOpen}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                  isLoggedIn={isLoggedIn}
                  // isVerified={isVerified}
                  menuItems={navLinks}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
