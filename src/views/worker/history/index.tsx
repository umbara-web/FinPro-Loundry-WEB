'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Package, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

interface WorkerJobHistory {
  id: string;
  orderId: string;
  orderNumber: string;
  taskType: 'WASHING' | 'IRONING' | 'PACKING';
  customerName: string;
  itemCount: number;
  completedAt: string;
}

export function WorkerHistoryView() {
  const [jobs, setJobs] = useState<WorkerJobHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/worker/history?page=${page}&limit=10`,
          { credentials: 'include' }
        );
        if (res.ok) {
          const result = await res.json();
          setJobs(result.data || []);
          setTotalPages(result.meta?.totalPages || 1);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [page]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTaskTypeLabel = (type: string) => {
    switch (type) {
      case 'WASHING':
        return 'Cuci';
      case 'IRONING':
        return 'Setrika';
      case 'PACKING':
        return 'Packing';
      default:
        return type;
    }
  };

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case 'WASHING':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'IRONING':
        return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
      case 'PACKING':
        return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400';
      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-400';
    }
  };

  return (
    <div className='flex flex-1 flex-col overflow-y-auto bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white'>
      {/* Header */}
      <div className='px-4 py-6 md:px-10'>
        <Link
          href='/worker-dashboard'
          className='inline-flex items-center gap-2 text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
        >
          <ArrowLeft className='h-5 w-5' />
          <span className='text-sm font-medium'>Kembali ke Dashboard</span>
        </Link>
      </div>

      <main className='w-full px-4 py-8 md:px-10'>
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
        </div>

        {/* Stats Summary */}
        <div className='mb-8 flex flex-wrap gap-4'>
          <div className='flex min-w-50 flex-1 flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900'>
            <div className='flex items-center gap-2 text-slate-500 dark:text-slate-400'>
              <Package className='h-5 w-5' />
              <p className='text-sm font-medium'>Pekerjaan Selesai</p>
            </div>
            <p className='text-3xl font-bold tracking-tight'>{jobs.length}</p>
            <p className='flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-500'>
              <TrendingUp className='h-4 w-4' /> Terus bekerja!
            </p>
          </div>
        </div>

        {/* Job History List */}
        <div className='flex flex-col gap-4'>
          {loading ? (
            <div className='py-12 text-center text-slate-500 dark:text-slate-400'>
              Memuat...
            </div>
          ) : jobs.length === 0 ? (
            <div className='py-12 text-center text-slate-500 dark:text-slate-400'>
              Tidak ada riwayat pekerjaan.
            </div>
          ) : (
            jobs.map((job) => (
              <Link
                key={job.id}
                href={`/worker-history/${job.id}`}
                className='group flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-blue-500/50 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-500/50'
              >
                <div className='flex min-w-70 items-center gap-4'>
                  <div
                    className={clsx(
                      'flex h-12 w-12 items-center justify-center rounded-full',
                      getTaskTypeColor(job.taskType)
                    )}
                  >
                    <Package className='h-5 w-5' />
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex items-center gap-2'>
                      <h3 className='text-lg font-bold'>#{job.orderNumber}</h3>
                      <span
                        className={clsx(
                          'rounded px-2 py-0.5 text-[10px] font-black tracking-widest uppercase',
                          getTaskTypeColor(job.taskType)
                        )}
                      >
                        {getTaskTypeLabel(job.taskType)}
                      </span>
                    </div>
                    <p className='text-sm text-slate-500 dark:text-slate-400'>
                      {job.customerName} - {job.itemCount} item
                    </p>
                  </div>
                </div>

                <div className='flex flex-col items-start md:items-center'>
                  <p className='text-xs font-medium tracking-tighter text-slate-500 uppercase dark:text-slate-400'>
                    Waktu Selesai
                  </p>
                  <p className='text-sm font-semibold text-slate-900 dark:text-slate-200'>
                    {formatDate(job.completedAt)}
                  </p>
                </div>

                <div className='flex items-center gap-4'>
                  <div className='flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'>
                    <span className='h-2 w-2 rounded-full bg-emerald-500' />
                    <span className='text-xs font-bold tracking-wider uppercase'>
                      Selesai
                    </span>
                  </div>
                  <button className='text-slate-400 transition-colors hover:text-blue-500 dark:text-slate-500 dark:hover:text-blue-400'>
                    <ChevronRight className='h-5 w-5' />
                  </button>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className='mt-10 flex items-center justify-between border-t border-slate-200 pt-6 pb-12 dark:border-slate-800'>
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:text-blue-400'
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
            className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:text-blue-400'
          >
            Selanjutnya
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>
      </main>
    </div>
  );
}
