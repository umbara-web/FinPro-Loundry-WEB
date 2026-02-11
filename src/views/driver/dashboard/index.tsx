'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/src/context/AuthContext';
import {
  Truck,
  Bell,
  Clock,
  CheckCircle2,
  Package,
} from 'lucide-react';
import clsx from 'clsx';
import {
  AvailablePickupRequest,
  AvailableDeliveryRequest,
  ActiveJob,
} from '@/src/types/driver';
import { api } from '@/src/lib/api/axios-instance';
import { toast } from 'sonner';

// Components
import { DashboardHeader } from '@/src/components/driver/dashboard/dashboard-header';
import { PickupRequestCard } from '@/src/components/driver/dashboard/pickup-request-card';
import { DeliveryRequestCard } from '@/src/components/driver/dashboard/delivery-request-card';
import { ActiveJobCard } from '@/src/components/driver/dashboard/active-job-card';

type TabType = 'requests' | 'active' | 'history';

interface HistoryItem {
  id: string;
  type: 'PICKUP' | 'DELIVERY';
  order_number: string;
  customer_name: string;
  address: string;
  completed_at: string;
  status: string;
}

export function DriverDashboardView() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('requests');
  const [isOnline, setIsOnline] = useState(true);
  const [pickups, setPickups] = useState<AvailablePickupRequest[]>([]);
  const [deliveries, setDeliveries] = useState<AvailableDeliveryRequest[]>([]);
  const [activeJob, setActiveJob] = useState<ActiveJob | null>(null);
  const [todayHistory, setTodayHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const hasAutoSwitched = useRef(false);

  const fetchData = useCallback(async (isBackground = false) => {
    if (!isBackground) {
      setLoading(true);
    }
    try {
      // Fetch available pickups
      const { data: pickupData } = await api.get('/driver/pickups');
      setPickups(pickupData.data || []);

      // Fetch available deliveries
      const { data: deliveryData } = await api.get('/driver/deliveries');
      setDeliveries(deliveryData.data || []);

      // Fetch active job
      const { data: activeData } = await api.get('/driver/active-job');
      if (activeData.data) {
        // Transform the response to match ActiveJob interface
        const jobData = activeData.data;
        setActiveJob({
          id: jobData.type === 'PICKUP' ? jobData.data.id : jobData.data.id,
          type: jobData.type,
          status: jobData.data.status,
          orderNumber: jobData.type === 'PICKUP'
            ? jobData.data.id.slice(-4).toUpperCase()
            : jobData.data.order_id?.slice(-4).toUpperCase() || '',
          customer: {
            name: jobData.type === 'PICKUP'
              ? jobData.data.customer?.name || 'Pelanggan'
              : jobData.data.order?.pickup_request?.customer?.name || 'Pelanggan',
            phone: jobData.type === 'PICKUP'
              ? jobData.data.customer?.phone
              : jobData.data.order?.pickup_request?.customer?.phone,
          },
          address: jobData.type === 'PICKUP'
            ? jobData.data.customer_address || {}
            : jobData.data.order?.pickup_request?.customer_address || {},
        });
      } else {
        setActiveJob(null);
      }

      // Fetch today's history
      const { data: historyData } = await api.get('/driver/history?date=today&limit=50');
      setTodayHistory(historyData.data || []);
    } catch (error) {
      console.error('Error fetching driver data:', error);
    } finally {
      if (!isBackground) {
        setLoading(false);
      }
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-switch to 'active' tab if there's an active job on first load
  useEffect(() => {
    if (activeJob && !hasAutoSwitched.current) {
      setActiveTab('active');
      hasAutoSwitched.current = true;
    }
  }, [activeJob]);

  // Auto-polling every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData(true);
    }, 30000);

    return () => clearInterval(intervalId);
  }, [fetchData]);

  const handleAcceptPickup = async (requestId: string) => {
    if (activeJob) {
      toast.error('Anda masih memiliki tugas aktif. Selesaikan tugas saat ini sebelum menerima request baru.');
      return;
    }
    try {
      await api.post(`/driver/pickups/${requestId}/accept`);
      window.location.href = `/driver-pickup/${requestId}`;
    } catch (error: any) {
      console.error('Error accepting pickup:', error);
      toast.error(error.response?.data?.message || 'Gagal menerima request');
    }
  };

  const handleAcceptDelivery = async (orderId: string) => {
    if (activeJob) {
      toast.error('Anda masih memiliki tugas aktif. Selesaikan tugas saat ini sebelum menerima request baru.');
      return;
    }
    try {
      const { data } = await api.post(`/driver/deliveries/${orderId}/accept`);
      const taskId = data.data.id;
      window.location.href = `/driver-delivery/${taskId}`;
    } catch (error: any) {
      console.error('Error accepting delivery:', error);
      toast.error(error.response?.data?.message || 'Gagal menerima delivery');
    }
  };

  const totalRequests = pickups.length + deliveries.length;

  return (
    <div className="min-h-full bg-[#101922] px-4 py-6 md:px-10">
      <div className="mx-auto max-w-[960px]">
        {/* Profile Header & Status Toggle */}
        <DashboardHeader
          user={user}
          isOnline={isOnline}
          onStatusChange={setIsOnline}
        />

        {/* Tabbed Navigation */}
        <div className="mb-4 flex overflow-x-auto border-b border-[#223649]">
          <button
            onClick={() => setActiveTab('requests')}
            className={clsx(
              'flex items-center gap-2 whitespace-nowrap px-6 py-3 text-sm font-medium transition-colors',
              activeTab === 'requests'
                ? 'border-b-2 border-[#0a7ff5] font-bold text-[#0a7ff5]'
                : 'text-[#8fadcc] hover:text-white'
            )}
          >
            <Bell className="h-5 w-5" />
            Request Baru
            {totalRequests > 0 && (
              <span className="rounded-full bg-[#0a7ff5]/20 px-1.5 py-0.5 text-[10px] text-[#0a7ff5]">
                {totalRequests}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={clsx(
              'flex items-center gap-2 whitespace-nowrap px-6 py-3 text-sm font-medium transition-colors',
              activeTab === 'active'
                ? 'border-b-2 border-[#0a7ff5] font-bold text-[#0a7ff5]'
                : 'text-[#8fadcc] hover:text-white'
            )}
          >
            <Truck className="h-5 w-5" />
            Sedang Berjalan
            {activeJob && (
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={clsx(
              'flex items-center gap-2 whitespace-nowrap px-6 py-3 text-sm font-medium transition-colors',
              activeTab === 'history'
                ? 'border-b-2 border-[#0a7ff5] font-bold text-[#0a7ff5]'
                : 'text-[#8fadcc] hover:text-white'
            )}
          >
            <Clock className="h-5 w-5" />
            Riwayat
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'requests' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {loading ? (
              <div className="col-span-2 py-12 text-center text-[#8fadcc]">
                Memuat data...
              </div>
            ) : pickups.length === 0 && deliveries.length === 0 ? (
              <div className="col-span-2 py-12 text-center text-[#8fadcc]">
                Tidak ada request baru saat ini.
              </div>
            ) : (
              <>
                {/* Pickup Cards */}
                {pickups.map((pickup) => (
                  <PickupRequestCard
                    key={pickup.id}
                    pickup={pickup}
                    onAccept={handleAcceptPickup}
                  />
                ))}

                {/* Delivery Cards */}
                {deliveries.map((delivery) => (
                  <DeliveryRequestCard
                    key={delivery.id}
                    delivery={delivery}
                    onAccept={handleAcceptDelivery}
                  />
                ))}
              </>
            )}
          </div>
        )}

        {activeTab === 'active' && (
          <div>
            {activeJob ? (
              <ActiveJobCard activeJob={activeJob} />
            ) : (
              <div className="py-12 text-center text-[#8fadcc]">
                Tidak ada tugas yang sedang berjalan.
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            {todayHistory.length > 0 ? (
              <>
                {/* Summary Bar */}
                <div className="mb-4 flex items-center gap-4 rounded-xl bg-[#182634] p-4">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <p className="text-sm font-bold text-white">
                    {todayHistory.filter(h => h.type === 'PICKUP').length} Jemput
                    {' · '}
                    {todayHistory.filter(h => h.type === 'DELIVERY').length} Antar
                  </p>
                  <span className="text-xs text-[#8fadcc]">Hari ini</span>
                </div>

                {/* Compact History List */}
                <div className="space-y-3">
                  {todayHistory.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-xl bg-[#182634] p-4"
                    >
                      <div className={clsx(
                        'rounded-lg p-2',
                        item.type === 'PICKUP' ? 'bg-orange-500/10' : 'bg-blue-500/10'
                      )}>
                        {item.type === 'PICKUP' ? (
                          <Package className="h-4 w-4 text-orange-500" />
                        ) : (
                          <Truck className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-white truncate">
                            {item.type === 'PICKUP' ? 'Jemput' : 'Antar'} - {item.customer_name}
                          </p>
                          <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-bold text-green-500 whitespace-nowrap">
                            Selesai
                          </span>
                        </div>
                        <p className="text-xs text-[#8fadcc] truncate">
                          {item.order_number} · {item.address}
                        </p>
                      </div>
                      <p className="text-xs text-[#8fadcc] whitespace-nowrap">
                        {item.completed_at
                          ? new Date(item.completed_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                          : '-'}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="py-12 text-center text-[#8fadcc]">
                Belum ada tugas selesai hari ini.
              </div>
            )}

            {/* Link to full history */}
            <div className="mt-4 text-center">
              <Link href="/driver-history" className="text-sm font-bold text-[#0a7ff5] hover:underline">
                Lihat Semua Riwayat →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
