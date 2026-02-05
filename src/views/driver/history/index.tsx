'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  ChevronRight,
  Truck,
  Package,
  TrendingUp,
  Star,
} from 'lucide-react';
import clsx from 'clsx';
import { DriverJobHistory } from '@/src/types/driver';
import { api } from '@/src/lib/api/axios-instance';

export function DriverHistoryView() {
  const [jobs, setJobs] = useState<DriverJobHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pickup' | 'delivery'>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/driver/history?page=${page}&limit=10`);
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
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalIncentive = jobs.reduce((acc, job) => acc + (job.incentive || 0), 0);

  return (
    <div className="min-h-full bg-[#101922] text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#223649] bg-[#101922] px-4 py-3 md:px-10">
        <div className="flex items-center gap-4">
          <Link
            href="/driver-dashboard"
            className="flex items-center gap-2 text-[#8fadcc] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-10">
        {/* Page Heading */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-black tracking-tight md:text-4xl">
              Riwayat Pekerjaan
            </h1>
            <p className="text-base text-[#8fadcc]">
              Total {jobs.length} pekerjaan telah diselesaikan.
            </p>
          </div>
          <button className="flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0a7ff5] px-6 text-sm font-bold shadow-lg shadow-[#0a7ff5]/20 transition-all hover:bg-[#0a7ff5]/90">
            <Download className="h-5 w-5" />
            <span>Ekspor Data</span>
          </button>
        </div>

        {/* Stats Summary */}
        <div className="mb-8 flex flex-wrap gap-4">
          <div className="flex min-w-[200px] flex-1 flex-col gap-2 rounded-xl border border-[#304d69] bg-transparent p-6">
            <div className="flex items-center gap-2 text-slate-400">
              <Package className="h-5 w-5" />
              <p className="text-sm font-medium">Pekerjaan Selesai</p>
            </div>
            <p className="text-3xl font-bold tracking-tight">{jobs.length}</p>
            <p className="flex items-center gap-1 text-sm font-semibold text-emerald-500">
              <TrendingUp className="h-4 w-4" /> +12% bln ini
            </p>
          </div>
          <div className="flex min-w-[200px] flex-1 flex-col gap-2 rounded-xl border border-[#304d69] bg-transparent p-6">
            <div className="flex items-center gap-2 text-slate-400">
              <Truck className="h-5 w-5" />
              <p className="text-sm font-medium">Total Insentif</p>
            </div>
            <p className="text-3xl font-bold tracking-tight">
              {formatCurrency(totalIncentive)}
            </p>
            <p className="flex items-center gap-1 text-sm font-semibold text-emerald-500">
              <TrendingUp className="h-4 w-4" /> +8% bln ini
            </p>
          </div>
          <div className="flex min-w-[200px] flex-1 flex-col gap-2 rounded-xl border border-[#304d69] bg-transparent p-6">
            <div className="flex items-center gap-2 text-slate-400">
              <Star className="h-5 w-5" />
              <p className="text-sm font-medium">Rating Rata-rata</p>
            </div>
            <p className="text-3xl font-bold tracking-tight">4.9</p>
            <div className="flex items-center gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-6 rounded-xl border border-[#223649] bg-[#1a2632] p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Filter Type
                </span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as typeof filter)}
                  className="min-w-[160px] rounded-lg border border-[#304d69] bg-[#101922] px-4 py-2 text-sm text-white focus:border-[#0a7ff5] focus:ring-[#0a7ff5]"
                >
                  <option value="all">Semua</option>
                  <option value="pickup">Jemput</option>
                  <option value="delivery">Antar</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Job History List */}
        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="py-12 text-center text-[#8fadcc]">Memuat...</div>
          ) : filteredJobs.length === 0 ? (
            <div className="py-12 text-center text-[#8fadcc]">
              Tidak ada riwayat pekerjaan.
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="group flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#223649] bg-[#1a2632] p-5 transition-all hover:border-[#0a7ff5]/50"
              >
                <div className="flex min-w-[280px] items-center gap-4">
                  <div
                    className={clsx(
                      'flex h-12 w-12 items-center justify-center rounded-full',
                      job.type === 'DELIVERY'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-orange-500/20 text-orange-400'
                    )}
                  >
                    {job.type === 'DELIVERY' ? (
                      <Truck className="h-5 w-5" />
                    ) : (
                      <Package className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold">#{job.order_number}</h3>
                      <span
                        className={clsx(
                          'rounded px-2 py-0.5 text-[10px] font-black uppercase tracking-widest',
                          job.type === 'DELIVERY'
                            ? 'bg-blue-900/30 text-blue-400'
                            : 'bg-orange-900/30 text-orange-400'
                        )}
                      >
                        {job.type === 'DELIVERY' ? 'Antar' : 'Jemput'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">
                      {job.customer_name} - {job.address}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-center">
                  <p className="text-xs font-medium uppercase tracking-tighter text-slate-400">
                    Waktu Selesai
                  </p>
                  <p className="text-sm font-semibold text-slate-200">
                    {formatDate(job.completed_at)}
                  </p>
                </div>

                <div className="flex flex-col items-start md:items-center">
                  <p className="text-xs font-medium uppercase tracking-tighter text-slate-400">
                    Insentif
                  </p>
                  <p className="text-sm font-bold text-[#0a7ff5]">
                    {formatCurrency(job.incentive || 0)}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {job.status}
                    </span>
                  </div>
                  <button className="text-slate-400 transition-colors hover:text-[#0a7ff5]">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-between border-t border-[#223649] pb-12 pt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-[#0a7ff5] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" />
            Sebelumnya
          </button>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Halaman</span>
            <span className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#0a7ff5] text-sm font-bold text-white">
              {page}
            </span>
            <span>dari {totalPages}</span>
          </div>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:text-[#0a7ff5] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Selanjutnya
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
