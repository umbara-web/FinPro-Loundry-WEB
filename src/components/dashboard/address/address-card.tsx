import { Address } from '@/src/types/address';
import { cn } from '@/src/lib/utils/utils';
import { MapPin, Check } from 'lucide-react';
import { Button } from '@/src/components/ui/button';

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onSetPrimary: (id: string) => void;
}

export function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetPrimary,
}: AddressCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-lg border p-5 transition-all',
        address.isPrimary
          ? 'border-blue-500 bg-blue-50/50 dark:border-blue-600 dark:bg-blue-900/20'
          : 'border-slate-200 bg-white hover:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-700',
        'border-l-8'
      )}
    >
      <div className='mb-2 flex items-start justify-between'>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-semibold text-slate-700 dark:text-slate-200'>
            {address.label}
          </span>
          {address.isPrimary && (
            <span className='rounded bg-blue-500 px-1.5 py-0.5 text-xs font-bold text-white'>
              Utama
            </span>
          )}
        </div>
        {address.isPrimary && (
          <Check className='h-6 w-6 text-blue-500' strokeWidth={2.5} />
        )}
      </div>

      <div className='mb-4 space-y-1'>
        <h3 className='text-base font-bold text-slate-900 uppercase dark:text-white'>
          {address.recipientName}
        </h3>
        <p className='text-sm font-bold text-slate-900 dark:text-white'>
          {address.recipientPhone}
        </p>
        <p className='text-sm leading-relaxed text-slate-600 dark:text-slate-400'>
          {address.fullAddress} {address.city}, {address.postalCode}
        </p>

        <div className='flex items-center gap-1.5 py-2'>
          {address.latitude && address.longitude ? (
            <>
              <MapPin
                className='h-4 w-4 text-blue-500'
                fill='currentColor'
                strokeWidth={0}
              />
              <span className='text-xs font-bold text-blue-500'>
                Sudah Pinpoint
              </span>
            </>
          ) : (
            <>
              <MapPin className='h-4 w-4 text-slate-400' strokeWidth={2} />
              <span className='text-xs font-bold text-slate-400'>
                Belum Pinpoint
              </span>
            </>
          )}
        </div>
      </div>

      <div className='mt-auto flex items-center justify-between'>
        <div className='flex flex-wrap items-center gap-4 md:gap-6'>
          <button
            onClick={() => onEdit(address)}
            className='cursor-pointer text-xs font-bold text-blue-500 hover:underline'
          >
            Ubah Alamat
          </button>
          {!address.isPrimary && (
            <>
              {/* In the image, "Jadikan Alamat Utama & Pilih" is one action */}
              <button
                onClick={() => onSetPrimary(address.id)}
                className='cursor-pointer text-xs font-bold text-blue-500 hover:underline'
              >
                Jadikan Alamat Utama & Pilih
              </button>
              <button
                onClick={() => onDelete(address.id)}
                className='cursor-pointer text-xs font-bold text-blue-500 hover:underline' // Image shows distinct separate check? No, usually delete is distinct. Keep it green for now as per style or maybe red if requested? Image has "Hapus" in the row.
              >
                Hapus
              </button>
            </>
          )}
        </div>

        {!address.isPrimary && (
          <Button
            onClick={() => onSetPrimary(address.id)}
            size='sm'
            className='hidden cursor-pointer bg-blue-500 px-8 font-bold text-white hover:bg-blue-600 md:inline-flex'
          >
            Pilih
          </Button>
        )}
      </div>
    </div>
  );
}
