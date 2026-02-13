import { Phone, MessageCircle, MapPin, Map, Info } from 'lucide-react';
import { DeliveryDetail } from '../_types';

interface CustomerInfoCardProps {
  delivery: DeliveryDetail;
}

export function CustomerInfoCard({ delivery }: CustomerInfoCardProps) {
  return (
    <div className='flex flex-col gap-6'>
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
                {delivery.order?.pickup_request?.customer?.name || 'N/A'}
              </p>
              <p className='flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400'>
                <Phone className='h-4 w-4' />
                {delivery.order?.pickup_request?.customer?.phone || 'N/A'}
              </p>
            </div>
            <div className='flex gap-2'>
              <a
                href={`tel:${delivery.order?.pickup_request?.customer?.phone || ''}`}
                className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-all hover:bg-blue-600 hover:text-white dark:bg-blue-500/20 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white'
              >
                <Phone className='h-5 w-5' />
              </a>
              <button className='flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-all hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'>
                <MessageCircle className='h-5 w-5' />
              </button>
            </div>
          </div>

          <div className='rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-[#101922]'>
            <div className='flex items-start gap-3'>
              <MapPin className='mt-1 h-5 w-5 text-blue-600 dark:text-blue-500' />
              <div className='flex flex-col gap-3'>
                <p className='text-sm leading-relaxed text-slate-600 dark:text-slate-400'>
                  {delivery.order?.pickup_request?.customer_address?.address ||
                    'N/A'}
                  {delivery.order?.pickup_request?.customer_address?.city &&
                    `, ${delivery.order.pickup_request.customer_address.city}`}
                  {delivery.order?.pickup_request?.customer_address
                    ?.postal_code &&
                    ` ${delivery.order.pickup_request.customer_address.postal_code}`}
                </p>
                <a
                  href={
                    delivery.order?.pickup_request?.customer_address?.lat &&
                    delivery.order?.pickup_request?.customer_address?.long
                      ? `https://www.google.com/maps/dir/?api=1&destination=${delivery.order.pickup_request.customer_address.lat},${delivery.order.pickup_request.customer_address.long}`
                      : '#'
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex w-full items-center justify-center gap-2 rounded-lg bg-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition-all hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'
                >
                  <Map className='h-5 w-5' />
                  Buka Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#182634]'>
        <h4 className='text-xs font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400'>
          Rincian Order
        </h4>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-slate-500 dark:text-slate-400'>
            Order ID
          </span>
          <span className='text-sm font-medium text-slate-900 dark:text-white'>
            {delivery.order?.order_number ||
              `ORD-${delivery.order_id.slice(-4).toUpperCase()}`}
          </span>
        </div>
        {delivery.total_weight && (
          <div className='flex items-center justify-between'>
            <span className='text-sm text-slate-500 dark:text-slate-400'>
              Berat Total
            </span>
            <span className='text-sm font-medium text-slate-900 dark:text-white'>
              {delivery.total_weight} kg
            </span>
          </div>
        )}
      </div>

      <div className='flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-500/20 dark:bg-orange-500/10'>
        <Info className='h-5 w-5 text-orange-600 dark:text-orange-500' />
        <p className='text-xs leading-tight text-orange-700 dark:text-orange-200/80'>
          Anda hanya dapat memproses 1 order dalam satu waktu untuk menjaga
          kualitas layanan.
        </p>
      </div>
    </div>
  );
}
