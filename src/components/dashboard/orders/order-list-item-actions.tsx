'use client';

import { Order } from '@/src/types/order';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/src/components/ui/alert-dialog';
import { useState } from 'react';
import { confirmOrder } from '@/src/lib/api/order-api';
import { useRouter } from 'next/navigation';
import { Loader2, MessageSquare } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getComplaintByOrderId } from '@/src/lib/api/complaint-api';

interface OrderListItemActionsProps {
  order: Order;
}

export function OrderListItemActions({ order }: OrderListItemActionsProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const router = useRouter();

  // Check if order can have complaints and if it already has one
  const canComplain = ['DELIVERED', 'COMPLETED', 'CANCELLED'].includes(
    order.status
  );
  const { data: existingComplaint } = useQuery({
    queryKey: ['complaint', order.id],
    queryFn: () => getComplaintByOrderId(order.id),
    enabled: canComplain,
  });

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent dialog from closing immediately
    try {
      setIsConfirming(true);
      await confirmOrder(order.id);
      router.refresh();
    } catch (error) {
      console.error('Failed to confirm order:', error);
    } finally {
      setIsConfirming(false);
    }
  };

  // Re-implementing handleConfirm to allow closing:
  const handleConfirmClick = async () => {
    try {
      await confirmOrder(order.id);
      router.refresh();
    } catch (error) {
      console.error('Failed to confirm', error);
    }
  };

  return (
    <div className='flex items-center justify-between gap-4 sm:justify-end'>
      <div className='rounded-lg bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400'>
        {order.status.replace(/_/g, ' ')}
      </div>
      <div className='flex items-center gap-2'>
        {order.status === 'DELIVERED' && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size='sm'
                className='bg-green-600 text-white hover:bg-green-700'
              >
                Konfirmasi
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Konfirmasi Pesanan Diterima?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah Anda yakin pesanan telah diterima dengan baik? Status
                  pesanan akan diubah menjadi Selesai.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleConfirmClick}
                  className='bg-green-600 hover:bg-green-700'
                >
                  Ya, Terima Pesanan
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        {order.status === 'WAITING_PAYMENT' && (
          <Button
            asChild
            size='sm'
            className='bg-primary hover:bg-primary/90 text-white'
          >
            <Link href={`/customer/orders/${order.id}/payment`}>Bayar</Link>
          </Button>
        )}
        {canComplain && !existingComplaint && (
          <Button
            asChild
            size='sm'
            className='bg-orange-600 text-white hover:bg-orange-700'
          >
            <Link href={`/customer/orders/${order.id}/complaint`}>
              <MessageSquare className='mr-1 h-3 w-3' />
              Komplain
            </Link>
          </Button>
        )}
        {canComplain && existingComplaint && (
          <Button asChild size='sm' variant='secondary'>
            <Link href={`/customer/complaints/${existingComplaint.id}`}>
              Lihat Komplain
            </Link>
          </Button>
        )}
        <Button asChild size='sm' variant='secondary'>
          <Link href={`/dashboard/orders/${order.id}`}>Detail</Link>
        </Button>
      </div>
    </div>
  );
}
