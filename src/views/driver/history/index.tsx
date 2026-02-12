'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Download,
  ChevronRight,
  Truck,
  Package,
} from 'lucide-react';
import clsx from 'clsx';
import { DriverJobHistory } from '@/src/types/driver';
import { driverService } from '@/src/services/driver.service';

export function DriverHistoryView() {
  const router = useRouter();
  const [jobs, setJobs] = useState<DriverJobHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pickup' | 'delivery'>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const data = await driverService.getDriverHistory({ page, limit: 10 });
        if (data.data) {
          setJobs(data.data || []);
          setTotalPages(data.meta?.totalPages || 1);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [page]);

  const filteredJobs = jobs.filter((job) => {
    if (filter === 'all') return true;
    return job.type === filter.toUpperCase();
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    if (date.getFullYear() <= 1970) return '—';
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='min-h-full bg-slate-50 text-slate-900 dark:bg-[#101922] dark:text-white'>
      {/* Header */}
      <header className='sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-[#101922] md:px-10'>
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

      <main className='mx-auto max-w-300 px-4 py-8 md:px-10'>
        {/* Page Heading */}
        <div className='mb-8 flex flex-wrap items-end justify-between gap-4'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-3xl font-black tracking-tight md:text-4xl'>
              Riwayat Pekerjaan
            </h1>
            <p className='text-base text-slate-500 dark:text-slate-400'>
              Total {jobs.length} pekerjaan telah diselesaikan.
            </p>
          </div>
          <button className='flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500'>
            <Download className='h-5 w-5' />
            <span>Ekspor Data</span>
          </button>
        </div>

        {/* Stats Summary */}
        <div className='mb-8 flex flex-wrap gap-4'>
          <div className='flex min-w-50 flex-1 flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-transparent'>
            <div className='flex items-center gap-2 text-slate-500 dark:text-slate-400'>
              <Package className='h-5 w-5' />
              <p className='text-sm font-medium'>Pekerjaan Selesai</p>
            </div>
            <p className='text-3xl font-bold tracking-tight'>{jobs.length}</p>
          </div>
        </div>

        {/* Filter Section */}
        <div className='mb-6 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-[#1a2632]'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-wrap items-center gap-4'>
              <div className='flex flex-col gap-1.5'>
                <span className='text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400'>
                  Filter Type
                </span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as typeof filter)}
                  className='min-w-40 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-600 dark:bg-[#101922] dark:text-white dark:focus:border-blue-500'
                >
                  <option value='all'>Semua</option>
                  <option value='pickup'>Jemput</option>
                  <option value='delivery'>Antar</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Job History List */}
        <div className='flex flex-col gap-4'>
          {loading ? (
            <div className='py-12 text-center text-slate-500 dark:text-slate-400'>Memuat...</div>
          ) : filteredJobs.length === 0 ? (
            <div className='py-12 text-center text-slate-500 dark:text-slate-400'>
              Tidak ada riwayat pekerjaan.
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() =>
                  router.push(
                    job.type === 'PICKUP'
                      ? `/driver-pickup/${job.id}`
                      : `/driver-delivery/${job.id}`
                  )
                }
                className='hover:border-blue-500/50 group grid cursor-pointer grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all dark:border-slate-700 dark:bg-[#1a2632]'
              >
                <div
                  className={clsx(
                    'flex h-12 w-12 items-center justify-center rounded-full',
                    job.type === 'DELIVERY'
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
                      : 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400'
                  )}
                >
                  {job.type === 'DELIVERY' ? (
                    <Truck className='h-5 w-5' />
                  ) : (
                    <Package className='h-5 w-5' />
                  )}
                </div>
                <div className='flex min-w-0 flex-col'>
                  <div className='flex items-center gap-2'>
                    <h3 className='text-lg font-bold'>#{job.order_number}</h3>
                    <span
                      className={clsx(
                        'rounded px-2 py-0.5 text-[10px] font-black tracking-widest uppercase',
                        job.type === 'DELIVERY'
                          ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                      )}
                    >
                      {job.type === 'DELIVERY' ? 'Antar' : 'Jemput'}
                    </span>
                  </div>
                  <p className='truncate text-sm text-slate-500 dark:text-slate-400'>
                    {job.customer_name} - {job.address}
                  </p>
                </div>

                <div className='flex flex-col items-end'>
                  <p className='text-xs font-medium tracking-tighter text-slate-500 uppercase dark:text-slate-400'>
                    Waktu Selesai
                  </p>
                  <p className='text-sm font-semibold whitespace-nowrap text-slate-900 dark:text-slate-200'>
                    {formatDate(job.completed_at)}
                  </p>
                </div>

                <div className='flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-emerald-600 dark:text-emerald-400'>
                  <span className='h-2 w-2 rounded-full bg-emerald-500' />
                  <span className='text-xs font-bold tracking-wider uppercase'>
                    {job.status}
                  </span>
                </div>

                <ChevronRight className='h-5 w-5 text-slate-400 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-500' />
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className='mt-10 flex items-center justify-between border-t border-slate-200 pt-6 pb-12 dark:border-slate-700'>
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:text-blue-500'
          >
            <ArrowLeft className='h-4 w-4' />
            Sebelumnya
          </button>
          <div className='flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400'>
            <span>Halaman</span>
            <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white'>
              {page}
            </span>
            <span>dari {totalPages}</span>
          </div>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-200 dark:hover:text-blue-500'
          >
            Selanjutnya
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>
      </main>
    </div>
  );
}
