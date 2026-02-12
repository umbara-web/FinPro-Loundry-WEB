'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { Truck, Bell, Clock } from 'lucide-react';
import clsx from 'clsx';
import { useDriverDashboard } from '@/src/hooks/use-driver-dashboard';

import { DashboardHeader } from '@/src/components/driver/dashboard/dashboard-header';
import { RequestsTab } from '@/src/components/driver/dashboard/requests-tab';
import { ActiveJobTab } from '@/src/components/driver/dashboard/active-job-tab';
import { HistoryTab } from '@/src/components/driver/dashboard/history-tab';

type TabType = 'requests' | 'active' | 'history';

export function DriverDashboardView() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('requests');
  const [isOnline, setIsOnline] = useState(true);

  const {
    pickups,
    deliveries,
    activeJob,
    todayHistory,
    isLoading,
    acceptPickup,
    acceptDelivery,
    hasAutoSwitched,
  } = useDriverDashboard();

  useEffect(() => {
    if (activeJob && !hasAutoSwitched.current) {
      setActiveTab('active');
      hasAutoSwitched.current = true;
    }
  }, [activeJob, hasAutoSwitched]);

  const totalRequests = pickups.length + deliveries.length;

  return (
    <div className='min-h-full bg-[#101922] px-4 py-6 md:px-10'>
      <div className='mx-auto max-w-240'>
        {/* Profile Header & Status Toggle */}
        <DashboardHeader
          user={user}
          isOnline={isOnline}
          onStatusChange={setIsOnline}
        />

        {/* Tabbed Navigation */}
        <div className='mb-4 flex overflow-x-auto border-b border-[#223649]'>
          <button
            onClick={() => setActiveTab('requests')}
            className={clsx(
              'flex items-center gap-2 px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors',
              activeTab === 'requests'
                ? 'border-b-2 border-[#0a7ff5] font-bold text-[#0a7ff5]'
                : 'text-[#8fadcc] hover:text-white'
            )}
          >
            <Bell className='h-5 w-5' />
            Request Baru
            {totalRequests > 0 && (
              <span className='rounded-full bg-[#0a7ff5]/20 px-1.5 py-0.5 text-[10px] text-[#0a7ff5]'>
                {totalRequests}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={clsx(
              'flex items-center gap-2 px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors',
              activeTab === 'active'
                ? 'border-b-2 border-[#0a7ff5] font-bold text-[#0a7ff5]'
                : 'text-[#8fadcc] hover:text-white'
            )}
          >
            <Truck className='h-5 w-5' />
            Sedang Berjalan
            {activeJob && (
              <span className='h-2 w-2 animate-pulse rounded-full bg-green-500' />
            )}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={clsx(
              'flex items-center gap-2 px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors',
              activeTab === 'history'
                ? 'border-b-2 border-[#0a7ff5] font-bold text-[#0a7ff5]'
                : 'text-[#8fadcc] hover:text-white'
            )}
          >
            <Clock className='h-5 w-5' />
            Riwayat
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'requests' && (
          <RequestsTab
            pickups={pickups}
            deliveries={deliveries}
            isLoading={isLoading}
            onAcceptPickup={acceptPickup}
            onAcceptDelivery={acceptDelivery}
          />
        )}

        {activeTab === 'active' && <ActiveJobTab activeJob={activeJob} />}

        {activeTab === 'history' && <HistoryTab history={todayHistory} />}
      </div>
    </div>
  );
}
