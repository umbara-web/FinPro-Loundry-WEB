'use client';

import { AddressCard } from '@/src/components/dashboard/address/address-card';
import { AddressForm } from '@/src/components/dashboard/address/address-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/src/components/ui/alert-dialog';
import { Button } from '@/src/components/ui/button';
import { userApi } from '@/src/lib/api/user-api';
import { AddressFormValues } from '@/src/lib/schemas/address-schemas';
import { Address } from '@/src/types/address';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AddressPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch Addresses
  const { data: addresses, isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: userApi.getAddresses,
  });

  const filteredAddresses = addresses?.filter((addr: Address) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      addr.label.toLowerCase().includes(searchLower) ||
      addr.recipientName.toLowerCase().includes(searchLower) ||
      addr.fullAddress.toLowerCase().includes(searchLower) ||
      addr.city.toLowerCase().includes(searchLower)
    );
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: userApi.createAddress,
    onSuccess: () => {
      toast.success('Alamat berhasil ditambahkan');
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      setIsFormOpen(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Gagal menambahkan alamat');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AddressFormValues }) =>
      userApi.updateAddress(id, data),
    onSuccess: () => {
      toast.success('Alamat berhasil diperbarui');
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      setIsFormOpen(false);
      setEditingAddress(null);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Gagal memperbarui alamat');
    },
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

  const handleCreate = (data: AddressFormValues) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (data: AddressFormValues) => {
    if (editingAddress) {
      updateMutation.mutate({ id: editingAddress.id, data });
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className='container mx-auto max-w-6xl px-6 py-8'>
      {/* Page Header */}
      <div className='mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl font-black tracking-tight text-slate-900 md:text-4xl dark:text-white'>
            Kelola Alamat
          </h1>
          <p className='text-base text-slate-500 dark:text-[#92adc9]'>
            Atur alamat pengiriman dan penjemputan laundry Anda dengan mudah.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingAddress(null);
            setIsFormOpen(true);
          }}
          className='h-10 w-auto cursor-pointer rounded-lg bg-blue-500 px-5 text-sm font-bold text-white shadow-lg shadow-blue-500/50 dark:hover:text-black'
        >
          <Plus className='h-5 w-5' />
          Tambah Alamat Baru
        </Button>
      </div>

      {/* Address List Scrollable Area */}
      <div className='flex h-200 flex-col gap-6 overflow-y-auto pr-2'>
        {isLoading ? (
          <p>Memuat alamat...</p>
        ) : filteredAddresses && filteredAddresses.length > 0 ? (
          filteredAddresses.map((address: Address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSetPrimary={(id) => setPrimaryMutation.mutate(id)}
            />
          ))
        ) : (
          <div className='flex min-h-50 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700'>
            <p className='text-slate-500'>
              {searchTerm
                ? 'Alamat tidak ditemukan'
                : 'Belum ada alamat tersimpan'}
            </p>
            {!searchTerm && (
              <Button
                variant='link'
                onClick={() => setIsFormOpen(true)}
                className='text-primary mt-2'
              >
                Tambah Alamat Sekarang
              </Button>
            )}
          </div>
        )}

        {/* Add New Card Placeholder (if needed, mimicking design) */}
        {!isLoading && addresses && addresses.length > 0 && (
          <button
            onClick={() => {
              setEditingAddress(null);
              setIsFormOpen(true);
            }}
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

      <AddressForm
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingAddress(null);
        }}
        onSubmit={editingAddress ? handleUpdate : handleCreate}
        initialData={editingAddress}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Alamat ini akan dihapus
              permanen dari akun Anda.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className='bg-red-600 hover:bg-red-700'
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
