'use client';

import { Label } from '@/src/components/ui/label';
import { Input } from '@/src/components/ui/input';
import { cn } from '@/src/lib/utils/utils';
import { Calendar } from 'lucide-react';
import PickupDatePicker from './pickup-date-picker';

interface PickupScheduleStepProps {
  date: string;
  setDate: (date: string) => void;
  timeSlot: string;
  setTimeSlot: (slot: string) => void;
}

const TIME_SLOTS = [
  { label: '08:00 - 10:00', value: '08:00 - 10:00', disabled: false },
  { label: '10:00 - 12:00', value: '10:00 - 12:00', disabled: false },
  { label: '13:00 - 15:00', value: '13:00 - 15:00', disabled: false },
  { label: '16:00 - 18:00', value: '16:00 - 18:00', disabled: false },
];

export function PickupScheduleStep({
  date,
  setDate,
  timeSlot,
  setTimeSlot,
}: PickupScheduleStepProps) {
  // Prevent selecting past dates
  const minDate = new Date().toISOString().split('T')[0];

  return (
    <section>
      <div className='mb-4 flex items-center gap-3 border-t border-slate-300 pt-4 dark:border-slate-700'>
        <div className='flex items-center justify-center rounded-lg bg-blue-500 p-2 text-white'>
          <Calendar className='h-6 w-6' />
        </div>
        <h2 className='text-xl font-bold text-black dark:text-white'>
          2. Jadwal Penjemputan
        </h2>
      </div>

      <div className='rounded-xl border border-slate-300 bg-slate-200 p-6 dark:border-slate-700 dark:bg-slate-800'>
        <div className='flex flex-col gap-6 xl:flex-row'>
          {/* Date Input */}
          <div className='flex-1'>
            <PickupDatePicker
              date={date ? new Date(date) : undefined}
              setDate={(newDate) => {
                if (newDate) {
                  // Format to YYYY-MM-DD for local state
                  const year = newDate.getFullYear();
                  const month = String(newDate.getMonth() + 1).padStart(2, '0');
                  const day = String(newDate.getDate()).padStart(2, '0');
                  setDate(`${year}-${month}-${day}`);
                } else {
                  setDate('');
                }
              }}
              minDate={minDate}
            />
          </div>
          {/* Time Slots */}
          <div className='flex-[1.5]'>
            <Label className='mb-2 block text-sm font-medium text-black dark:text-white'>
              Waktu (Slot Tersedia)
            </Label>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
              {TIME_SLOTS.map((slot) => (
                <label key={slot.value} className='cursor-pointer'>
                  <input
                    type='radio'
                    name='time'
                    className='peer sr-only'
                    value={slot.value}
                    checked={timeSlot === slot.value}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    disabled={slot.disabled}
                  />
                  <div
                    className={cn(
                      'rounded-lg border border-slate-300 bg-white px-1.5 py-2.5 text-center text-sm font-medium text-black transition-all dark:border-slate-600 dark:bg-slate-900 dark:text-white',
                      'hover:border-blue-500 dark:hover:border-blue-500',
                      'peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white dark:peer-checked:border-blue-500 dark:peer-checked:bg-blue-500',
                      slot.disabled &&
                        'cursor-not-allowed bg-gray-100 text-gray-400 opacity-50 dark:bg-slate-800 dark:text-gray-500'
                    )}
                  >
                    {slot.label}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
