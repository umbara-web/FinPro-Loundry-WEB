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
          `${process.env.NEXT_PUBLIC_API_URL}/api/worker/history?page=${page}&limit=10`,
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
        return 'bg-blue-900/30 text-blue-400';
      case 'IRONING':
        return 'bg-amber-900/30 text-amber-400';
      case 'PACKING':
        return 'bg-emerald-900/30 text-emerald-400';
      default:
        return 'bg-slate-900/30 text-slate-400';
    }
  };

  return (
    <div className='min-h-full bg-[#101922] text-white'>
      {/* Header */}
      <header className='sticky top-0 z-10 flex items-center justify-between border-b border-[#223649] bg-[#101922] px-4 py-3 md:px-10'>
        <div className='flex items-center gap-4'>
          <Link
            href='/worker-dashboard'
            className='flex items-center gap-2 text-[#8fadcc] transition-colors hover:text-white'
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
            <p className='text-base text-[#8fadcc]'>
              Total {jobs.length} pekerjaan telah diselesaikan.
            </p>
          </div>
        </div>

        {/* Stats Summary */}
        <div className='mb-8 flex flex-wrap gap-4'>
          <div className='flex min-w-50 flex-1 flex-col gap-2 rounded-xl border border-[#304d69] bg-transparent p-6'>
            <div className='flex items-center gap-2 text-slate-400'>
              <Package className='h-5 w-5' />
              <p className='text-sm font-medium'>Pekerjaan Selesai</p>
            </div>
            <p className='text-3xl font-bold tracking-tight'>{jobs.length}</p>
            <p className='flex items-center gap-1 text-sm font-semibold text-emerald-500'>
              <TrendingUp className='h-4 w-4' /> Terus bekerja!
            </p>
          </div>
        </div>

        {/* Job History List */}
        <div className='flex flex-col gap-4'>
          {loading ? (
            <div className='py-12 text-center text-[#8fadcc]'>Memuat...</div>
          ) : jobs.length === 0 ? (
            <div className='py-12 text-center text-[#8fadcc]'>
              Tidak ada riwayat pekerjaan.
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className='group flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#223649] bg-[#1a2632] p-5 transition-all hover:border-[#0a7ff5]/50'
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
                    <p className='text-sm text-slate-400'>
                      {job.customerName} - {job.itemCount} item
                    </p>
                  </div>
                </div>

                <div className='flex flex-col items-start md:items-center'>
                  <p className='text-xs font-medium tracking-tighter text-slate-400 uppercase'>
                    Waktu Selesai
                  </p>
                  <p className='text-sm font-semibold text-slate-200'>
                    {formatDate(job.completedAt)}
                  </p>
                </div>

                <div className='flex items-center gap-4'>
                  <div className='flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-emerald-400'>
                    <span className='h-2 w-2 rounded-full bg-emerald-500' />
                    <span className='text-xs font-bold tracking-wider uppercase'>
                      Selesai
                    </span>
                  </div>
                  <button className='text-slate-400 transition-colors hover:text-[#0a7ff5]'>
                    <ChevronRight className='h-5 w-5' />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className='mt-10 flex items-center justify-between border-t border-[#223649] pt-6 pb-12'>
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-[#0a7ff5] disabled:cursor-not-allowed disabled:opacity-50'
          >
            <ArrowLeft className='h-4 w-4' />
            Sebelumnya
          </button>
          <div className='flex items-center gap-2 text-sm text-slate-400'>
            <span>Halaman</span>
            <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#0a7ff5] text-sm font-bold text-white'>
              {page}
            </span>
            <span>dari {totalPages}</span>
          </div>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:text-[#0a7ff5] disabled:cursor-not-allowed disabled:opacity-50'
          >
            Selanjutnya
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>
      </main>
    </div>
  );
}
