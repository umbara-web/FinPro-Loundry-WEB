'use client';

import { useState, useCallback } from 'react';
import { driverService } from '@/src/services/driver';
import { DeliveryDetail, DeliveryStep } from '../_types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useDeliveryDetail(taskId: string) {
  const [delivery, setDelivery] = useState<DeliveryDetail | null>(null);
  const [currentStep, setCurrentStep] = useState<DeliveryStep>('IN_PROGRESS');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const fetchDelivery = useCallback(async () => {
    setLoading(true);
    try {
      const data = await driverService.getDeliveryById(taskId);
      if (data.data) {
        setDelivery(data.data);

        if (
          data.data.status === 'ACCEPTED' ||
          data.data.status === 'IN_PROGRESS'
        ) {
          setCurrentStep('IN_PROGRESS');
        } else if (data.data.status === 'DONE') {
          setCurrentStep('DONE');
        }
      }
    } catch (error) {
      console.error('Error fetching delivery:', error);
      toast.error('Gagal memuat detail delivery');
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  const updateStatus = async (nextStep: DeliveryStep) => {
    setUpdating(true);
    try {
      await driverService.updateDeliveryStatus(taskId, nextStep);
      setCurrentStep(nextStep);
      if (nextStep === 'DONE') {
        toast.success('Pengiriman selesai');
        router.push('/driver-dashboard');
      } else {
        toast.success('Status berhasil diperbarui');
      }
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.error(error.response?.data?.message || 'Gagal update status');
    } finally {
      setUpdating(false);
    }
  };

  return {
    delivery,
    currentStep,
    loading,
    updating,
    fetchDelivery,
    updateStatus,
  };
}
