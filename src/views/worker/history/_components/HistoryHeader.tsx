import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface HistoryHeaderProps {
  jobCount: number;
}

export const HistoryHeader = ({ jobCount }: HistoryHeaderProps) => {
  return (
    <>
      <div className='px-4 py-6 md:px-10'>
        <Link
          href='/worker-dashboard'
          className='inline-flex items-center gap-2 text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
        >
          <ArrowLeft className='h-5 w-5' />
          <span className='text-sm font-medium'>Kembali ke Dashboard</span>
        </Link>
      </div>

      <div className='mb-8 flex flex-wrap items-end justify-between gap-4 px-4 md:px-10'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl font-black tracking-tight md:text-4xl'>
            Riwayat Pekerjaan
          </h1>
          <p className='text-base text-slate-500 dark:text-slate-400'>
            Total {jobCount} pekerjaan telah diselesaikan.
          </p>
        </div>
      </div>
    </>
  );
};
