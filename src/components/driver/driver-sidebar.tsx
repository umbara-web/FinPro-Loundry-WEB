'use client';

import { useAuth } from '@/src/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarClock,
  Truck,
  Package,
  History,
  LogOut,
  X,
} from 'lucide-react';
import clsx from 'clsx';

const sidebarLinks = [
  { href: '/driver-dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/driver-attendance', label: 'Absensi', icon: CalendarClock },
  { href: '/driver-pickup', label: 'Pickup', icon: Package },
  { href: '/driver-delivery', label: 'Delivery', icon: Truck },
  { href: '/driver-history', label: 'Riwayat', icon: History },
];

interface DriverSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DriverSidebar({ isOpen, onClose }: DriverSidebarProps) {
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
          'fixed inset-y-0 left-0 z-50 flex h-full w-20 flex-col justify-between border-r border-slate-700 bg-[#101922] transition-all duration-300 lg:static lg:w-72',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo Area */}
          <div className="flex h-20 items-center justify-center border-b border-slate-800/50 px-0 lg:justify-start lg:px-6">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
              <Truck className="h-6 w-6" />
            </div>
            <div className="ml-3 hidden flex-col lg:flex">
              <span className="text-lg font-bold leading-none tracking-tight text-white">
                LaundryLogistics
              </span>
              <span className="text-xs font-medium text-slate-400">
                Driver Portal
              </span>
            </div>
            {/* Close Button (Mobile Only) */}
            <button
              onClick={onClose}
              className="ml-auto mr-4 hidden rounded-lg p-2 text-gray-400 hover:bg-slate-800 lg:!hidden"
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
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'text-slate-400 hover:bg-[#233648] hover:text-white'
                  )}
                >
                  <div className="relative">
                    <Icon
                      className={clsx(
                        'h-6 w-6 transition-transform group-hover:scale-110',
                        isActive && 'text-white'
                      )}
                    />
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
          <div className="border-t border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <Link
                href="/driver-profile"
                className="flex flex-1 cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-[#233648]"
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
              >
                <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-slate-700 bg-slate-700 shadow-sm">
                  {user?.profile_picture_url ? (
                    <img
                      src={user.profile_picture_url}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/20 text-sm font-bold text-primary">
                      {user?.name?.charAt(0).toUpperCase() || 'D'}
                    </div>
                  )}
                </div>
                <div className="hidden flex-col overflow-hidden lg:flex">
                  <span className="truncate text-sm font-bold text-white">
                    {user?.name || 'Driver'}
                  </span>
                  <span className="truncate text-xs font-medium text-primary">
                    Driver
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
