'use client';

import ProtectedRoute from '@/src/components/auth/protected-route';
import { WorkerSidebar } from '@/src/components/worker/worker-sidebar';
import { WorkerHeader } from '@/src/components/worker/worker-header';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const pageTitles: Record<string, string> = {
  '/worker/dashboard': 'Dashboard',
  '/worker/attendance': 'Attendance Log',
  '/worker/tasks': 'My Tasks',
  '/worker/history': 'History',
  '/worker/settings': 'Settings',
};

export default function WorkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'Worker Portal';

  return (
    <ProtectedRoute roles={['WORKER']}>
      <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-900 dark:bg-[#1b2027] dark:text-white">
        <WorkerSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="relative flex h-full flex-1 flex-col overflow-hidden">
          <WorkerHeader
            title={title}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <div className="flex-1 overflow-y-auto scroll-smooth p-6 lg:p-10">
            <div className="mx-auto max-w-7xl">{children}</div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
