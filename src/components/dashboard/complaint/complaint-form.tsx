'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, Send, Loader2, Upload, X } from 'lucide-react';
import Link from 'next/link';

import {
  ComplaintTypeSelector,
  ComplaintType,
} from './complaint-type-selector';
import { ComplaintImageUpload } from './complaint-image-upload';
import { createComplaint } from '@/src/lib/api/complaint-api';

interface ComplaintFormProps {
  orderId: string;
  orderNumber?: string;
}

export function ComplaintForm({ orderId, orderNumber }: ComplaintFormProps) {
  const router = useRouter();
  const [type, setType] = useState<ComplaintType | null>(null);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const createMutation = useMutation({
    mutationFn: () => {
      if (!type) throw new Error('Please select a complaint type');
      return createComplaint({ orderId, type, description, images });
    },
    onSuccess: () => {
      toast.success('Komplain berhasil dikirim!');
      router.push(`/customer/orders/${orderId}/complaint/success`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Gagal mengirim komplain');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!type) {
      toast.error('Pilih jenis komplain terlebih dahulu');
      return;
    }

    if (description.trim().length < 10) {
      toast.error('Deskripsi harus minimal 10 karakter');
      return;
    }

    createMutation.mutate();
  };

  const isValid = type && description.trim().length >= 10;

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
      {/* Back Link */}
      <Link
        href={`/customer/orders/${orderId}`}
        className='text-primary flex items-center gap-2 text-sm hover:underline'
      >
        <ArrowLeft className='h-4 w-4' />
        Kembali ke Detail Pesanan
      </Link>

      {/* Header */}
      <div>
        <h1 className='text-2xl font-black text-gray-900 dark:text-white'>
          Ajukan Komplain
        </h1>
        {orderNumber && (
          <p className='mt-1 text-gray-500 dark:text-gray-400'>
            Pesanan #{orderNumber}
          </p>
        )}
      </div>

      {/* Complaint Type Selection */}
      <div className='flex flex-col gap-3'>
        <label className='text-sm font-bold text-gray-700 dark:text-gray-300'>
          Jenis Komplain <span className='text-red-500'>*</span>
        </label>
        <ComplaintTypeSelector value={type} onChange={setType} />
      </div>

      {/* Description */}
      <div className='flex flex-col gap-3'>
        <label
          htmlFor='description'
          className='text-sm font-bold text-gray-700 dark:text-gray-300'
        >
          Deskripsi Masalah <span className='text-red-500'>*</span>
        </label>
        <textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Jelaskan masalah yang Anda alami secara detail...'
          rows={5}
          className='focus:border-primary focus:ring-primary/20 w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:ring-2 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500'
        />
        <p className='text-xs text-gray-500'>
          {description.length}/1000 karakter (minimal 10)
        </p>
      </div>

      {/* Image Upload */}
      <ComplaintImageUpload images={images} onChange={setImages} />

      {/* Submit Button */}
      <button
        type='submit'
        disabled={!isValid || createMutation.isPending}
        className='bg-primary hover:bg-primary/90 shadow-primary/20 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-white shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-50'
      >
        {createMutation.isPending ? (
          <>
            <Loader2 className='h-5 w-5 animate-spin' />
            Mengirim...
          </>
        ) : (
          <>
            <Send className='h-5 w-5' />
            Kirim Komplain
          </>
        )}
      </button>

      {/* Info Box */}
      <div className='rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700 dark:border-blue-900/30 dark:bg-blue-900/10 dark:text-blue-400'>
        <p className='font-medium'>Informasi:</p>
        <ul className='mt-1 list-inside list-disc space-y-1'>
          <li>Komplain akan diproses dalam 1-3 hari kerja</li>
          <li>Tim kami akan menghubungi Anda untuk konfirmasi</li>
          <li>Pastikan data yang Anda berikan sudah benar</li>
        </ul>
      </div>
    </form>
  );
}
