'use client';

interface CountdownTimerProps {
  timeLeft: number;
  formatTime: (seconds: number) => string;
}

export function CountdownTimer({ timeLeft, formatTime }: CountdownTimerProps) {
  return (
    <div className='dark:bg-surface-dark flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-transparent'>
      <div className='bg-primary/10 text-primary hidden rounded-full p-3 sm:block'>
        <span className='material-symbols-outlined text-3xl'>timer</span>
      </div>
      <div className='flex flex-col gap-1'>
        <p className='text-sm font-medium tracking-wider text-slate-500 uppercase dark:text-slate-400'>
          Sisa Waktu Pembayaran
        </p>
        <div className='flex items-baseline gap-2'>
          <p className='text-primary text-3xl leading-tight font-bold tabular-nums'>
            {formatTime(timeLeft)}
          </p>
          <span className='text-xs text-slate-400'>Menit : Detik</span>
        </div>
      </div>
    </div>
  );
}
