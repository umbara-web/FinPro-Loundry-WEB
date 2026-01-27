'use client';

import { Bell, Menu } from 'lucide-react';
import { ModeToggle } from '@/src/components/ui/mode-toggle';
import { Button } from '@/src/components/ui/button';

interface WorkerHeaderProps {
  title: string;
  subtitle?: string;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function WorkerHeader({
  title,
  subtitle,
  isSidebarOpen,
  onToggleSidebar,
}: WorkerHeaderProps) {
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="sticky top-0 z-10 flex h-20 shrink-0 items-center justify-between border-b border-slate-100 bg-white/80 px-6 backdrop-blur-md lg:px-10 dark:border-slate-800 dark:bg-[#1b2027]/80">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 lg:hidden dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            {title}
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {subtitle || formattedDate}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 text-slate-400 transition-colors hover:bg-teal-500/5 hover:text-teal-500">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-white bg-red-500 dark:border-[#1b2027]"></span>
        </button>

        <div className="mx-1 h-8 w-px bg-slate-200 dark:bg-slate-700"></div>

        <ModeToggle />

        <div className="hidden items-center gap-2 sm:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
          <span className="text-xs font-bold uppercase tracking-wide text-green-600 dark:text-green-400">
            System Online
          </span>
        </div>
      </div>
    </header>
  );
}
