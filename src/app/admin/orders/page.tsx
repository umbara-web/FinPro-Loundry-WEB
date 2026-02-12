'use client';

import React, { useEffect, useState } from 'react';
import { Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '@/utils/api';

import { useAddresses } from './hooks/useAddresses';
import { useOrderForm } from './hooks/useOrderForm';
import { PickupLocation } from './components/PickupLocation';
import { PickupSchedule } from './components/PickupSchedule';
import { ServiceDetail } from './components/ServiceDetail';
import { OrderSummary } from './components/OrderSummary';
import { NewAddressModal } from './components/modals/NewAddressModal';
import { EditLocationModal } from './components/modals/EditLocationModal';
import { EditScheduleModal } from './components/modals/EditScheduleModal';
import { EditServiceModal } from './components/modals/EditServiceModal';

export default function NewOrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addresses, loading: addressesLoading, error: addressesError, addAddress, deleteAddress } = useAddresses();
  const {
    selectedService, setSelectedService,
    selectedTime, setSelectedTime,
    selectedDate, setSelectedDate,
    selectedAddressId, setSelectedAddressId
  } = useOrderForm(addresses);

  const [showNewAddressModal, setShowNewAddressModal] = useState(false);
  const [showEditLocationModal, setShowEditLocationModal] = useState(false);
  const [showEditScheduleModal, setShowEditScheduleModal] = useState(false);
  const [showEditServiceModal, setShowEditServiceModal] = useState(false);

  // Jika baru kembali dari halaman tambah alamat, auto-select alamat tsb (logic dari searchParams)
  useEffect(() => {
    /* ... existing logic ... */
    const idParam = searchParams.get('selectedAddressId');
    if (idParam) {
      setSelectedAddressId(idParam);
    }
  }, [searchParams, setSelectedAddressId]);

  const selectedAddress = addresses.find(a => a.id === selectedAddressId) || null;

  const handleConfirmOrder = async () => {
    if (!selectedAddressId || !selectedAddress) {
      alert('Mohon pilih lokasi penjemputan.');
      return;
    }

    try {
      
      const outletsRes = await api.get('/api/outlets');
      const outlets = outletsRes.data;
      const outletId = outlets.length > 0 ? outlets[0].id : null;

      if (!outletId) {
        alert('Tidak ada outlet yang tersedia untuk melayani pesanan ini.');
        return;
      }

      const payload = {
        userId: selectedAddress.userId, // From our updated Address type
        outletId: outletId,
        addressId: selectedAddress.id,
        serviceType: selectedService === 'Cuci & Lipat' ? 'WASH_AND_FOLD' : selectedService === 'Setrika Saja' ? 'IRON_ONLY' : 'DRY_CLEAN',
        serviceDate: new Date(selectedDate).toISOString(),
        serviceTime: selectedTime,
        status: 'PICKUP'
      };

      if (!payload.userId) {
  
        console.warn('User ID missing on address');
      }

      await api.post('/api/orders', payload);
      alert('Pesanan berhasil dibuat!');
      router.push('/admin/allorder'); // Redirect to order list
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Gagal membuat pesanan.');
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans">
      {/* Header */}
      <nav className="flex items-center gap-4 px-8 py-4 border-b border-gray-800">
        <Link href="/admin/orders" className="text-gray-400 hover:text-white transition">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#4FD1C5] rounded-lg flex items-center justify-center">
            <Package size={18} className="text-black" />
          </div>
          <span className="text-xl font-bold tracking-tight">Buat Pesanan Baru</span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Kolom Kiri: Form (8 Kolom) */}
        <div className="lg:col-span-8 space-y-8">
          <header>
            <h1 className="text-3xl font-bold">Buat Pesanan Baru</h1>
            <p className="text-gray-400 mt-2">Isi formulir di bawah ini untuk menjadwalkan penjemputan laundry Anda.</p>
          </header>

          <PickupLocation
            addresses={addresses}
            loading={addressesLoading}
            error={addressesError}
            selectedAddressId={selectedAddressId}
            onSelectAddress={setSelectedAddressId}
            onDeleteAddress={deleteAddress}
            onAddAddressClick={() => setShowNewAddressModal(true)}
          />

          <PickupSchedule
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />

          <ServiceDetail
            selectedService={selectedService}
            setSelectedService={setSelectedService}
          />
        </div>

        {/* Kolom Kanan: Ringkasan (4 Kolom) */}
        <div className="lg:col-span-4 space-y-4">
          <OrderSummary
            selectedAddress={selectedAddress}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedService={selectedService}
            onEditLocation={() => setShowEditLocationModal(true)}
            onEditSchedule={() => setShowEditScheduleModal(true)}
            onEditService={() => setShowEditServiceModal(true)}
            onConfirm={handleConfirmOrder}
          />
        </div>
      </main>

      {/* Modal Components */}
      <NewAddressModal
        isOpen={showNewAddressModal}
        onClose={() => setShowNewAddressModal(false)}
        onSuccess={(newAddress) => {
         
          addAddress(newAddress);
          setSelectedAddressId(newAddress.id); // ID type issue potentially
          setShowNewAddressModal(false);
        }}
      />

      <EditLocationModal
        isOpen={showEditLocationModal}
        onClose={() => setShowEditLocationModal(false)}
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        onSelectAddress={setSelectedAddressId}
      />

      <EditScheduleModal
        isOpen={showEditScheduleModal}
        onClose={() => setShowEditScheduleModal(false)}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        selectedTime={selectedTime}
        onTimeChange={setSelectedTime}
      />

      <EditServiceModal
        isOpen={showEditServiceModal}
        onClose={() => setShowEditServiceModal(false)}
        selectedService={selectedService}
        onServiceChange={setSelectedService}
      />
    </div>
  );
}
