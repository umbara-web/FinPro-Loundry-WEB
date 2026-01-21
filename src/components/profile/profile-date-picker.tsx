'use client';

import * as React from 'react';
import { CalendarIcon, CheckCircle } from 'lucide-react';

import { Calendar } from '@/src/components/ui/calendar';
import { Label } from '@/src/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover';

function formatDate(date: Date | undefined) {
  if (!date) {
    return '';
  }

  return date
    .toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
    .replace(/ /g, '-');
}

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export default function ProfileDatePicker({ date, setDate }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='flex flex-col gap-2'>
      <Label
        htmlFor='birthdate'
        className='text-sm font-medium text-black dark:text-white'
      >
        Tanggal Lahir
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className='bg-input-dark focus:border-primary flex w-full items-center justify-between rounded-lg border border-transparent px-4 py-2.5 text-left text-sm focus:ring-0'>
            <span
              className='font-bold'
              style={{
                color: date ? undefined : 'rgb(100 116 139)',
              }}
            >
              {date ? formatDate(date) : 'Pilih Tanggal Lahir'}
            </span>
            {date ? (
              <CheckCircle className='h-4 w-4 text-green-500' />
            ) : (
              <CalendarIcon className='h-4 w-4 opacity-50' />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate);
              setOpen(false);
            }}
            disabled={(date) =>
              date > new Date() || date < new Date('1900-01-01')
            }
            captionLayout='dropdown'
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
