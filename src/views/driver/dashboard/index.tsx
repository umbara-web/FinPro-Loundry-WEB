'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/src/context/AuthContext';
import {
  MapPin,
  User,
  ChevronRight,
  Package,
  Truck,
  Bell,
  Clock,
  Navigation,
} from 'lucide-react';
import clsx from 'clsx';
import {
  AvailablePickupRequest,
  AvailableDeliveryRequest,
  ActiveJob,
} from '@/src/types/driver';
import { api } from '@/src/lib/api/axios-instance';

type TabType = 'requests' | 'active' | 'history';

export function DriverDashboardView() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('requests');
  const [isOnline, setIsOnline] = useState(true);
  const [pickups, setPickups] = useState<AvailablePickupRequest[]>([]);
  const [deliveries, setDeliveries] = useState<AvailableDeliveryRequest[]>([]);
  const [activeJob, setActiveJob] = useState<ActiveJob | null>(null);
  const [loading, setLoading] = useState(true);

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

  // Auto-polling every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData(true);
    }, 30000);

    return () => clearInterval(intervalId);
  }, [fetchData]);

  const handleAcceptPickup = async (requestId: string) => {
    try {
      await api.post(`/driver/pickups/${requestId}/accept`);
      window.location.href = `/driver-pickup/${requestId}`;
    } catch (error: any) {
      console.error('Error accepting pickup:', error);
      alert(error.response?.data?.message || 'Gagal menerima request');
    }
  };

  const handleAcceptDelivery = async (orderId: string) => {
    try {
      const { data } = await api.post(`/driver/deliveries/${orderId}/accept`);
      const taskId = data.data.id;
      window.location.href = `/driver-delivery/${taskId}`;
    } catch (error: any) {
      console.error('Error accepting delivery:', error);
      alert(error.response?.data?.message || 'Gagal menerima delivery');
    }
  };

  const totalRequests = pickups.length + deliveries.length;

  return (
    <div className="min-h-full bg-[#101922] px-4 py-6 md:px-10">
      <div className="mx-auto max-w-[960px]">
        {/* Profile Header & Status Toggle */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div
              className="size-20 rounded-full border-2 border-[#0a7ff5]/20 bg-cover bg-center bg-no-repeat md:size-28"
              style={{
                backgroundImage: user?.profile_picture_url
                  ? `url(${user.profile_picture_url})`
                  : 'none',
                backgroundColor: !user?.profile_picture_url
                  ? '#223649'
                  : undefined,
              }}
            >
              {!user?.profile_picture_url && (
                <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-[#0a7ff5]">
                  {user?.name?.charAt(0).toUpperCase() || 'D'}
                </div>
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-white md:text-3xl">
                Halo, {user?.name || 'Driver'}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={clsx(
                    'h-2 w-2 rounded-full',
                    isOnline ? 'animate-pulse bg-green-500' : 'bg-slate-500'
                  )}
                />
                <p className="text-sm text-[#8fadcc]">
                  Driver ID: #{user?.id?.slice(-4).toUpperCase() || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Status Toggle */}
          <div className="flex min-w-[280px] flex-1 flex-col items-start justify-between gap-4 rounded-xl border border-[#304d69] bg-[#101a23] p-4 md:flex-row md:items-center">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold uppercase tracking-wider text-white">
                Status Driver
              </p>
              <p className="text-xs text-[#8fadcc]">
                {isOnline ? 'Online & Siap Menerima' : 'Offline'}
              </p>
            </div>
            <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-[#223649] p-0.5 transition-all has-[:checked]:justify-end has-[:checked]:bg-[#0a7ff5]">
              <div className="h-full w-[27px] rounded-full bg-white shadow-md"></div>
              <input
                type="checkbox"
                checked={isOnline}
                onChange={() => setIsOnline(!isOnline)}
                className="invisible absolute"
              />
            </label>
          </div>
        </div>

        {/* Active Job Snippet */}
        {activeJob && (
          <div className="mb-6">
            <h2 className="mb-3 text-lg font-bold text-white">
              Tugas Saat Ini
            </h2>
            <Link
              href={
                activeJob.type === 'PICKUP'
                  ? `/driver-pickup/${activeJob.id}`
                  : `/driver-delivery/${activeJob.id}`
              }
              className="flex items-stretch justify-between gap-4 rounded-xl border-l-4 border-[#0a7ff5] bg-[#182634] p-5 shadow-lg transition-all hover:bg-[#1d2d3d]"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#0a7ff5]/20 px-2 py-0.5 text-[10px] font-bold uppercase text-[#0a7ff5]">
                    Sedang Berjalan
                  </span>
                  <span className="text-xs text-[#8fadcc]">
                    #{activeJob.orderNumber || activeJob.id.slice(-4)}
                  </span>
                </div>
                <p className="text-lg font-bold text-white">
                  {activeJob.type === 'PICKUP' ? 'Jemput' : 'Antar'} -{' '}
                  {activeJob.customer.name}
                </p>
                <div className="flex items-center gap-1 text-[#8fadcc]">
                  <MapPin className="h-4 w-4" />
                  <p className="text-sm">{activeJob.address.address}</p>
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm font-bold text-[#0a7ff5]">
                  Lanjutkan Tugas
                  <ChevronRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          </div>
        )}

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
                  <div
                    key={pickup.id}
                    className="flex flex-col gap-4 rounded-xl border border-transparent bg-[#182634] p-5 shadow-sm transition-all hover:border-[#0a7ff5]/50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-orange-500/10 p-2">
                          <Package className="h-5 w-5 text-orange-500" />
                        </div>
                        <div>
                          <p className="font-bold text-white">
                            Jemput - {pickup.notes || 'Laundry'}
                          </p>
                          <p className="text-xs text-[#8fadcc]">
                            #{pickup.id.slice(-8).toUpperCase()}
                          </p>
                        </div>
                      </div>
                      {pickup.distance && (
                        <div className="flex items-center gap-1 text-sm font-bold text-[#0a7ff5]">
                          <Navigation className="h-4 w-4" />
                          {pickup.distance} km
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-[#8fadcc]">
                        <User className="h-4 w-4" />
                        <span>{pickup.customer?.name || 'Pelanggan'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#8fadcc]">
                        <MapPin className="h-4 w-4" />
                        <span className="truncate">
                          {pickup.customer_address?.address || 'Alamat'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleAcceptPickup(pickup.id)}
                        className="flex-1 rounded-lg bg-[#0a7ff5] py-2 text-sm font-bold text-white transition-colors hover:bg-[#0a7ff5]/90"
                      >
                        Terima Request
                      </button>
                      <button className="rounded-lg bg-[#223649] px-3 py-2 text-sm font-bold text-white">
                        Detail
                      </button>
                    </div>
                  </div>
                ))}

                {/* Delivery Cards */}
                {deliveries.map((delivery) => (
                  <div
                    key={delivery.id}
                    className="flex flex-col gap-4 rounded-xl border border-transparent bg-[#182634] p-5 shadow-sm transition-all hover:border-[#0a7ff5]/50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-500/10 p-2">
                          <Truck className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-bold text-white">
                            Antar - Order #{delivery.order_number || delivery.id.slice(-4)}
                          </p>
                          <p className="text-xs text-[#8fadcc]">
                            #{delivery.id.slice(-8).toUpperCase()}
                          </p>
                        </div>
                      </div>
                      {delivery.distance && (
                        <div className="flex items-center gap-1 text-sm font-bold text-[#0a7ff5]">
                          <Navigation className="h-4 w-4" />
                          {delivery.distance} km
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-[#8fadcc]">
                        <User className="h-4 w-4" />
                        <span>
                          {delivery.pickup_request?.customer?.name ||
                            'Pelanggan'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#8fadcc]">
                        <MapPin className="h-4 w-4" />
                        <span className="truncate">
                          {delivery.pickup_request?.customer_address?.address ||
                            'Alamat'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleAcceptDelivery(delivery.id)}
                        className="flex-1 rounded-lg bg-[#0a7ff5] py-2 text-sm font-bold text-white transition-colors hover:bg-[#0a7ff5]/90"
                      >
                        Terima Request
                      </button>
                      <button className="rounded-lg bg-[#223649] px-3 py-2 text-sm font-bold text-white">
                        Detail
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {activeTab === 'active' && (
          <div className="py-12 text-center text-[#8fadcc]">
            {activeJob ? (
              <Link
                href={
                  activeJob.type === 'PICKUP'
                    ? `/driver-pickup/${activeJob.id}`
                    : `/driver-delivery/${activeJob.id}`
                }
                className="text-[#0a7ff5] underline"
              >
                Lihat tugas aktif
              </Link>
            ) : (
              'Tidak ada tugas yang sedang berjalan.'
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="py-12 text-center text-[#8fadcc]">
            <Link href="/driver-history" className="text-[#0a7ff5] underline">
              Lihat semua riwayat
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
