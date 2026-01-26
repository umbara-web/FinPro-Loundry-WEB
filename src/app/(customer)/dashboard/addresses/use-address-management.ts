import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/src/lib/api/user-api';
import { Address } from '@/src/types/address';
import { AddressFormValues } from '@/src/lib/schemas/address-schemas';
import { toast } from 'sonner';

export function useAddressManagement() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();

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

  return {
    addresses,
    filteredAddresses,
    isLoading,
    isFormOpen,
    setIsFormOpen,
    editingAddress,
    setEditingAddress,
    searchTerm,
    setSearchTerm,
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
  };
}
