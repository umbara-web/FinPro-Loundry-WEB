'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Fingerprint, History, User } from 'lucide-react';
import clsx from 'clsx';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface MobileBottomNavProps {
  basePath?: string;
  dashboardPath?: string;
  profilePath?: string;
}

export function MobileBottomNav({
  basePath = '/worker-attendance',
  dashboardPath = '/worker-dashboard',
  profilePath = '/worker-profile',
}: MobileBottomNavProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      icon: <Home className='h-5 w-5' />,
      label: 'Home',
      href: dashboardPath,
    },
    {
      icon: <Fingerprint className='h-5 w-5' />,
      label: 'Absen',
      href: basePath,
    },
    {
      icon: <History className='h-5 w-5' />,
      label: 'Log',
      href: `${basePath}/history`,
    },
    {
      icon: <User className='h-5 w-5' />,
      label: 'Profil',
      href: profilePath,
    },
  ];

  const isActive = (href: string) => {
    if (href === basePath) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className='z-50 flex-none border-t border-slate-200 bg-white px-6 py-3 md:hidden dark:border-slate-800 dark:bg-[#111a22]'>
      <div className='mx-auto flex max-w-md items-center justify-between'>
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex flex-col items-center gap-1 transition-colors',
                active
                  ? 'text-[#137fec]'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              )}
            >
              {item.icon}
              <span className={clsx('text-[10px]', active && 'font-bold')}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
