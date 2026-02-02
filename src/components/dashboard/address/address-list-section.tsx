'use client';

import { userApi } from '@/src/lib/api/user-api';
import { Address } from '@/src/types/address';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Check, Edit2, MapPin, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../ui/button';

interface AddressListSectionProps {
  onEdit?: (address: Address) => void;
  showActions?: boolean;
  onSelect?: (address: Address) => void;
  selectedId?: string;
  layout?: 'list' | 'grid';
}

export function AddressListSection({
  onEdit,
  showActions = true,
  onSelect,
  selectedId,
  layout = 'list',
}: AddressListSectionProps) {
  const queryClient = useQueryClient();

  // Fetch Addresses
  const { data: addresses, isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: userApi.getAddresses,
  });

  const deleteMutation = useMutation({
    mutationFn: userApi.deleteAddress,
    onSuccess: () => {
      toast.success('Alamat berhasil dihapus');
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Gagal menghapus alamat');
    },
  });

  const setPrimaryMutation = useMutation({
    mutationFn: userApi.setPrimaryAddress,
    onSuccess: () => {
      toast.success('Alamat utama berhasil diubah');
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Gagal mengubah alamat utama'
      );
    },
  });

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Apakah Anda yakin ingin menghapus alamat ini?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (address: Address, e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(address);
  };

  if (isLoading) {
    return (
      <p className='text-center text-slate-500 dark:text-slate-400'>
        Memuat alamat...
      </p>
    );
  }

  if (!addresses || addresses.length === 0) {
    return (
      <div className='flex min-h-75 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 p-8 text-center dark:border-slate-700'>
        <MapPin className='mb-4 h-12 w-12 text-slate-400' />
        <p className='mb-2 text-lg font-semibold text-slate-700 dark:text-slate-300'>
          Belum ada alamat tersimpan
        </p>
        <p className='text-sm text-slate-500 dark:text-slate-400'>
          Tambahkan alamat untuk memudahkan proses penjemputan laundry
        </p>
      </div>
    );
  }

  return (
    <div
      className={`custom-scrollbar ${
        layout === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2'
          : 'flex flex-col pr-2'
      } max-h-100 gap-4 overflow-y-auto`}
    >
      {addresses.map((address: Address) => {
        const isSelected = selectedId === address.id;
        const isPrimary = address.isPrimary;

        return (
          <div
            key={address.id}
            onClick={() => onSelect?.(address)}
            className={`relative cursor-pointer rounded-xl border-2 p-5 transition-all ${
              isSelected
                ? 'border-blue-500 bg-blue-500/5 shadow-md'
                : 'border-slate-300 bg-slate-200 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-[#324d67]'
            }`}
          >
            <div className='mb-2 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div
                  className={`rounded px-2 py-1 text-xs font-bold tracking-wider uppercase ${
                    isSelected
                      ? 'bg-blue-500 text-white'
                      : 'bg-black text-white dark:bg-white dark:text-black'
                  }`}
                >
                  {address.label}
                </div>
                {isPrimary && (
                  <span className='text-xs font-bold text-emerald-500'>
                    UTAMA
                  </span>
                )}
              </div>

              {isSelected && (
                <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white shadow-sm'>
                  <Check className='h-4 w-4 text-white' strokeWidth={3} />
                </div>
              )}
            </div>

            <p className='mb-1 font-bold text-slate-900 dark:text-white'>
              {address.recipientName}
            </p>
            <p className='line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-white'>
              {address.fullAddress}
            </p>
            <p className='mt-1 text-sm text-slate-500 dark:text-white'>
              {address.recipientPhone}
            </p>

            {/* Action Buttons (Only show if not in selection mode or explicitly requested) */}
            {showActions && !onSelect && (
              <div className='mt-4 flex flex-wrap gap-2 border-t pt-3 dark:border-slate-700'>
                {onEdit && (
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={(e) => handleEdit(address, e)}
                    className='h-8 px-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  >
                    <Edit2 className='mr-1 h-3 w-3' />
                    Ubah
                  </Button>
                )}

                {!address.isPrimary && (
                  <Button
                    size='sm'
                    variant='ghost'
                    onClick={(e) => {
                      e.stopPropagation();
                      setPrimaryMutation.mutate(address.id);
                    }}
                    className='text-primary hover:text-primary/90 h-8 px-2'
                  >
                    Set Utama
                  </Button>
                )}

                <Button
                  variant='ghost'
                  size='sm'
                  onClick={(e) => handleDelete(address.id, e)}
                  className='h-8 px-2 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20'
                >
                  <Trash2 className='mr-1 h-3 w-3' />
                  Hapus
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
