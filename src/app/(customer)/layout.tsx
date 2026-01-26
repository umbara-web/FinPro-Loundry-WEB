'use client';

import ProtectedRoute from '@/src/components/auth/protected-route';
import { Sidebar } from '@/src/components/dashboard/main/sidebar';
import { Header } from '@/src/components/dashboard/main/header';
import { useState } from 'react';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ProtectedRoute roles={['CUSTOMER']}>
      <div className='bg-background-light dark:bg-background-dark font-display flex h-screen overflow-hidden text-slate-900 dark:text-white'>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className='relative flex h-full flex-1 flex-col overflow-hidden'>
          <Header
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
