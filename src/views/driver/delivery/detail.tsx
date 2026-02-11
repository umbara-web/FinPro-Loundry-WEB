'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  ArrowLeft,
  MapPin,
  Phone,
  MessageCircle,
  Navigation,
  Truck,
  CheckCircle,
  Info,
  Map,
  Package,
} from 'lucide-react';
import clsx from 'clsx';
import { toast } from 'sonner';
import { api } from '@/src/lib/api/axios-instance';

const MapView = dynamic(
  () => import('@/src/components/dashboard/address/map/map-view'),
  { ssr: false, loading: () => <div className="flex h-full items-center justify-center bg-[#1a2634]"><Map className="h-16 w-16 text-[#304d69]" /></div> }
);

interface DeliveryDetail {
  id: string;
  order_id: string;
  order: {
    id: string;
    order_number?: string;
    pickup_request?: {
      customer: {
        name: string;
        phone?: string;
      };
      customer_address: {
        address: string;
        city?: string;
        postal_code?: string;
        lat?: string;
        long?: string;
      };
      outlet?: {
        name: string;
        address: string;
        lat: string;
        long: string;
      };
    };
  };
  total_weight?: number;
  notes?: string;
  status: string;
}

type DeliveryStep = 'IN_PROGRESS' | 'DONE';

const steps: { key: DeliveryStep; label: string; icon: React.ReactNode }[] = [
  {
    key: 'IN_PROGRESS',
    label: 'Memuat Barang & Menuju Pelanggan',
    icon: <Truck className="h-4 w-4" />,
  },
  {
    key: 'DONE',
    label: 'Drop Off Selesai',
    icon: <CheckCircle className="h-4 w-4" />,
  },
];

export function DriverDeliveryDetailView() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string; // Renamed deliveryId to taskId for consistency with the provided edit

  const [delivery, setDelivery] = useState<DeliveryDetail | null>(null);
  const [currentStep, setCurrentStep] = useState<DeliveryStep>('IN_PROGRESS');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const { data } = await api.get(`/driver/deliveries/${taskId}`);
        if (data.data) {
          setDelivery(data.data);
          // Set current step based on status
          if (data.data.status === 'ACCEPTED' || data.data.status === 'IN_PROGRESS') {
            setCurrentStep('IN_PROGRESS');
          } else if (data.data.status === 'DONE') {
            setCurrentStep('DONE');
          }
        }
      } catch (error) {
        console.error('Error fetching delivery:', error);
        toast.error('Gagal memuat detail delivery');
      } finally {
        setLoading(false);
      }
    };

    fetchDelivery();
  }, [taskId]);

  const getCurrentStepIndex = () => {
    return steps.findIndex((s) => s.key === currentStep);
  };

  const handleUpdateStatus = async () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex >= steps.length - 1) {
      // Final step - complete and go back
      setUpdating(true);
      try {
        await api.patch(`/driver/deliveries/${taskId}/status`, {
          status: 'DONE',
        });
        toast.success('Pengiriman selesai');
        router.push('/driver-dashboard');
      } catch (error: any) {
        console.error('Error updating status:', error);
        toast.error(error.response?.data?.message || 'Gagal update status');
      } finally {
        setUpdating(false);
      }
      return;
    }

    const nextStep = steps[currentIndex + 1].key;
    setUpdating(true);
    try {
      await api.patch(`/driver/deliveries/${taskId}/status`, {
        status: nextStep,
      });
      setCurrentStep(nextStep);
      toast.success('Status berhasil diperbarui');
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.error(error.response?.data?.message || 'Gagal update status');
    } finally {
      setUpdating(false);
    }
  };

  const getButtonLabel = () => {
    return 'Drop Off Selesai';
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#101922] text-white">
        <p>Memuat...</p>
      </div>
    );
  }

  if (!delivery) {
    return (
      <div className="flex h-full items-center justify-center bg-[#101922] text-white">
        <p>Delivery tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col bg-[#101922]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#223649] bg-[#101922] px-4 py-3 md:px-10">
        <div className="flex items-center gap-4">
          <Link
            href="/driver-dashboard"
            className="flex items-center gap-2 text-[#8fadcc] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <div className="mx-2 h-4 w-px bg-[#223649]" />
          <h2 className="text-lg font-bold text-white">
            Delivery #{delivery.order?.order_number || `ORD-${delivery.order_id.slice(-4).toUpperCase()}`}
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 md:px-10">
        <div className="mx-auto max-w-[960px]">
          {/* Map */}
          <div className="mb-6 overflow-hidden rounded-xl border border-[#223649] bg-[#182634]">
            <div className="aspect-video w-full">
              {delivery.order?.pickup_request?.customer_address?.lat && delivery.order?.pickup_request?.customer_address?.long ? (
                <MapView
                  center={[parseFloat(delivery.order.pickup_request.customer_address.lat), parseFloat(delivery.order.pickup_request.customer_address.long)]}
                  onLocationSelect={() => {}}
                  zoom={15}
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-[#1a2634]">
                  <Map className="h-16 w-16 text-[#304d69]" />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Progress Timeline */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-[#223649] bg-[#182634] p-6">
                <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
                  <Truck className="h-5 w-5 text-[#0a7ff5]" />
                  Progres Pengantaran
                </h3>
                <div className="grid grid-cols-[40px_1fr] gap-x-2">
                  {steps.map((step, index) => {
                    const currentIndex = getCurrentStepIndex();
                    const isActive = index === currentIndex;
                    const isCompleted = index < currentIndex;
                    const isLast = index === steps.length - 1;

                    return (
                      <div key={step.key} className="contents">
                        <div className="flex flex-col items-center gap-1 pt-1">
                          <div
                            className={clsx(
                              'flex h-8 w-8 items-center justify-center rounded-full',
                              isActive &&
                                'bg-[#0a7ff5] text-white shadow-[0_0_15px_rgba(10,127,245,0.4)]',
                              isCompleted && 'bg-green-500 text-white',
                              !isActive && !isCompleted && 'bg-[#223649] text-[#8fadcc]'
                            )}
                          >
                            {isCompleted ? <CheckCircle className="h-4 w-4" /> : step.icon}
                          </div>
                          {!isLast && (
                            <div
                              className={clsx(
                                'h-12 w-[2px]',
                                isCompleted ? 'bg-green-500' : isActive ? 'bg-[#0a7ff5]' : 'bg-[#304d69]'
                              )}
                            />
                          )}
                        </div>
                        <div className="flex flex-1 flex-col pb-8">
                          <p
                            className={clsx(
                              'text-base font-medium',
                              isActive ? 'font-bold text-white' : isCompleted ? 'text-green-400' : 'text-[#8fadcc]'
                            )}
                          >
                            {step.label}
                          </p>
                          <p
                            className={clsx(
                              'mt-1 text-sm',
                              isActive ? 'font-medium text-[#0a7ff5]' : 'text-[#52718f]'
                            )}
                          >
                            {isActive ? 'Status Saat Ini' : isCompleted ? 'Selesai' : 'Menunggu'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              <div className="overflow-hidden rounded-xl border border-[#223649] bg-[#182634]">
                <div className="border-b border-[#223649] bg-[#1d2d3d] p-5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#8fadcc]">
                    Informasi Pelanggan
                  </h3>
                </div>
                <div className="flex flex-col gap-5 p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-xl font-bold text-white">
                        {delivery.order?.pickup_request?.customer?.name || 'N/A'}
                      </p>
                      <p className="flex items-center gap-1 text-sm text-[#8fadcc]">
                        <Phone className="h-4 w-4" />
                        {delivery.order?.pickup_request?.customer?.phone || 'N/A'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`tel:${delivery.order?.pickup_request?.customer?.phone || ''}`}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0a7ff5]/20 text-[#0a7ff5] transition-all hover:bg-[#0a7ff5] hover:text-white"
                      >
                        <Phone className="h-5 w-5" />
                      </a>
                      <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#223649] text-white transition-all hover:bg-[#304d69]">
                        <MessageCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-[#223649] bg-[#101922] p-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 text-[#0a7ff5]" />
                      <div className="flex flex-col gap-3">
                        <p className="text-sm leading-relaxed text-[#8fadcc]">
                          {delivery.order?.pickup_request?.customer_address?.address || 'N/A'}
                          {delivery.order?.pickup_request?.customer_address?.city &&
                            `, ${delivery.order.pickup_request.customer_address.city}`}
                          {delivery.order?.pickup_request?.customer_address?.postal_code &&
                            ` ${delivery.order.pickup_request.customer_address.postal_code}`}
                        </p>
                        <a
                          href={delivery.order?.pickup_request?.customer_address?.lat && delivery.order?.pickup_request?.customer_address?.long ? `https://www.google.com/maps/dir/?api=1&destination=${delivery.order.pickup_request.customer_address.lat},${delivery.order.pickup_request.customer_address.long}` : '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#223649] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#304d69]"
                        >
                          <Map className="h-5 w-5" />
                          Buka Google Maps
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="flex flex-col gap-4 rounded-xl border border-[#223649] bg-[#182634] p-5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#8fadcc]">
                  Rincian Order
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#8fadcc]">Order ID</span>
                  <span className="text-sm font-medium text-white">
                    {delivery.order?.order_number || `ORD-${delivery.order_id.slice(-4).toUpperCase()}`}
                  </span>
                </div>
                {delivery.total_weight && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8fadcc]">Berat Total</span>
                    <span className="text-sm font-medium text-white">
                      {delivery.total_weight} kg
                    </span>
                  </div>
                )}
              </div>

              {/* Constraint Message */}
              <div className="flex items-center gap-3 rounded-xl border border-orange-500/20 bg-orange-500/10 p-4">
                <Info className="h-5 w-5 text-orange-500" />
                <p className="text-xs leading-tight text-orange-200/80">
                  Anda hanya dapat memproses 1 order dalam satu waktu untuk menjaga kualitas layanan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 border-t border-[#223649] bg-[#101922]/95 px-4 py-5 backdrop-blur-md md:px-10">
        <div className="mx-auto max-w-[960px]">
          {currentStep === 'DONE' ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center gap-2 rounded-xl bg-green-500/10 border border-green-500/20 p-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm font-bold text-green-400">Pengiriman Berhasil!</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push('/driver-dashboard')}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0a7ff5] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#0a7ff5]/90 active:scale-[0.98]"
                >
                  <Package className="h-5 w-5" />
                  Ambil Tugas Baru
                </button>
                <a
                  href={
                    delivery?.order?.pickup_request?.outlet
                      ? `https://www.google.com/maps/dir/?api=1&destination=${delivery.order.pickup_request.outlet.lat},${delivery.order.pickup_request.outlet.long}`
                      : '/driver-dashboard'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#223649] bg-[#182634] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#223649] active:scale-[0.98]"
                >
                  <Navigation className="h-5 w-5" />
                  Kembali ke Outlet
                </a>
              </div>
            </div>
          ) : (
            <button
              onClick={handleUpdateStatus}
              disabled={updating}
              className="flex w-full transform items-center justify-center gap-3 rounded-xl bg-[#0a7ff5] py-4 text-lg font-bold text-white shadow-[0_8px_30px_rgb(10,127,245,0.3)] transition-all active:scale-[0.98] hover:bg-[#0a7ff5]/90 disabled:opacity-50"
            >
              <CheckCircle className="h-6 w-6" />
              {updating ? 'Memproses...' : getButtonLabel()}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
