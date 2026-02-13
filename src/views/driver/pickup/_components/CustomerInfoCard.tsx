import { Phone, MessageCircle, MapPin, Package, Info, Map } from 'lucide-react';
import { PickupDetail } from '../_types';
import clsx from 'clsx';

interface CustomerInfoCardProps {
  pickup: PickupDetail;
  isWaitingDriver: boolean;
  currentStepIndex: number;
}

export const CustomerInfoCard = ({
  pickup,
  isWaitingDriver,
  currentStepIndex,
}: CustomerInfoCardProps) => {
  return (
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
                  {currentStepIndex >= 1 && pickup.outlet ? (
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
                    currentStepIndex >= 1 && pickup.outlet
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
                  {currentStepIndex >= 1
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
          <p className='text-sm text-slate-900 dark:text-white'>
            {pickup.notes}
          </p>
        </div>
      )}

      {/* Constraint Message */}
      {!isWaitingDriver && (
        <div className='flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-500/20 dark:bg-orange-500/10'>
          <Info className='h-5 w-5 text-orange-600 dark:text-orange-500' />
          <p className='text-xs leading-tight text-orange-700 dark:text-orange-200/80'>
            Anda hanya dapat memproses 1 order dalam satu waktu untuk menjaga
            kualitas layanan.
          </p>
        </div>
      )}
    </div>
  );
};
