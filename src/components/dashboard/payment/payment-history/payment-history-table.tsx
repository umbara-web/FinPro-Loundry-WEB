import { Order } from '@/src/types/order';
import { PaymentHistoryRow } from './payment-history-row';

interface Props {
  orders: Order[];
  isLoading: boolean;
}

export function PaymentHistoryTable({ orders, isLoading }: Props) {
  if (isLoading) {
    return <div className='p-8 text-center text-[#92adc9]'>Loading...</div>;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className='p-8 text-center text-[#92adc9]'>
        Tidak ada riwayat pembayaran.
      </div>
    );
  }

  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-collapse text-left'>
        <thead>
          <tr className='border-b border-[#233648] bg-[#111a22] text-xs font-semibold tracking-wider text-[#92adc9] uppercase'>
            <th className='p-4'>No. Pesanan</th>
            <th className='p-4'>Tanggal</th>
            <th className='p-4'>Deskripsi</th>
            <th className='p-4'>Jumlah</th>
            <th className='p-4'>Status</th>
            <th className='p-4 text-right'>Aksi</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-[#233648] text-sm'>
          {orders.map((order) => (
            <PaymentHistoryRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
