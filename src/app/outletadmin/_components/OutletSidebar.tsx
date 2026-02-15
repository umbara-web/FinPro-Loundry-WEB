'use client';

import { useAuth } from '@/src/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ClipboardCheck,
  LogOut,
  X,
  Home,
  GitPullRequest,
  BarChart3,
  FileText,
} from 'lucide-react';
import clsx from 'clsx';

const sidebarLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/outletadmin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/outletadmin/performance', label: 'Performance', icon: BarChart3 },
  { href: '/outletadmin/reports', label: 'Reports', icon: FileText },
  { href: '/outletadmin/bypass-request', label: 'Bypass Requests', icon: GitPullRequest },
  { href: '/outletadmin/staff-attendance', label: 'Staff Attendance', icon: ClipboardCheck },
];

interface OutletSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OutletSidebar({ isOpen, onClose }: OutletSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

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
          'fixed inset-y-0 left-0 z-50 flex h-full w-[85vw] max-w-75 shrink-0 flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:static lg:flex lg:w-72 dark:border-slate-700 dark:bg-slate-900',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className='flex flex-col gap-6 p-6'>
          <div className='flex items-start justify-between'>
            <div className='flex items-center gap-3'>
              <div className='flex items-center justify-center rounded-lg bg-teal-500 p-2 text-white shadow-lg shadow-teal-500/20'>
                <LayoutDashboard className='size-6' />
              </div>
              <div className='flex flex-col'>
                <p className='text-lg font-bold text-slate-900 dark:text-white'>
                  Outlet Admin
                </p>
                <p className='text-xs font-medium text-slate-500 dark:text-slate-400'>
                  FreshLaundry Inc.
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
                  onClick={() => onClose()}
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
            className='flex w-full cursor-pointer items-center justify-end gap-3 text-red-500 transition-colors hover:text-blue-600 dark:hover:text-blue-600'
          >
            <LogOut className='h-5 w-5' />
            <p className='text-sm font-medium'>Keluar</p>
          </button>
        </div>
      </div>
    </>
  );
}
