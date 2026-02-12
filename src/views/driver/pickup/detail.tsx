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
  Package,
  CheckCircle,
  Info,
  Map,
} from 'lucide-react';
import clsx from 'clsx';
import { toast } from 'sonner';
import { driverService } from '@/src/services/driver.service';

const MapView = dynamic(
  () => import('@/src/components/dashboard/address/map/map-view'),
  {
    ssr: false,
    loading: () => (
      <div className='flex h-full items-center justify-center bg-slate-100 dark:bg-[#1a2634]'>
        <Map className='h-16 w-16 text-slate-400 dark:text-[#304d69]' />
      </div>
    ),
  }
);

interface PickupDetail {
  id: string;
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
  notes?: string;
  status: string;
  schedulled_pickup_at?: string;
}

type PickupStep = 'ON_THE_WAY' | 'PICKED_UP' | 'ARRIVED_OUTLET';

const steps: { key: PickupStep; label: string; icon: React.ReactNode }[] = [
  {
    key: 'ON_THE_WAY',
    label: 'Menuju Lokasi Pelanggan',
    icon: <Navigation className='h-4 w-4' />,
  },
  {
    key: 'PICKED_UP',
    label: 'Pickup Selesai',
    icon: <Package className='h-4 w-4' />,
  },
  {
    key: 'ARRIVED_OUTLET',
    label: 'Sampai di Outlet',
    icon: <CheckCircle className='h-4 w-4' />,
  },
];

export function DriverPickupDetailView() {
  const params = useParams();
  const router = useRouter();
  const pickupId = params.id as string;

  const [pickup, setPickup] = useState<PickupDetail | null>(null);
  const [currentStep, setCurrentStep] = useState<PickupStep>('ON_THE_WAY');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const isWaitingDriver = pickup?.status === 'WAITING_DRIVER';

  useEffect(() => {
    const fetchPickup = async () => {
      try {
        const data = await driverService.getPickupById(pickupId);
        if (data.data) {
          setPickup(data.data);

          if (data.data.status === 'DRIVER_ASSIGNED') {
            setCurrentStep('ON_THE_WAY');
          } else if (data.data.status === 'PICKED_UP') {
            setCurrentStep('PICKED_UP');
          } else if (data.data.status === 'ARRIVED_OUTLET') {
            setCurrentStep('ARRIVED_OUTLET');
          }
        }
      } catch (error) {
        console.error('Error fetching pickup:', error);
        toast.error('Gagal memuat detail request');
      } finally {
        setLoading(false);
      }
    };

    fetchPickup();
  }, [pickupId]);

  const getCurrentStepIndex = () => {
    return steps.findIndex((s) => s.key === currentStep);
  };

  const handleAcceptPickup = async () => {
    setUpdating(true);
    try {
      await driverService.acceptPickup(pickupId);
      toast.success('Request berhasil diterima');
      window.location.reload();
    } catch (error: any) {
      console.error('Error accepting pickup:', error);
      toast.error(error.response?.data?.message || 'Gagal menerima request');
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdateStatus = async () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex >= steps.length - 1) {
      setUpdating(true);
      try {
        await driverService.updatePickupStatus(pickupId, 'ARRIVED_OUTLET');
        toast.success('Status berhasil diperbarui');
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
      await driverService.updatePickupStatus(pickupId, nextStep);
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
    const currentIndex = getCurrentStepIndex();
    if (currentIndex === 0) return 'Pickup Selesai';
    if (currentIndex === 1) return 'Konfirmasi Sampai di Outlet';
    return 'Tugas Selesai';
  };

  if (loading) {
    return (
      <div className='flex h-full items-center justify-center bg-slate-50 text-slate-900 dark:bg-[#101922] dark:text-white'>
        <p>Memuat...</p>
      </div>
    );
  }

  if (!pickup) {
    return (
      <div className='flex h-full items-center justify-center bg-slate-50 text-slate-900 dark:bg-[#101922] dark:text-white'>
        <p>Pickup tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className='flex min-h-full flex-col bg-slate-50 dark:bg-[#101922]'>
      {/* Header */}
      <header className='sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-[#101922] md:px-10'>
        <div className='flex items-center gap-4'>
          <Link
            href='/driver-dashboard'
            className='flex items-center gap-2 text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          >
            <ArrowLeft className='h-5 w-5' />
            <span className='text-sm font-medium'>Dashboard</span>
          </Link>
          <div className='mx-2 h-4 w-px bg-slate-200 dark:bg-slate-700' />
          <h2 className='text-lg font-bold text-slate-900 dark:text-white'>
            Pickup #{pickupId.slice(-4).toUpperCase()}
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1 px-4 py-6 md:px-10'>
        <div className='mx-auto max-w-240'>
          {/* Map */}
          <div className='mb-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-[#182634]'>
            <div className='aspect-video w-full'>
              {getCurrentStepIndex() >= 1 && pickup.outlet ? (
                <MapView
                  center={[
                    parseFloat(pickup.outlet.lat),
                    parseFloat(pickup.outlet.long),
                  ]}
                  onLocationSelect={() => { }}
                  zoom={15}
                />
              ) : pickup.customer_address.lat &&
                pickup.customer_address.long ? (
                <MapView
                  center={[
                    parseFloat(pickup.customer_address.lat),
                    parseFloat(pickup.customer_address.long),
                  ]}
                  onLocationSelect={() => { }}
                  zoom={15}
                />
              ) : (
                <div className='flex h-full items-center justify-center bg-slate-100 dark:bg-[#1a2634]'>
                  <Map className='h-16 w-16 text-slate-400 dark:text-[#304d69]' />
                </div>
              )}
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
            {/* Progress Timeline - only show when assigned */}
            {!isWaitingDriver && (
              <div className='lg:col-span-7'>
                <div className='rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#182634]'>
                  <h3 className='mb-6 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white'>
                    <Navigation className='h-5 w-5 text-blue-600 dark:text-blue-500' />
                    Progres Pekerjaan
                  </h3>
                  <div className='grid grid-cols-[40px_1fr] gap-x-2'>
                    {steps.map((step, index) => {
                      const currentIndex = getCurrentStepIndex();
                      const isActive = index === currentIndex;
                      const isCompleted = index < currentIndex;
                      const isLast = index === steps.length - 1;

                      return (
                        <div key={step.key} className='contents'>
                          <div className='flex flex-col items-center gap-1 pt-1'>
                            <div
                              className={clsx(
                                'flex h-8 w-8 items-center justify-center rounded-full',
                                isActive &&
                                'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] dark:bg-blue-600 dark:shadow-[0_0_15px_rgba(10,127,245,0.4)]',
                                isCompleted && 'bg-green-500 text-white',
                                !isActive &&
                                !isCompleted &&
                                'bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500'
                              )}
                            >
                              {isCompleted ? (
                                <CheckCircle className='h-4 w-4' />
                              ) : (
                                step.icon
                              )}
                            </div>
                            {!isLast && (
                              <div
                                className={clsx(
                                  'h-12 w-0.5',
                                  isCompleted
                                    ? 'bg-green-500'
                                    : isActive
                                      ? 'bg-blue-600 dark:bg-blue-500'
                                      : 'bg-slate-200 dark:bg-slate-700'
                                )}
                              />
                            )}
                          </div>
                          <div className='flex flex-1 flex-col pb-8'>
                            <p
                              className={clsx(
                                'text-base font-medium',
                                isActive
                                  ? 'font-bold text-slate-900 dark:text-white'
                                  : isCompleted
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-slate-500 dark:text-slate-400'
                              )}
                            >
                              {step.label}
                            </p>
                            <p
                              className={clsx(
                                'mt-1 text-sm',
                                isActive
                                  ? 'font-medium text-blue-600 dark:text-blue-500'
                                  : 'text-slate-400 dark:text-slate-500'
                              )}
                            >
                              {isActive
                                ? 'Status Saat Ini'
                                : isCompleted
                                  ? 'Selesai'
                                  : 'Menunggu'}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Customer Info */}
            <div
              className={clsx(
                'flex flex-col gap-6',
                isWaitingDriver ? 'lg:col-span-12' : 'lg:col-span-5'
              )}
            >
              {/* Waiting Driver Banner */}
              {isWaitingDriver && (
                <div className='flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-500/20 dark:bg-orange-500/10'>
                  <Package className='h-5 w-5 text-orange-600 dark:text-orange-500' />
                  <div>
                    <p className='text-sm font-bold text-orange-800 dark:text-orange-200'>
                      Request Menunggu Driver
                    </p>
                    <p className='text-xs text-orange-600 dark:text-orange-200/70'>
                      Terima request ini untuk mulai menjemput pelanggan.
                    </p>
                  </div>
                </div>
              )}

              <div className='overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#182634]'>
                <div className='border-b border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-[#1d2d3d]'>
                  <h3 className='text-xs font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400'>
                    Informasi Pelanggan
                  </h3>
                </div>
                <div className='flex flex-col gap-5 p-5'>
                  <div className='flex items-start justify-between'>
                    <div className='flex flex-col gap-1'>
                      <p className='text-xl font-bold text-slate-900 dark:text-white'>
                        {pickup.customer.name}
                      </p>
                      <p className='flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400'>
                        <Phone className='h-4 w-4' />
                        {pickup.customer.phone || 'N/A'}
                      </p>
                    </div>
                    {!isWaitingDriver && (
                      <div className='flex gap-2'>
                        <a
                          href={`tel:${pickup.customer.phone}`}
                          className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-all hover:bg-blue-600 hover:text-white dark:bg-blue-500/20 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white'
                        >
                          <Phone className='h-5 w-5' />
                        </a>
                        <button className='flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-all hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'>
                          <MessageCircle className='h-5 w-5' />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className='rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-[#101922]'>
                    <div className='flex items-start gap-3'>
                      <MapPin className='mt-1 h-5 w-5 text-blue-600 dark:text-blue-500' />
                      <div className='flex flex-col gap-3'>
                        <p className='text-sm leading-relaxed text-slate-600 dark:text-slate-400'>
                          {getCurrentStepIndex() >= 1 && pickup.outlet ? (
                            <>
                              <span className='mb-1 block font-bold text-slate-900 dark:text-white'>
                                Menuju Outlet: {pickup.outlet.name}
                              </span>
                              {pickup.outlet.address}
                            </>
                          ) : (
                            <>
                              {pickup.customer_address.address}
                              {pickup.customer_address.city &&
                                `, ${pickup.customer_address.city}`}
                              {pickup.customer_address.postal_code &&
                                ` ${pickup.customer_address.postal_code}`}
                            </>
                          )}
                        </p>
                        <a
                          href={
                            getCurrentStepIndex() >= 1 && pickup.outlet
                              ? `https://www.google.com/maps/dir/?api=1&destination=${pickup.outlet.lat},${pickup.outlet.long}`
                              : pickup.customer_address.lat &&
                                pickup.customer_address.long
                                ? `https://www.google.com/maps/dir/?api=1&destination=${pickup.customer_address.lat},${pickup.customer_address.long}`
                                : '#'
                          }
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex w-full items-center justify-center gap-2 rounded-lg bg-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition-all hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'
                        >
                          <Map className='h-5 w-5' />
                          {getCurrentStepIndex() >= 1
                            ? 'Navigasi ke Outlet'
                            : 'Buka Google Maps'}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {pickup.notes && (
                <div className='flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#182634]'>
                  <h4 className='text-xs font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400'>
                    Catatan
                  </h4>
                  <p className='text-sm text-slate-900 dark:text-white'>{pickup.notes}</p>
                </div>
              )}

              {/* Constraint Message */}
              {!isWaitingDriver && (
                <div className='flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-500/20 dark:bg-orange-500/10'>
                  <Info className='h-5 w-5 text-orange-600 dark:text-orange-500' />
                  <p className='text-xs leading-tight text-orange-700 dark:text-orange-200/80'>
                    Anda hanya dapat memproses 1 order dalam satu waktu untuk
                    menjaga kualitas layanan.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className='sticky bottom-0 border-t border-slate-200 bg-white/95 px-4 py-5 backdrop-blur-md dark:border-slate-800 dark:bg-[#101922]/95 md:px-10'>
        <div className='mx-auto max-w-240'>
          {isWaitingDriver ? (
            <button
              onClick={handleAcceptPickup}
              disabled={updating}
              className='flex w-full transform items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 text-lg font-bold text-white shadow-[0_8px_30px_rgb(37,99,235,0.3)] transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-500 dark:shadow-[0_8px_30px_rgb(10,127,245,0.3)]'
            >
              <Package className='h-6 w-6' />
              {updating ? 'Memproses...' : 'Terima Request'}
            </button>
          ) : (
            <button
              onClick={handleUpdateStatus}
              disabled={updating || currentStep === 'ARRIVED_OUTLET'}
              className={clsx(
                'flex w-full transform items-center justify-center gap-3 rounded-xl py-4 text-lg font-bold text-white transition-all active:scale-[0.98]',
                currentStep === 'ARRIVED_OUTLET'
                  ? 'cursor-not-allowed bg-slate-400 opacity-50 dark:bg-slate-600'
                  : 'bg-blue-600 shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:bg-blue-700 dark:bg-blue-600 dark:shadow-[0_8px_30px_rgb(10,127,245,0.3)] dark:hover:bg-blue-500'
              )}
            >
              <CheckCircle className='h-6 w-6' />
              {updating ? 'Memproses...' : getButtonLabel()}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
