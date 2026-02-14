'use client';

import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

export function RealTimeClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className='mb-8 flex flex-col items-center'>
      <h1 className='text-5xl leading-tight font-bold tracking-tight text-slate-900 tabular-nums md:text-[64px] dark:text-white'>
        {formatTime(currentTime)}
      </h1>
      <div className='mt-2 flex items-center gap-2 text-base font-normal text-slate-500 md:text-lg dark:text-[#92adc9]'>
        <Calendar className='h-5 w-5' />
        <p>{formatDate(currentTime)}</p>
      </div>
    </div>
  );
}
