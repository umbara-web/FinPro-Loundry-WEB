'use client';

import { Search, Menu, X } from 'lucide-react';
import { ModeToggle } from '@/src/components/ui/mode-toggle';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { usePathname } from 'next/navigation';
import { NavbarLogo } from '@/src/components/Home/Navbar/navbar-logo';
import { useAuth } from '@/src/context/AuthContext';
import { useWallet } from '@/src/context/WalletContext';
import { getMembershipTier } from '@/src/lib/utils/membership';
import { HeaderCart } from './header-cart';
import { HeaderNotifications } from './header-notifications';

interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function Header({ isSidebarOpen, onToggleSidebar }: HeaderProps) {
  const { user } = useAuth();
  const { points } = useWallet();
  const pathname = usePathname();
  const tier = getMembershipTier(points);

  return (
    <header className='bg-surface-light dark:bg-background-dark dark:border-card-border z-10 flex shrink-0 items-center justify-between border-b border-solid border-slate-200 px-6 py-4 whitespace-nowrap dark:border-[#233648]'>
      <div className='flex items-center gap-3'>
        <Button
          variant='ghost'
          size='icon'
          className='flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 lg:hidden dark:bg-[#233648] dark:text-white dark:hover:bg-[#324d67]'
          onClick={onToggleSidebar}
        >
          {isSidebarOpen ? (
            <X className='h-5.5 w-5.5' />
          ) : pathname === '/' ? (
            <Search className='h-5.5' />
          ) : (
            <Menu className='h-5.5 w-5.5' />
          )}
        </Button>
        <NavbarLogo isLoggedIn={true} pathname={pathname} />
      </div>

      <div className='flex flex-1 items-center justify-end gap-4 md:gap-3'>
        <div className='relative hidden w-full max-w-50 items-center md:flex'>
          <Search className='absolute left-3 h-5 w-5 text-slate-400' />
          <Input
            type='text'
            placeholder='Cari...'
            className='h-10 rounded-lg border border-solid border-slate-200 bg-slate-100 pr-4 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500 dark:border-[#233648] dark:bg-[#233648] dark:text-white dark:placeholder:text-slate-500'
          />
        </div>

        <ModeToggle />

        <HeaderCart />
        <HeaderNotifications />

        <div className='flex items-center gap-3'>
          <div className='ring-primary/20 relative size-10 overflow-hidden rounded-full border border-gray-200 ring-2 dark:border-gray-700'>
            {user?.profile_picture_url ? (
              <img
                src={user.profile_picture_url}
                alt={user.name}
                className='h-full w-full object-cover'
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-200'>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <div className='hidden flex-col items-start md:flex'>
            <span className='text-sm font-bold text-slate-700 dark:text-white'>
              {user?.name?.toUpperCase() || 'DEBI UMBARA'}
            </span>
            <span className='text-xs text-slate-500 dark:text-[#92adc9]'>
              {tier.label}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
