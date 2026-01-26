import { Address } from '@/src/types/address';
import { AddressCard } from '@/src/components/dashboard/address/address-card';
import { Button } from '@/src/components/ui/button';
import { Plus, MapPinPlus } from 'lucide-react';

interface AddressListProps {
  isLoading: boolean;
  addresses?: Address[];
  filteredAddresses?: Address[];
  searchTerm: string;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onSetPrimary: (id: string) => void;
  onAddNew: () => void;
}

export function AddressList({
  isLoading,
  addresses,
  filteredAddresses,
  searchTerm,
  onEdit,
  onDelete,
  onSetPrimary,
  onAddNew,
}: AddressListProps) {
  return (
    <div className='flex h-200 flex-col gap-6 overflow-y-auto pr-2'>
      {isLoading ? (
        <p>Memuat alamat...</p>
      ) : filteredAddresses && filteredAddresses.length > 0 ? (
        filteredAddresses.map((address: Address) => (
          <AddressCard
            key={address.id}
            address={address}
            onEdit={onEdit}
            onDelete={onDelete}
            onSetPrimary={onSetPrimary}
          />
        ))
      ) : (
        <div className='flex min-h-50 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700'>
          <div className='mb-4 rounded-full bg-slate-100 p-6 dark:bg-[#1a2632]'>
            <MapPinPlus className='h-12 w-12 text-slate-300 dark:text-slate-600' />
          </div>
          <p className='text-slate-500'>
            {searchTerm
              ? 'Alamat tidak ditemukan'
              : 'Belum ada alamat tersimpan'}
          </p>
          {!searchTerm && (
            <Button
              variant='link'
              onClick={onAddNew}
              className='text-primary mt-2'
            >
              Tambah Alamat Sekarang
            </Button>
          )}
        </div>
      )}

      {/* Add New Card Placeholder */}
      {!isLoading && addresses && addresses.length > 0 && (
        <button
          onClick={onAddNew}
          className='group flex min-h-62.5 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-transparent p-6 transition-all hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-[#192633]/50'
        >
          <div className='mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 transition-transform group-hover:scale-110 dark:bg-[#233648]'>
            <Plus className='h-6 w-6 text-slate-400 dark:text-slate-500' />
          </div>
          <p className='text-sm font-bold text-slate-900 dark:text-white'>
            Tambah Alamat Lain
          </p>
          <p className='mt-1 max-w-50 text-center text-xs text-slate-500 dark:text-[#92adc9]'>
            Simpan alamat baru untuk memudahkan pengiriman.
          </p>
        </button>
      )}
    </div>
  );
}
