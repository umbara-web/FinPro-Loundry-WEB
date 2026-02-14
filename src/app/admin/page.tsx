'use client';

import { TrendingUp, Shirt, Truck, Store } from 'lucide-react';
import SidebarDashboard from '@/app/admin/allorder/components/mainsidebar';
import { useEffect, useState } from 'react';
import api from '@/utils/api';

import { DashboardHeader } from '@/app/admin/dashboard/DashboardHeader';
import { StatCard } from '@/app/admin/dashboard/StatCard';
import { QuickActions } from '@/app/admin/dashboard/QuickActions';
import { RecentOrders } from '@/app/admin/dashboard/RecentOrders';
import { OutletPerformance } from '@/app/admin/dashboard/OutletPerformance';
import { ActiveDrivers } from '@/app/admin/dashboard/ActiveDrivers';

export default function Dashboard() {
    const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
    const [addresses, setAddresses] = useState<any[]>([]);

    useEffect(() => {
        const testConnection = async () => {
            try {
                const response = await api.get('/api/addresses');
                setAddresses(response.data);
                setConnectionStatus('connected');
            } catch (error) {
                console.error('Connection failed:', error);
                setConnectionStatus('error');
            }
        };

        testConnection();
    }, []);

    return (
        <div className="flex min-h-screen bg-[#101922] text-white font-sans">
            <SidebarDashboard />

            <main className="flex-1 flex flex-col h-screen overflow-hidden">

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-7xl mx-auto">

                        <DashboardHeader connectionStatus={connectionStatus} />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                            <StatCard title="Total Pendapatan" value="Rp 45.2jt" sub="12%" icon={<TrendingUp className="text-green-500" />} trend="up" />
                            <StatCard title="Pesanan Aktif" value="128" sub="5%" icon={<Shirt className="text-blue-500" />} trend="up" />
                            <StatCard title="Perlu Penjemputan" value="15" sub="Menunggu Driver" icon={<Truck className="text-orange-500" />} />
                            <StatCard title="Outlet Beroperasi" value="8/10" sub="Sistem Online" icon={<Store className="text-purple-500" />} />
                        </div>

                        <QuickActions />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <RecentOrders />

                            <div className="space-y-6">
                                <OutletPerformance />
                                <ActiveDrivers />
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
