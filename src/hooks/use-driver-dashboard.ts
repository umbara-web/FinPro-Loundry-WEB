import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { driverService } from '@/src/services/driver.service';
import {
  AvailablePickupRequest,
  AvailableDeliveryRequest,
  ActiveJob,
} from '@/src/types/driver';

export interface DashboardHistoryItem {
  id: string;
  type: 'PICKUP' | 'DELIVERY';
  order_number: string;
  customer_name: string;
  address: string;
  completed_at: string;
  status: string;
}

export function useDriverDashboard() {
  const [pickups, setPickups] = useState<AvailablePickupRequest[]>([]);
  const [deliveries, setDeliveries] = useState<AvailableDeliveryRequest[]>([]);
  const [activeJob, setActiveJob] = useState<ActiveJob | null>(null);
  const [todayHistory, setTodayHistory] = useState<DashboardHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Track if we've auto-switched to active tab to prevent annoying switching
  const hasAutoSwitched = useRef(false);

  const fetchData = useCallback(async (isBackground = false) => {
    if (!isBackground) {
      setIsLoading(true);
    }
    try {
      // Parallelize fetches for better performance
      const [pickupData, deliveryData, activeData, historyData] =
        await Promise.all([
          driverService.getAvailablePickups(),
          driverService.getAvailableDeliveries(),
          driverService.getActiveJob(),
          driverService.getDriverHistory({ date: 'today', limit: 50 }),
        ]);

      setPickups(pickupData.data || []);
      setDeliveries(deliveryData.data || []);
      setTodayHistory((historyData.data as any[]) || []); // Cast assuming shape match, or map if needed

      // Transform active job data
      if (activeData.data) {
        const jobData = activeData.data;
        setActiveJob({
          id: jobData.type === 'PICKUP' ? jobData.data.id : jobData.data.id,
          type: jobData.type,
          status: jobData.data.status,
          orderNumber:
            jobData.type === 'PICKUP'
              ? jobData.data.id.slice(-4).toUpperCase()
              : jobData.data.order_id?.slice(-4).toUpperCase() || '',
          customer: {
            name:
              jobData.type === 'PICKUP'
                ? jobData.data.customer?.name || 'Pelanggan'
                : jobData.data.order?.pickup_request?.customer?.name ||
                  'Pelanggan',
            phone:
              jobData.type === 'PICKUP'
                ? jobData.data.customer?.phone
                : jobData.data.order?.pickup_request?.customer?.phone,
          },
          address:
            jobData.type === 'PICKUP'
              ? jobData.data.customer_address || {}
              : jobData.data.order?.pickup_request?.customer_address || {},
        });
      } else {
        setActiveJob(null);
      }
    } catch (error) {
      console.error('Error fetching driver data:', error);
      if (!isBackground) {
        toast.error('Gagal memuat data driver. Silakan coba lagi.');
      }
    } finally {
      if (!isBackground) {
        setIsLoading(false);
      }
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-polling
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData(true);
    }, 30000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  const acceptPickup = async (requestId: string) => {
    if (activeJob) {
      toast.error(
        'Anda masih memiliki tugas aktif. Selesaikan tugas saat ini sebelum menerima request baru.'
      );
      return;
    }
    try {
      await driverService.acceptPickup(requestId);
      window.location.href = `/driver-pickup/${requestId}`;
    } catch (error: any) {
      console.error('Error accepting pickup:', error);
      toast.error(error.response?.data?.message || 'Gagal menerima request');
    }
  };

  const acceptDelivery = async (orderId: string) => {
    if (activeJob) {
      toast.error(
        'Anda masih memiliki tugas aktif. Selesaikan tugas saat ini sebelum menerima request baru.'
      );
      return;
    }
    try {
      const data = await driverService.acceptDelivery(orderId);
      const taskId = data.data.id;
      window.location.href = `/driver-delivery/${taskId}`;
    } catch (error: any) {
      console.error('Error accepting delivery:', error);
      toast.error(error.response?.data?.message || 'Gagal menerima delivery');
    }
  };

  return {
    pickups,
    deliveries,
    activeJob,
    todayHistory,
    isLoading,
    fetchData,
    acceptPickup,
    acceptDelivery,
    hasAutoSwitched,
  };
}
