'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { payOrder, getOrderDetail } from '@/src/lib/api/order-api';
import Link from 'next/link';
import {
  PaymentMethodOption,
  OrderSummaryCard,
} from '@/src/components/dashboard/payment';
import {
  PAYMENT_METHODS,
  LeftColumnProps,
  PaymentMethodsSectionProps,
  RightColumnProps,
} from '@/src/types/payment';
import { FaArrowLeft } from 'react-icons/fa';

export default function PaymentPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('GOPAY');

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetail(orderId),
  });

  const { mutate: processPayment, isPending } = useMutation({
    mutationFn: () => {
      if (!order?.order_id) {
        throw new Error('Order ID not found');
      }
      return payOrder(order.order_id, selectedMethod);
    },
    onSuccess: (data) => {
      toast.success('Pembayaran berhasil diinisiasi');
      const redirectUrl =
        data?.data?.redirectUrl ||
        `/dashboard/orders/${orderId}/payment/success`;
      router.push(redirectUrl);
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Gagal memproses pembayaran';
      toast.error(msg);
    },
  });

  if (isLoading || !order) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        Loading...
      </div>
    );
  }

  return (
    <div className='bg-background-light dark:bg-background-dark min-h-screen p-4 font-sans md:p-8'>
      <div className='mx-auto max-w-7xl'>
        <BackLink orderId={orderId} />
        <PageHeading orderId={order.id} />
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          <LeftColumn
            order={order}
            selectedMethod={selectedMethod}
            onMethodSelect={setSelectedMethod}
          />
          <RightColumn
            order={order}
            isPending={isPending}
            onPayment={() => processPayment()}
          />
        </div>
      </div>
    </div>
  );
}

function BackLink({ orderId }: { orderId: string }) {
  return (
    <div className='mb-10 text-lg'>
      <Link
        href={`/dashboard/orders/${orderId}`}
        className='text-primary flex w-fit items-center gap-2 font-medium hover:text-blue-500 hover:underline dark:text-white dark:hover:text-blue-500'
      >
        <FaArrowLeft />
        Kembali ke Ringkasan
      </Link>
    </div>
  );
}

function LeftColumn({
  order,
  selectedMethod,
  onMethodSelect,
}: LeftColumnProps) {
  return (
    <div className='flex flex-col gap-6 lg:col-span-8'>
      <PaymentMethodsSection
        selectedMethod={selectedMethod}
        onMethodSelect={onMethodSelect}
      />
    </div>
  );
}

function PageHeading({ orderId }: { orderId: string }) {
  return (
    <div className='mb-10 flex flex-col gap-2'>
      <h1 className='text-3xl font-black tracking-tight md:text-4xl'>
        Pembayaran Pesanan
      </h1>
      <p className='text-slate-500 dark:text-slate-400'>
        Selesaikan pembayaran untuk pesanan{' '}
        <span className='font-bold text-red-600'>#{orderId.slice(0, 8)}</span>
      </p>
    </div>
  );
}

function PaymentMethodsSection({
  selectedMethod,
  onMethodSelect,
}: PaymentMethodsSectionProps) {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='px-1 text-xl font-bold'>Pilih Metode Pembayaran</h2>
      <div className='flex flex-col gap-3'>
        {PAYMENT_METHODS.map((method) => (
          <PaymentMethodOption
            key={method.value}
            value={method.value}
            selected={selectedMethod === method.value}
            onSelect={() => onMethodSelect(method.value)}
            icon={method.icon}
            iconColor={method.iconColor}
            title={method.title}
            subtitle={method.subtitle}
          />
        ))}
      </div>
    </div>
  );
}

function RightColumn({ order, isPending, onPayment }: RightColumnProps) {
  return (
    <div className='lg:col-span-4'>
      <div className='sticky top-24 flex flex-col gap-4'>
        <OrderSummaryCard
          order={order}
          isPending={isPending}
          onPayment={onPayment}
        />
      </div>
    </div>
  );
}
