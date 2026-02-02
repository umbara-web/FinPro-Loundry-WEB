'use client';

import { useState } from 'react';
import ProtectedRoute from '@/src/components/auth/protected-route';
import { DriverSidebar } from '@/src/components/driver/driver-sidebar';
import { Menu } from 'lucide-react';

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute roles={['DRIVER']}>
      <div className="flex h-screen overflow-hidden bg-[#101922] font-sans text-white">
        <DriverSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Mobile Header */}
          <header className="flex h-16 items-center justify-between border-b border-slate-700 bg-[#101922] px-4 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <Menu className="h-6 w-6" />
            </button>
            <span className="text-lg font-bold">LaundryLogistics</span>
            <div className="w-10" /> {/* Spacer for centering */}
          </header>
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
