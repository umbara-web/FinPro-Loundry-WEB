'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { Truck, Bell, Clock } from 'lucide-react';
import clsx from 'clsx';
import { useDriverDashboard } from '@/src/views/driver/dashboard/_hooks/useDriverDashboard';
import { DashboardHeader } from '@/src/views/driver/dashboard/_components/dashboard-header';
import { RequestsTab } from '@/src/views/driver/dashboard/_components/requests-tab';
import { ActiveJobTab } from '@/src/views/driver/dashboard/_components/active-job-tab';
import { HistoryTab } from '@/src/views/driver/dashboard/_components/history-tab';

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
    <div className='min-h-full bg-slate-50 px-4 py-6 md:px-10 dark:bg-[#101922]'>
      <div className='mx-auto max-w-240'>
        {/* Profile Header & Status Toggle */}
        <DashboardHeader
          user={user}
          isOnline={isOnline}
          onStatusChange={setIsOnline}
        />

        {/* Tabbed Navigation */}
        <div className='mb-4 flex overflow-x-auto border-b border-slate-200 dark:border-slate-700'>
          <button
            onClick={() => setActiveTab('requests')}
            className={clsx(
              'flex items-center gap-2 px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors',
              activeTab === 'requests'
                ? 'border-b-2 border-blue-600 font-bold text-blue-600 dark:border-blue-500 dark:text-blue-500'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            )}
          >
            <Bell className='h-5 w-5' />
            Request Baru
            {totalRequests > 0 && (
              <span className='rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] text-blue-600 dark:bg-blue-500/20 dark:text-blue-500'>
                {totalRequests}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={clsx(
              'flex items-center gap-2 px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors',
              activeTab === 'active'
                ? 'border-b-2 border-blue-600 font-bold text-blue-600 dark:border-blue-500 dark:text-blue-500'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
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
                ? 'border-b-2 border-blue-600 font-bold text-blue-600 dark:border-blue-500 dark:text-blue-500'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
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
