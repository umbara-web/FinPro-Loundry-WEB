'use client';

import { useState, useCallback, useEffect } from 'react';
import { driverService } from '@/src/services/driver';
import { AvailablePickupRequest } from '@/src/types/driver';

export const useDriverPickupList = () => {
  const [pickups, setPickups] = useState<AvailablePickupRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPickups = useCallback(async () => {
    setLoading(true);
    try {
      const data = await driverService.getAvailablePickups();
      setPickups(data.data || []);
    } catch (error) {
      console.error('Error fetching pickups:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPickups();
  }, [fetchPickups]);

  const handleAccept = async (requestId: string) => {
    try {
      await driverService.acceptPickup(requestId);
      // Using window.location.href to force a full refresh/navigation
      window.location.href = `/driver-pickup/${requestId}`;
    } catch (error: any) {
      console.error('Error accepting pickup:', error);
      alert(error.response?.data?.message || 'Gagal menerima request');
    }
  };

  return {
    pickups,
    loading,
    fetchPickups,
    handleAccept,
  };
};
