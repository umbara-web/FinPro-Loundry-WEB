'use client';

import { Address } from '@/src/types/address';
import { NearestOutletResult } from '@/src/types/pickup';
import { Button } from '@/src/components/ui/button';
import { PickupSummaryItem } from './pickup-summary-item';
import {
  Loader2,
  Receipt,
  MapPin,
  Calendar,
  Store,
  Info,
  ArrowRight,
} from 'lucide-react';

interface PickupSummaryProps {
  selectedAddress?: Address;
  date: string;
  timeSlot: string;
  nearestOutlet?: NearestOutletResult;
  isOutletLoading?: boolean;
  notes: string;
  setNotes: (notes: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

function formatDateDisplay(date: string): string {
  if (!date) return 'Pilih Tanggal';
  return new Date(date)
    .toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .replace(/ /g, '-');
}

function SummaryHeader() {
  return (
    <h3 className='mb-5 flex items-center gap-2 text-lg font-bold text-black dark:text-white'>
      <Receipt className='text-primary h-5 w-5' />
      Ringkasan Pesanan
    </h3>
  );
}

function InfoNotice() {
  return (
    <div className='mb-6 flex items-start gap-3 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20'>
      <Info className='text-primary mt-0.5 h-4 w-4' />
      <p className='text-xs leading-tight text-blue-800 dark:text-blue-200'>
        Total harga akan dihitung setelah laundry ditimbang oleh petugas kami
        saat penjemputan.
      </p>
    </div>
  );
}

function NotesInput({
  notes,
  setNotes,
}: {
  notes: string;
  setNotes: (v: string) => void;
}) {
  return (
    <div className='mb-6'>
      <label className='mb-2 block text-sm font-medium text-black dark:text-white'>
        Catatan (Opsional)
      </label>
      <textarea
        className='h-20 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-black placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white'
        placeholder='Contoh: kode pagar 1234, bel rumah mati'
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  );
}

function SubmitButton({
  isLoading,
  disabled,
}: {
  isLoading: boolean;
  disabled: boolean;
}) {
  return (
    <Button className='w-full' type='button' disabled={disabled}>
      {isLoading ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Memproses...
        </>
      ) : (
        <>
          <span>Konfirmasi Pesanan</span>
          <ArrowRight className='ml-2 h-4 w-4' />
        </>
      )}
    </Button>
  );
}

function getOutletDisplay(
  nearestOutlet?: NearestOutletResult,
  isOutletLoading?: boolean
) {
  if (isOutletLoading)
    return {
      title: 'Mencari outlet...',
      subtitle: 'Loading',
      isCompleted: false,
    };
  if (!nearestOutlet?.outlet)
    return {
      title: 'Pilih Alamat',
      subtitle: 'Belum ada outlet',
      isCompleted: false,
    };
  if (!nearestOutlet.isWithinRange)
    return {
      title: 'Outlet Tidak Tersedia',
      subtitle: 'Di luar jangkauan',
      isCompleted: false,
    };
  return {
    title: nearestOutlet.outlet.name,
    subtitle: `${nearestOutlet.distance} km`,
    isCompleted: true,
  };
}

export function PickupSummary({
  selectedAddress,
  date,
  timeSlot,
  nearestOutlet,
  isOutletLoading,
  notes,
  setNotes,
  onSubmit,
  isLoading,
}: PickupSummaryProps) {
  const outletDisplay = getOutletDisplay(nearestOutlet, isOutletLoading);
  const isDisabled =
    isLoading ||
    !selectedAddress ||
    !date ||
    !timeSlot ||
    !nearestOutlet?.isWithinRange;

  return (
    <div className='rounded-xl border border-slate-300 bg-slate-200 p-6 shadow-xl shadow-black/5 lg:sticky lg:top-8 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/20'>
      <SummaryHeader />
      <div className='mb-6 flex flex-col gap-4'>
        <PickupSummaryItem
          icon={<MapPin className='h-4 w-4' />}
          title={selectedAddress?.label || 'Pilih Alamat'}
          subtitle={selectedAddress?.fullAddress || 'Belum dipilih'}
          isCompleted={!!selectedAddress}
        />
        <PickupSummaryItem
          icon={<Calendar className='h-4 w-4' />}
          title={formatDateDisplay(date)}
          subtitle={timeSlot || 'Pilih Waktu'}
          isCompleted={!!(date && timeSlot)}
        />
        <PickupSummaryItem
          icon={<Store className='h-4 w-4' />}
          title={outletDisplay.title}
          subtitle={outletDisplay.subtitle}
          isCompleted={outletDisplay.isCompleted}
        />
      </div>
      <div className='my-4 border-t border-dashed border-slate-300 dark:border-slate-700' />
      <InfoNotice />
      <NotesInput notes={notes} setNotes={setNotes} />
      <div onClick={onSubmit}>
        <SubmitButton isLoading={isLoading} disabled={isDisabled} />
      </div>
    </div>
  );
}
