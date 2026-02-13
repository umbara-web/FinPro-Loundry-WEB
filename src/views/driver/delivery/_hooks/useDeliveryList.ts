'use client';

import { useState, useCallback } from 'react';
import { driverService } from '@/src/services/driver';
import { AvailableDeliveryRequest } from '@/src/types/driver';
import { toast } from 'sonner';

export function useDeliveryList() {
  const [deliveries, setDeliveries] = useState<AvailableDeliveryRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeliveries = useCallback(async () => {
    setLoading(true);
    try {
      const data = await driverService.getAvailableDeliveries();
      setDeliveries(data.data || []);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
      toast.error('Gagal memuat daftar permintaan antar');
    } finally {
      setLoading(false);
    }
  }, []);

  const acceptDelivery = async (orderId: string) => {
    try {
      const data = await driverService.acceptDelivery(orderId);
      const taskId = data.data.id;
      return taskId;
    } catch (error: any) {
      console.error('Error accepting delivery:', error);
      throw error;
    }
  };

  return {
    deliveries,
    loading,
    fetchDeliveries,
    acceptDelivery,
  };
}
