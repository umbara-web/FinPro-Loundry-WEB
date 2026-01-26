import { Order } from '@/src/types/order';
import { confirmOrder } from '@/src/lib/api/order-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { OrderCardStatus } from './order-card-status';
import { OrderCardActions } from './order-card-actions';
import { ConfirmOrderDialog } from './confirm-order-dialog';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const queryClient = useQueryClient();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const confirmMutation = useMutation({
    mutationFn: confirmOrder,
    onSuccess: () => {
      toast.success('Pesanan berhasil dikonfirmasi!');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setIsConfirmDialogOpen(false);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Gagal mengkonfirmasi pesanan'
      );
    },
  });

  const handleConfirmOrder = () => {
    confirmMutation.mutate(order.id);
  };

  const itemsSummary = order.order_item
    .map((item) => `${item.qty} ${item.laundry_item.name}`)
    .join(', ');

  const totalItems = order.order_item.reduce((acc, curr) => acc + curr.qty, 0);

  return (
    <div className='group relative flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md md:flex-row dark:border-gray-800 dark:bg-[#1c2732]'>
      <OrderCardStatus
        order={order}
        itemsSummary={itemsSummary}
        totalItems={totalItems}
      />

      <OrderCardActions
        order={order}
        onConfirm={() => setIsConfirmDialogOpen(true)}
      />

      <ConfirmOrderDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        onConfirm={handleConfirmOrder}
        isPending={confirmMutation.isPending}
      />
    </div>
  );
}
