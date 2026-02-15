'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { toast } from 'sonner';
import { api } from '@/src/lib/api/axios-instance';
import Image from 'next/image';

function MockPaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  // Get query params
  const orderId = searchParams.get('orderId');
  const paymentId = searchParams.get('paymentId');
  const amount = searchParams.get('amount')
    ? parseInt(searchParams.get('amount')!)
    : 0;
  const method = searchParams.get('method') || 'UNKNOWN';

  const handlePayment = async (status: 'SUCCESS' | 'FAILED') => {
    if (!orderId || !paymentId) {
      toast.error('Missing order or payment information');
      return;
    }

    setProcessing(true);

    try {
      if (status === 'SUCCESS') {
        // Simulate webhook call from "server" (or just verify manually for now)
        // In a real scenario, the gateway calls our webhook.
        // Here we can call a simulated endpoint or just the webhook directly if exposed,
        // OR we can just redirect to a success page that triggers a re-fetch.
        // But for "Order Payment" requirement, we need the backend to update the status.

        // Let's call the webhook endpoint directly from client for simulation purposes
        // effectively "mocking" the server-to-server call.
        await api.post('/payments/webhook', {
          orderId,
          status: 'PAID', // We might need to update the webhook to accept status for simulation
          paymentId,
        });

        toast.success('Payment Successful!');
        router.push(
          `/dashboard/orders/${searchParams.get('pickupId') || orderId}/payment/success`
        );
      } else {
        // FAILED
        toast.error('Payment Failed/Cancelled');
        // Redirect back to payment page to try again
        router.push(
          `/dashboard/orders/${searchParams.get('pickupId') || orderId}/payment`
        );
      }
    } catch (error: any) {
      console.error('Payment Error:', error);
      toast.error(
        error?.response?.data?.message || 'Failed to process payment'
      );
      setProcessing(false);
    }
  };

  if (!orderId || !paymentId) {
    return (
      <div className='flex h-screen items-center justify-center text-red-500'>
        Invalid parameters. Missing Order ID or Payment ID.
      </div>
    );
  }

  return (
    <div className='bg-background-light dark:bg-background-dark flex min-h-screen items-center justify-center p-4 font-sans'>
      <div className='bg-surface-light dark:bg-surface-dark w-full max-w-md overflow-hidden rounded-2xl border border-[#e5e7eb] shadow-xl dark:border-[#2a3b4d]'>
        {/* Header */}
        <div className='bg-slate-900 p-6 text-center text-white'>
          <h1 className='mb-2 text-xl font-bold'>Mock Payment Gateway</h1>
          <p className='text-sm text-blue-100'>Simulating external provider</p>
        </div>

        {/* Content */}
        <div className='flex flex-col gap-6 p-8'>
          <div className='text-center'>
            <p className='mb-1 text-sm text-[#637588] dark:text-[#93adc8]'>
              Total Payment
            </p>
            <h2 className='text-3xl font-black text-[#111418] dark:text-white'>
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0,
              }).format(amount)}
            </h2>
          </div>

          <div className='space-y-4 border-t border-b border-[#e5e7eb] py-6 dark:border-[#2a3b4d]'>
            <div className='flex justify-between'>
              <span className='text-[#637588] dark:text-[#93adc8]'>
                Order ID:
              </span>
              <span className='font-mono font-medium text-[#111418] dark:text-white'>
                {orderId.slice(0, 13)}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-[#637588] dark:text-[#93adc8]'>
                Method:
              </span>
              <span className='font-bold text-blue-500'>{method}</span>
            </div>
          </div>

          <div className='space-y-3'>
            <button
              onClick={() => handlePayment('SUCCESS')}
              disabled={processing}
              className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 font-bold text-white shadow-lg shadow-green-500/20 transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50'
            >
              {processing ? 'Processing...' : 'Bayar'}
            </button>

            <button
              onClick={() => handlePayment('FAILED')}
              disabled={processing}
              className='w-full cursor-pointer rounded-xl bg-red-500/10 px-4 py-3 font-bold text-red-500 transition-colors hover:bg-red-500/20 disabled:opacity-50 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20'
            >
              Cancel
            </button>
          </div>

          <p className='mt-2 text-center text-xs text-[#637588] dark:text-[#93adc8]'>
            This is a secure simulation environment. No real money triggers.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MockPaymentPage() {
  return (
    <Suspense fallback={<div>Loading Gateway...</div>}>
      <MockPaymentContent />
    </Suspense>
  );
}
