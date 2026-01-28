'use client';

import { useAuth } from '@/src/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarClock,
  ClipboardList,
  History,
  Settings,
  LogOut,
  WashingMachine,
  X,
} from 'lucide-react';
import clsx from 'clsx';

const sidebarLinks = [
  { href: '/worker-dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/worker/attendance', label: 'Attendance Log', icon: CalendarClock },
  { href: '/worker/tasks', label: 'My Tasks', icon: ClipboardList, badge: true },
  { href: '/worker/history', label: 'History', icon: History },
  { href: '/worker/settings', label: 'Settings', icon: Settings },
];

interface WorkerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WorkerSidebar({ isOpen, onClose }: WorkerSidebarProps) {
  const pathname = usePathname();
  const { logout, user } = useAuth();

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
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-50 flex h-full w-20 flex-col justify-between border-r border-slate-200 bg-white transition-all duration-300 lg:static lg:w-72 dark:border-slate-800 dark:bg-[#111a22]',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo Area */}
          <div className="flex h-20 items-center justify-center border-b border-slate-100 px-0 lg:justify-start lg:px-6 dark:border-slate-800/50">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#137fec] text-white">
              <WashingMachine className="h-6 w-6" />
            </div>
            <div className="ml-3 hidden flex-col lg:flex">
              <span className="text-lg font-bold leading-none tracking-tight text-slate-900 dark:text-white">
                CleanFlow
              </span>
              <span className="text-xs font-medium text-slate-500">
                Worker Portal
              </span>
            </div>
            {/* Close Button (Mobile Only) */}
            <button
              onClick={onClose}
              className="ml-auto mr-4 hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:!hidden dark:text-gray-400 dark:hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 py-6">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className={clsx(
                    'group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors',
                    isActive
                      ? 'bg-[#137fec] text-white shadow-md shadow-[#137fec]/20'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-[#233648] dark:hover:text-white'
                  )}
                >
                  <div className="relative">
                    <Icon
                      className={clsx(
                        'h-6 w-6 transition-transform group-hover:scale-110',
                        isActive && 'text-white'
                      )}
                    />
                    {link.badge && (
                      <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#137fec] opacity-75"></span>
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#137fec]"></span>
                      </span>
                    )}
                  </div>
                  <span
                    className={clsx(
                      'hidden text-sm lg:block',
                      isActive ? 'font-bold' : 'font-medium'
                    )}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="border-t border-slate-200 p-4 dark:border-slate-800">
            <div className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-[#233648]">
              <div className="relative size-10 overflow-hidden rounded-full border-2 border-white bg-slate-200 shadow-sm dark:border-slate-700">
                {user?.profile_picture_url ? (
                  <img
                    src={user.profile_picture_url}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                    {user?.name?.charAt(0).toUpperCase() || 'W'}
                  </div>
                )}
              </div>
              <div className="hidden flex-col overflow-hidden lg:flex">
                <span className="truncate text-sm font-bold text-slate-900 dark:text-white">
                  {user?.name || 'Worker'}
                </span>
                <span className="truncate text-xs font-medium text-[#137fec]">
                  Station: Washing
                </span>
              </div>
              <button
                onClick={logout}
                className="ml-auto hidden text-slate-400 transition-colors hover:text-red-500 lg:block"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
