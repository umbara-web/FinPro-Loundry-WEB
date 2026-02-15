'use client';

import { useState } from 'react';
import SidebarDashboard from '@/src/app/admin/allorder/components/mainsidebar';
import AdminHeader from './components/AdminHeader';
import RoleGuard from '@/src/components/auth/RoleGuard';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <RoleGuard allowedRoles={['SUPER_ADMIN', 'OUTLET_ADMIN']}>
            <div className='flex min-h-screen bg-[#0f172a] text-white font-sans'>
                {/* Sidebar */}
                <SidebarDashboard />

                {/* Main Content */}
                <div className='flex-1 flex flex-col min-w-0'>
                    <AdminHeader
                        isSidebarOpen={isSidebarOpen}
                        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    />

                    {/* Page Content */}
                    <main className='flex-1 overflow-y-auto'>
                        {children}
                    </main>
                </div>
            </div>
        </RoleGuard>
    );
}
