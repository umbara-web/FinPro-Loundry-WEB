'use client';

import { useAuth } from '@/src/context/AuthContext';
import { useWallet } from '@/src/context/WalletContext'; // Added
import { getMembershipTier } from '@/src/lib/utils/membership'; // Added

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  History,
  MapPin,
  User,
  Wallet,
  LogOut,
  Home,
  PlusCircle,
  X,
  Bell,
  AlertCircle,
  ShoppingBag,
} from 'lucide-react';
import clsx from 'clsx';

const sidebarLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/orders', label: 'Pesanan', icon: ShoppingBag },
  {
    href: '/dashboard/payment-history',
    label: 'Pembayaran',
    icon: Wallet,
  },
  { href: '/dashboard/complaints', label: 'Komplain', icon: AlertCircle },
  { href: '/dashboard/profile', label: 'Profil Saya', icon: User },
  { href: '/dashboard/addresses', label: 'Kelola Alamat', icon: MapPin },
  { href: '/dashboard/notifications', label: 'Notifikasi', icon: Bell },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const { points } = useWallet(); // Get points
  const tier = getMembershipTier(points); // Calculate tier

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={clsx(
          'dark:border-card-border fixed inset-y-0 left-0 z-50 flex h-full w-[85vw] max-w-75 shrink-0 flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:static lg:flex lg:w-72 dark:border-slate-700 dark:bg-[#101922]',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className='flex flex-col gap-6 p-6'>
          <div className='flex items-start justify-between'>
            <div className='flex items-center gap-3'>
              <div className='ring-primary/20 relative size-12 overflow-hidden rounded-full border border-gray-200 ring-2 dark:border-gray-700'>
                {user?.profile_picture_url ? (
                  <img
                    src={user.profile_picture_url}
                    alt={user.name}
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <div className='flex h-full w-full items-center justify-center bg-blue-100 text-lg font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-200'>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <div className='flex flex-col'>
                <p className='text-sm font-bold text-slate-900 dark:text-white'>
                  {user?.name?.toUpperCase() || 'GUEST USER'}
                </p>
                <p className='text-xs leading-normal font-normal text-blue-500'>
                  {tier.label}
                </p>
              </div>
            </div>
            {/* Close Button (Mobile Only) */}
            <button
              onClick={onClose}
              className='rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-slate-800'
            >
              <X className='h-6 w-6' />
            </button>
          </div>
          <nav className='flex flex-col gap-2'>
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => onClose()} // Close sidebar on link click (mobile)
                  className={clsx(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors',
                    isActive
                      ? 'bg-slate-600 text-white'
                      : 'text-black hover:bg-slate-600 hover:text-white dark:text-white'
                  )}
                >
                  <Icon className='h-5 w-5' />
                  <p className='text-sm leading-normal font-medium'>
                    {link.label}
                  </p>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className='mt-auto border-t border-slate-200 p-6 dark:border-slate-700'>
          <button
            onClick={logout}
            className='flex w-full cursor-pointer items-center justify-end gap-3 text-black transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-600'
          >
            <LogOut className='h-5 w-5' />
            <p className='text-sm font-medium'>Keluar</p>
          </button>
        </div>
      </div>
    </>
  );
}
