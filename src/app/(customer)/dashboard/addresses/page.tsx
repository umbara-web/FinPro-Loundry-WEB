'use client';

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
import { Plus } from 'lucide-react';
import { useAddressManagement } from './use-address-management';
import { AddressList } from './address-list';

export default function AddressPage() {
  const {
    addresses,
    filteredAddresses,
    isLoading,
    isFormOpen,
    setIsFormOpen,
    editingAddress,
    setEditingAddress,
    searchTerm,
    deleteId,
    setDeleteId,
    createMutation,
    updateMutation,
    setPrimaryMutation,
    handleCreate,
    handleUpdate,
    handleEdit,
    handleDelete,
    handleConfirmDelete,
  } = useAddressManagement();

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
          className='h-10 w-auto cursor-pointer rounded-lg bg-blue-500 px-5 text-sm font-bold text-white shadow-lg shadow-blue-500/50 dark:hover:bg-gray-300 dark:hover:text-black'
        >
          <Plus className='h-5 w-5' />
          Tambah Alamat Baru
        </Button>
      </div>

      <AddressList
        isLoading={isLoading}
        addresses={addresses}
        filteredAddresses={filteredAddresses}
        searchTerm={searchTerm}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSetPrimary={(id) => setPrimaryMutation.mutate(id)}
        onAddNew={() => {
          setEditingAddress(null);
          setIsFormOpen(true);
        }}
      />

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
