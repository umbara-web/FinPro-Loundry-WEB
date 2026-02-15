'use client';

import { useState } from 'react';
import OutletSidebar from './_components/OutletSidebar';
import OutletHeader from './_components/OutletHeader';
import RoleGuard from '@/src/components/auth/RoleGuard';

export default function OutletAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <RoleGuard allowedRoles={['SUPER_ADMIN', 'OUTLET_ADMIN']}>
      <div className='flex min-h-screen bg-gray-50 dark:bg-slate-950'>
        {/* Sidebar */}
        <OutletSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className='flex-1 flex flex-col min-w-0'>
          <OutletHeader
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          {/* Page Content */}
          <main className='flex-1 overflow-y-auto bg-[#121212]'>
            {children}
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
