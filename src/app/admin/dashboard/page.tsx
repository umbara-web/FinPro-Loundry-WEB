'use client';

import SidebarDashboard from '@/src/app/admin/allorder/components/mainsidebar';
import { QuickActions } from './QuickActions';

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white font-sans">
      <SidebarDashboard />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <nav className="text-xs text-slate-500 mb-2">Admin / Dashboard</nav>
          <h1 className="text-3xl font-bold mb-1">Dashboard Admin</h1>
          <p className="text-slate-400 text-sm">Selamat datang di panel manajemen laundry.</p>
        </div>

        <QuickActions />
      </main>
    </div>
  );
}
