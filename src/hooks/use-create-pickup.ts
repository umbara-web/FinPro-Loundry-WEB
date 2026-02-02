'use client';

import { pickupApi } from '@/src/lib/api/pickup-api';
import { Address } from '@/src/types/address';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { userApi } from '@/src/lib/api/user-api';
import { toast } from 'sonner';
import { useWallet } from '@/src/context/WalletContext';

function calculateDateTime(date: string, timeSlot: string): string {
  if (!date || !timeSlot) return '';
  const startTime = timeSlot.split(':')[0];
  const scheduledDate = new Date(date);
  scheduledDate.setHours(parseInt(startTime), 0, 0, 0);
  return scheduledDate.toISOString();
}

function calculateProgress(
  selectedAddress: Address | undefined,
  date: string,
  timeSlot: string,
  isOutletValid: boolean,
  itemsCount: number,
  manualItemsCount: number
) {
  let progress = 0;
  if (selectedAddress) progress += 25;
  if (date && timeSlot) progress += 25;
  if (itemsCount > 0 || manualItemsCount > 0) progress += 25;
  if (isOutletValid) progress += 25;
  return Math.min(progress, 100);
}

function getCurrentStep(
  selectedAddress: Address | undefined,
  date: string,
  timeSlot: string,
  itemsCount: number,
  manualItemsCount: number
) {
  if (!selectedAddress) return { step: 1, name: 'Lokasi Penjemputan' };
  if (!date || !timeSlot) return { step: 2, name: 'Jadwal Penjemputan' };
  if (itemsCount === 0 && manualItemsCount === 0)
    return { step: 3, name: 'Daftar Item Laundry' };
  return { step: 4, name: 'Outlet Terdekat' };
}

export function useCreatePickup() {
  const router = useRouter();
  const { addToCart } = useWallet();

  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>();
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [notes, setNotes] = useState('');

  const [items, setItems] = useState<Record<string, number>>({});
  const [manualItems, setManualItems] = useState<
    { name: string; quantity: number }[]
  >([]);

  const handleUpdateItem = (id: string, delta: number) => {
    setItems((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const handleAddManualItem = (item: { name: string; quantity: number }) => {
    setManualItems((prev) => [...prev, item]);
  };

  const handleUpdateManualItemQuantity = (index: number, delta: number) => {
    setManualItems((prev) =>
      prev
        .map((item, i) => {
          if (i === index) {
            const newQuantity = Math.max(0, item.quantity + delta);
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveManualItem = (index: number) => {
    setManualItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Fetch addresses to set default
  const { data: addresses } = useQuery({
    queryKey: ['addresses'],
    queryFn: userApi.getAddresses,
  });

  // Set default address
  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddress) {
      const primary = addresses.find((addr: Address) => addr.isPrimary);
      if (primary) {
        setSelectedAddress(primary);
      } else {
        setSelectedAddress(addresses[0]);
      }
    }
  }, [addresses, selectedAddress]);

  const { data: nearestOutlet, isLoading: isOutletLoading } = useQuery({
    queryKey: [
      'nearest-outlet',
      selectedAddress?.latitude,
      selectedAddress?.longitude,
    ],
    queryFn: () =>
      pickupApi.findNearestOutlet(
        selectedAddress!.latitude!.toString(),
        selectedAddress!.longitude!.toString()
      ),
    enabled: !!selectedAddress?.latitude && !!selectedAddress?.longitude,
  });

  const createPickupMutation = useMutation({
    mutationFn: pickupApi.createPickup,
    onSuccess: () => {
      addToCart();
      toast.success('Permintaan penjemputan berhasil dibuat!');
      router.push('/dashboard/orders');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Gagal membuat permintaan penjemputan'
      );
    },
  });

  const handleSubmit = () => {
    if (!selectedAddress || !date || !timeSlot) {
      toast.error('Mohon lengkapi data penjemputan');
      return;
    }
    if (!nearestOutlet?.isWithinRange || !nearestOutlet?.outlet) {
      toast.error('Outlet tidak tersedia untuk alamat ini');
      return;
    }

    const scheduledPickupAt = calculateDateTime(date, timeSlot);
    createPickupMutation.mutate({
      addressId: selectedAddress.id,
      schedulledPickupAt: scheduledPickupAt,
      notes: notes.trim() || undefined,
      outletId: nearestOutlet.outlet.id,
    });
  };

  const itemsCount = Object.values(items).reduce((a, b) => a + b, 0);
  const manualItemsCount = manualItems.length;

  const isOutletValid = !!nearestOutlet?.isWithinRange;
  const progress = calculateProgress(
    selectedAddress,
    date,
    timeSlot,
    isOutletValid,
    itemsCount,
    manualItemsCount
  );
  const { step: currentStep, name: stepName } = getCurrentStep(
    selectedAddress,
    date,
    timeSlot,
    itemsCount,
    manualItemsCount
  );

  return {
    selectedAddress,
    setSelectedAddress,
    date,
    setDate,
    timeSlot,
    setTimeSlot,
    notes,
    setNotes,
    handleSubmit,
    isLoading: createPickupMutation.isPending,
    progress,
    currentStep,
    stepName,
    nearestOutlet,
    isOutletLoading,
    items,
    manualItems,
    handleUpdateItem,
    handleAddManualItem,
    handleUpdateManualItemQuantity,
    handleRemoveManualItem,
  };
}
