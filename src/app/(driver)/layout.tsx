'use client';

import { useState } from 'react';
import ProtectedRoute from '@/src/components/auth/protected-route';
import { DriverSidebar } from '@/src/components/driver/driver-sidebar';
import { DriverHeader } from '@/src/components/driver/driver-header';

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ProtectedRoute roles={['DRIVER']}>
      <div className='bg-background-light dark:bg-background-dark font-display flex h-screen overflow-hidden text-slate-900 dark:text-white'>
        <DriverSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className='relative flex h-full flex-1 flex-col overflow-hidden'>
          <DriverHeader
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <main className='flex-1 overflow-y-auto'>
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
