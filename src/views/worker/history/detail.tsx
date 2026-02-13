'use client';

import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Package,
  User,
  Calendar,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { useWorkerTaskDetail } from '@/src/hooks/use-station-tasks';
import { AlertCircle } from 'lucide-react';

interface WorkerTaskDetailViewProps {
  taskId: string;
}

export function WorkerTaskDetailView({ taskId }: WorkerTaskDetailViewProps) {
  const router = useRouter();
  const { data: task, isLoading, isError, error } = useWorkerTaskDetail(taskId);

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950'>
        <div className='animate-pulse text-slate-500 dark:text-slate-400'>
          Memuat detail tugas...
        </div>
      </div>
    );
  }

  if (isError || !task) {
    return (
      <div className='flex h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center text-slate-900 dark:bg-slate-950 dark:text-white'>
        <div className='mb-4 rounded-full bg-red-100 p-4 text-red-500 dark:bg-red-900/20'>
          <AlertCircle className='h-8 w-8' />
        </div>
        <h3 className='text-lg font-bold'>Gagal memuat detail</h3>
        <p className='mt-2 text-sm text-slate-500 dark:text-slate-400'>
          {(error as Error)?.message ||
            'Terjadi kesalahan saat mengambil data.'}
        </p>
        <button
          onClick={() => router.back()}
          className='mt-6 rounded-lg bg-slate-200 px-6 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
        >
          Kembali
        </button>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white'>
      {/* Header */}
      <div className='bg-white px-4 py-4 shadow-sm dark:bg-slate-900'>
        <div className='mx-auto flex max-w-3xl items-center gap-4'>
          <button
            onClick={() => router.back()}
            className='rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
          >
            <ArrowLeft className='h-5 w-5' />
          </button>
          <h1 className='text-lg font-bold'>
            Detail Pekerjaan # {task.invoiceNumber}
          </h1>
        </div>
      </div>

      <main className='mx-auto w-full max-w-3xl p-4 md:p-6'>
        <div className='flex flex-col gap-6'>
          {/* Status Card */}
          <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900'>
            <div className='flex items-start justify-between'>
              <div>
                <p className='text-sm text-slate-500 dark:text-slate-400'>
                  Status Pekerjaan
                </p>
                <div className='mt-1 flex items-center gap-2'>
                  <span className='flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'>
                    <CheckCircle className='h-3.5 w-3.5' />
                    SELESAI
                  </span>
                </div>
              </div>
              <div className='text-right'>
                <p className='text-sm text-slate-500 dark:text-slate-400'>
                  Waktu Selesai
                </p>
                <p className='mt-1 font-medium'>{task.estimatedTime}</p>
              </div>
            </div>
          </div>

          {/* Customer & Order Info */}
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900'>
              <div className='flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800'>
                <User className='h-5 w-5 text-slate-400' />
                <h3 className='font-bold'>Informasi Pelanggan</h3>
              </div>
              <div className='mt-4 flex items-center gap-4'>
                {task.customerAvatar ? (
                  <img
                    src={task.customerAvatar}
                    alt={task.customerName}
                    className='h-12 w-12 rounded-full object-cover'
                  />
                ) : (
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800'>
                    <User className='h-6 w-6' />
                  </div>
                )}
                <div>
                  <p className='font-bold text-slate-900 dark:text-white'>
                    {task.customerName}
                  </p>
                  <p className='text-sm text-slate-500 dark:text-slate-400'>
                    Pelanggan
                  </p>
                </div>
              </div>
            </div>

            <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900'>
              <div className='flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800'>
                <Package className='h-5 w-5 text-slate-400' />
                <h3 className='font-bold'>Detail Tugas</h3>
              </div>
              <div className='mt-4 space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-sm text-slate-500 dark:text-slate-400'>
                    Tipe Layanan
                  </span>
                  <span className='font-medium'>{task.serviceType}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm text-slate-500 dark:text-slate-400'>
                    Berat Total
                  </span>
                  <span className='font-medium'>{task.weight} kg</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm text-slate-500 dark:text-slate-400'>
                    Jumlah Item
                  </span>
                  <span className='font-medium'>
                    {task.items.reduce((acc, item) => acc + item.qty, 0)} pcs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900'>
            <div className='flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800'>
              <Package className='h-5 w-5 text-slate-400' />
              <h3 className='font-bold'>Daftar Item</h3>
            </div>
            <div className='mt-4'>
              <div className='overflow-hidden rounded-lg border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50'>
                <table className='w-full text-left text-sm'>
                  <thead className='bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'>
                    <tr>
                      <th className='px-4 py-3 font-medium'>Nama Item</th>
                      <th className='px-4 py-3 text-right font-medium'>
                        Jumlah
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-100 dark:divide-slate-800'>
                    {task.items.map((item) => (
                      <tr key={item.id}>
                        <td className='px-4 py-3 text-slate-900 dark:text-white'>
                          {item.name}
                        </td>
                        <td className='px-4 py-3 text-right font-medium text-slate-900 dark:text-white'>
                          {item.qty}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
