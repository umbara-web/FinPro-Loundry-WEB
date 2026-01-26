'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Calendar } from '@/src/components/ui/calendar';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover';

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  minDate?: string;
}

function formatDate(date: Date | undefined): string {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function isValidDate(date: Date | undefined): boolean {
  return !!date && !isNaN(date.getTime());
}

function useDatePickerState(date: Date | undefined) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [inputValue, setInputValue] = React.useState(formatDate(date));

  React.useEffect(() => {
    setInputValue(formatDate(date));
    if (date) setMonth(date);
  }, [date]);

  return { open, setOpen, month, setMonth, inputValue, setInputValue };
}

function DateInput({
  inputValue,
  onInputChange,
  onKeyDown,
}: {
  inputValue: string;
  onInputChange: (value: string, newDate: Date | undefined) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}) {
  return (
    <Input
      id='date'
      value={inputValue}
      placeholder='Pilih Tanggal Pick Up'
      className='w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-left text-black transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white'
      onChange={(e) => {
        const newDate = new Date(e.target.value);
        onInputChange(
          e.target.value,
          isValidDate(newDate) ? newDate : undefined
        );
      }}
      onKeyDown={onKeyDown}
    />
  );
}

export default function PickupDatePicker({
  date,
  setDate,
  minDate,
}: DatePickerProps) {
  const { open, setOpen, month, setMonth, inputValue, setInputValue } =
    useDatePickerState(date);

  const handleInputChange = (value: string, newDate: Date | undefined) => {
    setInputValue(value);
    if (newDate) {
      setDate(newDate);
      setMonth(newDate);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <Label
        htmlFor='date'
        className='block text-sm font-medium text-black dark:text-white'
      >
        Tanggal Pick Up
      </Label>
      <div className='relative flex gap-2'>
        <DateInput
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id='date-picker'
              variant='ghost'
              className='absolute top-1/2 right-2 size-6 -translate-y-1/2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400'
            >
              <CalendarIcon className='size-5' />
              <span className='sr-only'>Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className='w-auto overflow-hidden p-0'
            align='end'
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode='single'
              selected={date}
              disabled={(d) =>
                minDate ? d < new Date(minDate) : d < new Date()
              }
              captionLayout='dropdown'
              month={month}
              onMonthChange={setMonth}
              onSelect={(newDate) => {
                setDate(newDate);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
