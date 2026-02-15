'use client';

import ProtectedRoute from '@/src/components/auth/protected-route';
import {
  WorkerSidebar,
  WorkerHeader,
} from '@/src/views/worker/dashboard/_components';
import { useState } from 'react';

export default function WorkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ProtectedRoute roles={['WORKER']}>
      <div className='bg-background-light dark:bg-background-dark font-display flex h-screen overflow-hidden text-slate-900 dark:text-white'>
        <WorkerSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className='relative flex h-full flex-1 flex-col overflow-hidden'>
          <WorkerHeader
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
