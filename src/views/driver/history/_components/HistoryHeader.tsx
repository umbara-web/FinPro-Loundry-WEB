import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface HistoryHeaderProps {
  totalJobs: number;
}

export const HistoryHeader = ({ totalJobs }: HistoryHeaderProps) => {
  return (
    <>
      <header className='sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-10 dark:border-slate-800 dark:bg-[#101922]'>
        <div className='flex items-center gap-4'>
          <Link
            href='/driver-dashboard'
            className='flex items-center gap-2 text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          >
            <ArrowLeft className='h-5 w-5' />
            <span className='text-sm font-medium'>Dashboard</span>
          </Link>
        </div>
      </header>

      <div className='mb-8 flex flex-wrap items-end justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl font-black tracking-tight md:text-4xl'>
            Riwayat Pekerjaan
          </h1>
          <p className='text-base text-slate-500 dark:text-slate-400'>
            Total {totalJobs} pekerjaan telah diselesaikan.
          </p>
        </div>
      </div>
    </>
  );
};
