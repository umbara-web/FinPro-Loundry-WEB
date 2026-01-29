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
}

export function MobileBottomNav({ basePath = '' }: MobileBottomNavProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      icon: <Home className="w-5 h-5" />,
      label: 'Home',
      href: `${basePath}/worker-dashboard`,
    },
    {
      icon: <Fingerprint className="w-5 h-5" />,
      label: 'Absen',
      href: `${basePath}/worker-attendance`,
    },
    {
      icon: <History className="w-5 h-5" />,
      label: 'Log',
      href: `${basePath}/worker-attendance/history`,
    },
    {
      icon: <User className="w-5 h-5" />,
      label: 'Profil',
      href: `${basePath}/profile`,
    },
  ];

  const isActive = (href: string) => {
    if (href === `${basePath}/worker-attendance`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#111a22] border-t border-slate-200 dark:border-slate-800 px-6 py-3 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
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
              <span
                className={clsx('text-[10px]', active && 'font-bold')}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
