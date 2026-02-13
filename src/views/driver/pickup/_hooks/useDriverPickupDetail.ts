'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { driverService } from '@/src/services/driver';
import { PickupDetail, PickupStep } from '../_types';

const steps = [
  { key: 'ON_THE_WAY', label: 'Menuju Lokasi Pelanggan' },
  { key: 'PICKED_UP', label: 'Pickup Selesai' },
  { key: 'ARRIVED_OUTLET', label: 'Sampai di Outlet' },
];

export const useDriverPickupDetail = () => {
  const params = useParams();
  const router = useRouter();
  const pickupId = params.id as string;

  const [pickup, setPickup] = useState<PickupDetail | null>(null);
  const [currentStep, setCurrentStep] = useState<PickupStep>('ON_THE_WAY');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchPickup = async () => {
      try {
        const data = await driverService.getPickupById(pickupId);
        if (data.data) {
          setPickup(data.data);

          if (data.data.status === 'DRIVER_ASSIGNED') {
            setCurrentStep('ON_THE_WAY');
          } else if (data.data.status === 'PICKED_UP') {
            setCurrentStep('PICKED_UP');
          } else if (data.data.status === 'ARRIVED_OUTLET') {
            setCurrentStep('ARRIVED_OUTLET');
          }
        }
      } catch (error) {
        console.error('Error fetching pickup:', error);
        toast.error('Gagal memuat detail request');
      } finally {
        setLoading(false);
      }
    };

    if (pickupId) {
      fetchPickup();
    }
  }, [pickupId]);

  const getCurrentStepIndex = () => {
    return steps.findIndex((s) => s.key === currentStep);
  };

  const handleAcceptPickup = async () => {
    setUpdating(true);
    try {
      await driverService.acceptPickup(pickupId);
      toast.success('Request berhasil diterima');
      window.location.reload();
    } catch (error: any) {
      console.error('Error accepting pickup:', error);
      toast.error(error.response?.data?.message || 'Gagal menerima request');
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdateStatus = async () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex >= steps.length - 1) {
      setUpdating(true);
      try {
        await driverService.updatePickupStatus(pickupId, 'ARRIVED_OUTLET');
        toast.success('Status berhasil diperbarui');
        router.push('/driver-dashboard');
      } catch (error: any) {
        console.error('Error updating status:', error);
        toast.error(error.response?.data?.message || 'Gagal update status');
      } finally {
        setUpdating(false);
      }
      return;
    }

    const nextStep = steps[currentIndex + 1].key as string;
    setUpdating(true);
    try {
      await driverService.updatePickupStatus(pickupId, nextStep);
      setCurrentStep(nextStep as PickupStep);
      toast.success('Status berhasil diperbarui');
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.error(error.response?.data?.message || 'Gagal update status');
    } finally {
      setUpdating(false);
    }
  };

  return {
    pickupId,
    pickup,
    loading,
    currentStep,
    updating,
    handleAcceptPickup,
    handleUpdateStatus,
    getCurrentStepIndex,
  };
};
