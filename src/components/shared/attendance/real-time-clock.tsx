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
    <div className="flex flex-col items-center mb-8">
      <h1 className="text-slate-900 dark:text-white tracking-tight text-5xl md:text-[64px] font-bold leading-tight tabular-nums">
        {formatTime(currentTime)}
      </h1>
      <div className="flex items-center gap-2 text-slate-500 dark:text-[#92adc9] text-base md:text-lg font-normal mt-2">
        <Calendar className="w-5 h-5" />
        <p>{formatDate(currentTime)}</p>
      </div>
    </div>
  );
}
