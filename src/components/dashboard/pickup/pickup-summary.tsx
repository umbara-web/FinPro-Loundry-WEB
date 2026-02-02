'use client';

import { Address } from '@/src/types/address';
import { NearestOutletResult } from '@/src/types/pickup';
import { PickupSummaryItem } from './pickup-summary-item';
import { Calendar, Store, MapPin, ClipboardList } from 'lucide-react';
import { formatDateDisplay, getOutletDisplay } from './pickup-constants';
import {
  SummaryHeader,
  InfoNotice,
  NotesInput,
  SubmitButton,
  PickupItemsList,
} from './pickup-summary-components';

// --- Main Component ---
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
  items: Record<string, number>;
  manualItems: { name: string; quantity: number }[];
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
  items = {},
  manualItems = [],
}: PickupSummaryProps) {
  const outletDisplay = getOutletDisplay(nearestOutlet, isOutletLoading);
  const itemsCount = Object.values(items).reduce((a, b) => a + b, 0);
  const hasItems = itemsCount > 0 || manualItems.length > 0;

  const isDisabled =
    isLoading ||
    !selectedAddress ||
    !date ||
    !timeSlot ||
    !hasItems ||
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
          icon={<ClipboardList className='h-4 w-4' />}
          title='Daftar Item'
          subtitle={<PickupItemsList items={items} manualItems={manualItems} />}
          isCompleted={hasItems}
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
