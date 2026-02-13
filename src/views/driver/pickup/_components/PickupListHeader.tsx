import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface PickupListHeaderProps {
  onRefresh: () => void;
}

export const PickupListHeader = ({ onRefresh }: PickupListHeaderProps) => {
  return (
    <header className='sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-10 dark:border-slate-800 dark:bg-[#101922]'>
      <div className='flex items-center gap-4'>
        <Link
          href='/driver-dashboard'
          className='flex items-center gap-2 text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
        >
          <ArrowLeft className='h-5 w-5' />
          <span className='text-sm font-medium'>Dashboard</span>
        </Link>
        <div className='mx-2 h-4 w-px bg-slate-200 dark:bg-slate-700' />
        <h2 className='text-lg font-bold'>Pickup Requests</h2>
      </div>
      <button
        onClick={onRefresh}
        className='flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700'
      >
        <RefreshCw className='h-4 w-4' />
        Refresh
      </button>
    </header>
  );
};
