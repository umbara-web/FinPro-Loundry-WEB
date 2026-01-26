'use client';

import { AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';
import { Button } from '../../ui/button';
import { useComplaintSubmission } from '../../../hooks/use-complaint-submission';
import { ComplaintImageUpload } from './complaint-image-upload';

const complaintTypes = [
  { value: 'DAMAGE', label: 'Barang Rusak' },
  { value: 'LOST', label: 'Barang Hilang' },
  { value: 'NOT_MATCH', label: 'Tidak Sesuai Pesanan' },
  { value: 'REJECTED', label: 'Barang Ditolak' },
];

export function ComplaintSubmissionForm() {
  const {
    formData,
    setFormData,
    imagePreviews,
    ordersLoading,
    complaintableOrders,
    createComplaintMutation,
    handleImageUpload,
    removeImage,
    submitComplaint,
  } = useComplaintSubmission();

  return (
    <div className='mx-auto w-full max-w-2xl rounded-xl border border-slate-300 bg-slate-200 p-6 dark:border-slate-700 dark:bg-slate-800'>
      <div className='mb-6'>
        <h2 className='flex items-center gap-2 text-xl font-bold text-black dark:text-white'>
          <AlertCircle className='h-5 w-5' />
          Ajukan Komplain
        </h2>
      </div>

      <form onSubmit={submitComplaint} className='space-y-6'>
        {/* Order Selection */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-black dark:text-white'>
            Pilih ID Pesanan <span className='text-red-500'>*</span>
          </label>
          <div className='relative'>
            <select
              value={formData.orderId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, orderId: e.target.value }))
              }
              className='w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 pr-10 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white'
              required
            >
              <option value=''>Pilih ID pesanan yang ingin dikomplain</option>
              {ordersLoading ? (
                <option disabled>Memuat pesanan...</option>
              ) : complaintableOrders.length === 0 ? (
                <option disabled>
                  Tidak ada pesanan yang dapat dikomplain
                </option>
              ) : (
                complaintableOrders.map((order) => (
                  <option key={order.id} value={order.id}>
                    Pesanan #{order.id.slice(-8)} - {order.status} - Rp{' '}
                    {order.price_total.toLocaleString()}
                  </option>
                ))
              )}
            </select>
            <ChevronDown className='pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-500' />
          </div>
        </div>

        {/* Complaint Type */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-black dark:text-white'>
            Jenis Komplain <span className='text-red-500'>*</span>
          </label>
          <div className='relative'>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, type: e.target.value }))
              }
              className='w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 pr-10 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white'
              required
            >
              <option value=''>Pilih jenis komplain</option>
              {complaintTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <ChevronDown className='pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-500' />
          </div>
        </div>

        {/* Description */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-black dark:text-white'>
            Deskripsi Komplain <span className='text-red-500'>*</span>
          </label>
          <textarea
            placeholder='Jelaskan detail komplain Anda dengan lengkap...'
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            rows={4}
            className='w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white'
            required
          />
          <p className='text-sm text-slate-600 dark:text-slate-400'>
            Minimal 10 karakter, maksimal 1000 karakter
          </p>
        </div>

        {/* Image Upload */}
        <ComplaintImageUpload
          images={formData.images}
          onChange={(images) => setFormData((prev) => ({ ...prev, images }))}
        />

        {/* Submit Button */}
        <Button
          type='submit'
          disabled={createComplaintMutation.isPending}
          className='w-full cursor-pointer rounded-lg bg-blue-600 px-8 py-3 font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50'
        >
          {createComplaintMutation.isPending ? (
            'Mengirim...'
          ) : (
            <>
              <CheckCircle className='mr-2 inline h-4 w-4' />
              Ajukan Komplain
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
